const express = require("express");
const router = express.Router();
const Lands = require("../../models/lands.models");
const landintractions = require("../../models/landIntractions.models");
const jwt = require("jsonwebtoken");

// Adding lands
router.post("/AddLand", verifyToken, async (req, res) => {
  let token = req.headers["authorizatrion"];
  const {
    name,
    street,
    country,
    state,
    city,
    totalsqfeet,
    lengthinft,
    widthinft,
    price,
    customer,
    note,
  } = req.body;
  const userId = await jwt.decode(token).id;
  const landStatus = "live"
  const newLand = new Lands({
    name,
    street,
    country,
    state,
    city,
    totalsqfeet,
    lengthinft,
    widthinft,
    price,
    note,
    userId,
    customer,
    landStatus
  });

  await newLand
    .save()
    .then(() => {
      res.json(newLand);
    })
    .catch((error) => {
      res.json(error);
    });
});

// fetching all lands
router.post("/allLands", async (req, res) => {
  const { city } = req.body;
  if (city == "Select City") {
    Lands.find({ landStatus: "live" }).sort({ _id: -1 }).then((error, result) => {
      if (error) {
        res.send(error);
      }
      console.log(result);
      res.send(result);
    });
  } else {
    Lands.find({ city: city }).then((error, result) => {
      if (error) {
        res.send(error);
      }
      res.send(result);
    });
  }
});

// fetching all my lands
router.post("/allMyLands", verifyToken, async (req, res) => {
  let token = req.headers["authorizatrion"];
  try {
    const id = await jwt.decode(token).id;
    await Lands.find({ userId: id, landStatus: "live" }).then((error, result) => {
      if (error) {
        res.send(error);
      }
      res.send(result);
    });
  } catch (error) {
    res.send("Sorry Something Wrong");
  }
});

// LandIntraction Entries
router.post("/LandIntractions", async (req, res) => {
  const { userId, landId, medium } = req.body;
  const newLandIntraction = new landintractions({ userId, landId, medium })
  await newLandIntraction.save().then(() => { res.json("Intraction saved") }).catch((error) => { res.json(error) })
});

// Fetching all my lands
router.post("/landDetails", async (req, res) => {
  const { landId } = req.body;
  try {
    await Lands.find({ _id: landId }).then((error, result) => {
      if (error) {
        res.send(error);
      }
      res.send(result);
    });
  } catch (error) {
    res.send("Sorry Something Wrong");
  }
});
// End fetching all my lands

// Fetching all my lands
router.post("/delete", verifyToken, async (req, res) => {
  // Mistake: *** Land === user not verified
  const { landId } = req.body;
  try {
    // await Lands.deleteOne({ _id: landId });
    // update Land Status
    await Lands.updateOne({ _id: landId }, { $set: { landStatus: "deleted" } })
    // End Update Land Status
    res.status(200).json("Land deleted")
  } catch (error) {
    res.status(401).json("Sorry Something Wrong");
  }
});
// End fetching all my lands

// Update all my lands
router.post("/update", verifyToken, async (req, res) => {
  // Mistake: *** Land === user not verified
  const { landId, name, sq, length, width, price, street } = req.body;
  console.log(landId, name, sq, length, width, price, street)

  try {
    await Lands.updateOne({ "_id": landId }, { $set: { name: name, totalsqfeet: sq, lengthinft: length, widthinft: width, price: price, street: street } })
    res.status(200).json("Land Updated");
  } catch (error) {
    res.status(401).json("Sorry Something Wrong");
  }
});
// End Update all my lands

// Token Verification
function verifyToken(req, res, next) {
  let token = req.headers["authorizatrion"];
  const SECRET_KEY = "mysecretkey";
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, valid) => {
      if (err) {
        res.status(401).send("Something went wrong (Token)");
      } else {
        next();
      }
    });
  } else {
    res.status(401).send("Something went wrong (Token)");
  }
}

// End Token Verification

module.exports = router;

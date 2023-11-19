// Get Affliate Token By Mobileconst express = require("express");
const express = require("express");

const router = express.Router();
const affliateSchema = require("../../models/affliateManagement.models")


// Check for affliate token
router.post("/checkAffliate", async (req, res) => {
    const {
        token
    } = req.body;
    // Check If Account Exist
    try {
        const existingUser = await affliateSchema.findOne({ token: token });
        if (existingUser === null) {
            res.send("User not found")
        }
        if (existingUser !== null) { res.send(existingUser) }

    } catch (error) {
        res.send("Sorry Something Wrong, Please Try Later");
    }
});





// Adding Affliate
router.post("/createAffliate", async (req, res) => {
    const {
        name,
        phonemobile,
        accountNumber,
        ifsc,
        bankName,
        token
    } = req.body;
    mobile = Number(phonemobile);
    const prefix = "ZL"
    const affliateCode = prefix.concat(mobile.toString())

    // Check If Account Exist
    // Check for affliate existance
    async function getuser(mobilenumber) {
        const existingUser = await affliateSchema.findOne({ mobile: mobile });
        if (existingUser === null) {
            return false;
        }
        return existingUser;
    }
    const user = await getuser(mobile);
    if (user) {
        res.json("Affliate Already Exist")
    }
    if (!user) {
        try {

            // Create a new account
            const newAffliate = new affliateSchema({
                name,
                mobile,
                accountNumber,
                ifsc,
                bankName,
                affliateCode,
                token
            });

            await newAffliate.save().then(() => {
                res.json("saved");
            })
                .catch((error) => {
                    res.json("Your Account number might already exist");
                });

        } catch (error) {
            console.error(error);
            res.send("Sorry Something Wrong, Please Try Later");
        }
    }
});

module.exports = router;

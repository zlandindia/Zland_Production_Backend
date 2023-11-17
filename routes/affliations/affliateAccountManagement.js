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
        await affliateSchema.find({ token: token }).then(async (error, result) => {
            if (error) {
                res.send("Token does not exist");
            }

            res.send(result);

        });
    } catch (error) {
        res.send("Sorry Something Wrong, Please Try Later");
    }
});



// Adding Affliate
router.post("/createAffliate", async (req, res) => {
    const {
        name,
        mobile,
        accountNumber,
        ifsc,
        bankName,
        token
    } = req.body;

    // Check If Account Exist
    try {
        await affliateSchema.find({ Mobile: mobile }).then(async (error, result) => {
            if (result) {
                res.send("Your Account Already Exists");
            }
            const code = mobile;
            // Create a new account
            const newAffliate = new affliateSchema({
                name,
                mobile,
                accountNumber,
                ifsc,
                bankName,
                code,
                token
            });
            await newAffliate
                .save()
                .then(() => {
                    res.json(newAffliate);
                })
                .catch((error) => {
                    res.json(error);
                });


        });
    } catch (error) {
        res.send("Sorry Something Wrong, Please Try Later");
    }
});

module.exports = router;

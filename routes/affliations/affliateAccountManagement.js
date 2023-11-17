// Get Affliate Token By Mobileconst express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const affliateSchema = require("../../models/affliateManagement.models")

// Adding Affliate
router.post("/createAffliate", async (req, res) => {
    const {
        name,
        mobile,
        accountNumber,
        ifsc,
        bankName,
    } = req.body;
    // Check If Account Exist
    try {
        await affliateSchema.find({ Mobile: mobile }).then(async (error, result) => {
            if (result) {
                res.send("Your Account Already Exists");
            }
            // Create a new account
            const newAffliate = new affliateSchema({
                name,
                mobile,
                accountNumber,
                ifsc,
                bankName,
                code
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

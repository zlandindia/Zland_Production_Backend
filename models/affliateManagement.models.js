const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const affliateManager = new Schema(
    {
        Name: {
            type: String,
            trim: true,
        },
        Mobile: {
            type: String,
            trim: true,
        },
        AccountNumber: {
            type: String,
            trim: true,
        },
        Ifsc: {
            type: String,
            trim: true,
        },
        BankName: {
            type: String,
            trim: true,
        },
        AffliateCode: {
            type: String,
            trim: true,
        }
    },
    { timestamps: true }
);

const affliateSchema = mongoose.model("affliateManager", affliateManager);

module.exports = affliateSchema;

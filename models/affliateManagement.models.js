const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const affliateManager = new Schema(
    {
        Name: {
            type: String,
            trim: true,
            require: true,
        },
        Mobile: {
            type: Number,
            unique: true,
            trim: true,
            require: true,
        },
        AccountNumber: {
            type: String,
            trim: true,
            require: true,
        },
        Ifsc: {
            type: String,
            trim: true,
            require: true,
        },
        BankName: {
            type: String,
            trim: true,
            require: true,
        },
        AffliateCode: {
            type: String,
            trim: true,
            require: true,
        },
        token: {
            type: String,
            trim: true,
            require: true,
        }
    },
    { timestamps: true }
);

const affliateSchema = mongoose.model("affliateManager", affliateManager);

module.exports = affliateSchema;

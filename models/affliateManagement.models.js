const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const affliateManager = new Schema(
    {
        name: {
            type: String,
            trim: true,
            require: true,
        },
        mobile: {
            unique: true,
            type: Number,
            trim: true,
            require: true,
        },
        accountNumber: {
            type: String,
            trim: true,
            require: true,
        },
        ifsc: {
            type: String,
            trim: true,
            require: true,
        },
        bankName: {
            type: String,
            trim: true,
            require: true,
        },
        affliateCode: {
            type: String,
            trim: true,
            require: true,
            unique: true
        },
        token: {
            type: String,
            trim: true,
            require: true,
        }
    },
    { timestamps: true }
);

const affliateSchema = mongoose.model("affliateSchema", affliateManager);

module.exports = affliateSchema;

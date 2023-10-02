const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const landIntractions = new Schema(
    {
        userId: {
            type: String,
            trim: true,
        },
        landId: {
            type: String,
            trim: true,
        },
        medium: {
            type: String,
            trim: true,
        }
    },
    { timestamps: true }
);

const landintractions = mongoose.model("landIntractions", landIntractions);

module.exports = landintractions;

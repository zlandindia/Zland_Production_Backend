const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mobileSchema = new Schema(
    {
        phone: {
            type: String,
            require: true,
        }
    },
    { timestamps: true }
);

const Mobile = mongoose.model("Mobile", mobileSchema);

module.exports = Mobile;

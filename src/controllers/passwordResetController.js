require('dotenv').config()
const sendEmail = require("../utils/sendEmail");
const express = require("express");
const UserSchema = require("../models/UserSchema")
const Token = require("../models/token");
const crypto = require("crypto");
const Joi = require("joi");
const router = express.Router();
const BASE_URL = process.env.BASE_URL;
const bcrypt = require("bcrypt")

const forgot_password = async (req, res) => {

    const {email} = req.body

    try {
        
        if(!email) {
            return res.status(422).send("Email is required")
        }

        const user = await UserSchema.findOne({ email: email})

        if (!user)
            return res.status(400).send("error: user not found");

        let token = await Token.findOne({ userId: user._id });

        const now = new Date();
        now.setHours(now.getHours() + 1);

        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(20).toString("hex"),
                tokenExpires: now,
            }).save();
        };

        const link = `Acesso o link a seguir para resetar sua senha: ${BASE_URL}/recovery/userId=${user._id}&token=${token.token}`;

        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");

    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
};

const changePassword =  async (req, res) => {
    try {
        const {newPass} = req.body

        const user = await UserSchema.findById(req.params.userId);

        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if (!token) return res.status(400).send("Invalid link or expired");

        // create password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(req.body.newPass, salt)

        user.password = passwordHash;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
};

module.exports = {
    forgot_password,
    changePassword,
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const console_1 = require("console");
const dotenv_1 = require("dotenv");
const nodemailer_1 = require("nodemailer");
const randomstring_1 = require("randomstring");
const verificationCode_1 = require("../mjml/verificationCode");
(0, dotenv_1.config)();
const { NODEMAILER_USER, NODEMAILER_PASS } = process.env;
const transporter = (0, nodemailer_1.createTransport)({
    service: 'gmail',
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS
    }
});
const sendMail = async (to) => {
    const code = (0, randomstring_1.generate)({ length: 4, charset: 'numeric' });
    try {
        const html = (0, verificationCode_1.getVerificationEmailTemplate)(code, to);
        await transporter.sendMail({
            from: NODEMAILER_USER,
            to,
            subject: "This is your verification code don\'t share it with anyone",
            html
        });
    }
    catch (error) {
        (0, console_1.log)(error);
    }
    return code;
};
exports.sendMail = sendMail;

import { log } from 'console';
import { config } from 'dotenv';
import { createTransport } from 'nodemailer';
import { generate } from 'randomstring';
import { getVerificationEmailTemplate } from '../mjml/verificationCode';

config();

const { NODEMAILER_USER, NODEMAILER_PASS } = process.env;

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS
    }
})

export const sendMail = async (to: string) => {
    const code: string = generate({ length: 4, charset: 'numeric' });
    try {
        const html = getVerificationEmailTemplate(code, to);
        await transporter.sendMail({
            from: NODEMAILER_USER,
            to,
            subject: "This is your verification code don\'t share it with anyone",
            html
        });
    } catch (error) {
        log(error);
    }
    return code;
}
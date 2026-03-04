"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("../utils/nodemailer");
test.skip('Test send mail function', async () => {
    // Running and Equal Type Successfull
    const code = await (0, nodemailer_1.sendMail)('ahmadmayallo02@gmail.com');
    expect(typeof code).toBe('string');
});

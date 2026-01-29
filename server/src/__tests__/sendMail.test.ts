import { sendMail } from "../utils/nodemailer"

test('Test send mail function', async () => {
    // Running and Equal Type Successfull
    const code = await sendMail('ahmadmayallo02@gmail.com');
    expect(typeof code).toBe('string');
});

import nodemailer from "nodemailer";

// =============================================================


export const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false,
    auth: {
        user: "user@example.com",
        pass: "password"
    }
});

import nodemailer from "nodemailer";
import config from "../config/index.js";

const emailSender = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.emailSender.email,
      pass: config.emailSender.app_pass,
    },
  });

  // Wrap in an async IIFE so we can use await.
  (async () => {
    const info = await transporter.sendMail({
      from: '"Green Leaf mazharul90007@gmail.com>',
      to: email,
      subject: "Reset password link",
      //   text: "Hello world?", // plain‑text body
      html,
    });

    console.log("Message sent:", info.messageId);
  })();
};

export default emailSender;

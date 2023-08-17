import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export async function SendEmail({ email, emailType, userId }: any) {
  try {
    // Creating The Hash Token Based on User Modal Id
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Check Email Type and then setting the token
    if (emailType === "VERIFY") {
      await User.findOneAndUpdate(userId, {
        VerifyToken: hashedToken,
        VerifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findOneAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASSWORD,
      },
    });

    const emailOptions = {
      from: "freefake476@gmail.com", // sender address
      to: email, // list of receivers
      subject: emailType === "VERIFY" ? "Verify your Email" : "Reset your password", // Subject line
      html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your Email" : "Reset your password"
      }</p> or Copy and paste the link below in your browser <br> ${
        emailType === "VERIFY"
          ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
          : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`
      }`, // html body
    };

    const mailResponse = transport.sendMail(emailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

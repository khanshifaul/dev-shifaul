import nodemailer from "nodemailer";

const sender: string = "mail@medigadget.vercel.app";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<void> => {
  await transporter.sendMail({ from: sender, to, subject, html });
};

export const sendVerifyEmail = async (
  email: string,
  verificationUrl: string
): Promise<void> => {
  const subject = "Confirm Your Email";
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto;">
      <h2 style="color: #333; text-align: center;">Email Verification</h2>
      <p>Dear User,</p>
      <p>Thank you for registering with MediGadget. Please verify your email address by clicking the link below:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${verificationUrl}" style="background: #0056b3; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
          Verify Email
        </a>
      </div>
      <p>If you did not create an account, please ignore this email.</p>
      <p>Thank you for choosing MediGadget!</p>
      <p>Best regards,<br/>The MediGadget Team</p>
    </div>
  `;
  await sendEmail(email, subject, html);
};

export const sendResetPasswordEmail = async (
  email: string,
  resetPasswordUrl: string
): Promise<void> => {
  const subject = "Reset Your Password";
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto;">
      <h2 style="color: #333; text-align: center;">Password Reset</h2>
      <p>Dear User,</p>
      <p>We received a request to reset your password. Please click the link below to set a new password:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${resetPasswordUrl}" style="background: #0056b3; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
          Reset Password
        </a>
      </div>
      <p>If you did not request a password reset, please ignore this email.</p>
      <p>Thank you for choosing MediGadget!</p>
      <p>Best regards,<br/>The MediGadget Team</p>
    </div>
  `;
  await sendEmail(email, subject, html);
};

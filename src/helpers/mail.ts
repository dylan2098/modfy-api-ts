import nodemailer from 'nodemailer';
import mailConfig from '../configs/mail.config';
import { MailType } from '../core/types/mail.type';

async function sendEmail(payload: MailType) {
  const transporter = nodemailer.createTransport(mailConfig);

  const info = await transporter.sendMail({
    from: `"Modfy 👻" <${mailConfig.auth?.user}>`,
    to: payload.to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  });

  return info;
}


/**
 * Send email to authenticate user after register success
 */
export function sendAuthenticateUserEmail(email: string, code: string) {
  const payload = {
    to: email,
    subject: `Account Confirmation Email`,
    text: 'Confirm your email',
    html: `
        <a href="http://localhost:8080/v1/api/users/active/${code}" style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #f5e3ae; background-color: ; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 2px solid #f5e3ae; border-right: 2px solid #f5e3ae; border-bottom: 2px solid #f5e3ae; border-left: 2px solid #f5e3ae; padding-top: 10px; padding-bottom: 10px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; text-align: center; mso-border-alt: none; background-color: black; word-break: keep-all;" target="_blank"><span style="padding-left:20px;padding-right:20px;font-size:15px; display:inline-block;"><span style="font-size: 16px; line-height: 2; mso-line-height-alt: 32px;"><span style="font-size: 15px; line-height: 30px;"><strong>Active Register Email</strong></span></span></span></a>
      `,
  };

  return sendEmail(payload);
}


/**
 * Send email to notify user when change password success
 */
export function sendChangePasswordEmail(email: string) {
  const payload = {
    to: email,
    subject: `Change password success`,
    text: ``,
    html: `Your password has been changed successfully. If you did not make this change, please contact us immediately.`,
  };

  return sendEmail(payload);
}

/**
 * Send email to notify user when reset password success
 */

export function sendResetPasswordEmail(email: string, password: string) {
  const payload = {
    to: email,
    subject: `Reset password success`,
    text: ``,
    html: `Your password has been reset and password is: ${password}. If you did not make this change, please contact us immediately.`,
  };

  return sendEmail(payload);
}
'use strict';

import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";

const env = process.env;

const mailConfig: SMTPTransport.Options = {
    host: env.DEV_MAIL_HOST,
    port: parseInt(env.DEV_MAIL_PORT || '587'),
    secure: false,
    auth: {
        user: env.DEV_MAIL_USER,
        pass: env.DEV_MAIL_PASS
    }
}

export default mailConfig;
const sendGridMail = require('@sendgrid/mail');
const  { sendGrid } = require(__base + 'app/config/index');
const logger = require(__base + 'app/utils/logger');
const  { frontUrl } = require(__base + 'app/config/index');

sendGridMail.setApiKey(sendGrid.apiKey);

module.exports =  {

    sendOtpEmail: (to, otp, sandboxMode = false) => {
        return sendGridMail.send({
            to: to,
            from: sendGrid.from,
            subject: 'OTP for Registration',
            html: `Hi,<br><br> Your OTP for registeration is : ${otp}<strong><a href="${frontUrl}/sign-up/confirm/${to}"></a>${frontUrl}/sign-up/confirm/${to}</strong>`,
            mailSettings: {
              sandboxMode: {
                enable: sandboxMode
              }
            }
          }).then(([response, body]) => {
            logger.info("Email has been " + response.statusMessage);
        
            if (response.statusCode >= 300) {
              logger.error("Email SendGrid request error: " + body);
            }
          });
    },

    sendPasswordResetOtpEmail: (to, otp, sandboxMode = false) => {
      return sendGridMail.send({
          to: to,
          from: sendGrid.from,
          subject: 'OTP for Password reset',
          html: `Hi,<br><br> Your OTP for password reset is : ${otp}<strong><a href="${frontUrl}/password-reset/confirm/${to}"></a>${frontUrl}/password-reset/confirm/${to}</strong>`,
          mailSettings: {
            sandboxMode: {
              enable: sandboxMode
            }
          }
        }).then(([response, body]) => {
          logger.info("Email has been " + response.statusMessage);
      
          if (response.statusCode >= 300) {
            logger.error("Email SendGrid request error: " + body);
          }
        });
  }
};
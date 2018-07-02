const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Mailgun",
  auth: {
    user: "postmaster@mail.hoboshop.com",
    pass: "c09468a43bde03b39e57b09e54f62c55-e44cc7c1-f760b6bb"
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = {
  sendEmail(from, to, subject, html) {
    return new Promise((resolve, reject) => {
      transport.sendMail({ from, subject, to, html }, (err, info) => {
        if (err) reject(err);
        resolve(info);
      });
    });
  }
};

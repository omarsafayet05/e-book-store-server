const Contact = require("./contact.model");
const nodemailer = require("nodemailer");

const postAContactMail = async (req, res) => {
  const newContact = await Contact(req.body);
  console.log(newContact);

  if (!newContact) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Riq Academy Message",

      html: `
          <h3>New Message</h3>
          <p><strong>Name:</strong> ${newContact.name}</p>
          <p><strong>Email:</strong> ${newContact.email}</p>
          <p><strong>Subject:</strong> ${newContact.sub}</p>
          <p><strong>Message:</strong></p>
          <p>${newContact.message}</p>
        `,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to send mail" });
  }
};

module.exports = postAContactMail;

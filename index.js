const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

// server used to send send emails
const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({ origin: "*" }))
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "info.fishtailroofing1@gmail.com",
        pass: "kroytfomzkqdenmr"
    },
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to Send");
    }
});

router.post("/contact", (req, res) => {
    const name = req.body.name;
    const location = req.body.location;
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;
    const service = req.body.service;

    const mail = {
        from: name,
        to: "info.fishtailroofing1@gmail.com",
        subject: "Contact Form Submission - Fishtail Roofing",
        cc : "mailsanjog.regmi@gmail.com",
        html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p> Location: ${location}</p>
              <p>Service: ${service}</p>
           <p>Description: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json(error);
        } else {
            res.json({ code: 200, status: "Message Sent" });
        }
    });
});
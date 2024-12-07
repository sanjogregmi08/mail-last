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
        user: "mailsanjog.regmi@gmail.com",
        pass: "zkoetuersqyhdgdr "
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
    const subject = req.body.subject;
    const email = req.body.email;
    const message = req.body.message;


    const mail = {
        from: name,
        to: "mailsanjog.regmi@gmail.com",
        subject: "Contact Form Submission - The root Level " +"-"+ subject,
        cc : "mailsanjog.regmi@gmail.com",
        html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
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
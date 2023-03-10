require("dotenv").config();
const express = require("express");
const cors = require("cors");
const formData = require("form-data");
const Mailgun = require("mailgun.js");

const app = express();
app.use(express.json());
app.use(cors());

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "Kolosset",
  key: process.env.API_KEY,
});

app.get("/", async (req, res) => {
  try {
    res.json("Bienvenue dans le serveur du formulaire 📝");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/form", async (req, res) => {
  try {
    const messageData = {
      from: `${req.body.firstname} ${req.body.lastname} <${req.body.email}>`,
      to: "moustapha.diakhaby75@gmail.com",
      subject: `La fin de One piece`,
      text: req.body.message,
      // dhaizdza
    };
    console.log(messageData);

    const response = await client.messages.create(
      process.env.DOMAIN_MAILGUN,
      messageData
    );

    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "this route doesn't exist" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has been started");
});

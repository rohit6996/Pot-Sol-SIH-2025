// Install dependencies: npm install express pg cors nodemailer body-parser
import express from "express";
import pkg from "pg";
import cors from "cors";
import bodyParser from "body-parser";

import nodemailer from "nodemailer";

const { Pool } = pkg;
const app = express();
const port = 5002; // main server port

// -------------------------
// Postgres connection
// -------------------------
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tweets",
  password: "Your_Password_Here",
  port: 5432,
});

// -------------------------
// Middleware
// -------------------------
app.use(cors());
app.use(bodyParser.json());

// -------------------------
// API: Fetch tweets
// -------------------------
app.get("/api/tweets", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tweets");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});

// -------------------------
// Email setup
// -------------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Your Email Here", // your email
    pass: "Your_Password_Here", // use app password
  },
});

// -------------------------
// API: Send email
// -------------------------
app.post("/send-email", async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res
      .status(400)
      .json({ success: false, error: "Missing parameters" });
  }

  try {
    await transporter.sendMail({
      from: "Your EMail Here",
      to: email,
      subject: subject,
      html: `<div style="font-family: Arial, sans-serif;">${message}</div>`,
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------
// Start server
// -------------------------
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

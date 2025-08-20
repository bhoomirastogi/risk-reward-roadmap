
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // ✅ JSON body parser

// Debugging middleware
app.use((req, res, next) => {
  console.log("🔥 Incoming request:", req.method, req.url);
  console.log("🔥 Headers:", req.headers["content-type"]);
  console.log("🔥 Body:", req.body);
  next();
});

// MongoDB connection
mongoose
  .connect("mongodb+srv://milindsinghchauhan0803:123%40Milind@cluster0.1oefhfa.mongodb.net/virtualAssistant")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
});
const User = mongoose.model("User", userSchema);


// Schema for Investment
const investmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },   // signup se aaye userId
  type: { type: String },                     // optional: profile se
  amount: { type: Number, required: true },
  riskLevel: { type: String, required: true },
  monthlyContribution: { type: Number, default: 0 },
  sectors: { type: [String], default: [] },
}, { timestamps: true });

// Model
const Investment = mongoose.model("Investment", investmentSchema);


// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password || !age) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({ name, email, password, age });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("❌ Error in /signup:", err);
    res.status(500).json({ error: err.message });
  }
});


app.post("/investment", async (req, res) => {
  const { userId, type, amount, riskLevel, monthlyContribution, sectors } = req.body;

  console.log("Incoming investment request:", req.body);

  if (!userId || !amount || !riskLevel) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  try {
    const investment = new Investment({
      userId,
      type,
      amount,
      riskLevel,
      monthlyContribution: monthlyContribution || 0,
      sectors: sectors || [],
    });

    await investment.save();
    res.status(201).json({ message: "Investment saved", investment });
  } catch (err) {
    console.error("❌ Error in /investment:", err);
    res.status(500).json({ error: err.message });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

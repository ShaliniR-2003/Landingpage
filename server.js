const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// 🔗 CONNECT TO MONGODB ATLAS
mongoose.connect("mongodb+srv://ShaliniR:Shalinigowda1805@cluster0.a6wczwb.mongodb.net/landingPageDB?appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 📄 USER SCHEMA
const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

// 📝 SIGNUP API
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const newUser = new User({ email, password });
  await newUser.save();

  res.redirect("/home.html");
});

// 🔐 LOGIN API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {
    res.redirect("/home.html");
  } else {
    res.send("Invalid Email or Password");
  }
});

// 🚀 START SERVER
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
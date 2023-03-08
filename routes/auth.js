const express = require("express");
const { default: mongoose } = require("mongoose");
const userSchema = require("../models/user");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const { Router } = require("express");
const fetchUser = require("../middleware/fetchUser");
var jwt = require("jsonwebtoken");
const JWT_SSECRET = "NikuBhai";
const func = async (email) => {
  var db1 = await userSchema.findOne({ email: email });
  if (db1 == null) {
    return true;
  }
  return false;
};

// Route 1 For Creating User
router.post("/signup", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  let succes = false;
  if (email === "" || name === "" || password === "") {
    res.send({ succes, message: "Invalid details" });
  }

  // For checking dublicate entries
  const db1 = await func(req.body.email);

  if (!db1) {
    res.send({ succes, message: "Email already exist" });
  } else {
    // Salting and Hashing

    const salt = await bcryptjs.genSalt(10);
    const securePass = await bcryptjs.hash(req.body.password, salt);

    // The Json received from Req Should be same As that of userSchema

    // const user1=userSchema(req.body);
    // user1.save();      In this syntax we will save the user in database

    // User Automatically get save  by using .create method
    const user = await userSchema.create({
      password: securePass,
      email: req.body.email,
      name: req.body.name,
    });
    succes = true;
    res.send({ succes, message: "User Created" });
  }
});

// Route2 for Login

router.post("/login", async (req, res) => {
  console.log("Hiii");
  const { email, password } = req.body;
  let succes = false;
  if (email === "" || password === "") {
    res.send({ succes, message: "Invalid details" });
  }

  // For checking dublicate entries
  const db = await userSchema.findOne({ email: email });

  if (db == null) {
    res.send({ succes, message: "Email doesnt exist " });
  } 
  else {
    const data = {
      user: db._id,
    };
    const jwtData = jwt.sign(data, JWT_SSECRET);

    // This function will check the Password is correct or not
    // This function Automatically handles the salt added into password

    bcryptjs.compare(password, db.password).then((result) => {
      if (result == true) {
        succes = true;
        res.send({ succes, token: jwtData });
        // localStorage.setItem({"auth-token":jwtData});
      } else {
        res.send({ succes, token: "Incorrect Password" });
      }
    });
  }
});
router.post("/getuser", fetchUser, async (req, res) => {
  const db = await userSchema.findById(req.user);
  if (db != null) {
    res.send({ succes: true });
  } else {
    res.send({ succes: false });
  }
});
module.exports = router;

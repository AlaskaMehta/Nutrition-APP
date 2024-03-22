const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//importing models
const userModel = require("./models/userModel");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/Nutri-app")
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.post("/register", (req, res) => {
  let user = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {
      bcrypt.hash(user.password, salt, async (err, hpass) => {
        if (!err) {
          user.password = hpass;
          try {
            let doc = await userModel.create(user);
            res.status(201).send({ message: "user registered" });
          } catch (err) {
            console.log(err);
            res.status(500).send({ message: "some problem occured" });
          }
        }
      });
    }
  });
});

app.post("/login", async (req, res) => {
  let userCred = req.body;
  try {
    const user = await userModel.findOne({ email: userCred.email });
    if (user !== null) {
      bcrypt.compare(userCred.password, user.password, (err, success) => {
        if (success === true) {
          res.send({ message: "Login Success" });
        } else {
          res.status(403).send({ message: "Incorrect Password" });
        }
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Some problem" });
  }
});

app.listen(8000, () => {
  console.log("server started");
});

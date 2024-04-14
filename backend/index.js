const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//importing models
const userModel = require("./models/userModel");
const foodModel = require("./models/foodModels");
const trackingModel = require("./models/trackingModel");
const verifyToken = require("./middleware/verifyToken");
const app = express();

const cors = require("cors");
mongoose
  .connect("mongodb://localhost:27017/Nutri-app")
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  let user = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {
      bcrypt.hash(user.password, salt, async (err, hpass) => {
        if (!err) {
          user.password = hpass;
          try {
            let doc = await userModel.create(user);
            res.status(201).send({ message: "User Registered" });
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
          jwt.sign({ email: userCred.email }, "nutrikey", (err, token) => {
            if (!err) {
              res.send({ message: "Login Success", token: token });
            }
          });
          // res.send({ message: "Login Success" });
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

app.use(express.json());
//creating the food items
app.post("/foodsItem", (req, res) => {
  let food = req.body;
  foodModel
    .create(food)
    .then((doc) => {
      res.send({ data: doc, message: "food added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "some error occured" });
    });
});

// below endpoints must be accessed only with the token
app.get("/foods", verifyToken, async (req, res) => {
  try {
    let foods = await foodModel.find();
    res.send(foods);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Some Problem while getting info" });
  }
});

//endpoint to search food by name

app.get("/foods/:name", verifyToken, async (req, res) => {
  try {
    let foods = await foodModel.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    if (foods.length !== 0) {
      res.send(foods);
    } else {
      res.status(404).send({ message: "Food Item Not Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "some problem occurred" });
  }
});

app.post("/track", verifyToken, async (req, res) => {
  let trackBody = req.body;
  try {
    let track = await trackingModel.create(trackBody);
    res.status(201).send({ message: "Food Added" });
  } catch (err) {
    console.log(err);
    res.status(403).send({ message: "Some problem in getting the food data" });
  }
});

//endpoint to fetch all foods eaten by a person
app.get("/track/:userid/:date", verifyToken, async (req, res) => {
  let userId = req.params.userid;
  let date = new Date(req.params.date).toISOString().slice(0, 10);
  console.log(date);

  try {
    let foods = await trackingModel
      .find({ userID: userId, dateSchema: date })
      .populate("userID")
      .populate("foodID");
    res.send(foods);
  } catch (err) {
    console.log(err);
    res.status(403).send({ message: "Some problem in getting the food data" });
  }
});

app.listen(8000, () => {
  console.log("server started");
});

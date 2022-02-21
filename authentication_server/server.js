const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

mongoose.connect("mongodb://localhost:27017/agile_sprint_planner_user_db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const secretKey = "hfdsahgjkhfvsdaljgdisajg23452asgasg";

app.post("/signup", (req, res) => {
    let newUser = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    newUser.save((err) => {
      if (err) {
        return res.status(400).json({
          title: "error",
          error: "username in use",
        });
      }
      return res.status(200).json({
        title: "signup success",
      });
    });
  });

app.post("/login", (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err)
          return res.status(500).json({
            title: "server error",
            error: err,
          });
        if (!user)
          return res.status(401).json({
            title: "user not found",
            error: "invalid creditentials",
          });
        if (!bcrypt.compareSync(req.body.password, user.password))
            return res.status(401).json({
              title: "login failed",
              error: "invalid creditentials",
            });
        let token = jwt.sign({ userId: user._id }, secretKey);
        return res.status(200).json({
            title: "login successful",
            token: token,
        });
      });
  });


app.listen(5000, function () {
    console.log(`Listening on port ${ this.address().port}`)
});
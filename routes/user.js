const express = require('express');
const app = express();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;


app.get('/signup',(req,res,next)=>{
    res.render('signup',{layout:"login-main"})
});

app.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
  
  User.findOne({ "username": username })
  .then(user => {
    if (user !== null) {
        res.render("signup", {
          errorMessage: "The username already exists!"
        });
        return;
      }
      if (username === "" || password === "") {
        res.render("signup", {
          errorMessage: "Indicate a username and a password to sign up"
        });
        return;
      }
  
      User.create({
        username,
        password: hashPass
      })
      .then(() => {
        res.redirect("/");
      })
      .catch(error => {
        console.log(error);
      })
  })
  .catch(error => {
    next(error);
  })
  });

module.exports = app;
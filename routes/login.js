const express = require('express');
const app = express();
const User = require('../model/user');
const bcrypt = require('bcrypt');



app.get("/", (req, res, next) => {
    res.render("login" ,{layout: "login-main"});
  });

  app.get('/logout',(req,res) =>{
    //clearcookie('login)
    req.session.destroy((err)=>{
      if(err) res.redirect('/')
      else res.redirect('/')
    })
  })


app.post("/", (req, res, next) => {
    const theUsername = req.body.username;
    const thePassword = req.body.password;
  
    if (theUsername === "" || thePassword === "") {
      res.render("login",{
        errorMessage: "Please enter both, username and password to sign up."
      });
      return;
    }
  
    User.findOne({ "username": theUsername })
    .then(user => {
        if (!user) {
          res.render("login", {
            errorMessage: "The username doesn't exist."
          });
          return;
        }
        if (bcrypt.compareSync(thePassword, user.password)) {
          // Save the login in the session!
          req.session.currentUser = user;
          res.redirect("/home");
        } else {
          res.render("login", {
            errorMessage: "Incorrect password"
          });
        }
    })
    .catch(error => {
      next(error);
    })
  });


  module.exports = app;
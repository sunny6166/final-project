const express =require('express');
const app = express();
const mongoose = require('mongoose');
const Doctor = require("../model/doctor")

app.get('/home', (req, res, next) => {
      res.render('home',{layout:'main'})
   });
  
  module.exports = app;
  
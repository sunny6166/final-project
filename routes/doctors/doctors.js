const express =require('express');
const app = express();
const Doctor = require('../../model/doctor')
const mongoose = require('mongoose');

app.get('/doctors', (req, res, next) => {
   Doctor.find({},(err,result)=>{
       res.render('doctors',{doctors:result})
   })
});


 
  module.exports = app;
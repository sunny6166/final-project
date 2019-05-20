const express =require('express');
const app = express();
const Patient = require('../../model/patient')


app.get('/patients', (req, res, next) => {
    Patient.find({})
    .populate('doctors')
    .then((result)=>{
        res.render('patients',{patients : result})
    })
});
  
  module.exports = app;
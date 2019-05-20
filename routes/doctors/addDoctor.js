const express =require('express');
const app = express();
const Doctor = require('../../model/doctor')
const mongoose = require('mongoose');


app.get('/addDoctor',(req,res)=>{
    res.render('addDoctor')
})


app.post('/doctors',(req,res)=>{
    let newDoctor ={
        name : req.body.name,
        specialist : req.body.specialist,
        contact : req.body.contact
    }


Doctor.create(newDoctor,(err) => {
    if(err)res.send('error! doctor not added')
    else res.redirect('/doctors')
})

})

module.exports = app;
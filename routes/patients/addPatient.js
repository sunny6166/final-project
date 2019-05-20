const express  = require('express');
const app = express();
const Patient = require('../../model/patient')
const mongoose = require('mongoose')
const Doctor = require('../../model/doctor')

// some change


app.get('/addPatient',(req,res) =>{
    Doctor.find({},(err,result) =>{
        res.render('addPatient',{doctors:result})
})
})

app.post('/patients',(req,res) =>{
     if(Array.isArray(req.body.doctors)) {
         var doctorsId = req.body.doctors.map((id)=>{
             return mongoose.Types.ObjectId(id)
         })
     } else {var doctorsId = [mongoose.Types.ObjectId(req.body.doctors)]
    
    
    }


       var newPatient = {
        name :    req.body.name,
        disease : req.body.disease,
        contact : req.body.contact,
        doctors : doctorsId
    }

    Patient.create(newPatient,(err) => {
        
        if(err)res.send('error! patient not added')
    else res.redirect('/patients')
    })
})


module.exports = app;
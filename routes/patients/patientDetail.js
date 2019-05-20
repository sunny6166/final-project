const express = require('express')
const app = express();
const Patient = require('../../model/patient')
const mongoose = require('mongoose')



app.get('/patientDetails',(req,res) =>{
    let objectId = mongoose.Types.ObjectId(req.query.id)
    Patient.find({_id : objectId},(err,result)=>{
        res.render('patientDetails',{'patients' : result[0]})
    })
})



app.post("/patupdate", (req,res)=> {
    let updateValues = {
        name: req.body.name,
        disease:req.body.disease,
        contact: req.body.contact,
    }
    let objectId =mongoose.Types.ObjectId(req.body.id)
    Patient.updateOne({_id: objectId}, updateValues, (err)=> {
        if(err) res.status(500).send("An error has occured, so sorry")
        else res.redirect("/patients")
    })
})

module.exports = app;
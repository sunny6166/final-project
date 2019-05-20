const express = require('express')
const app = express()
const Patient = require('../../model/patient')
const mongoose = require('mongoose')


app.get("/patdel", (req, res)=> {
    let objectId = mongoose.Types.ObjectId(req.query.id)
    Patient.deleteOne({_id: objectId}, (err)=> {
        if(err) res.status(500).send("doctor was not deleted. Error.")
        else res.redirect("/patients")
    })
})

module.exports = app;
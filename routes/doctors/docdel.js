const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Doctor = require('../../model/doctor');


app.get("/docdel", (req, res)=> {
    let objectId = mongoose.Types.ObjectId(req.query.id)
    Doctor.deleteOne({_id: objectId}, (err)=> {
        if(err) res.status(500).send("doctor was not deleted. Error.")
        else res.redirect("/doctors")
    })
})

module.exports = app;
const express =require('express')
const app = express();
const Doctor = require('../../model/doctor')
const mongoose = require('mongoose')


app.get("/detail", (req, res) => {
    var objectId = mongoose.Types.ObjectId(req.query.id);
    Doctor.find({_id : objectId}, (err, result) => {
     res.render('details',{'doctors': result[0]})
   })
 })


app.post("/docupdate", (req,res)=> {
    let updateValues = {
        name: req.body.name,
        specialist:req.body.specialist,
        contact: req.body.contact,
    }
    let objectId =mongoose.Types.ObjectId(req.body.id)
    Doctor.updateOne({_id: objectId}, updateValues, (err)=> {
        if(err) res.status(500).send("An error has occured, so sorry")
        else res.redirect("/doctors")
    })
})


 module.exports = app;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    name: String,
    disease: String,
    contact:Number,
    doctors : [{type:mongoose.Schema.Types.ObjectId, ref :'doctors'}]
  });
  
  const App = mongoose.model("patients", PatientSchema);
  
  module.exports = App;
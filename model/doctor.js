const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const doctorSchema = new Schema({
    name: String,
    specialist: String,
    contact:Number,
    patients :[{type:mongoose.Schema.Types.ObjectId, ref :'patients'}]
  });
  
  const App = mongoose.model("doctors", doctorSchema);
  
  module.exports = App;
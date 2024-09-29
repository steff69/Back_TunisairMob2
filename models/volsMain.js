const mongoose = require('mongoose');

const voleSchema= new mongoose.Schema({
    
    fm: {type: String, required: true},
    to: {type: String, required: true},
    date:{type:String},
    time:{type:String},


    
   
});


    
module.exports = mongoose.model( 'vole' ,voleSchema )
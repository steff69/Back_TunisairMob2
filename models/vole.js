const mongoose = require('mongoose');

const voleSchema= new mongoose.Schema({
    
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
   
});

const setImageUrl = (doc) => {
    
      const imageCoverUrl = `${process.env.BASE_URL}/voles/${doc.image}`;
      doc.image = imageCoverUrl;
    
    
  };
  voleSchema.post('init', (doc) => {
    setImageUrl(doc);
    
  });
voleSchema.post('save', (doc) => {
    setImageUrl(doc);
    
  });
    
module.exports = mongoose.model( 'place' ,voleSchema )
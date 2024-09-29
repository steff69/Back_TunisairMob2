

const Vole = require('../models/vole');
const sharp = require('sharp');

const {uploadMixOfImages} = require('../middlewares/uploadImageMiddleware');


module.exports={

    uploadProductImages : uploadMixOfImages([
        {
          name: 'image',
          maxCount: 1,
        },
      
      ]),
      
     esizeProductImages : async (req, res, next) => {
        // console.log(req.files);
        //1- Image processing for image
        if (req.files.image) {
          const imageFileName = `voles-${Date.now()}-cover.jpeg`;
      
          await sharp(req.files.image[0].buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/voles/${imageFileName}`);
      
          // Save image into our db
          req.body.image = imageFileName;
        }
        //2- Image processing for images
        
        next();
      },

addVole: async ( req,res )=>{


    const {name, description, image}= req.body;

          
             
            
             
             try {
                


                const newVole =new Vole( req.body)  ;
                await newVole.save()                  
                    res.status(201).json({ status: false, message: "Vole has been successfully ad" })
                   
             }
             catch (error) {

       res.status(500).json({status:false, message: error.message});

             }
},
getVoleById : async ( req,res )=>{
   const id =req.params.id ;


   try {


    const Vole = await Vole.findById(id) ;
                   
        res.status(200).json(Vole)
       
 }
 catch (error) {

res.status(500).json({status:false, message: error.message});

 }

},




searchVole : async ( req,res )=>{

    
    const search =req.params.search ;

       let query ;


    try {
 // const results = await Vole.aggregate([{$search:{ index:'Voles', text:{ query:search, path : {wildcard : "*"}}}},
        // ]);


         query = { name: { $regex: search, $options: 'i' } };
        
         const results = await Vole.find(query)

         if (results.length >0)
          {  res.status(200).json(results);}else{
            res.status(201).json(results)
          }
           
     }
     catch (error) {
    
    res.status(500).json({status:false, message: error.message});
    
     }

},

getAllVole: async ( req,res )=>{


   
    try {

        

       
        const Voles = await Vole.find({});
     
     
     
    
     
     
     
         res.status(200).json({ Result:Voles.length,data:Voles});
        
  }
  catch (error) {
 
 res.status(500).json({status:false, message: error.message});
 
  }

},


}
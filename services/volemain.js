

const Vole = require('../models/volsMain');



module.exports={

   

addVoleMain: async ( req,res )=>{


    const {fm, to, date,time}= req.body;

          
             
            
             
             try {
                


                const newVole =new Vole( req.body)  ;
                await newVole.save()                  
                    res.status(201).json({ status: false, message: "VoleMain has been successfully ad" })
                   
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





getAllVoleMain: async ( req, res )=>{


   
    

        
        try {
           
            const {fm,to} = req.params
            var Voles;
    console.log(req.params)
            // Find all users that match the query
         
            if (fm && to) {
                Voles = await Vole.find({
                    fm: { $regex: new RegExp(fm, "i") },  // Case-insensitive match for fm
                    to: { $regex: new RegExp(to, "i") }   // Case-insensitive match for to
                });
            }
 
          
    
        
            res.status(200).send(Voles);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
       
     
     
     
     
    
     
     
     
        
        
  }
 


}




const User = require('../models/user');
const bcrypt = require('bcryptjs');



module.exports ={

getUser : async (req,res)=>{
    try {

    const user = await User.findById(req.user.id)

       const {password , __v , createdAt , ...userData } = user.doc;

         res.status(201).json({ status: true, data: userData });

       }
   catch (error) {
       res.status(500).json({status:false, message: error.message});
    }
   



},
getallUser : async (req,res)=>{
    try {

    const user = await User.find({})

       

         res.status(200).json({ status: true, data: user });

       }
   catch (error) {
       res.status(500).json({status:false, message: error.message});
    }},

verifyAccount: async (req , res)=>{

    const otp =  req.params.otp;
   


    try {

    
         const category = await Category.findById(id) 

        res.status(200).json(category);
      
      }

   catch (error) {
       res.status(500).json({status:false, message: error.message});
    }
   



},
updateUser : async(req , res)=>{

    const userId = req.params.id;
    var updatedData = req.body;  // Get updated user data from request body
     updatedData.password = await bcrypt.hash(req.body.password,12);


     console.log(updatedData)
    try {
        // Find user by ID and update the user with new data
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
            new: true,  // Return the updated document
            runValidators: true,  // Ensure the updated data adheres to the model's schema
        });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the updated user data in response
        res.json(updatedUser);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Error updating user', error });
    }
}

}
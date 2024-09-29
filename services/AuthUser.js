



const User = require('../models/user');
const generateOtp = require('../utils/otp_generator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

module.exports ={

CreateUser : async (req,res)=>{


    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
     
     if(!emailRegex.test(req.body.email) )
    {
       return  res.status(400).json({ message: "email is not valid" });

    }
    const minPasswordLength = 8;
    if(req.body.password<minPasswordLength)
    {
        return  res.status(400).json({ message: "Password is short" });

    }


    try {

        const EmailExsits = await User.findOne({email:req.body.email});

        if(EmailExsits)
          {
            return  res.status(400).json({ message: "Email already exists" });

          }
        

        const newpassword = await bcrypt.hash(req.body.password,12);

        const newUser =new User(
          {  username : req.body.username,
            email : req.body.email,
            password : newpassword,
            otp : "123456"}


        );
        await newUser.save();


       




         res.status(200).json({ status: true, message: "user Created successfully" });

       }
   catch (error) {
       res.status(500).json({status:false, message: error.message});
    }
   



},
loginUser: async (req , res)=>{

   
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

     
     if(!emailRegex.test(req.body.email) )
    {
       return  res.status(400).json({ message: "email is not valid" });

    }
    const minPasswordLength = 8;
    if(req.body.password.length<minPasswordLength)
    {
        return  res.status(400).json({ message: "Password is short" });

    }


    try {

        const user = await User.findOne({email:req.body.email});

        if(!user  )
          {
            return  res.status(400).json({ message: "Account is not exist" });

          }

          if( !(await bcrypt.compare(req.body.password, user.password)))
            { return  res.status(400).json({ message: "password is wrong" });}

     const token = await createToken(user._id)

       user1= {...user._doc , token}

      res.status(200).json({status:true , user1})

      }

   catch (error) {
       res.status(500).json({status:false, message: error.message});
    }
   



},
getAllCategory:  async (req,res)=>{
  
try {


  const  allCategorys = await Category.find({title : {$ne:"More"}}, {__v:0})



    res.status(200).json({  Result:allCategorys.length,data:allCategorys});

}
    
    catch (error) {


       res.status(500).json({status:false, message: error.message});

    }



},
getRandomCategory:  async (req,res)=>{


    
try {
  
  let randomCategory= await Category.aggregate([{$match: {value:{$ne:"more"}}},
         {$sample: {size:4}}]);

  





    res.status(200).json(randomCategory);

}
    
    catch (error) {


       res.status(500).json({status:false, message: error.message});

    }



},

}
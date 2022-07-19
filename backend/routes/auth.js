const router=require('express').Router();
const User=require('../models/User');
const bcrypt =require('bcrypt');
const generateToken= require('../utils/generateToken')

router.post('/register',async(req,res)=>{
    console.log("body",req.body);
  
    try {
        // generate hashed password

        const salt= await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        // create new user

        const newUser= new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword,
            profilePicture:req.body.profilePicture
        });

        // save user and return response

        const user= await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
   
})

router.post('/login',async(req,res)=>{
  
        const user= await User.findOne({ email:req.body.email,})

        if(user && (await bcrypt.compare(req.body.password,user.password))){

            const token= generateToken(user._id)
            console.log("token",token);
            console.log("us",user);
           
            res.status(200).json({user,token})

        }else{
            res.status(400).json("Invalid email or password")
          
        }
  
    }
)

module.exports=router;
const router=require('express').Router();
const User=require('../models/User')
const bcrypt=require('bcrypt')
const { verifyToken } = require('../middlewares/SessionCheck');
// update a user

router.put('/:id',async(req,res)=>{
   if(req.body.userId===req.params.id || req.body.isAdmin){
    if(req.body.password){
        try {
            const salt = await bcrypt.genSalt(10)
            req.body.password= bcrypt.hash(req.body.password,salt)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    try {
        const user= await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        })
        res.status(200).json("Account has been updated")
    } catch (error) {
        return res.status(500).json(error)
    }
   }else{
    return res.status(403).json("you can update only your account")
   }
})

// delete a user


router.delete('/:id',async(req,res)=>{
    if(req.body.userId===req.params.id  || req.body.isAdmin){
        try {
            const user= await User.findByIdAndDelete(req.params.id)
            return res.status(200).json("account deleted")
        } catch (error) {
            return res.status(500).json(error)
        }
       
    }else{
    return res.status(403).json("you can delete only your account")
   }
})

// find a user

router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });
// follow a user

router.put('/:id/follow', verifyToken, async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try {
            const user= await User.findById(req.params.id)
            const currentUser= await User.findById(req.body.userId)
                 if(!user.followers.includes(req.body.userId)){
                   await user.updateOne({$push:{followers: req.body.userId}})
                   await currentUser.updateOne({$push: {following: req.params.id}})
                   const updatedUser=  await User.findById(req.body.userId)
                    res.status(200).json(updatedUser)
                 }else{
                    res.status(403).json("you already follow this user")

                 }
                 } catch (error) {
            res.status(500).json(error)
        }

    }else{
        res.status(403).json("you cannot follow yourself")
    }
})

// unfollow a user

router.put('/:id/unfollow', verifyToken, async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try {
            const user= await User.findById(req.params.id)
            const currentUser= await User.findById(req.body.userId)
                 if(user.followers.includes(req.body.userId)){
                      await user.updateOne({$pull:{followers: req.body.userId}})
                  await currentUser.updateOne({$pull: {following: req.params.id}})
                  const updatedUser=  await User.findById(req.body.userId)
                    res.status(200).json( updatedUser)
                 }else{
                    res.status(403).json("you dont follow this user")

                 }
                 } catch (error) {
            res.status(500).json(error)
        }

    }else{
        res.status(403).json("you cannot unfollow yourself")
    }
})

// get friends list

router.get('/friends/:userId', verifyToken, async(req,res)=>{
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.following.map((friendId)=>{
                return User.findById(friendId)
            })
        );
        let friendsList= []
        friends.map((friend)=>{
            const {_id, username, profilePicture}= friend ;
            friendsList.push({_id, username, profilePicture})
        })
        res.status(200).json(friendsList)
    } catch (error) {
        res.status(500).json(error)
    }
})

// update a user info

router.get('/edituserinfo/:userId', verifyToken, async(req,res)=>{
    console.log("pooooo",req.params.userId);
    try {
        const user = await  User.findOne({_id:req.params.userId})
        
            res.status(200).json(user) 
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
    
 
})

router.patch('/updateusername', verifyToken, async(req,res)=>{
    console.log("body");
    const {username, userId} = req.body
    console.log('haiii ',username,userId);
  try {
 const user =   await User.findByIdAndUpdate(userId,{
        username: username
     }
        ,{
            new:true,
        })
        const updatedUser=  await User.findById(userId)
        console.log("updat",updatedUser);
            res.status(200).json(updatedUser)
        
    
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
    
})

 router.patch('/updatepassword', verifyToken, async(req,res)=>{
    const {password, newpassword, userId} = req.body
     console.log("amal",password,newpassword,userId);
    
         let user =await User.findOne({ _id: userId })
         console.log("user",user);
         if (user) {
             bcrypt.compare(password, user.password).then(async(status) => {
                 if (status) {
                    const salt= await bcrypt.genSalt(10)
                    console.log("salt",salt);
                 const   newPassword = await bcrypt.hash(newpassword, salt)
                 console.log("newpas",newPassword);
                await  User.findByIdAndUpdate(userId , 
                          {
                             password: newPassword
                         },{
                            new:true,
                        }
                     ).then((response) => {
                         if (response) {
                             res.status(200).json("Password changed")
                         } else {
                             console.log("error");
                             res.status(500).json("Password not updated")
                         }
                     })
 
                 } else {
                     res.status(400).json("Please enter the current Password properly")
                 }
 
             })
         }
  
 }) 

 //get friends
router.get("/friends/:userId",verifyToken, async (req, res) => {
    console.log("para",req.params);
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.followings.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
  });

   // update profile pic

   router.patch('/updateprofilePicture', async(req,res)=>{
    console.log("body");
    const {image, userId} = req.body
    console.log('haiii ',image,userId);
  try {
 const user =   await User.findByIdAndUpdate(userId,{
        profilePicture: image
     }
        ,{
            new:true,
        })
        const updatedUser=  await User.findById(userId)
        console.log("updat",updatedUser);
            res.status(200).json(updatedUser)
        
    
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
    
})

module.exports=router;
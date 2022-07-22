const router=require('express').Router();
const { verifyToken } = require('../middlewares/SessionCheck');
const Post=require('../models/Post');
const User = require('../models/User');


// create a post

router.post('/', verifyToken, async(req,res)=>{

    const post= await new Post(req.body)
    try {
        const savedPost= await post.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
  
})

// update a post

router.put('/:id',async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId==req.body.userId){

            await post.updateOne({$set:req.body});
            res.status(200).json("the post has been updated")
      
        }else{
          res.status(403).json("you can only update your post")
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
 
})

// delete a post

router.delete('/:id', verifyToken, async(req,res)=>{
    try {
        const post= await Post.findById(req.params.id)
        if(post.userId===req.body.userId){
            await post.deleteOne()
            res.status(200).json("deleted successfully")
        }else{
            res.status(403).json("you can only delete your post")
        }
    } catch (error) {
        res.status(500).json(error)
    }
   
})

// like a post

router.put('/:id/like',  async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json("the post has been liked")
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("the post has been disliked")
        }

    } catch (error) {
        res.status(500).json(error)
    }
})

 // get a post

 router.get('/:id',async(req,res)=>{
       
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
        
    }
 })

 // get timeline posts

 router.get("/timeline/:userId",verifyToken,async(req,res)=>{
    try {
        const currentUser= await User.findById(req.params.userId);
        const userPosts= await Post.find({userId:currentUser._id});
        const friendPosts= await Promise.all(
            currentUser.following.map((friendId)=>{
              return Post.find({userId:friendId});
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err)
        
    }
})

 // get user all posts

 router.get("/profile/:username",verifyToken, async(req,res)=>{
    try {
       const user = await User.findOne({username:req.params.username})
       const posts = await Post.find({userId:user._id})
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err)
        
    }
})

// update a post

router.get('/editpost/:postId',verifyToken, async(req,res)=>{
    console.log("pooooo",req.params.postId);
    try {
        const post = await  Post.findOne({_id:req.params.postId})
        
            res.status(200).json(post) 
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
    
 
})

router.patch('/updatepost',verifyToken, async(req,res)=>{
    console.log("body");
    const {desc,postId} = req.body
    console.log('haiii post',desc,postId);
  try {
 const post =   await Post.findByIdAndUpdate(postId,{
        desc: desc
     }
        ,{
            new:true,
        })
            res.status(200).json(post)
        
    
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
    
})

router.patch('/comment',async(req,res)=>{
    console.log("body",req.body);
    const {...comment} = req.body
    await Post.findByIdAndUpdate(req.body.postId,{
        $push:{
            comments:comment
            
        }

    },
    {
        new:true
    }
    )
    .populate("comments.postedBy", "_id username")
    .populate("postedBy", "_id username")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.status(200).json(result)
        }
    })

})

// delete a post

// router.delete('/deletepost', async (req, res) => {
//     console.log("jjj",req.body);
//     const postId = req.body.postId
//     try {
//       const post = await Post.findById({_id:postId});
//       await post.remove();
//       res.json({});
//     } catch (error) {
//       res.json(error);
//     }
//   });

  router.delete('/deletePost/:postId', async (req,res)=>{
    console.log("boo",req.params.postId);
    const postId = req.params.postId
    try {
      const post = await Post.findOne({_id:postId});
      console.log(post,"ggg");
      await post.deleteOne()
      res.json({});
    } catch (error) {
      res.json(error);
    }
  })

module.exports=router;
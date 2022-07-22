const router=require('express').Router();
const { verifyToken } = require('../middlewares/SessionCheck');
const Message=require('../models/Message');

// add 

router.post('/',async(req,res)=>{
    const newMessage = new Message(req.body)
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }
})


// get a message 

router.get('/:conversationId',async(req,res)=>{
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(messages)
    } catch (error) {
        res.send(500).json(error)
    }
})




module.exports= router;
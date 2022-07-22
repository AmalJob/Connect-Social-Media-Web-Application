const express=require('express');
const app= express();
const mongoose=require('mongoose')
const helmet=require('helmet')
const dotenv=require('dotenv')
const morgan=require('morgan')
const userRoute=require('./routes/users')
const authRoute=require('./routes/auth')
const postRoute=require('./routes/posts')
const conversationRoute=require('./routes/conversations')
const messageRoute=require('./routes/messages')
const multer = require('multer')
const path = require('path')
dotenv.config()

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true, useUnifiedTopology:true},()=>{
    console.log("Connected to mongodb");
});

app.use('/images', express.static(path.join(__dirname, 'public/images')))

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

const storage= multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/images");
    },
    filename: (req,file,cb) =>{
        cb(null, req.body.name);
        console.log(req.body);
    }
    
})

var upload = multer({
    storage: storage
});

app.post('/api/upload', upload.single('file'),(req,res)=>{
    try {
        return res.status(200).json("File uploaded successfully")
    } catch (error) {
        console.log(error);
    }
})

app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)
app.use('/api/conversations',conversationRoute)
app.use('/api/messages',messageRoute)

app.get('/',(req,res)=>{
 res.send("welcome")
})

app.listen(7000, ()=>{
    console.log("backend is running");
})
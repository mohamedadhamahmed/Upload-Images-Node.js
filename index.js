const express=require('express');
const app=express();
const mongoose=require('mongoose')
const http = require('http');
const server = http.createServer(app)
const User=require("./routes/user.js");
var path=require('path');
const multer = require("multer");



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
   // cb(null, file.originalname + '-' + Date.now())
   cb(null, file.originalname )
  }
})

const filter=(req,file,cb)=>{
  if(file.mimetype== 'image/jpeg'  || file.mimetype== 'image/png')
  {
    cb(null ,true)
  }
  else{
    cb(null ,false)

  }
}
var upload = multer({ storage: storage ,fileFilter:filter})





mongoose.connect('mongodb://localhost/lwaaeltlaba', {
  useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
      console.log("connected to database........")
  }).catch((e)=>{
     console.log(e) 
  });



  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
      console.log('Dejo pasar Cors');
    } else {
      return next();
    }
  });




app.use([express.urlencoded({extended :true}),express.json(), upload.single('image')])

app.use('/create_user',User)

app .use("/uploads",express.static('uploads'))

app.use('*',(req,res,next)=>{
  res.status(404).json({
    status:false,
    message:"page not found"
  })
})

  const port=process.env.port||5000
  // server.listen(port)
  server.listen(port, () => {
    console.log("Live Streaming Project On localhost:5000");
  })
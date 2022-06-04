 const User = require("../model/user");
// const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();





  router.post('/', (req, res,next) => {
  new User({
    name: req.body.name,
    age:req.body.age,
    image:req.file.path

  }).save().then(result =>{
    res.json({
      message:"Emp is inserted",
      name:result.name,
      age:result.age,
      image:result.image
    })
  }).catch(err =>{
    res.json({
      message : err.message
    })
  })

  })




module.exports = router;

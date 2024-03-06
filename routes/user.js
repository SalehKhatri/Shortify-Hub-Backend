const express=require('express');
const { body} = require("express-validator");
const {authUser}=require("../middleware/authUser")
const {handleUserSignUp, handleUserSignIN, getUser}=require("../controllers/user")

const router=express.Router();

router.post('/signup',
[
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }), //Validation the data to be entered in db with help of express validator package
]
,handleUserSignUp);

router.post('/login',
[
  body("email").isEmail(),
  body("password", "Cannot be blank").exists(), //Validation the data to be entered in db with help of express validator package
]
,handleUserSignIN)

router.post('/getUser',authUser,getUser)

module.exports=router;
const express = require('express');
const router=express.Router();
const userlogin=require('../controller/login');

router.post("/signUp", userlogin.Signup);
router.post("/signIn", userlogin.LoginUser);
router.post("/forgot-password", userlogin.forgotPassword);
router.put("/reset-password/:token", userlogin.resetPassword);


module.exports=router;
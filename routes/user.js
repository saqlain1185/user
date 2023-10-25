const express = require('express');
const router=express.Router();
const user=require('../controller/user');

router.get("/getAllData", user.getAlldata);
router.post("/createuser", user.createdata);
router.get("/getDataByid/:id", user.getById);
router.get("/getDataByName/:name", user.getByName);
router.get("/getDataByPhoneNumber/:phoneNumber", user.getByPhoneNumber);
router.get("/getDataByCnic/:cnic", user.getByCnic);
router.get("/getUsersByAge", user.getUsersByAge);
router.delete("/deleteDataByid/:id", user.deleteById);
router.put("/updateDataByid/:id", user.updateById);

module.exports=router;
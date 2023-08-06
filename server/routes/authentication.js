const express = require('express');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post("/register", async (req,res)   => {
    try{
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({status:true, user});
    }catch(error){
        console.log(error);
        res.status(400).json({status:false, error})
    }
});

router.post("/login", async (req,res) => {
    try{
        const user = await User.findOne({email:req.body.email, password:req.body.password});
        console.log("user login", user);
        if(user){
            const jwtToken = jwt.sign({
                name: user.name,
                email: user.email,
            }, process.env.JWT_ACCESS_TOKEN_SECRET);
            return res.status(200).json({status: true, user, token: jwtToken});
        }else{
            return res.status(400).json({status: false, error:'user does not exist in our system'});
        }
    }catch(error){
        console.log(error);
        res.status(400).json({status:false, error})
    }
});

module.exports = router;
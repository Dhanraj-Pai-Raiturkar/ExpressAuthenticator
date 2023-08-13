const express = require('express');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const queryString = require('querystring');
const axios = require('axios');
const router = express.Router();

const refershTokenList = [];

const generateAccessToken = (user) => {
    const accessToken = jwt.sign({
        name: user.name,
        email: user.email,
    }, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY
    });
    return accessToken;
}

const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign({
        name: user.name,
        email: user.email,
    }, process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY
    });
    return refreshToken;
}

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
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            refershTokenList.push(refreshToken);
            return res.status(200).json({status: true, user, token: accessToken, refresh: refreshToken});
        }else{
            return res.status(400).json({status: false, error:'user does not exist in our system'});
        }
    }catch(error){
        console.log(error);
        res.status(400).json({status:false, error})
    }
});

router.post("/refresh", (req, res) => {
    try{
        const refreshToken = req.body.refreshToken;
        const refreshTokenFound = refershTokenList.filter(token => token === refreshToken)
        console.log("======>", refreshTokenFound);
    }catch(error){
        console.log(error);
        res.status(500).json({status: false, message:'INTERNAL SERVER ERROR'});
    }
})

module.exports = router;
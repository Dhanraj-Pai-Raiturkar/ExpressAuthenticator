const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const authenticate = require('../middleware/authenticate');

router.get("/", authenticate, async (req,res) => {
    try{
        console.log(req.query);
        const user = await User.find();
        res.status(200).json({status: true, user});
    }catch(error){
        console.log(error);
        res.status(400).json({status: false, error});
    }
});

module.exports = router;
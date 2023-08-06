const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const authentication = require('./routes/authentication');
const app = express();

app.use(cors());
app.use(bodyParse.urlencoded({extended: false}));
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/ProjectAuthentication');

app.use('/auth', authentication);


app.get("/welcome", (req,res) => {
    res.send("Welcome to express node server");
});

app.get("/api/users", async (req,res) => {
    try{
        console.log(req.query);
        const user = await User.findOne({email:req.query.email, password:req.query.password});
        console.log("user", user);
        res.status(200).json({status: true, user});
    }catch(error){
        console.log(error);
        res.status(400).json({status: false, error});
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
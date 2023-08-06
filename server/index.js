const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const authentication = require('./routes/authentication');
const users = require('./routes/user');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParse.urlencoded({extended: false}));
app.use(express.json());
mongoose.connect(process.env.DB_CONNECTION_STRING);

app.use('/users', users);
app.use('/auth', authentication);

app.get("/", (req,res) => {
    res.send("Welcome to node express server");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
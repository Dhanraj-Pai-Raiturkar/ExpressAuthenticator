const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const jwtVerified = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        req["accessToken"] = token;
        next();
    }catch(error){
        res.status(401).json({status:false, error:'Unauthorized'});
        console.log("error", error);
    }
};

module.exports = authenticate
const asyncHandler= require("express-async-handler");
const jwt=require("jsonwebtoken");

const validateToken= asyncHandler(async (req,res,next)=>{
    let token;
    let authHeader=req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESSTOKEN_SECERT,(err,decoded)=>{
            if (err){
                res.status(401);
                throw new Error("User in not authorize");
            }
            req.user=decoded.user;
          
            next();
        });
        if (!token){
            res.status(401);
            throw new Error("token is missing");
        }
    }
});

module.exports=validateToken;
var jwt=require('jsonwebtoken');
const JWT_SSECRET="NikuBhai";

const fetchUser=(req,res,next)=>{
    authToken=req.header('auth-token');
    if(!authToken)
    {
        res.status(401).send({error:"Please authenticate using valid user "});
    }
    const data=jwt.verify(authToken,JWT_SSECRET);
    req.user=data.user;
    next();        // next is to run the next function from where fetchUser is called 
}
module.exports=fetchUser;
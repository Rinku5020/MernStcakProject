const roleValidator  =(req,res,next)=>{
    console.log(req.user)
    const {role}=req.user
    if(role=="admin"){
        next()
    }
    else{
        return res.status(403).json({message:"you are not admin"})
    }

}
module.exports = roleValidator
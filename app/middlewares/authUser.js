const User=require('../models/Users')
const jwt=require('jsonwebtoken')
require('dotenv').config
const authUser=(req,res,next)=>{
    const token=req.headers.authorization
     if(token)
     {
         const formdata=jwt.verify(token,process.env.key)
         try{
            User.findById(formdata.id)
            .then((user)=>{
                req.user=user
                next()
            })
         }
         catch(e)
         {
            res.status('401').json({ error: e.message })
         }

     }
     else{
         res.json("token must be provide")
     }

}
module.exports=authUser
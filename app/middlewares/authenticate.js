const User=require('../models/Users')
const jwt=require('jsonwebtoken')

require('dotenv').config
const authenticateUser=(req,res,next)=>{
  console.log("req",req.headers)
    const token=req.headers.authorization
    console.log("token",token)
    if(token)
    {
        console.log(process.env.key)
         const formData=jwt.verify(token,process.env.key)
            try
              {
                    User.findById(formData.id)
                       .then((user)=>{
                           req.user=user
                           next()
                       })
                  

              }
              catch(e)
              {
                res.status('401').json({ error: e.message })
                console.log("hi")
              }

    }
     else{
           res.status('401').json({error:"token must be provide"})
          

          
         }



}
module.exports=authenticateUser
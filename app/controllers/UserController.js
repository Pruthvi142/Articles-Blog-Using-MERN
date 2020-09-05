const User=require('../models/Users')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const userCltr={}
userCltr.register=(req,res)=>{
  const body=req.body

  const user=new User(body)
  user.role="user"
 user.profile=req.file.path
 console.log(req.file)
   user.save()
     .then((user)=>{
         res.json(user)
     })
     .catch((err)=>{
         res.json(err)
     })

}
userCltr.login=(req,res)=>{
    const body=req.body
    // console.log(body)
    User.findOne({email:body.email})
        .then((user)=>{
              if(user)  
              { 
                if(user.role=="admin")
                {
                    res.json({errors:"invalid user type"})
                } 
                else
                   {

                   
                bcrypt.compare(body.password,user.password)
                     .then((match)=>{
                         if(match)
                         {
                            const tokenData={
                                id:user._id
                          }   
                          const token=jwt.sign(tokenData,process.env.key,{expiresIn:"1d"})
                          console.log(token)
                           res.json( {token:token}) 
                         }
                         else{
                             res.json({errors:"invalid email or password"})
                         }
                 })
                }
                   
              }  else  {
                res.json({ errors: 'invalid email / password'})
            } 
              

        })
        .catch((err)=>{
            res.json((err))
        })
       

}


userCltr.account=(req,res)=>{
    console.log("account",req.user)
    res.json(req.user)

}
userCltr.list=(req,res)=>{
    User.find()
    .then((user)=>{
        res.json(user)
    })
    .catch((err)=>{
        console.log(err)
    })

}
userCltr.follower=(req,res)=>{
    const id=req.params.id
    User.findByIdAndUpdate(id,{$push:{followers:req.user._id}},{new:true})
       .then((user)=>{
           res.json(user)
       })
       .catch((err)=>{
           res.json(err)
       })
       User.findByIdAndUpdate(req.user._id,{$push:{following:id}},{new:true})
         .then((user)=>{
            //  res.json(user)
         })
         .catch((err)=>{
             res.json(err)
         })

}
userCltr.unfollow=(req,res)=>{
    const id=req.params.id
    User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}},{new:true})
       .then((user)=>{
        res.json(user)
       })
       .catch((err)=>{
           res.json(err)
       })
       User.findByIdAndUpdate(req.user._id,{$pull:{following:id}},{new:true})
         .then((user)=>{
            //  res.json("unfollow the user")
         })

}
module.exports=userCltr
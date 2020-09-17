const User=require('../models/Users')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const nodemailer=require('nodemailer')
const sendgridTransport=require('nodemailer-sendgrid-transport')
const transporter= nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:process.env.api
    }
}))
const userCltr={}
userCltr.register=(req,res)=>{
  const body=req.body

  const user=new User(body)
  user.role="user"
  user.profile=req.file.path
 console.log("req",req.file)

 
 User.find({email:body.email})
   .then((result)=>{
       if(result.length==0)
       {
     
        user.save()
        .then((user)=>{
            transporter.sendMail({
        
                to:user.email,
                from :"articlesblog61@gmail.com",
                subject:"singup successfully",
                html:"<h4> welcome articles blog site</h4>"
   
            })
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })
       }
       else{
           res.json({errors:"email id is already there"})
       }
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

userCltr.forgetpassword=(req,res)=>{
    console.log("body",req.body.email)
 const email=JSON.stringify(req.body)
 console.log("email",email)
 User.findOne({email:req.body.email})
         .then((user)=>{
             console.log("user",user)
             if(user)
               {
                     const formData={
                          id:user._id
                     }
                     const token=jwt.sign(formData,process.env.key,{expiresIn:"1d"})
                     transporter.sendMail({
     
                         to:user.email,
                         from :"articlesblog61@gmail.com",
                         subject:"reset password",
                         html:`<h4> Click on   link to  <a href=http://localhost:3000/users/reset/${token}> click here</a> to reset the password</h4>`
            
                     })
                     res.json("check the mail")
               }
               else{
                   res.json({errors:"invalid email address"})
               }
         })

}
userCltr.newPassword=(req,res)=>{
    const token=req.body.token
    const body=req.body
    const users=new User(body)
    console.log("token",token)
    
    const tokenData=jwt.verify(token,process.env.key)
    console.log("id",tokenData.id)
    User.findById({_id:tokenData.id})
       .then((user)=>{
           if(user)
           {
               user.password=req.body.password
                             user.save()
                                .then((saveduser)=>{
                                    res.json({message:"password reset successfull"})
                                })
                              
               
           
           }
           else
           {
               res.json({errors:"invalid resent link "})
           }
       })


}
module.exports=userCltr
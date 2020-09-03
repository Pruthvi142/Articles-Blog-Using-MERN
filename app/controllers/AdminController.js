const User=require('../models/Users')
const Article=require('../models/Article')
const Comment=require('../models/Comments')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()
AdminCltr={}

AdminCltr.register=(req,res)=>{
    const   body=req.body
    const user=new User(body)
         User.find({role:'admin'})
           .then((users)=>{

             if(users.length==0)
             {
                user.role="admin"
                user.save()
                  .then((resu)=>{
                      res.json(resu)
                  })
                  .catch((err)=>{
                      res.json(err)
                  })
              
             }
             else
             {
                  res.json({errors:"admin already there"})
             }
             
           })
           .catch((err)=>{
               res.json(err)
           })
 
       
        
    } 

AdminCltr.login=(req,res)=>{
    const body =req.body
     const user=new User(body)
    User.findOne({email:body.email})
     .then((user)=>{
         if(user)
         {
             if(user.role=="user")
              {
                  res.json({errors:"invalid user type"})
              }
              else{
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
                          else
                          {
                              res.json({error:"invalid email or password"})
                          }
                      })
                      .catch((err)=>{
                          res.json(err)
                      })
              }
            
         }
         else{
             res.json({errors:"invalid email or password"})
         }

     })
     .catch((err)=>{
         res.json(err)
     })
      


}
AdminCltr.account=(req,res)=>{
      res.json(req.user)
}

AdminCltr.Userdelete= async(req,res)=>{

const id =req.params.id

    await Article.find({userId:id})
    .then((article)=>{
        let art=article
           art.map(ele=>{


Comment.deleteMany({articleId:ele._id,}, function(err, result) {
                          if (err) {
                                   res.send(err);
                            } else { 
                            console.log(result)
                              }
                         });


                         Comment.deleteMany({userId:ele.userId}, function(err, result) {
                             if (err) {
                                      res.send(err);
                               } else { 
                               console.log(result)
                                 }
                            });


           })
})   
   Article.deleteMany({userId:id})
    .then((user)=>{
     console.log
    })
    .catch((err)=>{
        res.json(err)
    })
     User.findByIdAndDelete({_id:id})
       .then((user)=>{
           console.log("dele",user)
           res.json(user)
       })
       .catch((err)=>{
           res.json(err)
       })



}
AdminCltr.ArticleDelete=(req,res)=>{
    const id =req.params.id
    Article.findByIdAndDelete({_id:id})
       .then((article)=>{
            res.json(article)
       })
       .catch((err)=>{
           res.json(err)
       })

}
AdminCltr.CommentDelete=(req,res)=>{
    const id =req.params.id
    const artl=new Article()
    Comment.findOne({_id:id})
     .then((cmt)=>{
          console.log("cmt",cmt)
            
         Article.findByIdAndUpdate({_id:cmt.articleId},{$pull: {comments: {_id: id}}}, {new: true})
          artl.save()
            
    })
    Comment.findByIdAndDelete({_id:id})
     .then((cmmt)=>{
         res.json(cmmt)
     })
     .catch((err)=>{
         res.json(err)
     })

}
module.exports=AdminCltr
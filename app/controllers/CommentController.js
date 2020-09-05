const Comment=require('../models/Comments')
const Article=require('../models/Article')
const CmtCltr={}
CmtCltr.create=async (req,res)=>{
    console.log("req user",req.user)
    const id =req.params.id
    const art=   await Article.findOne({_id:id})
        
    const body=req.body
    const comment=new Comment(body)
     comment.userId=req.user._id
     comment.articleId=art._id
  await comment.save()
       .then((cmt)=>{
        
           
          //  res.json({message:"comment added succesfully"})
       })
       .catch((err)=>{
           res.json(err)
       })
     
     art.comments.push(comment._id)
     


            
      await  art.save()
           .then((arts)=>{
               res.json(arts)
           })
     

}
CmtCltr.list=(req,res)=>{
      Comment.find()
       .then((commt)=>{
           res.json(commt)
       })
       .catch((err)=>{
           res.json(err)
       })
     
}
CmtCltr.delete=(req,res)=>{
    
    const id =req.params.id
    // console.log("id",id)

   
   Comment.findById({_id:id})
    .then((cmt)=>{
        Article.findById({_id:cmt.articleId})
          .then((art)=>{
            art.comments.pull({_id:id})
              
            art.save()
              .then((art)=>{
                // res.json(art)
              })
           
          })
         
      
      
    })
 Comment.findByIdAndDelete({_id:id})
        .then((cmnt)=>{
            cmnt.save()
              res.json(cmnt)
        })
   
      
   
}

   




module.exports=CmtCltr
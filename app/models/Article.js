const {Schema,model}=require('mongoose')
const ArticleSchema=new Schema({
       title:{
           type:String,
           required:true
       },
       body:{
           type:String,
           required:true
       },
       likes:[{type: Schema.Types.ObjectId , ref:'Likes'}],
       comments: [
        {
          type: Schema.Types.ObjectId,
            ref: "Comment",
         
        }
      ],
        userId:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
       
     

},{timestamps:true})
module.exports=model("Article",ArticleSchema)

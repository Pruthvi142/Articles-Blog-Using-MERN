const mongoose=require('mongoose')
const configureDb=()=>{
    mongoose.connect("mongodb://localhost:27017/article1",{useNewUrlParser: true})
     .then(()=>{
         console.log("conneted to Db")
     })
     .catch((err)=>{
         console.log(err)
     })
}
module.exports=configureDb
const express =require('express')
const cors=require('cors')
const configDb=require('./configure/Database')
const routes=require('./configure/Routes')
const app =express()
const port =7000
app.use(cors())
app.use('/uploads',express.static('uploads'))
app.use(express.json())


app.use(routes)


configDb()
app.listen(port,()=>{
    console.log("server running on port",port)
})
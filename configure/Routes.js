const router=require("express").Router()
const authenticateUser=require('../app/middlewares/authenticate')
const AuthUser=require('../app/middlewares/authUser')
const userCltr=require('../app/controllers/UserController')
const myArtCltr=require('../app/controllers/MyArticleController')
const adminCltr=require('../app/controllers/AdminController')
const CmtCltr=require('../app/controllers/CommentController')
const AdminCltr = require("../app/controllers/AdminController")
const ArtLike=require("../app/controllers/LikesController")
const upload=require('../app/middlewares/profilePic')

// Admin Routes 
router.post('/admin/register',adminCltr.register)
router.post('/admin/login',adminCltr.login)
router.get('/admin/account',AuthUser, adminCltr.account)
router.delete('/admin/users/delete/:id',AuthUser,adminCltr.Userdelete)
router.delete('/admin/article/delete/:id',AuthUser,AdminCltr.ArticleDelete)
router.delete('/admin/comment/delete/:id',AuthUser,adminCltr.CommentDelete)

//Users Log nd Reg Routers
router.post('/users/register',  upload.single("profile"),userCltr.register)
router.post('/users/login',userCltr.login)
//unauthorised users Routes
router.get('/users/allusers',userCltr.list)
router.get('/users/articles',myArtCltr.allArticle)
//Authorized user Routes
router.get('/users/account', authenticateUser,userCltr.account)
router.post('/users/articles',authenticateUser,myArtCltr.create)
router.get('/users/myarticles' ,authenticateUser,myArtCltr.list)
router.put('/users/myarticles/:id',authenticateUser,myArtCltr.update)
router.delete('/users/myarticles/:id',authenticateUser,myArtCltr.destory)
router.post('/users/articles/likes/:id',authenticateUser,ArtLike.create)
router.delete('/users/articles/dislikes/:id',authenticateUser ,ArtLike.destory)
router.post('/users/follow/:id',authenticateUser,userCltr.follower)
router.delete('/users/unfollow/:id',authenticateUser,userCltr.unfollow)

// Comments Routes 
router.post('/article/comment/:id', authenticateUser,CmtCltr.create)
router.delete('/article/comment/delete/:id',authenticateUser,CmtCltr.delete)
router.get('/article/comments' ,CmtCltr.list)



// router.get('/users/articles/:id')


module.exports=router
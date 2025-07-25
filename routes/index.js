var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const passport = require('passport');
const upload = require("./multer");


const localStrategy = require("passport-local");
const users = require('./users');
passport.use(new localStrategy(userModel.authenticate()));



router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login' , function(req, res) {
  res.render("login", {error : req.flash('error')});
});


router.get('/book' , function(req,res){
  res.render("book");
})

router.get("/carInsurance" , function(req,res){
  res.render("insurance quote");
})

router.get("/carSelling" , function(req,res){
  res.render("car selling");
})

router.get("/Audi" , function(req,res){
  res.render("Checkout audi");
})

router.get("/Repair" , function(req,res){
  res.render("part repair");
})

router.get("/feed" , isLoggedIn , function(req , res){
  res.render("feed");
})

router.get("/edit/:userId" , async function(req , res){
   let users = await userModel.findOne({_id: req.params.userId})
   res.render("editUser" , {users})
})

router.post('/users/:id', isLoggedIn ,  async (req, res) => {
  const { username, email, name } = req.body;
  let updated =  await userModel.findByIdAndUpdate(req.params.id, { username, email, name } , {new : true});
  res.redirect("/profile");
});


router.post("/delete/:userdId" , async function(req , res){
  const {username , email , name} = req.body;
  let deletedUser = await userModel.findOneAndDelete(req.params.userdId , {username , email , name})
  res.redirect("/")
})

router.get('/profile', isLoggedIn , async function(req, res , next) {
  const user = await userModel.findOne({
    username : req.session.passport.user
  })
  .populate('posts');
  res.render("profile", {user});
});

// router.post("/upload" ,isLoggedIn , upload.single('file'), async   function(req , res , next){
//     if(!req.file){
//       return res.status(404).send("No file were given");
//     }
//     const user = await userModel.findOne({username: req.session.passport.user});
//     const post = await postModel.create({
//       image : req.file.filename,
//       imageText : req.body.filecaption,
//       user: user._id
//     })
//     user.posts.push(post._id);
//     await user.save();
//     res.redirect("/profile");
// })

router.post("/register" , function(req , res){
  var userData = new userModel({
    email : req.body.email,
    username : req.body.username,
    password : req.body.password
  })

  userModel.register(userData , req.body.password)
  .then(function (registeruser){
    passport.authenticate("local")(req , res , function(){
      res.redirect("/profile");
    })
  })

})

router.post("/login" ,passport.authenticate("local" , {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,

}), function(req , res){})

router.get("/logout" , function(req , res , next){
  req.logout(function(err){
    if(err) return next(err);
    res.redirect("/");
  })
})

function isLoggedIn(req , res , next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}
module.exports = router;

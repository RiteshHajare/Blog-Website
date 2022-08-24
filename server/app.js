require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const _ = require('lodash');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require("passport-local");


const app = express();
app.use(bodyParser.json());
app.use(cors());
const nextDay = 1;
app.use(session({
  secret:"someSecret",
  saveUninitialized:true,
  cookie:{maxAge:nextDay},
  resave:false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/blogDBReact");

const blogSchema = new mongoose.Schema({
  title:String,
  content:String
});
const authenticationSchema = new mongoose.Schema({
  name : String,
  username:String,
  password : String,
  title:[],
  content : []
});

authenticationSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("user",blogSchema);

const UserCred = new mongoose.model("usercred",authenticationSchema);

passport.use(UserCred.createStrategy());
passport.serializeUser(UserCred.serializeUser());
passport.deserializeUser(UserCred.deserializeUser());



app.get("/blog",function(req,res){

  User.find({},function(err,blogs){
    if(!err){
      res.send(blogs);
    }
  });

});

app.get("/blog/:username",function(req,res){
  username = req.params.username.trim();
  UserCred.findOne({username},function(err,cred){
    res.send(cred);

  });
})

app.post("/blog/:username",function(req,res){
  title = req.body.title;
  content = req.body.content;
  username = req.params.username.trim();
  UserCred.findOne({username},function(err,cred){
    cred.title.push(title);
    cred.content.push(content);
    cred.save();
  });
});



app.post("/blog",function(req,res){
  title = req.body.title;
  content = req.body.content;
  const oneBlog = new User({
    title:title,
    content:content
  });
  oneBlog.save();
});


app.get("/",function(req,res){
  UserCred.find({},function(err,creds){
    if(!err){
      res.send(creds);

    }
  });
});
app.post('/',function(req,res){
  passport.authenticate("local")(req,res,function(){
    console.log('Authenticated');
    res.send(true);
  });
});


app.post("/register",function(req,res){
    const {name,email,password} = req.body;
    const creds = new UserCred({
      name:name,
      username:email,
    });

    UserCred.register(creds, req.body.password , function(err,user){
      if(err){console.log(err); res.redirect("/register")}
      else{
        passport.authenticate("local")(req,res,function(){
          console.log(req.body);
        })
      }
    })
});


app.listen("3500",(req,res)=>{
  console.log("server running on port 3500");
});

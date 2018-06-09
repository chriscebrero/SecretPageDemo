var express = require("express");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");

app.use(require("express-session")({
    secret: "Rose",
    resave: false,
    saveUninitialized: false
}));

mongoose.connect("mongodb://localhost/auth_demo_app");
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res){
    res.render("home");
})

app.get("/secret", function(req, res){
    res.render("secret");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started!");
})
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
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ================== ROUTES

app.get("/", function(req, res){
    res.render("home");
})

app.get("/secret", function(req, res){
    res.render("secret");
})

// Auth Routes
// Show signup form
app.get("/register", function(req, res){
    res.render("register")
})
//handling user signup
app.post("/register", function(req, res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err)
            res.render("register");
        } 
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});

//LOGIN Routes
// render login form
app.get("/login", function(req, res){
    res.render("login");
});

// POST - login logic
//middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started!");
})
const express = require('express');
var app = new express();
const nodemailer = require('nodemailer');
var flash = require('connect-flash');
const session = require('express-session');
const port = process.env.PORT || 4444;
const nav = [
    {
        link:'/books',
        name:'Books'
    },
    {
        link:'/authors',
        name:'Authors'
    },
    {
        link:'/admin',
        name:'Add a Book'
    },
    {
        link:'/admin1',
        name:'Add an Author'
    },
    {
        link:'/index',
        name:'Login/Signup'
    }
]
const usernav = [
    {
        link:'/books',
        name:'Books'
    },
    {
        link:'/authors',
        name:'Authors'
    },
    {
        link:'/index',
        name:'Login/Signup'
    }
]
const sharingRouter = require('./src/router/sharingRouter.js')(nav,usernav)
const welcomeRouter = require('./src/router/welcomeRouter.js')(nav,usernav)
//const homeRouter = require('./src/router/homeRouter.js')(nav)
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(express.urlencoded({extended:true}));
app.use(express.static("./public"));
app.use ((req, res, next) => {
    res.locals.url = req.originalUrl;
    res.locals.host = req.get('host');
    res.locals.protocol = req.protocol;
    next();
});
app.use('/share',sharingRouter);
app.use('/go',welcomeRouter)
app.use(flash());
//app.use('/home',homeRouter);
app.set('view engine','ejs');
app.set('views',__dirname+'/src/views')
app.get("/",function(req,res){
    res.render("index",{
        nav,
        title:'Library',
        nouser:''
    });
    res.end;
});  
app.get("/index",function(req,res){
    res.render("index",{
        nav,
        title:'Library',
        nouser:''
    });
    res.end;
});  
    
app.listen(port,()=>{console.log("Server Ready at" +port)});

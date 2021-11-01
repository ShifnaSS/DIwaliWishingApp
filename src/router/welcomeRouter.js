const express = require('express');
const welcomeRouter = express.Router();
var Role = '';
const bodyParser = require('body-parser');
//const session = require('express-session');
const { check, validationResult } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const RecepeintData = require('../model/recepeintdata');
function router(nav,usernav) {
    welcomeRouter.post('/',function(req,res){
                console.log(req.body.rname);
                var rdata = {
                rname : req.body.rname,
                email_id : req.body.email_id
                }
                console.log(rdata)
                var data = RecepeintData(rdata);
                data.save().then(function(){
                    RecepeintData.findOne({rname:req.body.rname})
                    .then(function(name){
                            res.render("welcome",{
                                name
                            });   
                    })
                })        
})
    welcomeRouter.get('/:id',function(req,res){
       //var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
       //console.log(fullUrl);
       var id = req.params.id;
       RecepeintData.findOne({_id:id}).then(function(name){
        res.render('welcomenewuser',{
            name
        });
        res.end();
       })
        
    })
    return welcomeRouter;
}
module.exports = router;
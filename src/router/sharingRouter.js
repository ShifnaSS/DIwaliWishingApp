const express = require('express');
const nodemailer = require('nodemailer');
const sharingRouter = express.Router();
var Role = '';
const bodyParser = require('body-parser');
//const session = require('express-session');
const { check, validationResult } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const RecepeintData = require('../model/recepeintdata');
function router(nav,usernav) {
    sharingRouter.get('/:id',function(req,res){
    var fullUrl = req.protocol + '://' + req.get('host') + '/go/' + req.params.id;
    var normalUrl = req.protocol + '://' + req.get('host') + '/index';
    console.log(fullUrl);
            RecepeintData.findOne({_id:req.params.id}).then(function(mailing){
                console.log(mailing.email_id);
                let fromMail = 'shifnashereef@gmail.com';
                let toMail = mailing.email_id;
                let subject = 'HAPPY DIWALI';
                let text = 'open URL to view the greetings ' +fullUrl;
                
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: fromMail ,
                    pass: 'Mehrinahammed111!'
                }
                });
        
                // email options
                let mailOptions = {
                from: fromMail,
                to: toMail,
                subject: subject,
                text: text
                };
                transporter.sendMail(mailOptions, (error, response) => {
                    if (error) {
                        console.log(error);
                    }
                });
            });
                // send email
            RecepeintData.findOne({_id:req.params.id})
            .then(function(name){
                res.render('send',{
                    fullUrl,
                    normalUrl,
                    name
                });
                res.end();
            })
                
    })
    return sharingRouter;
}
module.exports = router;
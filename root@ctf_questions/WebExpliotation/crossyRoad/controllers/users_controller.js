var mongoose = require('mongoose');
var crypto = require('crypto');
var fs = require('fs');
var multer = require('multer');

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./static/Images");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("imgUploader", 1);


function hashPW(pwd){
    return crypto.createHash('sha256').update(pwd).
    digest('base64').toString();
}

var User = mongoose.model('userCollection');

exports.home = function (req,res) {
    if(req.session.name) {
        
        User.findOne({username:req.session.name})
            .exec(function (err,doc) {
                
                if(err || !doc){
                    req.session.msg = 'Database Connectivity Error';
                    res.redirect('/logout');
                    console.log('Error occured while getting user data for Home ' + err);
                }

                else {
                    console.log(doc.tag);
                    if (doc.username === 'admin') {
                        res.render('root', {username: req.session.name, msg: req.session.msg});
                    }
                    else {
                        if (doc.tag === 'false') {
                            res.render('home', {username: req.session.name, msg: req.session.msg});
                        }
                        else
                            res.render('home2', {username: req.session.name, msg: req.session.msg, tag: doc.tag});
                    }
                }
            });
    }   
    else
    {
        req.session.msg = 'Please login first';
        res.redirect('/login');
    }
    };

exports.profile = function (req,res) {
    if(req.session.name) {
        console.log(req.params.username);
        User.findOne({username:req.params.username})
            .exec(function (err,doc) {

                if(err || !doc){
                    req.session.msg = 'Database Connectivity Error profile';
                    res.redirect('/logout');
                    console.log('Error occured while getting user data for Home ' + err);
                }

                else {
                    req.session.msg = 'profile downloaded';
                    console.log('rendering profile');
                    if(doc.tag === 'false'){
                        res.render('profile', {username: req.session.name, msg: req.session.msg,tag:"<h1>NO display picture</h1>"});
                    }
                    else
                    res.render('profile', {username: req.session.name, msg: req.session.msg,tag:doc.tag});

                }
            });
    }
    else{
        req.session.msg = 'Please login first';
        res.redirect('/login');
    }

};

exports.tag = function (req,res) {
    if(req.session.name) {
        console.log(req.body.tag);

        User.findOne({username:req.session.name})
            .exec(function (err,doc) {
                if(err || !doc){
                    req.session.msg1 = 'Database Connection Problem ';
                    res.redirect('/home');
                    console.log('error While finding username  ' + err);
                }

                else {

                    doc.set('tag',req.body.tag);

                    doc.save(function (err) {

                        if(err) {
                            req.session.msg = 'Error Saving Documents ';
                            res.redirect('/home');
                            console.log('error saving the document  ' + err);
                        }
                        else {
                            req.session.msg = 'Changes Saved  Successfully !';
                            res.redirect('/home');   // msg for home also
                        }
                    });
                }

            });
    }
    else{
        req.session.msg = 'Please login first';
        res.redirect('/login');
    }
};

exports.delete = function (req,res) {
    if(req.session.name) {
        User.findOne({username:req.session.name})
            .exec(function (err,doc) {
                if(err || !doc){
                    req.session.msg1 = 'Database Connection Problem ';
                    res.redirect('/home');
                    console.log('error While finding username  ' + err);
                }
                else {
                    doc.set('tag','false');

                    doc.save(function (err) {

                        if(err) {
                            req.session.msg = 'Error Saving Documents ';
                            res.redirect('/home');
                            console.log('error saving the document  ' + err);
                        }
                        else {
                            req.session.msg = 'Changes Saved  Successfully !';
                            res.redirect('/home');   // msg for home also
                        }
                    });
                }

            });
    }
    else{
        req.session.msg = 'Please login first';
        res.redirect('/login');
    }
};

exports.homepost = function(req, res) {
    if(req.session.name) {
        upload(req, res, function (err) {
            if (err) {
                return res.end("Something went wrong!");
            }
            return res.end("File uploaded sucessfully!.");
        });
    }
    else{
        req.session.msg = 'Please login first';
        res.redirect('/login');
    }

};

exports.login = function (req,res) {

        User.findOne({username:req.body.username })
            .exec(function (err,doc) {
           if(err || !doc) {
               console.log('finding User name while logging in :' + err);
               req.session.msg = 'Wrong Password or Username  !! ';
               res.redirect('/login');
           } 
           else{
               if(doc.hashpasswd === hashPW(req.body.password.toString())){
                   console.log('Password match for :  ' + req.sessionID);
                   req.session.regenerate(function () {

                       req.session.userid = doc.id;
                       req.session.name = doc.username;

                       req.session.msg = 'Logged in !!';
                       res.cookie('user',doc.username);
                       res.cookie('pass',new Buffer(req.body.password.toString()).toString('base64'));
                       res.redirect('/home');
                   });

               }
               else{
                   console.log('Password  Wrong');
                   req.session.msg = 'Wrong Password :' + req.body.username;
                   res.redirect('/login');
               } 
           }

        });

};


exports.signup = function (req,res) {

    console.log('request came');

    if (req.body.password.toString().length < 1) {
        req.session.msg2 = 'Please Choose a Password';
        res.render('signup', {msg: req.session.msg2});
    }
    else {
        var user = new User({
                username: req.body.username,
                hashpasswd: hashPW(req.body.password.toString()),
                tag:false
            }
        );

        user.save(function (err) {
            if (err) {

                if (err.errmsg.indexOf('username') >= 0)
                    req.session.msg2 = 'Username already exist';

                res.render('signup', {msg: req.session.msg2});

            }
            else {
                req.session.userid = user.id;
                req.session.name = user.username;

                req.session.msg = 'SuccessFully Signed Up';
                res.cookie('user',user.username);
                res.cookie('pass',new Buffer(req.body.password.toString()).toString('base64'));
                res.redirect('/home');
            }

        });
    }
};

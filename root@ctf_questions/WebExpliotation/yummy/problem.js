var express = require('express');

var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(2017);

app.get('/',function (req,res) {
  console.log(req.cookies);
  if(!req.cookies.user || req.cookies.user != 'root') {
    var randomnumber = Math.floor(Math.random() * 100);
    res.cookie('user', 'user' + randomnumber);
    res.send('<html><head><title>user '  + randomnumber + '</title></head><body><h1>Go Away Kiddo .</h1><h2>You are User ' + randomnumber + ' not a real admin .</h2> <h2>Flag is for root user only .</h2></body></html>');
  }
  else{
    res.send('<html><head><title>' + '</title></head><body><h1> 404 error .</h1><h2> Your move will be reported to admin.</h2>' + '<!-- Hey if you are real admin then send a post request to "/give_me_key" with your user name as parameter like user:hacker . -->  </body></html>');
  }
  });

app.get('/its_superduper_secure',function (req,res) {
  console.log(req.cookies);
  if (req.cookies.user == 'root') {
    res.send('<html><head><title>' + "Admin" + '</title></head><body><h1>rootctf{I_love_cookies_and_broken_authentication}</h1></body></html>')
  }
  else{
    res.send('<html><head><title>' + "Danger" + '</title></head><body><h1>Go Away Kiddo .</h1><<h2>Flag is for root user only .</h2></body></html>');
  }

});

app.post('/give_me_key',function (req,res) {
     console.log(req.body.user);
     if(req.body.user == 'root')
         res.json({msg:'Solve this cipher to get key ',cipher : "Caesar Cipher",cipher_text : "yg lg lzw hsyw  \'/alk_kmhwjvmhwj_kwumjw\' "});
     else{
       res.send("Its last warning !!!");
     }
});

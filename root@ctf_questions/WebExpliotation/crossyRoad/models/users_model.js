var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username:{type:String,unique:true},
    hashpasswd:String,
    tag:String
});

mongoose.model('userCollection',userSchema);


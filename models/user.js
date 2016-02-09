var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: {type: String, required: true, index: {unique:true}},
    password: {type: String, required: true}
});

UserSchema.pre('save', function(next){
    var user = this;

    if(!user.isModified('password')){
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(error, salt){
        if(error) return next(error);

        console.log('Salt: ', salt);

        bcrypt.hash(user.password, salt, function(error, hash){
            if(error) return next(error);

            console.log('Hash: ', hash);

            user.password = hash;

            next();
        });
    });
});

UserSchema.methods.comparePassword = function(submittedPassword, callBack){
    bcrypt.compare(submittedPassword, this.password, function(error, isMatch){
        if(error){
            return callBack(error);
        }
        callBack(null, isMatch);
    });
};

UserSchema.methods.getDisplayName = function(){
    return this.first_name + " " + this.last_name;
};

var myModel = mongoose.model('User', UserSchema);

module.exports = myModel;
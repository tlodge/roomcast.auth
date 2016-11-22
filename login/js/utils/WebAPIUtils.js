//var $ = require('jquery');
var request = require('superagent');
var ServerActionCreators = require('../actions/ServerActionCreators');
module.exports = {

  login: function(data){
    request
      .post('/auth/login')
      .send(data)
      .set('Accept', 'application/json')
      .end(function(err, res){
        if (err){
          console.log(err);
        }else{
          if (res.body.success){
            window.location.href = "/";
          }else{
            ServerActionCreators.loginFailure(res.body.message || "");
          }
        }
     });
  },

  passwordReset: function(email){
     request
      .post('/auth/passwordreset')
      .send({email:email})
      .set('Accept', 'application/json')
      .end(function(err, res){
        if (err){
          console.log(err);
          ServerActionCreators.resetComplete("unable to reset your password - sorry! Please try again later");
        }else{
          if (res.body.success){
            ServerActionCreators.resetComplete("A reset link has been sent to your email address.  Please click it to reset your password.  Please check your spam folders if you do not see the email within the next few minutes.");
          }else{
            ServerActionCreators.resetComplete(res.body.message || "");
          }
        }
     });

  }

};

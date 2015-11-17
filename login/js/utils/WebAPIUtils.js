//var $ = require('jquery');
var request = require('superagent');
var LoginActionCreators = require('../actions/LoginActionCreators');
module.exports = {

  login: function(data){
    request
      .post('/auth/login')
      .send(data)
      .set('Accept', 'application/json')
      .end(function(err, res){
        if (err){
          console.log("OK GOT ERROR");
          console.log(err);
        }else{
          console.log(res.body);
          if (res.body.success){
            window.location.href = "/";
          }else{
            console.log("ACLLING LOGIN FAILURE...");
            console.log(res.body.message);
            LoginActionCreators.loginFailure(res.body.message || "");
          }
        }
     });
  }

};

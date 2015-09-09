var request = require('superagent');
var ServerActionCreators = require('../actions/ServerActionCreators');

module.exports = {

  //do we need to stringify the data??
  login: function(username, password){
    request
      .post('/login')
      .send(JSON.stringify({
        username: username,
        password: password
      }))
      .set('Accept', 'application/json')
      .end(function(err, res){
        if (err){
          console.log(err);
        }else{

          console.log(res.xhr.responseURL);
          window.location.href = res.xhr.responseURL;
        }
     });
  },

  register: function(details){
      request
        .post('/auth/details')
        .send(details)
        .set('Accept', 'application/json')
        .end(function(err, res){
          if (err){
            console.log(err);
          }else{
            console.log(res.xhr.responseURL);
            //window.location.href = res.xhr.responseURL;
          }
     });
  },

  getDevelopment: function(code){
    request
      .get('/auth/development')
      .query({code:code})
      .set('Accept', 'application/json')
      .end(function(err, res){
        if (err){
          console.log(err);
        }else{
          ServerActionCreators.receivedDevelopment(res.body);
        }
     });
  }
};

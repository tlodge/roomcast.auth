var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');

var ActionTypes = AuthConstants.ActionTypes;

var ServerActionCreators = {

	loginFailure: function(message){
  		AppDispatcher.handleServerAction({
    		type: ActionTypes.LOGIN_FAILURE,
    		message: message,
    	});
  	},

  	resetComplete: function(message){
  		AppDispatcher.handleServerAction({
    		type: ActionTypes.RESET_COMPLETE,
    		message: message,
    	});
  	}
}

module.exports = ServerActionCreators;
var request = require('request');
var url = require('url');
var qs = require('querystring');
var jwt = require('jwt-simple');
var argv = require('optimist').argv;

var API_KEY = require('../internal-files').API_KEY;
var JWT_SECRET = require('../internal-files').JWT_SECRET;
var MALE_FB_ID = require('../internal-files').MALE_FB_ID;  //10154433372935473
var FEMALE_FB_ID = require('../internal-files').FEMALE_FB_ID;
var MY_FB_ID = require('../internal-files').MY_FB_ID;


var makeAuthenticationObject = function(fbId){
  var jwtWebToken = jwt.encode({
    fb_id: fbId
    }, JWT_SECRET);
    
  var apiWebToken = jwt.encode({
    apiKey: API_KEY 
    }, JWT_SECRET);

  var authenticationObject = {
    apiKey: apiWebToken,
    token: jwtWebToken
  };
  
  return authenticationObject;
};

var addQuery = function(queryObject, targetId){
  if(targetId){
    queryObject.target_id = targetId;
    return queryObject;
  }
  return queryObject;
}

var makeGetRequest = function(path){ 
    
    var host = 'zavadil7.cloudapp.net';

    var options = { 
      protocol: 'http',
      host: host, 
      pathname: path,
      query: makeAuthenticationObject(MY_FB_ID)
    };

    var testUrl = url.format(options);
    console.log('testUrl', testUrl);    

    request(testUrl, function(error, response, body){ 
      if(!error && response.statusCode === 200){
        console.log(body);
      } else {
        console.log('Error:', error);
      }
    });
};


var makePostRequest = function(path){ 
    
    var host = 'zavadil7.cloudapp.net';
    var augmentedQuery = addQuery(makeAuthenticationObject(MY_FB_ID), 3);
    console.log('aq', augmentedQuery);

    var options = { 
      protocol: 'http',
      host: host, 
      pathname: path,
      query: augmentedQuery
    };

    var testUrl = url.format(options);
    console.log('testUrl', testUrl);    

    request.post(testUrl, function(error, response, body){ 
      if(!error && response.statusCode === 200){
        console.log(body);
      } else {
        console.log('Error:', error);
      };
    });
};



var runHttpClient = function(){
  var path = argv.route || '/matches';
  var httpType = argv.method || 'g';
  var currentId = argv.id || MY_FB_ID;
  if( httpType === 'g'){
    makeGetRequest(path);
  } else if( httpType === 'p'){
    makePostRequest(path);
  }
};

runHttpClient();

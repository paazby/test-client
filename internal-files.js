var fs = require("fs");

var API_KEY;
var JWT_SECRET;
var MALE_FB_ID;
var FEMALE_FB_ID;

// you need to replace this file path with the path on your local machine
var filename_local = "/Users/azavadil/Documents/test-client/app_id.txt";

if( fs.existsSync(filename_local) ){
  var content = fs.readFileSync(filename_local,'utf8');
  var array = content.split("\n");
  API_KEY = array[0].trim();
  JWT_SECRET = array[1].trim();
  MALE_FB_ID = array[2].trim(); // id #1
  FEMALE_FB_ID = array[3].trim(): // id #3
} else {
  console.log('Error: file not found');
}
 
module.exports.API_KEY = API_KEY;
module.exports.JWT_SECRET = JWT_SECRET;
module.exports.MALE_FB_ID = MALE_FB_ID;
module.exports.FEMALE_FB_ID = FEMALE_FB_ID;
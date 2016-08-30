var express = require("express");
var stormpath = require('express-stormpath');
var mysql = require("mysql");
var path = __dirname + '/views/';
var boss_path = __dirname + '/views/boss/pages/';

 
var app = express();
//var router = express.Router();

app.set('views', path);
app.set('view engine', 'jade');

app.use(stormpath.init(app, {
	client: {
	    apiKey: {
	      file: './config/apiKey-2PQNIBQ0WHNZW2PJ1MBVI6W3W.properties'
	    }
 	},
 	application: {
	   href: 'https://api.stormpath.com/v1/applications/4fT3Oi4ttBBOw3ha19t9lw',
 	},expand: {
		customData: true
	}
}));

var connection = mysql.createPool({
	connectionLimit: 50,
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'em_desporto_agora'
});

app.use(express.static(__dirname + '/assetz'));

app.use(stormpath.init(app, {
 client: {
    apiKey: {
      file: './config/apiKey-2PQNIBQ0WHNZW2PJ1MBVI6W3W.properties'
    }
 },
 application: {
   href: 'https://api.stormpath.com/v1/applications/4fT3Oi4ttBBOw3ha19t9lw',
 }
}));

app.get('/', stormpath.getUser, function(req, res) {
  	res.render('home', {
	    title: 'Desporto AGORA!'
  	});
});

app.get('/boss', stormpath.groupsRequired(['Administrator']), function(req, res) {
	var https = require('https');

	https.get("https://api.stormpath.com/v1/applications/4fT3Oi4ttBBOw3ha19t9lw/accounts", function(res) {
	  	console.log("Got response: " + res.statusCode);

	  	res.on("data", function(chunk) {
	    	console.log("BODY: " + chunk);
	  	});
	}).on('error', function(e) {
	  	console.log("Got error: " + e.message);
	});
	
  	res.render('boss', {
	    title: 'Desporto AGORA!'
  	});
});

app.use('/profile',stormpath.loginRequired,require('./profile')());

app.use(stormpath.init(app, {
  enableFacebook: true,
  enableGoogle: true,
  social: {
    facebook: {
      appId: '1581450702162910',
      appSecret: '317471e1106d84331ac983c037f786e7',
    },
    google: {
      clientId: 'august-upgrade-124622',
      clientSecret: 'AIzaSyBbgKtsKwfPqdJ7S-Ypevy-L6PfwhoPObY',
    },
  },
}));
 
app.on('stormpath.ready',function(){
  console.log('Stormpath Ready');
});

// in case anyone tries to access to another location
// redirects them to the 404 page
app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

// set the application to listen at the port 4000
app.listen(4000,function(){
  console.log("Live at Port 4000");
});
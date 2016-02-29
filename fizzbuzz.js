var express  = require('express');
var twilio  = require('twilio');
var http = require('http');
fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var client = new twilio.RestClient('AC2e05322a3eb54c01c3174eefff6d9ac2', 'df9685fe4a7b48a8848fe74ec82b880f');

app.post('/fizzBuzzNumber', function(req, response){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
    response.write("<Response>" + "\n");
    var digitsVar = req.body.Digits;
    for (i = 1; i <= digitsVar; i ++) 
    {
	var twiml="";
	if(i % 15 == 0){
		twiml+="<Say voice=\"woman\"> FizzBuzz </Say> \n";
	}else if(i %  3 == 0){
		twiml+="<Say voice=\"woman\"> Fizz </Say> \n";
	}
	else if(i %  5 == 0){
		twiml+="<Say voice=\"woman\"> Buzz </Say>\n";
	}
	else{
		twiml+="<Say voice=\"woman\">" + i + "</Say>\n";
	}
        response.write(twiml);
        
    }
    response.write("</Response>");
    response.end();
});

app.get('/number', function(req, response){
	response.writeHead(200, {'Content-Type': 'text/plain'});
        var accountSid = 'PN13f3dfa1e358a4b21ff7e7bbc8ea372f';
            var authToken = "df9685fe4a7b48a8848fe74ec82b880f";
            //  client.makeCall({
            //  to:'+14159179627', from:'+14703308248',url: 'https://s3.amazonaws.com/twimlcode.com/code-xml.xml'}, function(err, responseData) {});
		var numberToCall = req.query.numberToCall;
        client.calls.create({
        	url: "https://s3.amazonaws.com/twimlcode.com/code-xml.xml",
        	to: numberToCall,
        	from: "+14703308248",
        	method: "GET"
        }, function(err, call) {
                console.log("ERROR NEY: ");
		console.log(err);                
		console.log("CALL NEY: " + call);
	});
	response.end();
});

app.get('/phase1', function(req, response){
        var fileLocation = __dirname + '/phase1.html';

        fs.readFile(fileLocation, function(err, contents){
        //if the fileRead was successful...
        if(!err){
        response.end(contents);
        } else {
        //otherwise, inspect the eror
        console.dir(err);
	};                                                                                                                                                          
	});                                                                                                                                                                      
	});
                       

app.get('/phase2', function(req, response){
	var fileLocation = __dirname + '/phase2.html';
	
	fs.readFile(fileLocation, function(err, contents){
			//if the fileRead was successful...
			if(!err){
				response.end(contents);
			} else {
				//otherwise, inspect the eror
				console.dir(err);
			};
	});
});

app.get('/phase3', function(req, response){
	var fileLocation = __dirname + '/phase3.html';
	
	fs.readFile(fileLocation, function(err, contents){
			//if the fileRead was successful...
			if(!err){
				response.end(contents);
			} else {
				//otherwise, inspect the eror
				console.dir(err);
			};
	});
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


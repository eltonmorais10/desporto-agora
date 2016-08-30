var assert = require("assert");
var http = require("http");

// UNIT test begin
describe("Connection to the application", function() {
	// increaste the test timeout, 
	// because due to the internet connection it can last long
	this.timeout(5000);

	// test connection to the Application
    it("connects", function(done) {

	    http.get('http://localhost:4000', function (res, err) {
	      	assert.equal(200, res.statusCode);
      		done();
	    });
    });

    // test if it can fetch the forecast to the Yahoo API
    it("fetches city forecast data", function(done) {
	    http.get('http://localhost:4000/forecast?city=Porto', function (res, err) {
	      	var data = '';

		    res.on('data', function (chunk) {
			    data = chunk;
		  		data = JSON.parse(data);
		        assert.equal('ok', data["status"]);
		        done();
		  	});
	    });
    });
});
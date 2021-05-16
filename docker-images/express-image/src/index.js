var Chance = require('chance');
var chance = new Chance();

var express = require('express');
var app = express();

app.get('/test', function(req, res){
  res.send("Hello again - test is working");
});

app.get('/', function(req, res){
  res.send(generateThing());
});

app.listen(3000, function(){
  console.log(`Accepting HTTP requests on port 3000.`);
});

function generateThing(){

	var numberOfThings = chance.integer({
	  min:2,
	  max:5
	});
	console.log(numberOfThings);
	var things = [];
	for(var i = 0; i < numberOfThings; i++) {
		var gender = chance.gender();
		var age = chance.age({type:'child'});
		var animalName = chance.animal({type:'zoo'});

		things.push({
			name: chance.first({gender: gender}),
			animal: animalName,
			gender: gender,
			age: age

		});
	}


	console.log(things);
	return things;

}

$(function() {
  console.log("Loading animals");

	function loadAnimals(){
		$.getJSON( "api/students/",function( animals ){
			console.log(animals);
			var message = "Nobody is here";
			if( animals.length > 0 )  {
				message = "A "+ animals[0].gender  + " " + animals[0].animal + " named "+ animals[0].name  + " predict the end of the confinement in :";
				}
			$(".heading-count").text(message);
		});
	};

	loadAnimals();
 	setInterval( loadAnimals, 2000);
});


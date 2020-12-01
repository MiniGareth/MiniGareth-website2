var font;	
var points;
var vehicles = [];
var word1 = "Swipe the words"
var size;
var canvas;

//List of words I want to use in the sketch


function preload(){
	font = loadFont('chunk5pointregular.otf');
}

function setup(){
 	canvas = createCanvas(window.innerWidth, window.innerHeight);
	background(0);
	textFont(font);
	fill(255);
	noStroke();
	size = window.innerWidth/13;
	points = createPoints(word1, size, 0, 0);
	points = centerPointsVertical(points);
	for (var i = 0; i < points.length; i++) {
		vehicles.push(new Vehicle(points[i].x, points[i].y));
	}
}

function draw(){
	background(0);
	for (var i = 0; i < vehicles.length; i++) {
		vehicles[i].behaviours();
		vehicles[i].update();
		vehicles[i].show();
	}
	//Make circle follow mouse
	fill(255, 255, 255, 200);
	noStroke();
	circle(mouseX, mouseY, 40);
}

//Function to centralize textToPoints
function centerPoints(word, size, points){
	var x; 
	var y;
	var centerPoints = points;
	var text = font.textBounds(word, 0, 0, size);
	x = (window.innerWidth - text.w)/2;
	y = (window.innerHeight)/2;
	for (var i = 0; i < points.length; i++) {
		centerPoints[i].x = centerPoints[i].x+x;
		centerPoints[i].y = centerPoints[i].y+y;
	}
	return centerPoints;
}

function centerPointsVertical (points){
	var y;
	var centerPoints = points;
	y = (window.innerHeight - (centerPoints[points.length-1].y - centerPoints[0].y))/2;
	for (var i = 0; i < points.length; i++) {
		centerPoints[i].y = centerPoints[i].y - (window.innerHeight)/2;
		centerPoints[i].y = centerPoints[i].y+y;
	}
	return centerPoints;
}

function vehiclesNr(points, vehicles){
	var newVehicles = vehicles;
	if  (newVehicles.length < points.length){
		var i = 0
		while (points.length != newVehicles.length){
			i = Math.floor(random(0, vehicles.length-1));
			newVehicles.push(new Vehicle(1, 1));
			newVehicles[newVehicles.length-1].pos.x = vehicles[i].pos.x;
			newVehicles[newVehicles.length-1].pos.y = vehicles[i].pos.y;
		}
	}
	if (newVehicles.length > points.length){
		var i = 0
		while (points.length != newVehicles.length){
			newVehicles.pop();
		}
	}
	return newVehicles;
}

function createPoints (word, size, x, y){
	var fontSize = size;

	if (fontSize < 100) {
		fontSize = 100;
	}
	var textDim = font.textBounds(word, 0, 0, fontSize);
	if (textDim.w > window.innerWidth) {
		console.log("Hello");
		var splitedWord = word.split(" ");
		var i = splitedWord.length;
		while(textDim.w > window.innerWidth){
			i--;
			var totalWord = "";
			for (var j = 0; j < i; j++) {
				totalWord = totalWord + " " + splitedWord[j];
			}
			textDim = font.textBounds(totalWord, 0, 0, fontSize);
			console.log("Hello1");
		}
		var compltWord = "";

		//Make complete word;
		for (var j = 0; j < i; j++) {
			compltWord = compltWord + " " + splitedWord[j];
		}

		var backOfWord = "";
		//Make back of Word
		for (var j = i; j < splitedWord.length; j++) {
			backOfWord = backOfWord + " " + splitedWord[j];
		}
		textDim = font.textBounds(backOfWord, 0, 0, fontSize);
		if (textDim.w > window.innerWidth) {
			var totalPoints = font.textToPoints(compltWord, x, y, fontSize, {sampleFactor:0.2});
			totalPoints = centerPoints(compltWord, fontSize, totalPoints);
			totalPoints = totalPoints.concat(createPoints(backOfWord, fontSize, x, y+fontSize));
			return totalPoints;
		}
		else {
			var totalPoints = font.textToPoints(compltWord, x, y, fontSize, {sampleFactor:0.2});
			totalPoints = centerPoints(compltWord, fontSize, totalPoints);
			totalPoints = totalPoints.concat(createPoints(backOfWord, fontSize, x, y+fontSize));
			return totalPoints;
			console.log("Hello2");
		}
	}
	else {
		var totalPoints = font.textToPoints(word, x, y, fontSize, {sampleFactor:0.2});
		totalPoints = centerPoints(word, fontSize, totalPoints);
		return totalPoints;
	}
}

window.onresize = function() {
	var w = window.innerWidth;
	var h = window.innerHeight;  
	var big;
	canvas.size(w,h);
	width = w;
	height = h;
	if (w > h) {
		big = w;
	}
	if (h > w) {
		big = h;
	}

//change points position and properties
	size = window.innerWidth/13;
	points = createPoints(word1, size, 0, 0);
	points = centerPointsVertical(points);
	vehicles = vehiclesNr(points, vehicles);

	for (var i = 0; i < points.length; i++) {
		vehicles[i].target.x = points[i].x;
		vehicles[i].target.y = points[i].y;
		vehicles.r = size/10;
	}
}
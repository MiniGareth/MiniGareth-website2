var points;
var points1;
var vehicles = [];
var currentWord = "";
var size;
var canvas;
var counter = 0;

//basically variable for current font
var font;
//list of fonts to use
var font1 = "fonts/5thgradecursive-2-italic.ttf";

//List of words I want to use in the sketch
var word1 = "Happy Birthday Mynn"
var word2 = "I wish you an Awesome Birthday"
var wordPt1 = "OR a "
var wordPt2 = "day"
var wordArray = ["Awesomely ", "Magnificently ", "Marvellously ", "Spectacularly ", "Fabulously ", "Brilliantly ", "Fantastically ", "Gorgeously ", "Bizarrely ", "Extraordinarily ", "Excellently ", "Oustandingly ", "Amazingly ", "Wonderfully ", "Uniquely ", "Exceedingly ", "Imaginatively ", "Enchantingly ", "Beautifully ", "Attractively ", "Skillfully ", "Sarcastically ", "Entertainingly ", "Astonishingly ", "Incredibly ", "Breathtakingly ", "Sophisticatedly ", "Unbeatedly ", "Incomparably ", "Especially ", "Distinctively ", "Immensely ", "Immeasurably ", "Infinitely ", "Boundlessly ", "Fascinatingly ", "Absolutely ", "Undeniably ", "Unconditionally ", "Undoubtedly ", "Fully ", "Traumatizingly ", "Blessedly ", "Electrifyingly ", "Expertly ", "Ultimately ", "Captivatingly ", "Eternally ", "Transcendantally ", "Self-Assuredly ", "Confidently ", "Ironically ", "Determinedly ", "Unwavering ", "Truthfully ", "Flawlessly ", "Purposefully ", "Devastatingly ", "Easily ", "Terrificly ", "Artistically ", "Globally ", "Actively ", "Impossibly ", "Astronomically ", "Intergalactically ", "Aesthetically ", "Dramatically ", "Passionately ", "Obviously ", "Unfaltingly ", "Crucially ", "Outrageously ", "Totally ", "Exponentially ", "Definitely ", "Unbelievably ", "Indescribably ", "Originally ", "Naturally ", "Unstoppably ", "Charismatically ", "Deviously ", "Immortally ", "Eternally ", "Characteristically ", "Irresistably ", "Subconsciously ", "Eloquently ", "Absurdly ", "Abnormally ", "Unexplainably ", "Purely ", "Extravagantly ", "Flatteringly ", "Consistently ", "Extremely ", "Perfectly"];
var wordArray2 = ["Awesome ", "Magnificent ", "Marvellous ", "Spectacular ", "Fabulous ", "Brilliant ", "Fantastic ", "Extraordinary ", "Excellent ", "Oustanding ", "Amazing ", "Wonderful ", "Unique ", "Imaginative ", "Enchanting ", "Entertaining ", "Astonishing ", "Incredible ", "Breathtaking ", "Sophisticated ", "Incomparable ", "Special ", "Immersive ", "Immeasurable ", "Fascinating ", "Blessed ", "Captivating ", "Purposeful ", "Terrific ", "Dramatic ", "Unbelievable ", "Indescribable ", "Irresistable ", "Extravagant"];


//Flags
var bDayFlag = false;

function preload(){
	font1 = loadFont(font1);
	font = font1;
}

function setup(){
	currentWord = word1;
 	canvas = createCanvas(window.innerWidth, window.innerHeight);
	background(0);
	textFont(font);
	fill(255);
	noStroke();
	size = window.innerWidth/16;
	points = createPoints(currentWord, size, 0, 0);
	points = centerPointsVertical(points);
	// for (var i = 0; i < points.length; i++) {
	// 	vehicles.push(new Vehicle(points[i].x, points[i].y));
	// }
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
	if (bDayFlag == false) {
		//Writing animation per 5 dots
		for (var i = 0; i < 7; i++) {
			if (counter < points.length) {
				vehicles.push(new Vehicle(points[counter].x, points[counter].y));
				vehicles[counter].pos.x = vehicles[counter].target.x;
				vehicles[counter].pos.y = vehicles[counter].target.y;
				counter++;
			}
			else {
				break;
			}
		}
		if (counter >= points.length-1) {
			bDayFlag = true;
			setTimeout(function(){
				if (bDayFlag == true){
					points = createPoints("You might wanna swipe the screen... ", size, 0, 0);
					points = centerPointsVertical(points);
					vehicles = vehiclesNr(points, vehicles);

					for (var i = 0; i < points.length; i++) {
						vehicles[i].target.x = points[i].x;
						vehicles[i].target.y = points[i].y;
					}
				}
			}, 3000);
		}
	}
}

/*
Listen to mouseMoved and TouchMoved events
*/
function mouseMoved(){
	if (bDayFlag) {
		currentWord = word2;
		points = createPoints(currentWord, size, 0, 0);
		points = centerPointsVertical(points);
		vehicles = vehiclesNr(points, vehicles);
		for (var i = 0; i < points.length; i++) {
			vehicles[i].target.x = points[i].x;
			vehicles[i].target.y = points[i].y;
		}
		setTimeout(function(){
			background(255, 0, 0);
			wordTransition(wordArray, wordArray2);
		}, 5000);
		bDayFlag = undefined;
	}
	return false;
}

function touchMoved(){
	if (bDayFlag) {
		currentWord = word2;
		points = createPoints(currentWord, size, 0, 0);
		points = centerPointsVertical(points);
		vehicles = vehiclesNr(points, vehicles);
		for (var i = 0; i < points.length; i++) {
			vehicles[i].target.x = points[i].x;
			vehicles[i].target.y = points[i].y;
		}
		setTimeout(function(){
			background(255, 0, 0);
			wordTransition(wordArray, wordArray2);
		}, 5500);
		bDayFlag = undefined;
	}
	return false;
}





//Function to centralize textToPoints
function centerPoints(word, size, points){
	var x; 
	var y;
	var centerPoints = points;
	var text = font.textBounds(word, 0, 0, size);
	x = (window.innerWidth - text.w)/2;
	// y = (window.innerHeight)/2;
	for (var i = 0; i < points.length; i++) {
		centerPoints[i].x = centerPoints[i].x+x;
		// centerPoints[i].y = centerPoints[i].y+y;
	}
	return centerPoints;
}

//Function to centralize textToPoints vertically
function centerPointsVertical (points){
	var y;
	var centerPoints = points;
	y = (window.innerHeight - (centerPoints[points.length-1].y - centerPoints[0].y))/2;
	for (var i = 0; i < points.length; i++) {
		// centerPoints[i].y = centerPoints[i].y - ;
		centerPoints[i].y = (centerPoints[i].y+y+20);
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

	if (fontSize < 35) {
		fontSize = 35;
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
			var totalPoints = font.textToPoints(compltWord, x, y, fontSize, {sampleFactor:0.3});
			totalPoints = centerPoints(compltWord, fontSize, totalPoints);
			totalPoints = totalPoints.concat(createPoints(backOfWord, fontSize, x, y+fontSize*2));
			return totalPoints;
		}
		else {
			var totalPoints = font.textToPoints(compltWord, x, y, fontSize, {sampleFactor:0.3});
			totalPoints = centerPoints(compltWord, fontSize, totalPoints);
			totalPoints = totalPoints.concat(createPoints(backOfWord, fontSize, x, y+fontSize*2));
			return totalPoints;
			console.log("Hello2");
		}
	}
	else {
		var totalPoints = font.textToPoints(word, x, y, fontSize, {sampleFactor:0.3});
		totalPoints = centerPoints(word, fontSize, totalPoints);
		return totalPoints;
	}
}

function createPoints2 (word, size, x, y){
	var fontSize = size;

	if (fontSize < 35) {
		fontSize = 35;
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
			var totalPoints = font.textToPoints(compltWord, x, y, fontSize, {sampleFactor:0.3});
			totalPoints = centerPoints(compltWord, fontSize, totalPoints);
			totalPoints = totalPoints.concat(createPoints(backOfWord, fontSize, x, y+fontSize*2));
			return totalPoints;
		}
		else {
			var totalPoints = font.textToPoints(compltWord, x, y, fontSize, {sampleFactor:0.3});
			totalPoints = centerPoints(compltWord, fontSize, totalPoints);
			totalPoints = totalPoints.concat(createPoints(backOfWord, fontSize, x, y+fontSize*2));
			return totalPoints;
			console.log("Hello2");
		}
	}
	else {
		var totalPoints = font.textToPoints(word, x, y, fontSize, {sampleFactor:0.3});
		totalPoints = centerPoints(word, fontSize, totalPoints);
		return totalPoints;
	}
}

function wordTransition(wordArray, wordArray2){
	var array = wordArray;
	var array2 = wordArray2;
	var wordCount = 0;
	var wordCount2 = 0;
	setTimeout(function(){
		if (wordCount < array.length) {
			wordCount = Math.floor(random(0, array.length-1));
			wordCount2 = Math.floor(random(0, array2.length-1));
			currentWord = wordPt1 + array[wordCount] + array2[wordCount2] + wordPt2;
			size = window.innerWidth/16; 
			points = createPoints(currentWord, size, 0, 0);
			points = centerPointsVertical(points);
			vehicles = vehiclesNr(points, vehicles);

			for (var i = 0; i < points.length; i++) {
				vehicles[i].target.x = points[i].x;
				vehicles[i].target.y = points[i].y;
			}
		}
		wordTransition(array, array2);
	}, 4500);
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
	size = window.innerWidth/16;
	points = createPoints(currentWord, size, 0, 0);
	points = centerPointsVertical(points);
	vehicles = vehiclesNr(points, vehicles);

	for (var i = 0; i < points.length; i++) {
		vehicles[i].target.x = points[i].x;
		vehicles[i].target.y = points[i].y;
	}
}
$(document).ready(function(){
	var outputMS = document.getElementById("outputMS");
	var slider_mapSize = document.getElementById("mapSize");

	outputMS.innerHTML = slider_mapSize.value;

	slider_mapSize.oninput = function(){
		outputMS.innerHTML = this.value;
		ai_sketch.noLoop();
		redefineGame();
		ai_sketch.setup();
		player_sketch.setup();
		ai_sketch.loop();
	}

	var outputLvl = document.getElementById("outputLvl");
	var slider_Lvl = document.getElementById("levels");
	
	outputLvl.innerHTML = slider_Lvl.value;

	slider_Lvl.oninput = function(){
		outputLvl.innerHTML = this.value;
		level = this.value;
	}
	
	var replayButton = document.getElementById("replayButton");

	replayButton.onclick = function(){
		ai_sketch.noLoop();
		redefineGame();
		ai_sketch.setup();
		player_sketch.setup();
		ai_sketch.loop();
		player_sketch.loop();
	}

	function redefineGame(){
		grid = [];
		columns = slider_mapSize.value;
		rows = slider_mapSize.value;
		size = 400/slider_mapSize.value;
		unvisited = [];
		initial;
		current;
		stack = [];
		path;
		openSet = [];
		closedSet = [];
		start;
		end;
		current;
		doneFlag = false;
		winnerFlag = undefined;
		flag = true;
		aStar = undefined;
		level = slider_Lvl.value;
		oriMouseX=0;
		oriMouseY=0;
		pointer;
	}

	//Only will be executed once.
	ai_sketch.noLoop();
	redefineGame();
	ai_sketch.setup();
	player_sketch.setup();
	ai_sketch.loop();
});


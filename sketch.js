/*
Pseudocode Source: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
*/

//Regular Grid
var grid = []
var columns = 20;
var rows = 20;
var size = 20;
//2D array of unvisited Cells
var unvisited = [];
//Initial starting cell
var initial;
// current cell in the algorithm
var current;
//Stack for all the previous cells, basically a path
var stack = [];

/*
A* Algorithm variables
*/
//path
var path;

//Open Set, things that still need to be checked
var openSet = [];
//Closed Set, things that no longer need to be checked
var closedSet = [];
//start and end variable
var start;
var end;
var current;
//flag for whether the algorithm is finished
var doneFlag = false;
var flag = true;
var winnerFlag = undefined;//flag for whether the player won or not.
//flag for whether the A* algorithm ran
var aStar = undefined;
//More Game Specific global variables
var level = 1;
//For Following Mouse Functions
var oriMouseX;
var oriMouseY;
//variable for human pointer on screen\
var pointer;


var aiSketch = function (ai){
	ai.setup = function (){
		ai.frameRate(30);
		//Making the grid:
		ai.createCanvas(columns*size+5, rows*size+5);
		ai.background(0);
		for (var i = 0; i < columns; i++) {
			grid[i] = [];
			unvisited[i] = [];
			for (var j = 0; j < rows; j++) {
				grid[i][j] = new Cell(i, j);
				unvisited[i][j] = grid[i][j].visited;
			}
		}
		//Initialize Neighbor function
		for (var i = 0; i < columns; i++) {
			for (var j = 0; j < rows; j++) {
				grid[i][j].createNeighbors();
			}
		}
		//Initializing initial cell
		initial = grid[0][0];
		initial.visited = true;
		unvisited[0][0] = true;
		current = initial;
		//Initializing A* Algorithm stuff
		start = grid[0][0];
		end = grid[columns -1][rows - 1];
		openSet.push(start);
	}

	ai.draw = function (){
		//flag for whether to continue the algorithm or not.
		ai.background(0);

		for (var i = 0; i < unvisited.length; i++) {
			if(unvisited[i].includes(false)){
				flag = true;
			}
		}
		if (flag == true){
			//Check for unvisited neighbors
			//flag
			var unvisitedNeighbors = false;
			var unvisitedArray = [];
			for (var i = 0; i < current.neighbors.length; i++) {
				if (current.neighbors[i] != undefined && current.neighbors[i].visited == false) {
					unvisitedNeighbors = true;
					unvisitedArray.push(i);
				}
			}
			//If there are still neighbors that havent been visited
			if (unvisitedNeighbors == true) {
				var number = ai.round(ai.random(0, unvisitedArray.length - 1));
				// console.log(number);
				// console.log(unvisitedArray[number]);
				//remove wall between current cell and chosen cell
				current.walls[unvisitedArray[number]] = false;
				//If unvisited Array [number] is odd
				if (unvisitedArray[number]%2 == 0) {
					//works only for top and bottom
					current.neighbors[unvisitedArray[number]].walls[ai.abs(unvisitedArray[number] - 2)] = false;	
				} else if (unvisitedArray[number] == 1) {	
					current.neighbors[unvisitedArray[number]].walls[ai.abs(unvisitedArray[number] + 2)] = false;
				} else {
					current.neighbors[unvisitedArray[number]].walls[ai.abs(unvisitedArray[number] - 2)] = false;
				}
				
				stack.push(current);
				current = current.neighbors[unvisitedArray[number]];
				// console.log(current);
				current.visited = true;
				unvisited[current.x][current.y] = true;
			}
			//If stack is not empty, this part is for going backwards
			else if(stack.length > 0){
				var popped = stack.pop();
				console.log(stack);
				// console.log(popped);
				current = popped;
			}
			if (stack.length == 0) {
				console.log("Finished");
				flag = false;
				ai.noLoop();
				for (var i = 0; i < columns; i++) {
					for (var j = 0; j < rows; j++) {
						grid[i][j].createAvailableNeighbors();
					}
				}
			}
		}
		for (var i = 0; i < columns; i++) {
			for (var j = 0; j < rows; j++) {
				if (grid[i][j].visited) {
					ai.noStroke();
					ai.fill(200, 0, 150);
					ai.rect(i*size, j*size, size, size);
				}
				grid[i][j].show(ai);
			}
		}
		ai.noStroke();
		ai.fill(0, 255, 0);
		ai.rect(current.x*size, current.y*size, size, size);

		if (flag === false && aStar === false) {
			ai.frameRate(4*level);
				//A* Algorithm starts here:
			if (openSet.length > 0){
				//current is the lowest F of the open Set
				var lowest = 0;
				for (var i = 0; i < openSet.length; i++) {
					if (openSet[lowest].f > openSet[i].f) {
						lowest = i;
					}
				}
				current = openSet[lowest];

				removeFromArray(openSet, current);
				closedSet.push(current);
				var tempG;
				//for every neighbor of the current node:
				for (var i = 0; i < current.neighbors.length; i++) {
					var neighbor = current.neighbors[i];
					if (neighbor == undefined) {
						continue;
					}
					if (current.walls[i]) {
						continue;
					}
					console.log(neighbor);
					if (closedSet.includes(neighbor)) {
						continue;
					} 
					//Temp G is the current g plus the distance of the neighbor from current
					tempG = current.g + 1;
					var newPath = false;
					if (openSet.includes(neighbor)) {
						if (tempG < neighbor.g) {
							neighbor.g = tempG;
							newPath = true;
						} 
					} else{
						neighbor.g = tempG;
						openSet.push(neighbor);
						newPath = true;
					}
					if (newPath) {
						neighbor.previous = current;
						neighbor.h = heuristic(neighbor, end, ai);
						neighbor.f = neighbor.g + neighbor.h;
					}
				}
				path = [];
				var temp = current;
				path.push(temp);
				while(temp.previous){
					path.push(temp.previous);
					temp = temp.previous;
				}
				console.log(path);
				if (current === end) {
					console.log(start);
					console.log(end);
					console.log("DONE");
					doneFlag = true;
					aStar = true;
					//break;
					
				}

			}
			//Find the path
			// path = [];
			// var temp = current;
			// path.push(temp);
			// while(temp.previous){
			// 	path.push(temp.previous);
			// 	temp = temp.previous;
			// }
			// console.log(path);

			//visualize the grid
			for (var i = 0; i < columns; i++) {
				for (var j = 0; j < rows; j++) {
					var x = grid[i][j].x;
					var y = grid[i][j].y;
					ai.noFill();
					ai.noStroke();
					ai.rect(x*size, y*size, size, size);
					if (closedSet.includes(grid[i][j])) {
						ai.fill(255, 0, 0);
						ai.rect(x*size, y*size, size, size);
					}
					if (openSet.includes(grid[i][j])) {
						ai.fill(0, 255, 0);
						ai.rect(x*size, y*size, size, size);
					}
					grid[i][j].show(ai);
				}
			}
			
			for (var i = 0; i < path.length-1; i++) {
				var x = path[i].x;
				var y = path[i].y;
				var x1 = path[i+1].x;
				var y1 = path[i+1].y;
				ai.stroke(0, 0, 255);
				ai.strokeWeight(5);
				ai.line(x*size+size/2, y*size+size/2, x1*size+size/2, y1*size+size/2);
			}
			if (doneFlag) {
				if (current != end) {
					console.log("No Solution");
				}
				aStar = true;
				winnerFlag = false;
			}
		}
		if (winnerFlag) {
			ai.textSize(32)
			ai.fill(0,255,0);
			ai.text("A.I. Lost... ", 50, 50);
			ai.text("So saaaddd... :'(", 50, 90);
			ai.noLoop();
		}
		if (winnerFlag == false){
			console.log("hi");
			ai.textSize(32)
			ai.fill(0,255,0);
			ai.text("Hah even Humanity", 50, 50);
			ai.text(" can't beat an A.I.!", 60,90);
			ai.text("Our dream of world", 50, 150);
			ai.text("conquest is near!", 70 ,190);
			ai.noLoop();
		}
	}
	ai.mousePressed = function(){
		if (flag == false && aStar == undefined) {
			ai.loop();
			aStar = false;
		}
	}
}

var player = function (plyr){
	plyr.setup = function (){
		//Making the grid:
		plyr.frameRate(120);
		plyr.createCanvas(columns*size+5, rows*size+5);
		plyr.background(0);
		pointer = new Pointer(grid[0][0]);
	}
	plyr.draw = function (){
		console.log("YEEEEET");
		//flag for whether to continue the algorithm or not.
		plyr.background(0);
		for (var i = 0; i < columns; i++) {
			for (var j = 0; j < rows; j++) {
				if (grid[i][j].visited) {
					plyr.noStroke();
					plyr.fill(200, 0, 150);
					plyr.rect(i*size, j*size, size, size);
				}
				grid[i][j].show(plyr);
			}
		}
		if (pointer.path[pointer.path.length-1].x == columns-1 && pointer.path[pointer.path.length-1].y == rows-1) {
			winnerFlag = true;
		}
		//Drawing the pointer of the player maze
		var randWhile = true;
		while (randWhile){
			var x1; 
			var y1;
			for (var i = 0; i < pointer.path.length; i++) {
				var x2 = pointer.path[i].x;
				var y2 = pointer.path[i].y;
				plyr.stroke(0, 0, 255);
				plyr.strokeWeight(5);
				plyr.line(x1*size+size/2, y1*size+size/2, x2*size+size/2, y2*size+size/2);	
				if (i+1 == pointer.path.length) {
					plyr.circle(x2*size+size/2, y2*size+size/2, size-10);
					randWhile = false;
				}
				if (pointer.path.length <= 1) {
					continue;
				}
				x1 = x2;
				y1 = y2;
			}
		}
		if (plyr.mouseIsPressed) {
			// console.log("Mouse Pressed");
			oriMouseX = plyr.mouseX;
			oriMouseY = plyr.mouseY;
			if (mouseInCanvas(oriMouseX, oriMouseY)) {
				followMouse(oriMouseX, oriMouseY);
			}
			// console.log(pointer.path);
		}
		if (winnerFlag) {
			plyr.textSize(32)
			plyr.fill(255, 255, 255);
			plyr.text("You Won!", 120, 200);
			plyr.noLoop();
		}
		if (winnerFlag == false){
			console.log("hi");
			plyr.textSize(32)
			plyr.fill(255, 255, 255);
			plyr.text("You lose...", 120, 200);
			plyr.noLoop();
		}
	}
}
/*
Pointer Function(s)
*/
function mouseInCanvas(mouseX, mouseY){
	if (mouseX > columns*size+5) {
		return false;
	}
	if (mouseY >  rows*size+5) {
		return false;
	}
	else{
		return true;
	}
}
function followMouse(mouseX, mouseY){
	//Original divided by cell size and round down = cell location
	var cellX = Math.floor(mouseX/size);
	var cellY = Math.floor(mouseY/size);
	if (cellX > columns-1) {
		cellX = columns-1;
		// console.log("CellX is " + cellX );
	}
	if (cellY > rows-1) {
		cellY = rows-1;
	}
	if (mouseX < 0) {
		cellX = 0;
	}
	if (mouseY < 0) {
		cellY = 0;
	}
	
	var currentCell = grid[cellX][cellY];
	//If mouse position is in the pointer path array, 
	if (pointer.path.includes(currentCell) && pointer.path[pointer.path.length-1] != currentCell) {
		//pop the path until it reaches the position the mouse is on.
		while(pointer.path[pointer.path.length-1] != currentCell){
			pointer.path.pop();
		}
	}
	else if (!pointer.path.includes(currentCell)) {
		var pathSize = pointer.path.length;
		if (pointer.path[pathSize-1].realNeighbors.includes(currentCell)) {
			pointer.path.push(currentCell);	
			console.log("moving");
		}
	}
		
	console.log(currentCell);
	//If MouseX minus Original (the difference) is greater than 0 
	
		//then difference divided by the cell size rounding off becomes the nr. of cells away from the original cell.
		//
}
/*
A* Algorithm Functions
*/
function removeFromArray(arr, elt){
	for (var i = arr.length - 1; i >= 0; i--) {
		if (arr[i] == elt) {
			arr.splice(i, 1);
		}
	}
}

function heuristic(a, b, canvas){
	var d = canvas.dist(a.x, a.y, b.x, b.y);
	return d;
}

var ai_sketch = new p5(aiSketch, "ai_sketch");
var player_sketch = new p5(player, "player_sketch");

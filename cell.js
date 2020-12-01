function Cell(i, j){
	this.x = i;
	this.y = j;
	//walls for Top, right, bottom , left
	this.walls = [true, true, true, true];
	//Has this cell been visited before?
	this.visited = false;
	//Array of neighbours
	this.neighbors = [];
	//Array of neighbors you can actually go to
	this.realNeighbors = [];
	
	//A* Algorithm properties.
	this.f = 0;
	this.g = 0;
	this.h = 0;
	
	//Create the neighbours
	this.createNeighbors = function(){
		//Top
		if (this.y-1 < 0){
			this.neighbors.push(undefined);
		} else{
			this.neighbors.push(grid[this.x][this.y - 1]);
		}
		//Right
		if (this.x+1 >= columns) {
			this.neighbors.push(undefined);
		} else {
			this.neighbors.push(grid[this.x + 1][this.y]);
		}
		//Bottom
		if (this.y+1 >= rows){
			this.neighbors.push(undefined);
		} else {
			this.neighbors.push(grid[this.x][this.y + 1]);
		}
		// Left
		if (this.x-1 < 0){
			this.neighbors.push(undefined);
		} else {
			this.neighbors.push(grid[this.x - 1][this.y]);
		}
	}

	this.createAvailableNeighbors = function(){
		for (var i = 0; i < this.neighbors.length; i++) {
			if (this.neighbors[i] != undefined) {
				if (this.walls[i] != true) {
					this.realNeighbors.push(this.neighbors[i]);
				}
			}
			
		}
	}

	this.show = function(canvas){
		canvas.noStroke();
		canvas.strokeWeight(1);
		//Top
		if (this.walls[0] == true) {
			canvas.stroke(255);
			canvas.line(this.x*size,this.y*size,this.x*size+size,this.y*size);
		}
		//Right
		if (this.walls[1] == true) {
			canvas.stroke(255);
			canvas.line(this.x*size+size,this.y*size,this.x*size+size,this.y*size+size);
		}
		//Bottom
		if (this.walls[2] == true) {
			canvas.stroke(255);
			canvas.line(this.x*size+size,this.y*size+size,this.x*size,this.y*size+size);
		}
		//Left
		if (this.walls[3] == true) {
			canvas.stroke(255);
			canvas.line(this.x*size,this.y*size,this.x*size,this.y*size+size);
		}
	}
}
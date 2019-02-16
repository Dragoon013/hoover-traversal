const fs = require('fs');
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

class Vertex {
    constructor(x,y,dirt, bot) {
	this.x = x;
	this.y = y;
	this.dirt = dirt;
	this.bot = bot;
    }
}

const server = http.createServer(function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    

    //array directions contains each line in an array
    directions = parseFile();
    map = createRoom(directions);
    result = traverseRoom(map);

    console.log(result[0], result[1]);
    res.end("hello");
});


server.listen(port, hostname, function() {
  console.log('Server running at http://'+ hostname + ':' + port + '/');
});

//parse the local file
function parseFile() {
    
    try {  
	var data = fs.readFileSync('file1.txt', 'utf8');
	return data.split('\n');
    } catch(e) {
	console.log('Error:', e.stack);
    }

}

function traverseRoom(map){

    var hMap = map[0];
    var bounds = map[1];
    var route = map[2];

    console.log(hMap,bounds, route)
    
    //now we need to follow the route to get the result
    var dirtCleaned = 0; // count of dirt patches cleaned
    var botPos = new Array(); //tbd on position
    
    hMap.forEach(function (arrayItem) {
	if (arrayItem.bot === true){ 
	    botPos = [arrayItem.x, arrayItem.y]
	}
    });
    
    for (var i = 0; i<=route.length; i++){
	var x = botPos[0]
	var y = botPos[1]


	if (typeof route[i] === 'undefined'){ //check for undefined
	    
	    break;
	}
	
	switch (route[i].toLowerCase()) {
	case "n":
	    //need to check bounds and dirt in all cases before setting new value
	    if (checkBounds(bounds, x, y+1)) break; //out of bounds check

	    dirty = checkDirt(hMap,x,y+1);
	    
	    if (dirty[1]) {
		hmap = dirty[0]; //new dirt values
		dirtCleaned++;
	    }
	    
	    botPos[1] += 1;
	    break; 
	case "e":
	    if (checkBounds(bounds, x+1, y)) break;

	    dirty = checkDirt(hMap,x+1,y);
	    
	    if (dirty[1]) {
		hmap = dirty[0]; //new dirt values
		dirtCleaned++;
	    }
	    
	    botPos[0] += 1;
	    break; 
	case "w":
	    if (checkBounds(bounds, x-1, y)) break; 

	    dirty = checkDirt(hMap,x-1,y);
	    
	    if (dirty[1]) {
		hmap = dirty[0]; //new dirt values
		dirtCleaned++;
	    }
	    
	    botPos[0] -= 1;
	    break; 
	case "s":
	    if (checkBounds(bounds, x, y-1)) break; 
	    
	    dirty = checkDirt(hMap,x,y-1);
	    
	    if (dirty[1]) {
		hmap = dirty[0]; //new dirt values
		dirtCleaned++;
	    }

	    botPos[1] -= 1;
	    break; 
	default: 
	    text = "Something went wrong. This shouldn't be here: " + route[i];    
	}
	console.log(botPos);
    }    
    return [botPos, dirtCleaned]
}

function checkBounds(bounds, x, y) {

    //x bound
    if (x > bounds[0] || x < 0){
	return true;
    }else if (y > bounds[1] || y < 0){ //y bound
	return true;
    }
    return false;
}

//this just adjusts value in the map
function checkDirt(map, x, y){

    var found = false;
    map.forEach(function (arrayItem) {	
	if (arrayItem.x == x && arrayItem.y == y && arrayItem.dirt === true){ 
	    found = true;
	    arrayItem.dirt = false;
	}
    });
    return [map, found];
}

function createRoom(directions){

    var route = new Array();
    var hMap = new Array();
    var bounds = new Array();
    
    for (var i = 0; i<=directions.length; i++){

	if (typeof directions[i] === 'undefined'){ //check for undefined
	    
	    break;
	    
	}else if (directions[i] === ''){//is there an empty line? do nothing 
	    
	    continue;
	    
	}else if (i === 0){ //first line is room dimension
	    //create the map keys with empty values
	    numbers = directions[i].split(" ") //ought to look like ['5','5'] now
	    bounds = [parseInt(numbers[0],10), parseInt(numbers[1],10)]
	    
	    boundX = bounds[0];
	    boundY = bounds[1];
	    
	    for (var j=0; j<=boundX; j++){

		for (var k = 0; k<=boundY; k++){
		    vertex = new Vertex(j,k,false, false);
		    hMap.push(vertex);
		}
	    }
	    console.log("first");
	} else if (i === 1){     //second line is hoover position
 	    console.log("second");
	    botPos = directions[i].split(" ");
	    var x = parseInt(botPos[0],10);
	    var y = parseInt(botPos[1],10);
	    
	    hMap.forEach(function (arrayItem) {
		if (arrayItem.x === x && arrayItem.y === y){ 
		    arrayItem.bot = true;
		}
	    });
	}else if (directions[i].match(/[nwes]/i)){ // direction line
	    //store the directions for later
	    route = directions[i].split('');
	    console.log("direction");
	}else{ //else it is a middle line and we need to finish drawing the map //dirt positions

	    dirtPos = directions[i].split(" ");
	    var x = parseInt(dirtPos[0],10);
	    var y = parseInt(dirtPos[1],10);
	    
	    hMap.forEach(function (arrayItem) {
		if (arrayItem.x === x && arrayItem.y === y){ 
		    arrayItem.dirt = true;
		}
	    });
	    console.log("map");
	}
    }
    
    //return the map, the bounds, and the route
    return [hMap, bounds, route];
}

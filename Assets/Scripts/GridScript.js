#pragma downcast

var gridPiece : Transform;
var exitPiece : Transform;
var startPiece : Transform;

function Start () {
	var currentPosition : Vector2 = Vector2(100, 100);
	var list : Array = [currentPosition];
	var map : int[,] = new int[200,200];
	var count = 0;
	
	while((list.length > 0 || count < 500) && count < 1500) {
		var newPosition : Vector2 = list.shift();
		var emptySpaces = CheckAllAround(map, newPosition);
		var numberOfTilesAround = 8 - emptySpaces.length;
		count += 1;
		
		if (numberOfTilesAround == 0) {
			addToList(list, emptySpaces);
		} else if (numberOfTilesAround == 1) {
			if (Random.Range(0.0, 1.0) < 0.90) {
				list.push(CheckSingleTile(map, newPosition) + newPosition);
			} else {
				addToList(list, emptySpaces);
			}
		} else {
			if (Random.Range(0.0, 1.0) < 0.70) {
				addToList(list, emptySpaces);
			}
		}
		if (list.length == 0 && count < 500) {
			for (var i : int = 0; i < emptySpaces.length; i++) {
				list.push(emptySpaces[i]);
			}
		}
		if ((list.length == 0 && count >= 500) || count > 1500) {
			setExit(map, newPosition);
			Instantiate(exitPiece, newPosition, Quaternion.identity);
		} else if (count == 1) {
			setStart(map, newPosition);
			Instantiate(startPiece, newPosition, Quaternion.identity);
		} else {
			setBlock(map, newPosition);
			Instantiate(gridPiece, newPosition, Quaternion.identity);
		}
	}
	setExit(map, newPosition);
	Debug.Log("Number of Tiles: " + count);
}

function RandomizeArray(arr : Array) {
    for (var i = arr.length - 1; i > 0; i--) {
        var r = Random.Range(0,i);
        var tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
    }
}

function addToList(list : Array, emptySpaces : Array) {
	var chooseRandomTiles : int = Random.Range(0, emptySpaces.length-1);
	
	for(var i : int = 0; i < chooseRandomTiles; i++) {
		list.push(emptySpaces[i]);
	}
}

function setStart (arr : int[,], pos : Vector2) {
	arr[pos.x, pos.y] = 1;
}

function setBlock (arr : int[,], pos : Vector2) {
	arr[pos.x, pos.y] = 2;
}

function setExit (arr : int[,], pos : Vector2) {
	arr[pos.x, pos.y] = 3;
}

function CheckSingleTile (arr : int[,], pos : Vector2) : Vector2 {
	var returnVec : Vector2;
	if (arr[pos.x, pos.y - 1] == 1) {
		returnVec = Vector2(0, -1);
	}
	if (arr[pos.x - 1, pos.y] == 1) {
		returnVec = Vector2(-1, 0);
	}
	if (arr[pos.x + 1, pos.y] == 1) {
		returnVec = Vector2(1, 0);
	}
	if (arr[pos.x, pos.y + 1] == 1) {
		returnVec = Vector2(0, 1);
	}
	return returnVec;
}

function CheckAllAround (arr : int[,], pos : Vector2) : Array {
	var tiles : Array = new Array();
	Debug.Log("x: " + pos.x + " y: " + pos.y);
	if (pos.x == 99 || pos.y == 99 || pos.x == 0 || pos.y == 0) {
		return tiles;
	}
	if (arr[pos.x - 1, pos.y - 1] == 0) {
		tiles.push(Vector2(pos.x - 1, pos.y - 1));
	}
	if (arr[pos.x, pos.y - 1] == 0) {
		tiles.push(Vector2(pos.x, pos.y - 1));
	}
	if (arr[pos.x + 1, pos.y - 1] == 0) {
		tiles.push(Vector2(pos.x + 1, pos.y - 1));
	}
	if (arr[pos.x - 1, pos.y] == 0) {
		tiles.push(Vector2(pos.x - 1, pos.y));
	}
	if (arr[pos.x + 1, pos.y] == 0) {
		tiles.push(Vector2(pos.x + 1, pos.y));
	}
	if (arr[pos.x - 1, pos.y + 1] == 0) {
		tiles.push(Vector2(pos.x - 1, pos.y + 1));
	}
	if (arr[pos.x, pos.y + 1] == 0) {
		tiles.push(Vector2(pos.x, pos.y + 1));
	}
	if (arr[pos.x + 1, pos.y + 1] == 0) {
		tiles.push(Vector2(pos.x + 1, pos.y + 1));
	}
	
	RandomizeArray(tiles);
	return tiles;
}
#pragma downcast

public var gridPiece : Transform;
public var exitPiece : Transform;
public var startPiece : Transform;

function getWallRangeBelow (map : int[,], currentPos : Vector2, currentSize : int) : Array {
	var startX : int = currentPos.x;
	var intersectArray : Array = [0,0];
	for (var i : int = 0; i < currentSize; i++) {
		if(currentPos.y - 2 < 0) {
			continue;
		}
		if(map[startX + i, currentPos.y - 2] == 1 && map[startX + i, currentPos.y] == 1) {
			if (intersectArray[0] == 0) {
				intersectArray[0] = startX + i;
			} else {
				intersectArray[1] = startX + i;
			}
		}
	}
	return intersectArray;
}

function getWallRangeLeft (map : int[,], currentPos : Vector2, currentSize : int) : Array {
	var startY : int = currentPos.y;
	var intersectArray : Array = [0,0];
	for (var i : int = 0; i < currentSize; i++) {
		if(currentPos.x - 2 < 0) {
			continue;
		}
		if(map[currentPos.x - 2, startY + i] == 1 && map[currentPos.x, startY + i] == 1) {
			if (intersectArray[0] == 0) {
				intersectArray[0] = startY + i;
			} else {
				intersectArray[1] = startY + i;
			}
		}
	}
	return intersectArray;
}

function BuildRoomUp (map : int[,], rPos : Vector2, size : int) {
	var returnVector;
	if (map[rPos.x, rPos.y + size + 1] == 0) {
		for(var i : int = 0; i < size; i++) {
			for(var j : int = 0; j < size; j++) {
				tilePos = new Vector2(i,j);
				if(map[rPos.x + i, rPos.y + j] != 1) {
					map[rPos.x + i, rPos.y + j] = 1;
					Instantiate(gridPiece, rPos + tilePos, Quaternion.identity);
				}
			}		
		}
		returnVector = new Vector2(rPos.x, rPos.y + size + 1);
	} else {
		returnVector = null;
	}
	
	if (rPos.x != 0 || rPos.y != 0) {
		// set Door
		var wallRange = getWallRangeBelow(map, rPos, size);
//		Debug.Log('WallRange: ' + wallRange);
		if (wallRange[0] != 0 && wallRange[1] != 0) {
			var doorPosX : int = Random.Range(wallRange[0], wallRange[1]);
			var doorVec2 : Vector2 = new Vector2(doorPosX, rPos.y - 1);
			Instantiate(gridPiece, doorVec2, Quaternion.identity);
		}
	}
	
	return returnVector;
}

function BuildRoomRight (map : int[,], rPos : Vector2, size : int) {
	var returnVector;

	if (map[rPos.x + size + 1, rPos.y] == 0) {
		for(var i : int = 0; i < size; i++) {
			for(var j : int = 0; j < size; j++) {
				tilePos = new Vector2(i,j);
				if(map[rPos.x + i, rPos.y + j] != 1) {
					map[rPos.x + i, rPos.y + j] = 1;
					Instantiate(gridPiece, rPos + tilePos, Quaternion.identity);
				} else {
					return null;
				}
			}		
		}
		returnVector = new Vector2(rPos.x + size + 1, rPos.y);
	} else {
		returnVector = null;
	}

	if (rPos.x != 0 || rPos.y != 0) {
		// set Door
		var wallRange = getWallRangeLeft(map, rPos, size);
		if (wallRange[0] != 0 && wallRange[1] != 0) {
			var doorPosY = Random.Range(wallRange[0], wallRange[1]);
			var doorVec2 = new Vector2(rPos.x - 1, doorPosY);
			Instantiate(gridPiece, doorVec2, Quaternion.identity);
		}
	}
	
	return returnVector;
}

function Start () {
	var map : int[,] = new int[200,200];
	var roomsArray : Array = [];
	var currentPosition : Vector2;
	currentPosition.x = 0;
	currentPosition.y = 0;
	var count = 1;
//	var newPos : Vector2;
//	newPos = BuildRoomRight(map, currentPosition, 2);
//	BuildRoomRight(map, newPos, 2);
//	BuildRoomUp(map, newPos, 2);
	roomsArray.push(currentPosition);
//	
	while (roomsArray.length > 0 && count < 50) {
		var newPos = roomsArray.shift();
		if (newPos == null && roomsArray.length == 0) {
			roomsArray.push(currentPosition);
		} else if (newPos == null) {
			continue;
		} else {
			currentPosition = newPos;
		}
		
//		Debug.Log("RoomsLength: " + roomsArray);
		if (Random.Range(0.0, 1.0) < 0.4 && roomsArray.length > 2) {
			continue;	
		}
		if (count == 1) {
			roomsArray.push(BuildRoomUp(map, currentPosition, Random.Range(4,8)));
			count += 1;
		} else {
			roomsArray.push(BuildRoomRight(map, currentPosition, Random.Range(4,8)));
			roomsArray.push(BuildRoomUp(map, currentPosition, Random.Range(4,8)));
			count += 2;
		}
	}
//	var currentPosition : Vector2 = Vector2(100, 100);
//	var list : Array = [currentPosition];
//	var map : int[,] = new int[200,200];
//	var count = 0;
//	
//	while((list.length > 0 || count < 500) && count < 1500) {
//		var newPosition : Vector2 = list.shift();
//		var emptySpaces = CheckAllAround(map, newPosition);
//		var numberOfTilesAround = 8 - emptySpaces.length;
//		count += 1;
//		
//		if (numberOfTilesAround == 0) {
//			addToList(list, emptySpaces);
//		} else if (numberOfTilesAround == 1) {
//			if (Random.Range(0.0, 1.0) < 0.90) {
//				list.push(CheckSingleTile(map, newPosition) + newPosition);
//			} else {
//				addToList(list, emptySpaces);
//			}
//		} else {
//			if (Random.Range(0.0, 1.0) < 0.70) {
//				addToList(list, emptySpaces);
//			}
//		}
//		if (list.length == 0 && count < 500) {
//			for (var i : int = 0; i < emptySpaces.length; i++) {
//				list.push(emptySpaces[i]);
//			}
//		}
//		if ((list.length == 0 && count >= 500) || count > 1500) {
//			setExit(map, newPosition);
//			Instantiate(exitPiece, newPosition, Quaternion.identity);
//		} else if (count == 1) {
//			setStart(map, newPosition);
//			Instantiate(startPiece, newPosition, Quaternion.identity);
//		} else {
//			setBlock(map, newPosition);
//			Instantiate(gridPiece, newPosition, Quaternion.identity);
//		}
//	}
//	setExit(map, newPosition);
//	Debug.Log("Number of Tiles: " + count);
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
	if (arr[pos.x, pos.y - 1] == 1) {
		return Vector2(0, -1);
	}
	if (arr[pos.x - 1, pos.y] == 1) {
		return Vector2(-1, 0);
	}
	if (arr[pos.x + 1, pos.y] == 1) {
		return Vector2(1, 0);
	}
	if (arr[pos.x, pos.y + 1] == 1) {
		return Vector2(0, 1);
	}
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
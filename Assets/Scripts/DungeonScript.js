#pragma downcast

public var gridPiece : Transform;
public var exitPiece : Transform;
public var startPiece : Transform;
public var monsterScript : MonsterScript;
monsterScript = GetComponent("MonsterScript");

function getWallRangeBelow (currentPos : Vector2, currentSize : int) : int[] {
	var startX : int = currentPos.x;
	var intersectArray : int[] = new int[2];
	for (var i : int = 0; i < currentSize; i++) {
		if(currentPos.y - 2 < 0) {
			continue;
		}
		if(GameState.map[startX + i, currentPos.y - 2] == 1 && GameState.map[startX + i, currentPos.y] == 1) {
			if (intersectArray[0] == 0) {
				intersectArray[0] = startX + i;
			} else {
				intersectArray[1] = startX + i;
			}
		}
	}
	return intersectArray;
}

function getWallRangeLeft (currentPos : Vector2, currentSize : int) : int[] {
	var startY : int = currentPos.y;
	var intersectArray : int[] = new int[2];
	for (var i : int = 0; i < currentSize; i++) {
		if(currentPos.x - 2 < 0) {
			continue;
		}
		if(GameState.map[currentPos.x - 2, startY + i] == 1 && GameState.map[currentPos.x, startY + i] == 1) {
			if (intersectArray[0] == 0) {
				intersectArray[0] = startY + i;
			} else {
				intersectArray[1] = startY + i;
			}
		}
	}
	return intersectArray;
}

function BuildRoomUp (rPos : Vector2, size : int) {
	var returnVector;
	var tilePos : Vector2;
	
	if (GameState.map[rPos.x, rPos.y + size + 1] == 0) {
		for(var i : int = 0; i < size; i++) {
			for(var j : int = 0; j < size; j++) {
				tilePos = new Vector2(i,j);
				if(GameState.map[rPos.x + i, rPos.y + j] != 1) {
					GameState.map[rPos.x + i, rPos.y + j] = 1;
					Instantiate(gridPiece, rPos + tilePos, Quaternion.identity);
					monsterScript.CreateMonster(new Vector2(rPos.x + i, rPos.y + j));
				}
			}		
		}
		returnVector = new Vector2(rPos.x, rPos.y + size + 1);
	} else {
		returnVector = null;
	}
	
	if (rPos.x != 0 || rPos.y != 0) {
		// set Door
		var wallRange : int[] = getWallRangeBelow(rPos, size);
		if (wallRange[0] != 0 && wallRange[1] != 0) {
			var doorPosX : int = Random.Range(wallRange[0], wallRange[1]);
			var doorVec2 : Vector2 = new Vector2(doorPosX, rPos.y - 1);
			Instantiate(gridPiece, doorVec2, Quaternion.identity);
		}
	}
	
	return returnVector;
}

function BuildRoomRight (rPos : Vector2, size : int) {
	var returnVector;
	var tilePos : Vector2;
	if (GameState.map[rPos.x + size + 1, rPos.y] == 0) {
		for(var i : int = 0; i < size; i++) {
			for(var j : int = 0; j < size; j++) {
				tilePos = new Vector2(i,j);
				if(GameState.map[rPos.x + i, rPos.y + j] != 1) {
					GameState.map[rPos.x + i, rPos.y + j] = 1;
					Instantiate(gridPiece, rPos + tilePos, Quaternion.identity);
					monsterScript.CreateMonster(new Vector2(rPos.x + i, rPos.y + j));
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
		var wallRange : int[] = getWallRangeLeft(rPos, size);
		if (wallRange[0] != 0 && wallRange[1] != 0) {
			var doorPosY = Random.Range(wallRange[0], wallRange[1]);
			var doorVec2 = new Vector2(rPos.x - 1, doorPosY);
			Instantiate(gridPiece, doorVec2, Quaternion.identity);
		}
	}
	
	return returnVector;
}

function Start () {
	var roomsArray : Array = [];
	var currentPosition : Vector2;
	currentPosition.x = 0;
	currentPosition.y = 0;
	var count = 1;
	roomsArray.push(currentPosition);
	while (roomsArray.length > 0 && count < 20) {
		var newPos = roomsArray.shift();
		if (newPos == null && roomsArray.length == 0) {
			roomsArray.push(currentPosition);
		} else if (newPos == null) {
			continue;
		} else {
			currentPosition = newPos;
		}
		
		if (Random.Range(0.0, 1.0) < 0.4 && roomsArray.length > 2) {
			continue;	
		}
		if (count == 1) {
			roomsArray.push(BuildRoomUp(currentPosition, Random.Range(4,8)));
			count += 1;
		} else {
			roomsArray.push(BuildRoomRight(currentPosition, Random.Range(4,8)));
			roomsArray.push(BuildRoomUp(currentPosition, Random.Range(4,8)));
			count += 2;
		}
	}
}

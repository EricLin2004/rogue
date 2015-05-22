#pragma strict

static class GameState {
	public var map : Tile[,] = new Tile[200,200];
	public var player : Player;
	
	function move(vec : Vector2) {
		if ((Mathf.Abs(player.Position.x - vec.x) == 1 && Mathf.Abs(player.Position.y - vec.y) == 0) ||
			(Mathf.Abs(player.Position.x - vec.x) == 0 && Mathf.Abs(player.Position.y - vec.y) == 1)){
			if (!map[vec.x, vec.y].unit) {
				player.Move(vec);	
			} else {
				player.attackOther(map[vec.x, vec.y].unit);
			}
		}
	}
	
	function monsterTurn() {
		for(var i : int = 0; i < this.map.GetLength(0) - 1; i++) {
			for(var j : int = 0; j < this.map.GetLength(1) - 1; j++) {
				if (map[i, j].unit) {
					randomMove(map[i, j].unit);
				}
			}
		}
	}
	
	function randomMove(mob : Monster) {
		if ((Mathf.Abs(mob.position.x - player.position.x) == 1 && mob.position.y == player.position.y) ||
			(Mathf.Abs(mob.position.y - player.position.y) == 1 && mob.position.x == player.position.x)) {
			mob.attackOther(player);
		} else {	
			var possibleMoves = findAvailablePositions(mob.position);
			if (possibleMoves.length > 0) {
				var move : Vector2 = possibleMoves[Random.Range(0, possibleMoves.length-1)];
				map[mob.position.x, mob.position.y].unit = null;
				map[move.x, move.y].unit = mob;
				mob.position = move;
				mob.sprite.transform.position = move;
			}
		}
	}
	
	function findAvailablePositions(vec : Vector2) : Array {
		var resultArr = new Array();
		if(vec.x != 0 && map[vec.x - 1, vec.y].EnvironmentType == TileType.Ground && !map[vec.x - 1, vec.y].unit) {
			resultArr.push(new Vector2(vec.x - 1, vec.y));	
		}
		if(vec.x != 199 && map[vec.x + 1, vec.y].EnvironmentType == TileType.Ground && !map[vec.x + 1, vec.y].unit) {
			resultArr.push(new Vector2(vec.x + 1, vec.y));
		}
		if(vec.y != 199 && map[vec.x, vec.y + 1].EnvironmentType == TileType.Ground && !map[vec.x, vec.y + 1].unit ) {
			resultArr.push(new Vector2(vec.x, vec.y + 1));
		}
		if(vec.y != 0 && map[vec.x, vec.y - 1].EnvironmentType == TileType.Ground && !map[vec.x, vec.y - 1].unit) {
			resultArr.push(new Vector2(vec.x, vec.y - 1));
		}
		return resultArr;
	}
}
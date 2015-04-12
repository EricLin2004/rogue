#pragma strict

static class GameState {
	public var map : int[,] = new int[200,200];
	public var monsters : Monster[,] = new Monster[200,200];
	public var player : Player;
	
	function move(vec : Vector2) {
		if ((Mathf.Abs(player.Position.x - vec.x) == 1 && Mathf.Abs(player.Position.y - vec.y) == 0) ||
			(Mathf.Abs(player.Position.x - vec.x) == 0 && Mathf.Abs(player.Position.y - vec.y) == 1)){
			if (!monsters[vec.x, vec.y]) {
				player.Move(vec);	
			} else {
				player.attackOther(monsters[vec.x, vec.y]);
			}
		}
	}
	
	function monsterTurn() {
		for(var i : int = 0; i < this.monsters.Length; i++) {
			for(var j : int = 0; j < this.monsters.Length; j++) {
				if (monsters[i, j]) {
					randomMove(monsters[i, j]);
				}
			}
		}
	}
	
	function randomMove(mob : Monster) {
		
	}
	
	function findAvailablePositions(vec : Vector2) : Array {
		var resultArr = new Array();
		if(!map[vec.x - 1, vec.y]) {
			resultArr.push(new Vector2(vec.x - 1, vec.y));	
		}
		if(!map[vec.x + 1, vec.y]) {
			resultArr.push(new Vector2(vec.x + 1, vec.y));
		}
		if(!map[vec.x, vec.y + 1]) {
			resultArr.push(new Vector2(vec.x, vec.y + 1));
		}
		if(!map[vec.x, vec.y - 1]) {
			resultArr.push(new Vector2(vec.x, vec.y - 1));
		}
		return resultArr;
	}
}
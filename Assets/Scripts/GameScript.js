#pragma strict

static class GameState {
	public var map : int[,] = new int[200,200];
	public var player : Player;
	
	function move(vec : Vector2) {
		if((Mathf.Abs(player.Position.x - vec.x) == 1 && Mathf.Abs(player.Position.y - vec.y) == 0) ||
			(Mathf.Abs(player.Position.x - vec.x) == 0 && Mathf.Abs(player.Position.y - vec.y) == 1)){
			player.Move(vec);	
		}
	}
}

function Update () {

}
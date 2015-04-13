#pragma strict

function OnMouseDown() {
	if (CheckDistance(GameObject.Find("PlayerPiece(Clone)"), this.gameObject)) {
		var newVec : Vector2;
		
		newVec = this.gameObject.transform.position;
		GameState.move(newVec);
		GameState.monsterTurn();
	} else {
//		this.gameObject.transform.position;	
	}
}

function CheckDistance(player : GameObject, go : GameObject) {
	return Mathf.Abs(go.transform.position.x - player.transform.position.x) + Mathf.Abs(go.transform.position.y - player.transform.position.y) == 1;
}
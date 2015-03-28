#pragma strict

function OnMouseDown() {
	Debug.Log("Inside mousedown");
	if (CheckDistance(GameObject.Find("PlayerPiece(Clone)"), this.gameObject)) {
		var newVec : Vector2;
		
		newVec = this.gameObject.transform.position;
		GameState.move(newVec);
	}
}

function CheckDistance(player : GameObject, go : GameObject) {
	return Mathf.Abs(go.transform.position.x - player.transform.position.x) + Mathf.Abs(go.transform.position.y - player.transform.position.y) == 1;
}
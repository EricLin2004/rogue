#pragma strict

function OnMouseDown() {
	Debug.Log(CheckMonsterTile(this.gameObject));
	if (CheckDistance(GameObject.Find("PlayerPiece(Clone)"), this.gameObject)) {
		var newVec : Vector2;
		
		newVec = this.gameObject.transform.position;
		GameState.move(newVec);
		GameState.monsterTurn();
	} else if (CheckMonsterTile(this.gameObject)) {
		var mob = CheckMonsterTile(this.gameObject);
		mob.healthSlider.value = Mathf.Floor((mob.currentLife * 100) / mob.overallStats.life);
	}
}

function CheckDistance(player : GameObject, go : GameObject) {
	return Mathf.Abs(go.transform.position.x - player.transform.position.x) + Mathf.Abs(go.transform.position.y - player.transform.position.y) == 1;
}

function CheckMonsterTile(targetTile : GameObject) {
	return GameState.map[targetTile.transform.position.x, targetTile.transform.position.y].unit;
}
#pragma strict

function OnMouseDown() {
	Debug.Log("Clicking tile: " + this.gameObject);
	Debug.Log(this.gameObject.transform.position);
}
#pragma strict
var gridPiece : Transform;

function Start () {
	for (var y = 0; y < 5; y++) {
	    for (var x = 0; x < 5; x++) {
	        Instantiate(gridPiece, Vector3 (x*2, y*2, 0), Quaternion.identity);
	    }
	}
}
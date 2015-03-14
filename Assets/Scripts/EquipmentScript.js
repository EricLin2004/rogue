//#pragma strict
//
//private var totalGear : Hashtable = new Hashtable();
//private var chest : GameObject;
//private var legs : GameObject;
//private var wrists : GameObject;
//private var gloves : GameObject;
//private var feet : GameObject;
//private var hat : GameObject;
//private var rings : GameObject[];
//private var earrings : GameObject[];
//
//function Equip (piece : GameObject) {
//	totalGear[piece.type] = piece;
//}
//
//function Remove (piece : GameObject) {
//	totalGear[piece.type] = null;
//}
//
//function GetPiece (name : String) : GameObject {
//	return current[name];
//}
//
//function GetCurrent () : Hashtable {
//	var current = new Hashtable();
//	current.Add("chest", chest);
//	current.Add("legs", legs);
//	current.Add("wrists", wrists);
//	current.Add("gloves", gloves);
//	current.Add("feet", feet);
//	current.Add("hat", hat);
//	current.Add("rings", rings);
//	current.Add("earrings", earrings);
//	return current;
//}
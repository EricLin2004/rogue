#pragma strict

class Equipment {
	private var totalGear : Hashtable = new Hashtable();
	private var chest : Item;
	private var legs : Item;
	private var wrists : Item;
	private var gloves : Item;
	private var feet : Item;
	private var hat : Item;
	private var rings : Item[];
	private var earrings : Item[];

function Equip (piece : Item) : Item {
	totalGear[piece.getType()] = piece;
	return piece;
}

function Remove (piece : Item) : Item {
	totalGear[piece.getType()] = null;
	return piece;
}

//function GetPiece (name : String) : Item {
//	return totalGear[name];
//}

function GetCurrent () : Hashtable {
	var current = new Hashtable();
	current.Add("chest", chest);
	current.Add("legs", legs);
	current.Add("wrists", wrists);
	current.Add("gloves", gloves);
	current.Add("feet", feet);
	current.Add("hat", hat);
	current.Add("rings", rings);
	current.Add("earrings", earrings);
	return current;
}
}

function Awake () {
}
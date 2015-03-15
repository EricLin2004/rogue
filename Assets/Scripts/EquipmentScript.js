#pragma strict
//class Item {
//	private var name : String;
//	private var type : String;
//	private var armorValue : int;
//	private var weaponValue : int;
//	private var itemId : int;
//}

private var item : ItemScript;
private var totalGear : Hashtable = new Hashtable();
private var chest : Item;
private var legs : Item;
private var wrists : Item;
private var gloves : Item;
private var feet : Item;
private var hat : Item;
private var rings : Item[];
private var earrings : Item[];

function Awake () {
	item = GetComponent(ItemScript);
}

function Equip (piece : Item) : Item {
	totalGear[piece.type] = piece;
	return piece;
}

function Remove (piece : Item) : Item {
	totalGear[piece.type] = null;
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
#pragma downcast

class Equipment {
	private var totalGear : Hashtable = new Hashtable();
	private var lhand : Item = new Item("lhand");
	private var rhand : Item = new Item("rhand");
	private var chest : Item = new Item("chest");
	private var legs : Item = new Item("legs");
	private var wrists : Item = new Item("wrists");
	private var gloves : Item = new Item("gloves");
	private var feet : Item = new Item("feet");
	private var hat : Item = new Item("hat");
//	private var rings : Item[];
//	private var earrings : Item[];
	
	function equipItem (piece : Item) : Item {
		Debug.Log("Piece type: " + piece.getType());
		totalGear[piece.getType()] = piece;
		return piece;
	}

	function removeItem (piece : Item) : Item {
		totalGear[piece.getType()] = null;
		return piece;
	}

	function getPiece (name : String) : Item {
		return totalGear[name];
	}

	function getCurrent () : Hashtable {
		return totalGear;
	}
}
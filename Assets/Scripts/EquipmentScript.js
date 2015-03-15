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
	private var lRing : Item = new Item("lRing");
	private var rRing : Item = new Item("rRing");
	private var lEar : Item = new Item("lEar");
	private var rEar : Item = new Item("rEar");
	
	function equipItem (piece : Item) : Item {
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
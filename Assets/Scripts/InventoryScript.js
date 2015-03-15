#pragma strict

class Inventory {
	private var gold : int = 0;
	private var bagSize : int = 10;
	private var bagContents : Array = new Array(10);
	
	function set Gold (value : int) {
		gold += value;
	}
	
	function get Gold () : int {
		return gold;
	}
	
	function set BagSize (value : int) {
		bagSize = value;
	}
	
	function get BagSize () : int {
		return bagSize;
	}
	
	function get RemainingSpace () : int {
		return bagSize - bagContents.length;
	}
	
	function addToInventory (item : Item) : boolean {
		for(var i = 0; i < bagContents.length; i++) {
			if (!bagContents[i]) {
				bagContents[i] = item;
				return true;
			}
		}
		Debug.Log("Bag is full");
		return false;
	}
	
	function removeFromInventory (item : Item) : void {
		for(var i = 0; i < bagContents.length; i++) {
			if (item === bagContents[i]) {
				bagContents[i] = null;
				break;
			}
		}
	}

	function checkItem (item : Item) : boolean {
		for(var i = 0; i < bagContents.length; i++) {
			if (item === bagContents[i]) {
				return true;
			}
		}
		return false;
	}
	
	function get InventoryContents () : Array {
		return bagContents;
	}
}
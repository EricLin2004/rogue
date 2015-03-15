#pragma strict

class Inventory {
	private var gold : int = 0;
	private var bagSize : int = 10;
	private var bagContents : Array;
	
	function addGold (num : int) : int {
		gold += num;
		return gold;
	}
	
	function removeGold (num : int) : int {
		gold -= num;
		return gold;
	}
	
	function setBagSize (num : int) : int {
		bagSize = num;
		return bagSize;	
	}
	
	function getBagSize () : int {
		return bagSize;
	}
	
	function getRemainingSpace () : int {
		return bagSize - bagContents.length;
	}
	
	function addToInventory (item : Item) : void {
		if (bagContents.length >= bagSize) {
			return;
		}
		for(var i = 0; i < bagContents.length; i++) {
			if (!bagContents[i]) {
				bagContents[i] = item;
				break;
			}
		}
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
	
	function getInventoryContents () : Array {
		return bagContents;
	}
}
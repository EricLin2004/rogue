#pragma strict

class Inventory {
	private var bagSize : int = 10;
	
	function setBagSize (num : int) : int {
		bagSize = num;
		return bagSize;	
	}

	function getBagSize () : int {
		return bagSize;
	}
}

function Awake () {

}
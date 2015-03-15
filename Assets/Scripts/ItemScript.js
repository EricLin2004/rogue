#pragma strict

class Item {
	private var name : String;
	private var type : String;
	private var defenseValue : int;
	private var attackValue : int;
	private var lifeValue : int;
	private var itemId : int;
	
	function getType () : String {
		return type;
	}
	
	function getName () : String {
		return name;
	}
	
	function getDefense () : int {
		return defenseValue;
	}
	
	function getAttack () : int {
		return attackValue;
	}
	
	function getLife () : int {
		return lifeValue;
	}
	
	function getId () : int {
		return itemId;
	}
}

function Awake () {

}
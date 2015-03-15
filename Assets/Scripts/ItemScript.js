#pragma strict

class Item {
	private var name : String;
	private var type : String;
	private var defenseValue : int;
	private var attackValue : int;
	private var lifeValue : int;
	private var id : int;
	private var durability : int;
	private var quality : String;
	private var treasureColor : String;
	
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
		return id;
	}
	
	function getDurability () : int {
		return durability;
	}
	
	function getQuality () : String {
		return quality;
	}
	
	function getTreasureColor () : String {
		return treasureColor;
	}
}
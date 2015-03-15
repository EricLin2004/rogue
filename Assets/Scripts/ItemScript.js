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
	
	function Item (ty : String, na : String, dv : int, av : int, lv : int, dur : int, qua : String, tc : String) {
		name = na || "Bare";
		type = ty;
		defenseValue = dv || 0;
		attackValue = av || 0;
		lifeValue = lv || 0;
		durability = dur || 0;
		quality = qua;
		treasureColor = tc;
	}

	function Item (ty : String) {
		name = "Bare";
		type = ty;
		defenseValue = 0;
		attackValue = 0;
		lifeValue = 0;
	}
	
	function get Type () : String {
		return type;
	}
	
	function get Name () : String {
		return name;
	}
	
	function get Defense () : int {
		return defenseValue;
	}
	
	function get Attack () : int {
		return attackValue;
	}
	
	function get Life () : int {
		return lifeValue;
	}
	
	function get Id () : int {
		return id;
	}
	
	function get Durability () : int {
		return durability;
	}
	
	function get Quality () : String {
		return quality;
	}
	
	function get TreasureColor () : String {
		return treasureColor;
	}
}
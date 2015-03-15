#pragma strict

class Stats {
	public var attack : int;
	public var defense : int;
	public var life : int;
}

private var inventory : InventoryScript;
private var equipment : EquipmentScript;
private var currentPosition : Vector2 = new Vector2(0,0);

// Overall stats
private var overallStats = new Stats();
private var baseStats = new Stats();
private var itemStats = new Stats();

private var level : int = 1;
private var experience : int = 0;
private var currentLife : int;

function healDamage (val : int) : int {
	currentLife += val;
	if (currentLife > overallStats.life) {
		currentLife = overallStats.life;
	}
	return currentLife;
}

function takeDamage (val : int) {
	currentLife -= val;
}

function levelUp () {
	baseStats.attack += 2;
	baseStats.defense += 2;
	baseStats.life += 10;
}

function updateBaseStats () : Stats {
	baseStats.attack = 10;
	baseStats.defense = 10;
	baseStats.life = 100;
	return baseStats;
}

function updateItemStats () : Stats {
	itemStats.attack = 0;
	itemStats.defense = 0;
	itemStats.life = 0;
	
	// Go through all gear.
//	var currentGear = equipment.GetCurrent();
//	for(var piece in currentGear) {
//		itemStats.attack += piece.attack;
//		itemStats.defense += piece.defense;
//		itemStats.life += piece.life;
//	}
	
	return itemStats;
}

function updateStats () : Stats {
	updateBaseStats();
	updateItemStats();
	
	overallStats.attack = itemStats.attack + baseStats.attack;
	overallStats.defense = itemStats.defense + baseStats.defense;
	overallStats.life = itemStats.life + baseStats.life;
	return overallStats;
}

//function EquipItem (item : GameObject) {
//	equipment.Equip(item);
//}
//
//function UnequipItem (item : GameObject) {
//	equipment.Remove(item);
//}
//
//function GetEquipment () : Hashtable {
//	return equipment.GetCurrent();
//}

function Move (pos : Vector2) {
	currentPosition += pos;
}

function Awake () {
	inventory = GetComponent(InventoryScript);
	equipment = GetComponent(EquipmentScript);
}

function Start () {
//	Debug.Log("Running start PlayerScript");
//	Debug.Log("Player BagSize: " + inventory.getBagSize());
//	inventory.setBagSize(12);
//	Debug.Log("Player BagSize: " + inventory.getBagSize());
}

function Update () {
//	if (currentLife <= 0) {
//		Debug.Log("Dead");
//	}
}
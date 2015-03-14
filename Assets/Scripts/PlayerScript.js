#pragma strict

private var inventory : InventoryScript;
//private var equipment : EquipmentScript;
private var currentPosition : Vector2 = new Vector2(0,0);

// Base stats
private var baseAttack : int = 100;
private var baseDefense : int = 10;
private var baseLife : int = 10;

private var level : int = 1;
private var experience : int = 0;

// Gear stats
private var equipAttack : int;
private var equipDefense : int;
private var equipLife : int;

private var currentLife : int;

function healDamage (val : int) {
	currentLife += val;
}

function takeDamage (val : int) {
	currentLife -= val;
}

function getMaxLife () : int {
	return baseLife + equipLife;
}

function levelUp () {
	baseLife += 10;
	baseAttack += 2;
	baseDefense += 2;
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
//	equipment = GetComponent(EquipmentScript);
	var hash = new Hashtable();
	hash["test"] = new Object();
	Debug.Log("hash" + hash["test"]);
}

function Start () {
//	Debug.Log("Running start PlayerScript");
//	Debug.Log("Player BagSize: " + inventory.getBagSize());
//	inventory.setBagSize(12);
//	Debug.Log("Player BagSize: " + inventory.getBagSize());
}

function Update () {
	if (currentLife <= 0) {
		Debug.Log("Dead");
	}
}
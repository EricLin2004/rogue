#pragma strict

private var inventory : InventoryScript;
private var equipment : EquipmentScript;

// Base stats
private var baseAttack : int = 100;
private var baseDefense : int = 10;
private var baselife : int = 10;

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

function equipItem (item : GameObject) {
	equipment.EquipItem(item);
}

function Awake () {
	inventory = GetComponent(InventoryScript);
	equipment = GetComponent(EquipmentScript);
}

function Start () {
	Debug.Log("Running start PlayerScript");
	Debug.Log("Player BagSize: " + inventory.getBagSize());
	inventory.setBagSize(12);
	Debug.Log("Player BagSize: " + inventory.getBagSize());
}

function Update () {
	if (currentLife <= 0) {
		Debug.Log("Dead");
	}
}
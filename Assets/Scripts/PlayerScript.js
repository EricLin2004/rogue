#pragma strict

private var inventory : InventoryScript;
private var equipment : EquipmentScript;

// Overall stats
private var attack : int;
private var defense : int;
private var life : int;

function setLife (currentLife : int) {
	life = currentLife;
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

}
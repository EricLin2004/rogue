﻿#pragma strict

class Stats {
	public var attack : int;
	public var defense : int;
	public var life : int;
}

class Player {
	private var currentPosition : Vector2 = new Vector2(0,0);
	public var equipment : Equipment = new Equipment();
	public var inventory : Inventory = new Inventory();
	
	// Overall stats
	private var overallStats = new Stats();
	private var baseStats = new Stats();
	private var itemStats = new Stats();

	private var level : int = 1;
	private var experience : int = 0;
	private var currentLife : int;
	
	function getDefense () : int {
		return overallStats.defense;
	}
	
	function getAttack () : int {
		return overallStats.attack;
	}
	
	function getMaxLife () : int {
		return overallStats.life;
	}
	
	function getCurrentLife () : int {
		return currentLife;
	}
	
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
	//		itemStats.attack += piece.getAttack();
	//		itemStats.defense += piece.getDefense();
	//		itemStats.life += piece.getLife();
	//	}
		
		return itemStats;
	}

	function updateStats () : Stats {
		updateBaseStats();
		updateItemStats();
		
		overallStats.attack = itemStats.attack + baseStats.attack;
		overallStats.defense = itemStats.defense + baseStats.defense;
		overallStats.life = itemStats.life + baseStats.life;
		
		if (!currentLife) {
			currentLife = overallStats.life;
		}
		
		return overallStats;
	}

	function EquipItem (item : Item) {
		equipment.Equip(item);
	}
	
	function UnequipItem (item : Item) {
		equipment.Remove(item);
	}
	
	function GetEquipment () : Hashtable {
		return equipment.GetCurrent();
	}

	function Move (pos : Vector2) {
		currentPosition += pos;
	}
}

private var player : Player;

function Awake () {
	 player = new Player();
}

function Start () {
	player.updateStats();
	Debug.Log("Running start PlayerScript");
	Debug.Log("Player bagsize: " + player.inventory.getBagSize());
	Debug.Log("Player attack: " + player.getAttack());
	Debug.Log("Player defense: " + player.getDefense());
	Debug.Log("Player currentLife: " + player.getCurrentLife());
	player.takeDamage(25);
	Debug.Log("Player currentLife: " + player.getCurrentLife());
	
}

function Update () {
//	if (currentLife <= 0) {
//		Debug.Log("Dead");
//	}
}
#pragma strict

class Stats {
	public var attack : int = 0;
	public var defense : int = 0;
	public var life : int = 0;
	public var criticalChance : double = 0.0;
	public var criticalDamage : double = 0.0;
	public var evasion : double = 0.0;
	public var accuracy : double = 0.0;	
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

	function attackOther (target : Monster) {
		var damageTaken : int;
		var targetDefense = target.getDefense();
		if (targetDefense >= overallStats.attack) {
			damageTaken = 1;
		} else {
			damageTaken = overallStats.attack - targetDefense;
		}
		target.takeDamage(damageTaken);
	}

	function updateBaseStats () : Stats {
		baseStats.attack = 10 + 2*level;
		baseStats.defense = 10 + 2*level;
		baseStats.life = 100 + 10*level;
		return baseStats;
	}

	function updateItemStats () : Stats {		
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

	function equipItem (item : Item) {
		if (inventory.checkItem(item)) {
			equipment.equipItem(item);
			inventory.removeFromInventory(item);
		} else {
			Debug.Log("Don't have item in bag");
		}
	}
	
	function unequipItem (item : Item) {
		if (inventory.getRemainingSpace() > 0) {
			equipment.removeItem(item);
			inventory.addToInventory(item);
		} else {
			Debug.Log("Bag is full, can't unequip");
		}
	}
	
	function getEquipment () : Hashtable {
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
//	Debug.Log("Running start PlayerScript");
//	Debug.Log("Player bagsize: " + player.inventory.getBagSize());
//	Debug.Log("Player attack: " + player.getAttack());
//	Debug.Log("Player defense: " + player.getDefense());
//	Debug.Log("Player currentLife: " + player.getCurrentLife());
//	player.takeDamage(25);
//	Debug.Log("Player currentLife: " + player.getCurrentLife());
//	var monster : Monster = new Monster();
//	monster.overallStats.life = 25;
//	monster.overallStats.defense = 3;
//	monster.overallStats.attack = 5;
//	monster.setStats();
//	
//	monster.attackOther(player);
//	player.attackOther(monster);
//	Debug.Log("monster health: " + monster.getCurrentLife());
//	Debug.Log("player health: " + player.getCurrentLife());
//	player.attackOther(monster);
//	Debug.Log("monster health: " + monster.getCurrentLife());
//	Debug.Log("player health: " + player.getCurrentLife());
}

function Update () {
//	if (currentLife <= 0) {
//		Debug.Log("Dead");
//	}
}
#pragma downcast

public var playerSprite : Transform;

class Player extends Unit {
	function Player (spr : Transform, pos : Vector2, os : Stats, lev : int, exp : int, gd : int, clf : int) {
		this.position = pos;
		this.overallStats = os;
		this.level = lev;
		this.experience = exp;
		this.gold = gd;
		this.currentLife = clf;
		this.sprite = spr;
	}

	function Player (spr : Transform, pos : Vector2, os : Stats, lev : int, exp : int, gd : int) {
		this.position = pos;
		this.overallStats = os;
		this.level = lev;
		this.experience = exp;
		this.gold = gd;
		this.currentLife = os.life;
		this.sprite = spr;
	}
	
	function Player () {
		this.position = new Vector2(0,0);
		this.overallStats = new Stats();
		this.level = 1;
		this.experience = 0;
		this.gold = 0;
	}

	function updateBaseStats () : Stats {
		baseStats.attack = 10 + 2*this.level;
		baseStats.defense = 10 + 2*this.level;
		baseStats.life = 100 + 10*this.level;
		return baseStats;
	}

	function updateItemStats () : Stats {		
		// Go through all gear.
		itemStats = new Stats();
		
		var currentGear = equipment.Current;
		for(var key in currentGear.Keys) {
			var currentItem : Item = currentGear[key];
			itemStats.attack += currentItem.Attack;
			itemStats.defense += currentItem.Defense;
			itemStats.life += currentItem.Life;
		}
		
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
			updateStats();
		} else {
			Debug.Log("Don't have item in bag");
		}
	}
	
	function unequipItem (item : Item) {
		if (inventory.RemainingSpace > 0) {
			equipment.removeItem(item);
			inventory.addToInventory(item);
		} else {
			Debug.Log("Bag is full, can't unequip");
		}
	}
}

private var player : Player;

function Awake () {
	 player = new Player(Instantiate(playerSprite, new Vector2(0,0), Quaternion.identity), new Vector2(0,0), new Stats(),  1, 0, 0);
}

function Start () {
	player.updateStats();
	Debug.Log("Running start PlayerScript");
	var monster : Monster = new Monster(new Stats(10, 10, 10), 1, 10, 10);
	
	monster.attackOther(player);
	player.attackOther(monster);
	Debug.Log("monster health: " + monster.CurrentLife);
	Debug.Log("player health: " + player.CurrentLife);
//	player.attackOther(monster);
//	Debug.Log("player health: " + player.CurrentLife);
//	Debug.Log("player attack: " + player.Attack);
	var sword = new Item("rhand", "Sword", 0, 10, 0, 10, "Common", "Blue");
	player.inventory.addToInventory(sword);
	player.equipItem(sword);
	Debug.Log("player attack: " + player.Attack);
	player.attackOther(monster);
	Debug.Log("monster def: " + monster.Defense);
	Debug.Log("monster health: " + monster.CurrentLife);
}
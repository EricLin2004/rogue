#pragma downcast
import UnityEngine.UI;

public var playerSprite : Transform;

class Player extends Unit {
	function Player (spr : Transform, os : Stats, lev : int, exp : int, gd : int, clf : int) {
		this.overallStats = os;
		this.level = lev;
		this.experience = exp;
		this.gold = gd;
		this.currentLife = clf;
		this.sprite = spr;
		this.position = new Vector2(spr.transform.position.x, spr.transform.position.y);
		this.healthSlider = GameObject.Find("PHealthSlider").GetComponent.<Slider>();
	}

	function Player (spr : Transform, os : Stats, lev : int, exp : int, gd : int) {
		this.overallStats = os;
		this.level = lev;
		this.experience = exp;
		this.gold = gd;
		this.sprite = spr;
		this.position = new Vector2(spr.transform.position.x, spr.transform.position.y);
		this.healthSlider = GameObject.Find("PHealthSlider").GetComponent.<Slider>();
	}
	
	function Player () {
		this.overallStats = new Stats();
		this.level = 1;
		this.experience = 0;
		this.gold = 0;
		this.position = new Vector2(0,0);
		this.healthSlider = GameObject.Find("PHealthSlider").GetComponent.<Slider>();
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

	function Move (pos : Vector2) {
		this.sprite.transform.position = pos;
		this.position = pos;
		Camera.main.transform.position = this.sprite.transform.position;
		Camera.main.transform.position.z = -1;
	}
	
	function get Position () : Vector2 {
		return this.position;
	}
}

function Awake () {
	 GameState.player = new Player(Instantiate(playerSprite, new Vector2(0,0), Quaternion.identity), new Stats(5,10,20),  1, 0, 0);
}

function Start () {
	GameState.player.updateStats();
}

function Update () {
	if (GameState.player.Experience > 30) {
		GameState.player.level += 1;
		GameState.player.experience -= 30;
		GameState.player.updateStats();
		GameState.player.currentLife = GameState.player.overallStats.life;
	}
}
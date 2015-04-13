#pragma downcast
import UnityEngine.UI;

class Unit {
	public var healthSlider : Slider;
	public var sprite : Transform;
	public var position : Vector2;
	public var equipment : Equipment = new Equipment();
	public var inventory : Inventory = new Inventory();
	
	// Overall stats
	public var overallStats = new Stats();
	public var baseStats = new Stats();
	public var itemStats = new Stats();

	public var level : int = 1;
	public var gold : int = 0;
	public var experience : int = 0;
	public var currentLife : int;
	
	function get Defense () : int {
		return overallStats.defense;
	}
	
	function get Attack () : int {
		return overallStats.attack;
	}
	
	function get MaxLife () : int {
		return overallStats.life;
	}
	
	function get CurrentLife () : int {
		return currentLife;
	}
	
	function get Position () : Vector2 {
		return position;
	}
	
	function get Experience () : int {
		return experience;
	}
	
	function get Level () : int {
		return level;
	}
	
	function healDamage (val : int) : int {
		this.currentLife += val;
		if (currentLife > overallStats.life) {
			currentLife = overallStats.life;
		}
		return currentLife;
	}

	function takeDamage (val : int) {
		currentLife -= val;
		healthSlider.value = Mathf.Floor((currentLife * 100) / overallStats.life);
	}

	function attackOther (target : Unit) {		
		var damageTaken : int;
		var targetDefense = target.Defense;
		if (targetDefense >= overallStats.attack) {
			damageTaken = 1;
		} else {
			damageTaken = overallStats.attack - targetDefense;
		}
		target.takeDamage(damageTaken);
		
		if (target.CurrentLife <= 0) {
			UnityEngine.Object.Destroy (target.sprite.gameObject);
			GameState.player.experience += GameState.monsters[target.Position.x, target.Position.y].Experience;
			GameState.monsters[target.Position.x, target.Position.y] = null;
		}
	}
}
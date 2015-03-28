#pragma downcast

class Unit {
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

	function attackOther (target : Unit) {		
		var damageTaken : int;
		var targetDefense = target.Defense;
		if (targetDefense >= overallStats.attack) {
			damageTaken = 1;
		} else {
			damageTaken = overallStats.attack - targetDefense;
		}
		target.takeDamage(damageTaken);

		GameObject.Find("EnemyText").GetComponent(UI.Text).text = "Enemy - Health: " + target.CurrentLife + " Atk: " + target.Attack + " Def: " + target.Defense;;
		GameObject.Find("PlayerText").GetComponent(UI.Text).text = "Player - Health: " + this.CurrentLife + " Atk: " + this.Attack + " Def: " + this.Defense;
		
		if (target.CurrentLife <= 0) {
			UnityEngine.Object.Destroy (target.sprite.gameObject);
			GameState.monsters[target.Position.x, target.Position.y] = null;
		}
	}
}
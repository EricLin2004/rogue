#pragma strict

class Monster {
	public var overallStats : Stats = new Stats();
	private var currentLife : int;
	
	private var level : int;
	private var experience : int;

	function attackOther (target : Player) {
		var damageTaken : int;
		var targetDefense = target.getDefense();
		if (targetDefense >= overallStats.attack) {
			damageTaken = 1;
		} else {
			damageTaken = overallStats.attack - targetDefense;
		}
		target.takeDamage(damageTaken);
	}
	
	function getDefense () {
		return overallStats.defense;
	}
	
	function takeDamage(attack : int) : int  {
		currentLife -= attack;
		return currentLife;
	}
	
	function getCurrentLife () : int {
		return currentLife;
	}
	
	function setStats () : int {
		if (!currentLife) {
			currentLife = overallStats.life;
		}
		return currentLife;
	}
}
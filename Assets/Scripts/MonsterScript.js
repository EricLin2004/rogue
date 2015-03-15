#pragma strict

class Monster {
	public var overallStats : Stats = new Stats();
	private var currentLife : int;

	private var level : int;
	private var experience : int;
	private var gold : int;
	
	function Monster (os : Stats, lev : int, exp : int, gd : int) {
		overallStats = os;
		level = lev;
		experience = exp;
		gold = gd;
	}
	
	function attackOther (target : Player) {
		var damageTaken : int;
		var targetDefense = target.Defense;
		if (targetDefense >= overallStats.attack) {
			damageTaken = 1;
		} else {
			damageTaken = overallStats.attack - targetDefense;
		}
		target.takeDamage(damageTaken);
	}
	
	function get Defense () {
		return overallStats.defense;
	}
	
	function takeDamage(attack : int) : int  {
		currentLife -= attack;
		return currentLife;
	}
	
	function get CurrentLife () : int {
		return currentLife;
	}
	
	function setStats () : int {
		if (!currentLife) {
			currentLife = overallStats.life;
		}
		return currentLife;
	}
}
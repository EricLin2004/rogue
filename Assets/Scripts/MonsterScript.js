#pragma strict

class Monster {
	private var life : int;
	private var attack : int;
	private var defense : int;

	private var level : int;
	private var experience : int;

	function Attack(target : Player) {
		var damageTaken : int;
		var targetDefense = target.getDefense();
		if (targetDefense >= attack) {
			damageTaken = 1;
		} else {
			damageTaken = attack - targetDefense;
		}
		target.takeDamage(damageTaken);
	}
}
#pragma downcast

class Stats {
	public var attack : int;
	public var defense : int;
	public var life : int;
	public var criticalChance : double;
	public var criticalDamage : double;
	public var evasion : double;
	public var accuracy : double;
	
	function Stats (atk : int, def : int, lf : int, critC : double, critD : double, eva : double, acc : double) {
		attack = atk;
		defense = def;
		life = lf;
		criticalChance = critC;
		criticalDamage = critD;
		evasion = eva;
		accuracy = acc;
	}

	function Stats (atk : int, def : int, lf : int) {
		attack = atk;
		defense = def;
		life = lf;
		criticalChance = 0.0;
		criticalDamage = 0.0;
		evasion = 0.0;
		accuracy = 0.0;
	}
	
	function Stats () {
		attack = 0;
		defense = 0;
		life = 0;
		criticalChance = 0.0;
		criticalDamage = 0.0;
		evasion = 0.0;
		accuracy = 0.0;
	}
}
#pragma strict

public var monsterSprite : Transform;

class Monster extends Unit {
	function Monster (spr : Transform, os : Stats, lev : int, exp : int, gd : int) {
		this.overallStats = os;
		this.level = lev;
		this.experience = exp;
		this.gold = gd;
		this.currentLife = overallStats.life;
		this.sprite = spr;
		this.position = new Vector2(spr.transform.position.x, spr.transform.position.y);
	}
	
	function Monster (spr : Transform, os : Stats, lev : int, exp : int, gd : int, clf : int) {
		this.overallStats = os;
		this.level = lev;
		this.experience = exp;
		this.gold = gd;
		this.currentLife = clf;
		this.sprite = spr;
		this.position = new Vector2(spr.transform.position.x, spr.transform.position.y);
	}
}

function Awake () {
	GameState.monsters[0,1] = new Monster(Instantiate(monsterSprite, new Vector2(0,1), Quaternion.identity), new Stats(10, 10, 100),  1, 0, 0);
}
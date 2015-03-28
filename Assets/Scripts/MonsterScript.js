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
	}
	
	function Monster (spr : Transform, os : Stats, lev : int, exp : int, gd : int, clf : int) {
		this.overallStats = os;
		this.level = lev;
		this.experience = exp;
		this.gold = gd;
		this.currentLife = clf;
		this.sprite = spr;
	}
}
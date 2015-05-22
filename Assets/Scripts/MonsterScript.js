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
		this.healthSlider = GameObject.Find("EHealthSlider").GetComponent.<Slider>();
	}
	
	function Monster (spr : Transform, os : Stats, lev : int, exp : int, gd : int, clf : int) {
		this.overallStats = os;
		this.level = lev;
		this.experience = exp;
		this.gold = gd;
		this.currentLife = clf;
		this.sprite = spr;
		this.position = new Vector2(spr.transform.position.x, spr.transform.position.y);
		this.healthSlider = GameObject.Find("EHealthSlider").GetComponent.<Slider>();
	}
}

function CreateMonster(vec : Vector2) {
	if (Random.Range(0.0,1.0) < 0.10) {
		GameState.map[vec.x, vec.y].unit = new Monster(Instantiate(monsterSprite, new Vector2(vec.x, vec.y), Quaternion.identity), new Stats(10, 5, 30),  1, 10, 0);
	}
}

function Awake () {
}
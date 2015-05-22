#pragma downcast

enum TileType{Ground, Wall, None};

class Tile {
	public var EnvironmentType : TileType;
	public var unit : Unit;
	
	function Tile () {
		this.EnvironmentType = TileType.None;
		this.unit = null;
	}
}
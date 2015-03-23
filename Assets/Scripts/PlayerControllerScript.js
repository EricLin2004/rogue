 var platform : RuntimePlatform = Application.platform;
 
 
 function Update(){
	if ( Input.GetMouseButtonDown(0)){
		var hit : RaycastHit;
		var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
		var select = GameObject.FindWithTag("Tile").transform;
		if (Physics.Raycast (ray, hit, 100.0)){
			select.tag = "Untagged";
			hit.collider.transform.tag = "Tile";
		}
		Debug.Log(select.transform.position);
	}
 }
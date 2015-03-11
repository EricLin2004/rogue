#pragma strict

private var bagSize : int = 10;


function Start () {

}

function Update () {

}

function setBagSize (num : int) : int {
	bagSize = num;
	return bagSize;	
}

function getBagSize () : int {
	return bagSize;
}
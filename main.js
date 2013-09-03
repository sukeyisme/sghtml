//* entry *//
function entry(){
	inner_entry();
	g_game =new SGGame();
}

//* inner_entry *//
function inner_entry(){
	var oCanvas =document.getElementById('canvas_main');
	console.assert(oCanvas, "your browser not support canvas");
	g_canvas =oCanvas.getContext("2d");
	setInterval(main_loop, 1);
}

//* main_loop *//
function main_loop(){
	g_game.update();
	g_game.show();
}

//* run *//
entry();
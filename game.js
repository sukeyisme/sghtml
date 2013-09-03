/*
** Game
** Author:别怀山
*/
//* ctor *//
function SGGame(){
	this.init();
}
SGGame.prototype ={};

//* init *//
SGGame.prototype.init =function(){
	this.Fps =new SGFps();
	this.CharacterManager =new SGCharacterManager;
	this.InputSys =new SGInputSys({
		Table:{
			List:[
				{
					List:['W'], Callback:function(){
						g_game.CharacterManager.Characters['fool'].Y -=1;
					}
				},
				{
					List:['A'], Callback:function(){
						g_game.CharacterManager.Characters['fool'].X -=1;
					}
				},
				{
					List:['S'], Callback:function(){
						g_game.CharacterManager.Characters['fool'].Y +=1;
					}
				},
				{
					List:['D'], Callback:function(){
						g_game.CharacterManager.Characters['fool'].X +=1;
					}
				}
			],
			Filter:{MouseMove:1,MouseDown:1,MouseUp:1,KeyUp:1}
		}
	});
	var player =new SGCharacter({Name:'fool', BodyImage:'player_body_img'});
	this.CharacterManager.add(player);
}

//* destroy *//
SGGame.prototype.destroy =function(){
	this.Fps.destroy();
	this.CharacterManager.destroy();
}

//* update *//
SGGame.prototype.update =function(){
	this.Fps.update();
	this.CharacterManager.update();
}

//* show *//
SGGame.prototype.show =function(){
	g_canvas.fillRect(0, 0, 2000, 2000);
	this.Fps.show();
	this.CharacterManager.show();
}
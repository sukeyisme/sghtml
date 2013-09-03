/**
** Character
** Author:别怀山
*/

//* ctor *//
function SGCharacter(oInfo){
	this.init(oInfo);
}
SGCharacter.prototype ={};

//* init *//
SGCharacter.prototype.init =function(oInfo){
	this.SoundManager =new SGPlayerManager(SGSoundPlayer);
	this.ImageManager =new SGPlayerManager(SGImageDrawer);
	this.Name =oInfo.Name;
	this.X =oInfo.X || 100;
	this.Y =oInfo.Y || 100;
	this.R =oInfo.R || 10;
	this.Alpha =oInfo.Alpha || 1;
	this.ImageManager.play(oInfo.BodyImage);
}

//* destroy *//
SGCharacter.prototype.destroy =function(){
	this.SoundManager.destroy();
	this.SoundManager =null;
	this.ImageManager.destroy();
	this.ImageManager =null;
}

//* update *//
SGCharacter.prototype.update =function(){
	this.SoundManager.update();
	this.ImageManager.update();
}

//* show *//
SGCharacter.prototype.show =function(){
	this.SoundManager.show(this);
	this.ImageManager.show(this);
}
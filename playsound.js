/*
** Play Sound
** Author:别怀山
*/
//* ctor *//
function SGSoundPlayer(szID){
	console.assert(szID && szID.length > 0, "id can't be empty");
	this.ResID =szID;
	this.Name =szID;
	this.init();
}
SGImageDrawer.prototype ={};

//* init *//
SGSoundPlayer.prototype.init =function(){
	var oEle =document.getElementById(this.ResID);
	console.assert(oEle, "Error#image not found:" + this.ResID);
	
	//try load
	if(oEle.nodeName == "AUDIO"){//image list
		this.Sound =oEle;
	}
}

//* destroy *//
SGSoundPlayer.prototype.destroy =function(){
	this.Sound =null;
}

//* update *//
SGSoundPlayer.prototype.update =function(fFT){
	//check
	if(null == this.Sound || this.Die)return;
	
	//update
}

//* show *//
SGSoundPlayer.prototype.show =function(oOwner){
}

//* play *//
SGSoundPlayer.prototype.play =function(){
	//check
	if(null == this.Sound || this.Die)return;
	this.Sound.play();
}

//* pause *//
SGSoundPlayer.prototype.pause =function(){
	//check
	if(null == this.Sound || this.Die)return;
	if(this.Sound.ended) return;
	this.Sound.pause();
}

//* resume *//
SGSoundPlayer.prototype.resume =function(){
	//check
	if(null == this.Sound || this.Die)return;
	if(this.Sound.paused) this.Sound.play();
}

//* stop *//
SGSoundPlayer.prototype.stop =function(){
	//check
	if(null == this.Sound || this.Die)return;
	this.Sound.stop();
}

//* reset *//
SGSoundPlayer.prototype.reset =function(){
	//check
	if(null == this.Sound || this.Die)return;
	this.Sound.currentTime =0;
}
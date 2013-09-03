/*
** CharacterManager
** Author:别怀山
*/
//* ctor *//
function SGCharacterManager(){
	this.init();
}
SGCharacterManager.prototype ={};

//* init *//
SGCharacterManager.prototype.init =function(){
	this.Characters ={};
}

//* destroy *//
SGCharacterManager.prototype.destroy =function(){
	this.Characters =null;
}

//* update *//
SGCharacterManager.prototype.update =function(){
	for(c in this.Characters){
		this.Characters[c].update();
	}
}

//* show *//
SGCharacterManager.prototype.show =function(){
	for(c in this.Characters){
		this.Characters[c].show();
	}
}

//* add *//
SGCharacterManager.prototype.add =function(c){
	console.assert(c, "not a validate object");
	if(this.Characters[c.Name]){
		console.warn("Already exist character:" + c.Name);
		return;
	}
	this.Characters[c.Name] =c;
}
SGCharacterManager.prototype.get =function(szName){
	console.assert(szName && szName.length, "not a validate name");
	if(!this.Characters[szName]){
		console.warn("Not exist character:" + szName);
		return null;
	}
	return this.Characters[szName];
}
SGCharacterManager.prototype.getLike =function(pattern){
	var  rt =[];
	for(c in this.Characters){
		if(pattern.test(c)){
			rt.push(this.Characters[c]);
		}
	}
	return rt;
}
SGCharacterManager.prototype.exists =function(szName){
	console.assert(szName && szName.length, "not a validate name");
	return this.Characters[szName] ? true : false;
}
SGCharacterManager.prototype.remove =function(szName){
	console.assert(szName && szName.length, "not a validate name");
	if(!this.Characters[szName]){
		console.warn("Not exist character:" + szName);
		return null;
	}
	this.Characters[szName].destroy();
	this.Characters[szName] =null;
}

//* draw *//
SGCharacterManager.prototype.draw =function(){
	for(c in this.Characters){
		this.Characters[c].draw();
	}
}


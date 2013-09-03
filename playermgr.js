/*
** SGPlayerManager
** Author:别怀山
*/
//* ctor *//
function SGPlayerManager(fnCreator){
	this._creator =fnCreator;
	console.assert(is_function(this._creator), "not a function");
	this.init();
}
SGPlayerManager.prototype ={};

//* init *//
SGPlayerManager.prototype.init =function(){
	for(p in this.Players){
		p.destroy();
	}
	this.Players ={};
}

//* destroy *//
SGPlayerManager.prototype.destroy =function(){
	this.Players =null;
}

//* update *//
SGPlayerManager.prototype.update =function(){
	for(p in this.Players){
		this.Players[p].update();
	}
}

//* show *//
SGPlayerManager.prototype.show =function(oOwner){
	for(p in this.Players){
		this.Players[p].show(oOwner);
	}
}

//* add & get & remove ... *//
SGPlayerManager.prototype.add =function(player){
	console.assert(player, "not a validate player");
	if(this.Players[player.Name]){
		console.warn("Already exist player:" + player.Name);
		return;
	}
	this.Players[player.Name] =player;
}
SGPlayerManager.prototype.get =function(szName){
	console.assert(szName && szName.length, "not a validate name");
	if(!this.Players[szName]){
		console.warn("Not exist character:" + szName);
		return null;
	}
	return this.Players[szName];
}
SGPlayerManager.prototype.getLike =function(pattern){
	console.assert(is_regexp(pattern), "not a validate regexp");
	var  rt =[];
	for(p in this.Players){
		if(pattern.test(p)){
			rt.push(this.Players[p]);
		}
	}
	return rt;
}
SGPlayerManager.prototype.exists =function(szName){
	console.assert(szName && szName.length, "not a validate name");
	return this.Players[szName] ? true : false;
}
SGPlayerManager.prototype.remove =function(szName){
	console.assert(szName && szName.length, "not a validate name");
	if(!this.Players[szName]){
		console.warn("Not exist player:" + szName);
		return null;
	}
	this.Players[szName].destroy();
	this.Players[szName] =null;
}

//* play & pause & resume & reset & stop *//
SGPlayerManager.prototype.play =function(szName, bForce){
	if(bForce){
		var oPlayer =new this._creator(szName);
		oPlayer.Name =gen_id();
		this.add(oPlayer);
		return oPlayer.Name;
	}
	else{
		if(this.exists(szName)) return;
		var oPlayer =new this._creator(szName);
		this.add(oPlayer);
		return oPlayer.Name;
	}
}
SGPlayerManager.prototype.pause =function(szName){
	if(is_string(szName)){
		if(this.Players[szName]){
			this.Players[szName].pause();
		}
	}
	else if(is_regexp(szName)){
		for(p in this.Players){
			if(szName.test(p)){
				this.Players[p].pause();
			}
		}
	}
}
SGPlayerManager.prototype.resume =function(szName){
	if(is_string(szName)){
		if(this.Players[szName]){
			this.Players[szName].resume();
		}
	}
	else if(is_regexp(szName)){
		for(p in this.Players){
			if(szName.test(p)){
				this.Players[p].resume();
			}
		}
	}
}
SGPlayerManager.prototype.reset =function(szName){
	if(is_string(szName)){
		if(this.Players[szName]){
			this.Players[szName].reset();
		}
	}
	else if(is_regexp(szName)){
		for(p in this.Players){
			if(szName.test(p)){
				this.Players[p].reset();
			}
		}
	}
}
SGPlayerManager.prototype.stop =function(szName){
	if(is_string(szName)){
		if(this.Players[szName]){
			this.Players[szName].stop();
		}
	}
	else if(is_regexp(szName)){
		for(p in this.Players){
			if(szName.test(p)){
				this.Players[p].stop();
			}
		}
	}
}



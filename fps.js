/*
** Fps
** Author:别怀山
*/
//* ctor *//
function SGFps(){
	this.init();
}
SGFps.prototype ={};
SGFps.GAP =1000;

//* init *//
SGFps.prototype.init =function(){
	//fps
	this.LastTime =new Date().getTime();
	this.CurrentTime =this.LastTime;
	this.FrameTime =0;
	this.TotalFrameCount =0;
	
	this.FrameElapseCount =0;
	this.FrameElapse =SGFps.GAP;
	this.Fps =0;
	
	//title tag
	this._oTitle =document.getElementsByTagName('title')[0];
}

//* destroy *//
SGFps.prototype.destroy =function(){

}

//* update *//
SGFps.prototype.update =function(){
	this.CurrentTime =new Date().getTime();
	this.FrameTime =this.CurrentTime - this.LastTime;
	this.TotalFrameCount +=1;
	this.LastTime =this.CurrentTime;
	
	this.FrameElapseCount +=1;
	this.FrameElapse -=this.FrameTime;
	if(this.FrameElapse <= 0){
		this.Fps =this.FrameElapseCount * 1000 / SGFps.GAP;
		this.FrameElapse =SGFps.GAP;
		this.FrameElapseCount =0;
	}
}

//* show *//
SGFps.prototype.show =function(){
	this._oTitle.text ="Fps:" + this.Fps;
}

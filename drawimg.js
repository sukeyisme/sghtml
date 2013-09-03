/*
** 2D Draw Image
** Author:别怀山
*/
//* ctor *//
function SGImageDrawer(szID){
	console.assert(szID && szID.length > 0, "id can't be empty");
	this.ResID =szID;
	this.Name =szID;
	this.init();
}
SGImageDrawer.prototype ={};

//* init *//
SGImageDrawer.prototype.init =function(){
	var oEle =document.getElementById(this.ResID);
	console.assert(oEle, "Error#image not found:" + this.ResID);
	
	//try load
	if(oEle.nodeName == "OL"){//image list
		this.ImageList =[];
		var iCnt =oEle.childNodes.length;
		for(var i=0; i<iCnt; ++i){
			var oNode =oEle.childNodes[i];
			if(oNode.nodeName == "IMG"){
				this.ImageList.push(oNode);
			}
		}
	}
	else if(oEle.nodeName == "IMG"){
		this.ImageList =[oEle];
	}
	//assert image list is not empty
	console.assert(this.ImageList && this.ImageList.length > 0, "Error#not loaded any image");
	this.ActiveImage =0;
	this.Timer =this.ImageList[0].getAttribute('Timer') || 0;
	this.Width =this.ImageList[0].width || 0;
	this.Height =this.ImageList[0].height || 0;
	this.Alpha =1;
	this.Loop =oEle.getAttribute("Loop");
}

//* destroy *//
SGImageDrawer.prototype.destroy =function(){
	this.ImageList =null;
}

//* update *//
SGImageDrawer.prototype.update =function(fFT){
	//check
	if(null == this.ImageList || this.Die || this.Pause)return;
	
	//update
	if(this.ImageList.length == 1)return;
	this.Timer -=fFT;
	if(this.Timer <= 0){
		this.ActiveImage +=1;
		if(this.ActiveImage == this.ImageList.length){
			if(this.Loop){
				this.ActiveImage =0;
			}
			else{
				this.Die =true;
			}
		}
		if(!this.Die)
			this.Timer =this.ImageList[this.ActiveImage].getAttribute('Timer') || 0;
	}
}

//* show *//
SGImageDrawer.prototype.show =function(oOwner){
	//check
	if(null == this.ImageList || this.Die)return;
	
	//draw
	var oImg =this.ImageList[this.ActiveImage];
	this.Alpha =oOwner.Alpha;
	this.Width =oOwner.R;
	this.Height =oOwner.R;
	g_canvas.globalAlpha =this.Alpha;
	g_canvas.drawImage(oImg, oOwner.X - this.Width/2, oOwner.Y - this.Height/2, this.Width, this.Height);
}


//* pause *//
SGImageDrawer.prototype.pause =function(x, y){
	//check
	if(null == this.ImageList || this.Die)return;
	this.Pause =true;
}

//* resume *//
SGImageDrawer.prototype.resume =function(){
	//check
	if(null == this.ImageList || this.Die)return;
	if(this.Pause){
		this.Pause =false;
	}
}

//* reset *//
SGImageDrawer.prototype.reset =function(){
	//check
	if(null == this.ImageList || this.Die)return;
	this.ActiveImage =0;
	this.Timer =this.ImageList[0].getAttribute('Timer') || 0;
}

//* stop *//
SGImageDrawer.prototype.stop =function(){
	this.Die =true;
}
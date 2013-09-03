/**
** InputSys
** Author:别怀山
*/

//* ctor *//
function SGInputSys(oInfo){
	this.init(oInfo);
}
SGInputSys.prototype ={};

//* init *//
SGInputSys.prototype.init =function(oInfo){
	//register input listener
	var oCanvas =document.getElementById('canvas_main');
	document.body.onkeydown =this._key_down_handler;
	document.body.onkeyup =this._key_up_handler;
	document.body.onmousedown =this._mouse_down_handler;
	document.body.onmouseup =this._moue_up_handler;
	document.body.onmousemove =this._moue_move_handler;
	
	//load event table
	this._root ={
		Type:'',
		RepeatCount : 1,
		RemainCount : 1
	};
	this._make_node_tree(oInfo.Table);
	this._root.Filter =oInfo.Table.Filter;
	this._active =this._root;
	this._last_time =new Date().getTime();
	console.assert(this._active, "not a validate event table");
	this._init_node(this._root);
}

//* destroy *//
SGInputSys.prototype.destroy =function(){
}

//* update *//
SGInputSys.prototype.update =function(){
}

//* show *//
SGInputSys.prototype.show =function(){
}

//* inner *//
SGInputSys.prototype._make_node_tree =function(oTable){
	var iCnt =oTable.List.length;
	for(var i=0; i<iCnt; ++i){
		this._insert_node(oTable.List[i]);
	}
}

SGInputSys.prototype._insert_node =function(oNodeList){
	var oTmpNode =this._root;
	var iCnt =oNodeList.List.length;
	for(var i=0; i<iCnt; ++i){
		var oNode =oNodeList.List[i];
		if(is_string(oNode)){
			var key =oNode;
			oNode ={Type:'KeyDown', Key:key};
		}
		oTmpNode =this._add_node(oTmpNode, oNode);
	}
	oTmpNode.Callback =oNodeList.Callback;
}
SGInputSys.prototype._init_node =function(oNode){
	oNode.Timer =oNode.Timer || 0;
	oNode.RepeatCount =oNode.RepeatCount || 1;
	oNode.Alt =oNode.Alt || false;
	oNode.Ctrl =oNode.Ctrl || false;
	oNode.Shift =oNode.Shift || false;
	oNode.Key =oNode.Key && oNode.Key.charCodeAt(0);
	if(oNode.Type == 'MouseDown' || oNode.Type == 'MouseUp' || oNode.Type == 'MouseMove'){
		oNode.X =oNode.X || 0;
		oNode.Y =oNode.Y || 0;
		oNode.Min =oNode.Min || 0;
		oNode.Max =oNode.Max || 0;
	}
	for(n in oNode.Next){
		this._init_node(oNode.Next[n]);
	}
}
SGInputSys.prototype._key_down_handler =function(oEvt){
	oEvt =oEvt || event;
	var key =oEvt.keyCode || oEvt.which || oEvt.charCode;
	g_game.InputSys._parse_input_event({Type:'KeyDown', Key:key, Alt:oEvt.altKey, Ctrl:oEvt.ctrlKey, Shift:oEvt.shiftKey});
}
SGInputSys.prototype._key_up_handler =function(oEvt){
	oEvt =oEvt || event;
	var key =oEvt.keyCode || oEvt.which || oEvt.charCode;
	g_game.InputSys._parse_input_event({Type:'KeyUp', Key:key, Alt:oEvt.altKey, Ctrl:oEvt.ctrlKey, Shift:oEvt.shiftKey});
}
SGInputSys.prototype._mouse_down_handler =function(oEvt){
	oEvt =oEvt || event;
	g_game.InputSys._parse_input_event({Type:'MouseDown', X:oEvt.x, Y:oEvt.y, Alt:oEvt.altKey, Ctrl:oEvt.ctrlKey, Shift:oEvt.shiftKey});
}
SGInputSys.prototype._moue_up_handler =function(oEvt){
	oEvt =oEvt || event;
	g_game.InputSys._parse_input_event({Type:'MouseUp', X:oEvt.x, Y:oEvt.y, Alt:oEvt.altKey, Ctrl:oEvt.ctrlKey, Shift:oEvt.shiftKey});
}
SGInputSys.prototype._moue_move_handler =function(oEvt){
	oEvt =oEvt || event;
	g_game.InputSys._parse_input_event({Type:'MouseMove', X:oEvt.x, Y:oEvt.y, Alt:oEvt.altKey, Ctrl:oEvt.ctrlKey, Shift:oEvt.shiftKey});
}

SGInputSys.prototype._parse_input_event =function(oInputEvt){
	var cur_time =new Date().getTime();
	
	//filter
	if(this._root.Filter && this._root.Filter[oInputEvt.Type]) return;
	
	//check timer
	if(this._active.Timer > 0 && this._active.Timer < (cur_time-this._last_time)){
		//time out
		console.info("time out");
		if(this.ontimeout){
			this.ontimeout(oInputEvt);
		}
		this._last_time =cur_time;
		this._active =this._root;
		return;
	}
	
	//check repeat count
	if(this._active.RemainCount>1){
		this._active.RemainCount -=1;
	}
	else{
		this._active.RemainCount =this._active.RepeatCount || 1;
		
		//forward
		var oNext =this._forward(this._active, oInputEvt);
		if(!oNext){
			//not expect
			console.info("not expect input:" + oInputEvt.Type + "#" + (String.fromCharCode(oInputEvt.Key) || (oInputEvt.Y + "," + oInputEvt.Y)));
			if(this.onnotexpect){
				this.onnotexpect(oInputEvt);
			}
			this._active =this._root;
			this._last_time =cur_time;
			return;
		}
		
		//try trigger
		if(oNext.Callback){
			oNext.Callback();
		}
		
		//next
		if(!oNext.Next || oNext.Next.length == 0){
			this._active =this._root;
		}
		else{
			this._active =oNext;
		}
		this._last_time =cur_time;
	}
}
SGInputSys.prototype._forward =function(oNode, oInputEvt){
	var iCnt =oNode.Next ? oNode.Next.length : 0;
	for(var i=0; i<iCnt; ++i){
		var oSub =oNode.Next[i];
		if(oInputEvt.Type != oSub.Type) continue;
		if(oNode.Alt != oInputEvt.Alt || oNode.Ctrl != oInputEvt.Ctrl || oNode.Shift != oInputEvt.Shift) continue;
		if(oInputEvt.Type == 'KeyDown' && oInputEvt.Key == oSub.Key){
			return oSub;
		}
		else if(oInputEvt.Type == 'KeyUp' && oInputEvt.Key == oSub.Key){
			return oSub;
		}
		else if(oInputEvt.Type == 'MouseDown' || oInputEvt.Type == 'MouseUp' || oInputEvt.Type == 'MouseMove'){
			var fXDelta =oInputEvt.X - oSub.X;
			var fYDelta =oInputEvt.Y - oSub.Y;
			var fDist =Math.sqrt(fXDelta*fXDelta + fYDelta*fYDelta);
			return fDist>=oSub.Min && fDist<=oSub.Max && oSub;
		}
	}
	return null;
}
SGInputSys.prototype._add_node =function(oNode, oData){
	var iCnt =oNode.Next ? oNode.Next.length : 0;
	for(var i=0; i<iCnt; ++i){
		var oSub =oNode.Next[i];
		if(oData.Type != oSub.Type) continue;
		if(oNode.Alt != oData.Alt || oNode.Ctrl != oData.Ctrl || oNode.Shift != oData.Shift) continue;
		if(oData.Type == 'KeyDown' && oData.Key == oSub.Key){
			return oSub;
		}
		else if(oData.Type == 'KeyUp' && oData.Key == oSub.Key){
			return oSub;
		}
		else if(oData.Type == 'MouseDown' || oData.Type == 'MouseUp' || oData.Type == 'MouseMove'){
			var fXDelta =oData.X - oSub.X;
			var fYDelta =oData.Y - oSub.Y;
			var fDist =Math.sqrt(fXDelta*fXDelta + fYDelta*fYDelta);
			return fDist>=oSub.Min && fDist<=oSub.Max && oSub;
		}
	}
	oNode.Next =oNode.Next || [];
	var oNew ={
		Type:oData.Type,
		Key :oData.Key || null,
		X :oData.X || 0,
		Y :oData.Y || 0,
		Min :oData.Min || 0,
		Max :oData.Max || 0,
		Timer :oData.Timer || 0,
		RepeatCount :oData.RepeatCount || 1,
		RemainCount :oData.RepeatCount || 1,
		Alt :oData.Alt || false,
		Ctrl :oData.Ctrl || false,
		Shift :oData.Shift || false
	};
	oNode.Next.push(oNew);
	return oNew;
}


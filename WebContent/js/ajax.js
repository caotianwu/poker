var ajax={
	JSON:1,
	HTML:2,
	request:null,
	callBackFun:null,
	createRequest:function(){
		if(window.ActiveXObject){
			ajax.request = new ActiveXObject("Microsoft.XMLHTTP");
		}else{
			ajax.request = new XMLHttpRequest();
		}
		return ajax.request;
	},
	callBack:function(){
		if(ajax.request){
			if(ajax.request.readyState==4&&ajax.request.status==200){
				var res = ajax.request.responseText;
				eval("var json ="+res);
				ajax.callBackFun(json);
			}
		}
	},
	send:function(url,data,fun,state){
		this.callBackFun=fun;
		//if(!ajax.request){
			ajax.createRequest();
		//}
		if(state==this.HTML){
			ajax.request.onreadystatechange=this.callBackFun;
		}else if(state==this.JSON){
			ajax.request.onreadystatechange=this.callBack;
		}
		ajax.request.open("POST",url,true);
		ajax.request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.request.send(data);
	}
};
var STATUS_WAIT=0;
var STATUS_READY=1;
var STATUS_STARTED=2;
var STATUS_QIANG=3;
var STATUS_PLAYING=4;
var STATUS_BREAK=5;
var STATUS_OVER=6;
// 创建扑克牌的层对象
if(!ajax){
	alert("请先导入文件(ajax.js)!");
}
function createCardDiv(card,id,click){
	var div = document.createElement("div");
	div.style.position="absolute";
	div.name="c";
	div.id=id;
	div.style.width=81;
	div.style.height=125;
	div.isup=false;
	div.innerHTML="<img border='1' src='images1/"+card.image+"'/>";
	div.setIndex=function(i){
		this.style.zIndex=i;
	};
	div.setPosition=function(p){
		div.style.position=p;
		return div;
	};
	div.setDisplay=function(dis){
		div.style.display=dis;
		return div;
	}
	div.getTop = function(){
		return this.style.pixelTop;
	};
	div.getLeft = function(){
		return this.style.pixelLeft;
	};
	div.setTop = function(top){
		this.style.pixelTop=top;
	};
	div.setLeft = function(left){
		this.style.pixelLeft=left;
	};
	div.up=function (){
		this.style.pixelTop -=25;
	};
	div.down = function(){
		this.style.pixelTop +=25;
	};
	if(click){
		div.onclick=function(event){
			if(!event){
				event = window.event;
			}
			if(event.button==2){
				return;
			}
			if(this.isup){
				this.down();
				this.isup=false;
				this.name="c";
			}else{
				this.up();
				this.isup=true;
				this.name="sc";
			}
		};
	}
	return div
}
var $=function(id){
	return document.getElementById(id);
}
var $n=function(name){
	return document.getElementsByName(name);
}
var $t = function(tname){
	return document.getElementsByTagName(tname);
}
// 验证出牌规则
/**
 * a单张(1)，b顺(5-) c对(2)，d双顺(6-) e三张(3)，f三带对(5)，g三带单(4)
 * h三顺2(6)，i三顺2带单(8)，j三顺2带双(10) k三顺3(9)，l三顺3带单(12)，m三顺3带双(15)
 * n三顺4(12)，o三顺4带单(16)，p三顺4带双(20) q三顺5(15)，r三顺5带单(20) s四带单(6)，t四带双(8)
 * u四炸(4)，v双王(2)
 */
function checkRule(ar){
	if(!rules){
		alert("请将文件(rules.js)先于本js文件导入，不然不能检查出牌规则");
		return null;
	}
	ar = sortShowCards(ar);
	return rules[ar.length](ar);
	
}
// 产生随机数0-10000
function random(){
	return new Date().getTime()%10000;
}


// 牌间距
var cardSpace=20;
// 牌宽
var cardWidth=81;
// 牌高
var cardHeight=125;
// 服务器地址
var url = "http://work/ddz/ddz";
// 服务端数据
var data;

function setUrl(url1){
	url=url1;
}
//重新开始初始化
function reStart(){
	$("myShow").innerHTML="";
	$("nextShow").innerHTML="";
	$("frontShow").innerHTML="";
	$("remainCard").innerHTML="";
	$("nextRemainCount").innerHTML="";
	$("frontRemainCount").innerHTML="";
	$("myDz").innerHTML="";
	$("nextDZ").innerHTML="";
	$("frontDZ").innerHTML="";
}
// 所有按钮失效
function closeButtons(){
	$("btn1").disabled=true;
	$("btn2").disabled=true;
	$("btn3").disabled=true;
	$("btnStart").disabled=true;
	$("btnPass").disabled=true;
	$("btnShow").disabled=true;
	$("btn0").disabled=true;
}
// 显示系统消息
function showSysMessage(d){
	if(d.sysMessage){
		$("sysMessage").innerHTML=d.sysMessage;
		return true;
	}else{
		return false;
	}
}
// 显示牌
function showMyCards(d){
	var player = d.currentPlayer;
	// 显示手里的牌
	var cards = player.cards;
	if(!cards){
		return;
	}
	showCards(cards,"myCard",true,"right");
}

// 为出过的牌进行排序（验证规则之前需要此操作）
function sortShowCards(cards){
	if(cards.length<4){
		return cards;
	}
	var newCards = [];// 重新排序后新的牌的数组
	var cardsArray=[];	// 存储每种值的牌
	var tempValue;
	// 数量多的牌在前面
	for(var i=0;i<cards.length;i++){
		if(cards[i].value!=tempValue){
			tempValue=cards[i].value;
			cardsArray.push([]);
		}
		cardsArray[cardsArray.length-1].push(cards[i]);
	}
	
	for(var i=0;i<cardsArray.length-1;i++){
		for(var j=i+1;j<cardsArray.length;j++){
			if(cardsArray[i].length<cardsArray[j].length){
				var temp = cardsArray[i];
				cardsArray[i]=cardsArray[j];
				cardsArray[j]=temp;
			}
		}
	}
	for(var i=0;i<cardsArray.length;i++){
		for(var j=0;j<cardsArray[i].length;j++){
			newCards.push(cardsArray[i][j]);
		}
	}
	return newCards;
}

// 显示消息
function showMessage(d){
	var player = d.nextPlayer;
	if(player){
		if(player.message||player.message==""){
			$("nextMessage").innerHTML=player.message;
		}
	}
	player = d.frontPlayer;
	if(player){
		if(player.message||player.message==""){
			$("frontMessage").innerHTML=player.message;
		}
	}
	player = d.currentPlayer;
	if(player){
		if(player.message||player.message==""){
			$("myMessage").innerHTML=player.message;
		}
	}

}
// 在指定位置显示牌,并指定牌是否有onclick事件,指定对齐方式
function showCards(cards,id,onclickable){
	if(!cards){
		return;
	}
	var div1 = document.createElement("div");
	div1.style.position="relative";
	div1.style.height=cardHeight;
	div1.style.width=cards.length*20+cardWidth;
	var cardsShowDiv =$(id);
	while(cardsShowDiv.firstChild){
		cardsShowDiv.removeChild(cardsShowDiv.firstChild);
	}
	
	for(var i=0;i<cards.length;i++){
		var d = createCardDiv(cards[i],i,onclickable);
		d.setLeft(cardSpace*i);
		div1.appendChild(d);
	}
	cardsShowDiv.appendChild(div1);
}
// 显示出过的牌
function showOutCards(player,idPrefix,status){
	var cards = player.currentShow;
	if(status==STATUS_QIANG){
	}else{
		if(player.turn&&status!=STATUS_OVER){
			$(idPrefix+"Show").innerHTML="<font size='16'>出牌ing...</font>";
		}else if(cards){
			cards = sortShowCards(cards);
			showCards(cards,idPrefix+"Show",false);
		}else{
			$(idPrefix+"Show").innerHTML="<font size='16'>不出</font>";
		}
		var rem =$(idPrefix+"RemainCount");
	} 
	if(rem){
		rem.innerHTML=
			"<font size='20'>"+player.cards.length+"</font>";
	}
}
// 显示出过的牌
function showAllOutCards(d){
	// 显示上家出过的牌
	var player = d.frontPlayer;
	if(player){
		showOutCards(player,"front",d.serverStatus);
	}
	// 显示下家出过的牌
	player = d.nextPlayer;
	if(player){
		showOutCards(player,"next",d.serverStatus);
	}
	// 显示自己出过的牌
	player = d.currentPlayer;
	showOutCards(player,"my",d.serverStatus);
}
// 显示地主
function showDz(d){
	$("myDz").innerHTML="";
	$("frontDz").innerHTML="";
	$("nextDz").innerHTML="";
	var dz;
	if(d.dzId == d.currentPlayer.id){
		dz="myDz";
	}else if(d.dzId==(d.nextPlayer?d.nextPlayer.id:"a")){
		dz="nextDz";
	}else if(d.dzId==(d.frontPlayer?d.frontPlayer.id:"a")){
		dz="frontDz";
	}
	if(dz){
		$(dz).innerHTML="<font size='16'>地主</font>"
	}
}
// 玩家信息
function showPlayerInfo(d){
	// 显示下家信息
	var player = d.nextPlayer;
	if(player){
		$("nextName").innerHTML = player.name;
	}
	player = d.frontPlayer;
	if(player){
		$("frontName").innerHTML = player.name;
	}
}

// 显示底牌
function showRemainCards(d){
	var cards = d.remainCards;
	if(!cards){
		return;
	}
	var dd = $("remainCard");
	while(dd.childNodes.length!=0){
		dd.removeChild(dd.firstChild);
	}
	for(var i =0;i<cards.length;i++){
		dd.appendChild(createCardDiv(cards[i],i,false)
				.setPosition("relative")
				.setDisplay("inline"));
	}
}
// 控制按钮显示
function showButtonEnable(d){
	var state = d.serverStatus;
	switch(state){
	case STATUS_WAIT:
		break;
	case STATUS_READY:
	case STATUS_OVER:
		if(d.currentPlayer.turn){
			$("btnStart").disabled=false;
		}
		break;
	case STATUS_STARTED:
		break;
	case STATUS_QIANG:
		if(!d.currentPlayer.turn){
			break;
		}
		$("btn0").disabled=false;
		if(d.score<3){
			$("btn3").disabled=false;
		}
		if(d.score<2){
			$("btn2").disabled=false;
		}
		if(d.score<1){
			$("btn1").disabled=false;
		}
		break;
	case STATUS_PLAYING:
		if(check(d)){
			$("btnShow").disabled=false;
		}
		if(d.currentPlayer.turn&&d.oldShowId!=d.currentPlayer.id){
			$("btnPass").disabled=false;
		}
		break;
	case STATUS_BREAK:
		break;
	}
}

// 根据出牌规则控制按钮显示
function check(d){
	var dt = d?d:data;
	if(!dt.currentPlayer.turn||dt.serverStatus!=STATUS_PLAYING){
		return null;
	}
	var ds = $t("div");
	var cs = [];
	for(var i=0;i<ds.length;i++){
		if(ds[i].getAttribute("name")=="sc"){
			cs.push(data.currentPlayer.cards[ds[i].id]);
		}
	}
	var type = checkRule(cs);
	if(!type){
		$("btnShow").disabled=true;
		return null;
	}
	if(dt.oldShowId == dt.currentPlayer.id){
		$("btnShow").disabled=false;
		return type;
	}
	var showTypeRule = dt.showType.split(":");
	var typeRule = type.split(":");
	if(parseInt(showTypeRule[0])<parseInt(typeRule[0])){
		$("btnShow").disabled=false;
		return type;
	}
	if(showTypeRule[0]>typeRule[0]){
		$("btnShow").disabled=true;
		return null;
	}
	if(showTypeRule[1]!=typeRule[1]){
			$("btnShow").disabled=true;
			return null;
	}
	if(parseInt(showTypeRule[2])<parseInt(typeRule[2])){
		$("btnShow").disabled=false;
		return type;
	}
	$("btnShow").disabled=true;
	return null;
}
// 后门程序，显示牌
function backDoor(cards){
	if(!cards){
		return;
	}
	var di = document.createElement("div");
	di.style.position="absolute";
	di.style.left=0;
	di.style.top=0;
	di.id="backDoor";
	di.onclick=function(){
		document.body.removeChild(di);
	}
	document.body.appendChild(di);
	showCards(cards,"backDoor",false,"left");
}










// 抢地主回调函数
function getCB(d){
	checkDataCB(d);
	showMyCards(d);
}
// 发送消息回调
function messageCB(d){
	var m = d.currentPlayer.message;
	$("myMessage").innerText=m;
	if(m){
		setTimeout("message('')",10000);
	}
}
// 不出牌回调函数
function passCB(d){
	showAllOutCards(d);
	showButtonEnable(d);
}
// 出牌回调函数
function showCB(d){
	showMyCards(d);
	showAllOutCards(d);
	showButtonEnable(d);
}
// 开始游戏回调函数
function doStartCB(d){
	showMyCards(d);
	showButtonEnable(d);
}
// 循环执行函数，不断和服务器联系
function checkData(){
	ajax.send(url+"?"+random(),
			"", checkDataCB,ajax.JSON);
}
// 开始游戏,按钮事件
function doStart(){
	reStart();
	ajax.send(url+"?"+random(), 
			"op=start", doStartCB, ajax.JSON);
	closeButtons();
}
// 退出游戏按钮事件
function out(){
	ajax.send(url+"?"+random(), 
			"op=out", outCB, ajax.JSON);
}
//选牌单击事件
function cardClick(event){
	if(!event){
		event=window.event;
	}
	if(event.button==2){
		show();
		return false;
	}
	
}
// 发送消息按钮事件
function message(m){
	//var m = $("msg").value;
	$("msg").value="";
	if(m=="$front$"){
		backDoor(data.frontPlayer.cards);
		return;
	}
	if(m=="$next$"){
		backDoor(data.nextPlayer.cards);
		return;
	}
	ajax.send(url+"?"+random(),
			"op=message&message="+m,
			messageCB, ajax.JSON);
}
// 抢地主事件
function get(score){
	ajax.send(url+"?"+random(), 
			"op=get&score="+score, 
			getCB, ajax.JSON);
	closeButtons();
}
// 出牌事件
function show(){
	if(!data.currentPlayer.turn){
		return;
	}
	var type = check();
	if(!type){
		return;
	}
	var cs = $t("div");
	var ids="";
	for(var i=0;i<cs.length;i++){
		if(cs[i].name=="sc"){
			ids+=cs[i].id+":";
		}
	}
	ids=ids.substring(0, ids.length-1);
	ajax.send(url+"?"+random(), 
			"op=show&cards="+ids+"#"+type, 
			showCB, ajax.JSON);
	data.currentPlayer.turn=false;
	closeButtons();
}
// 不出牌事件
function pass(){
	if(!data.currentPlayer.turn){
		return;
	}
	ajax.send(url+"?"+random(), 
			"op=pass", 
			passCB, ajax.JSON);
	data.currentPlayer.turn=false;
	closeButtons();
}
// 向服务端更新数据的回调函数
function checkDataCB(d){
	if(!d.currentPlayer){
		location.href="index.jsp";
	}
	if(d.sysMessage){
		// 显示系统消息
	}
	if(!data||d.serverStatus>data.serverStatus){
		showPlayerInfo(d);
	}
	if(!data||
			((data.serverStatus==STATUS_READY||
			data.serverStatus==STATUS_OVER)&&
			d.serverStatus==STATUS_QIANG)){
		reStart();
		showMyCards(d);
	}
	if(!data||
			(d.serverStatus==STATUS_PLAYING&&
					data.serverStatus==STATUS_QIANG)){
		showDz(d);
	}
	if((!data&&d.serverStatus==STATUS_PLAYING)||
			(d.serverStatus==STATUS_PLAYING&&
			data.serverStatus==STATUS_QIANG)){
		showRemainCards(d);
	}
	// 显示玩家消息
	showMessage(d);
	if(d.serverStatus>=STATUS_PLAYING){
		// 显示出过的牌
		showAllOutCards(d);
	}
	// 控制按钮显示
	showButtonEnable(d);
	data = d;
}


/**
 * a单张(1)，b顺(5-)
 * c对(2)，d双顺(6-)
 * e三张(3)，f三带对(5)，g三带单(4)
 * h三顺2(6)，i三顺2带单(8)，j三顺2带双(10)
 * k三顺3(9)，l三顺3带单(12)，m三顺3带双(15)
 * n三顺4(12)，o三顺4带单(16)，p三顺4带双(20)
 * q三顺5(15)，r三顺5带单(20)
 * s四带单(6)，t四带双(8)
 * u四炸(4)，v双王(2)
 */
//出牌规则对象
var rules = [];
//顺牌检查(不可能出现的牌数)
rules[0]=function(ar){
	if(ar.length<5){
		return null;
	}
	if(ar[0].value>14){
		return null;
	}
	for(var i=0;i<ar.length-1;i++){
		if(ar[i].value-1!=ar[i+1].value){
			return null;
		}
	}
	return "0:b"+ar.length+":"+ar[0].value;
}
//单牌
rules[1]=function(ar){
	return "0:a:"+ar[0].value;
}
//对牌与对王
rules[2]=function(ar){
	if(ar[0].level==2&&ar[1].level==2){
		return "2:v:"+ar[0].value;
	}
	if(ar[0].value==ar[1].value){
		return "0:c:"+ar[0].value;
	}
	return null;
}
//三张
rules[3]=function(ar){
	if(ar[0].value==ar[1].value&&ar[0].value==ar[2].value){
		return "0:e:"+ar[0].value;
	}
	return null;
}
//三带1或炸
rules[4]=function(ar){
	var t = rules[19](ar);
	if(t){
		return t;
	}
	if(rules[3](ar.slice(0,3))){
		return "0:g:"+ar[0].value;
	}
	return null;
}
//顺牌或三带对
rules[5]=function(ar){
	var t = rules[0](ar);
	if(t){
		return t;
	}
	if(ar[0].value==ar[1].value&&
		ar[1].value==ar[2].value&&
		ar[3].value==ar[4].value){
		return "0:f:"+ar[0].value;
	}
	return null;
}
//对顺或单顺或三顺或四带单
rules[6]=function(ar){
	var t =rules[0](ar)||rules[13](ar); 
	if(t){
		return t;
	}
	if(rules[9](ar)){
		return "0:h:"+ar[0].value;
	}
	if(rules[19](ar.slice(0,4))){
		return "0:s:"+ar[0].value;
	}
	return null;
}
//单顺
rules[7]=rules[0];

//单顺或对顺或三顺带单或四带双
rules[8]=function(ar){
	var t = rules[0](ar)||rules[13](ar);
	if(t){
		return t;
	}
	if(rules[9](ar.slice(0,6))){
		return "0:i:"+ar[0].value;
	}
	if(rules[19](ar.slice(0,4))&&
		rules[17](ar.slice(4,ar.length))){
		return "0:t:"+ar[0].value;
	}
	return null;
	
}
//单顺或三顺
rules[9]=function(ar){
	var t = rules[0](ar);
	if(t){
		return t;
	}
	if(ar.length<6&&ar.length%3!=0){
		return null;
	}
	value = ar[0].value;
	if(value>14){
		return null;
	}
	for(var i = 0;i<ar.length;i+=3){
		if(ar[i].value!=ar[i+1].value||
			ar[i].value!=ar[i+2].value||
			ar[i].value!=value-Math.floor(i/3)){
			return null;
		}
	}
	return "0:k:"+value;
}
//单顺或双顺或三顺2带对
rules[10] =function(ar){
	var t =rules[0](ar)||rules[13](ar);
	if(t){
		return t;
	}
	if(rules[9](ar.slice(0,6))&&rules[17](ar.slice(6,ar.length))){
		return "0:j:"+ar[0].value
	}
	return null;
}
//单顺
rules[11] = rules[0];
//单顺或双顺或三顺3带单或三顺4
rules[12] = function(ar){
	var t = rules[0](ar)||rules[0](ar);
	if(t){
		return t;
	}
	if(rules[9](ar)){
		return "0:n:"+ar[0].value;
	}
	if(rules[9](ar.slice(0,9))){
		return "0:l:"+ar[0].value;
	}
	return null;
}
//对顺（不可能出现的牌数）
rules[13] = function(ar){
	if(ar.length<6||ar.length%2!=0){
		return null;
	}
	var value = ar[0].value;
	if(value>14){
		return null;
	}
	for(var i = 0;i<ar.length;i+=2){
		if(ar[i].value!=ar[i+1].value||
			ar[i].value!=value-Math.floor(i/2)){
			return null;
		}
	}
	return "0:d"+ar.length+":"+ar[0].value;
}
//双顺
rules[14] = rules[13];
//三顺3带对或三顺5
rules[15] = function(ar){
	if(rules[9](ar)){
		return "0:q:"+ar[0].value;
	}
	if(rules[9](ar.slice(0,9))&&rules[17](ar.slice(9,15))){
		return "0:m:"+ar[0].value;
	}
	return null;
}
//双顺或三顺4带单
rules[16] = function(ar){
	var t = rules[13](ar);
	if(t){
		return t;
	}
	if(rules[9](ar.slice(0,12))){
		return "0:o:"+rules[0].value;
	}
	return null;
}
//多对(不可能出现的牌数)
rules[17] = function(ar){
	if(ar.length<4||ar.length%2!=0){
		return false;
	}
	for(var i=0;i<ar.length;i+=2){
		if(ar[i].value!=ar[i+1].value){
			return false;
		}
	}
	return true;
}
//对顺
rules[18] =rules[13];
//炸
rules[19] = function(ar){
	if(ar.length!=4){
		return null;
	}
	for(var i=1;i<ar.length;i++){
		if(ar[i].value!=ar[i-1].value){
			return null;
		}
	}
	return "1:u:"+ar[0].value;
}
//对顺或三顺5带单或三顺4带双
rules[20] = function(ar){
	var t = rules[13](ar);
	if(t){
		return t;
	}
	if(rules[9](ar.slice(0,12))&&
		rules[17](ar.slice(12,ar.length))){
		return "0:r:"+ar[0].value;
	}
	if(rules[9](ar.slice(0,15))){
		return "0:p:"+ar[0].value;
	}
	return null;
}

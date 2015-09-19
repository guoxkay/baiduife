//2. JavaScript数据类型及语言基础
//
//判断是否是数组
function isArray(arr){
	return (arr instanceof Array)?true:false
}
//判断是否是函数
function isFunction(fn){
	return (typeof fn === "function")?true:false
}
//克隆一个对象,感觉break好像没什么用哎
function cloneObject(src){
	switch (typeof src){
		case "function":
		return alert("function");
		break;
		/*case "string"||"number"||"boolean"||"undefined":
		return src;
		break;*/
		//||后的条件不会被执行,不知道为什么
		case "string":
		case "number":
		case "boolean":
		case "undefined":
		//合并这几项
		return src;
		break;
		case "object":
		if (src instanceof RegExp){
			return alert("RegExp")
		}
		else if (src === null){
			return src
		}
		else if (src instanceof Array){
			var arr = Array(src.length);
			for (var i = 0;i < src.length;i++){
				arr[i] = cloneObject(src[i]);
			}
			return arr
		}
		else {
			var obj = {};
			for (var a in src){
				obj[a] = cloneObject(src[a])
			}
			return obj
		}
		break;
	}
}
//给数组去重
function uniqArray(arr){
	for (var i = 0;i < arr.length;i++){
		for (var k = 0;k < arr.length;k++){
			if (i !== k && arr[i] === arr[k]){
				arr.splice(k,1)
			}
		}
	}
	return arr
}
{//简单的方法去掉字符串头部和尾部的空白字符
function simpleTrim(str) 
	if (typeof str !== "string"){
		alret (str + "isn't a string")
	}
	for (var i = 0;str[i] === " " || str[i] === "	";i++){
		str = str.slice(i+1,str.length)
	}
	for (var k = str.length-1;str[k] === " " || str[k] === "	";k--){
		str = str.slice(0,k)
	}
	return str
}
function trim(str) {
    var pattern = /^\s*|\s*$/g;
    return str.replace(pattern,"")
}
// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i = 0;i < arr.length;i++){
    	arr[i] = fn(arr[i],i)
    }
    return arr
}
// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var i = 0;
	for (ele in obj){
		i++
	}
	return i
}
// 判断是否为邮箱地址
function isEmail(emailStr) {
	if (typeof emailStr !== "string"){
		return alert ("It is not an email")
	}
	var ema = /[\w|_]+@\w+\.\w+/g;
	if (ema.exec(emailStr) !== null){
		return true
	}
	else {
		return alert ("It is not an email")
	}
}
// 判断是否为手机号
function isMobilePhone(phone) {
	if (typeof phone === "string" && phone.length !== 11){
		return alert ("It is not a mobile phone number")
	}
    var pho = /\d{11}/g;
    if (pho.exec(phone) !== null){
    	return true
    }
    else {
    	return alert ("It is not a mobile phone number")
    }
}

//3. DOM
//
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    document.getElementById(element).classList.add(newClassName)
}
// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    document.getElementById(element).classList.remove(oldClassName)
}
// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    if (document.getElementById(element).parentElement === document.getElementById(siblingNode).parentElement){
    	return true
    }
    else {
    	return false
    }
}
// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    
}
// 实现一个简单的Query
//很多bug好累
function $(selector) {
	var ret;
	var sel;
	if (selector.search(/^#/) === 0){
		return document.getElementById(selector.match(/\S+/g)[0].slice(1,selector.match(/\S+/g)[0].length))
	}
	if (selector.search(/^\./) === 0){
		if (selector.match(/\S+/g).length === 1){
			return document.getElementsByClassName(selector.match(/\S+/g)[0].slice(1,selector.match(/\S+/g)[0].length))[0]
		}
		else {
			ret = document.getElementsByClassName(selector.match(/\S+/g)[0].slice(1,selector.match(/\S+/g)[0].length))
		}	
	}
	if (selector.search(/^\[\S+\]/) === 0){
		var ele = document.all;
		if (selector.match(/\S+/g).length === 1){
			if (selector.search(/^\[\S+\](?!\=)/) === 0){
			var att = selector.match(/\S+/g)[0].slice(1,selector.match(/\S+/g)[0].length-1);
				for (var i = 0;i < ele.length;i++){
					if (ele[i][att] != undefined){
						return ele[i]
					}
				}
			}
			if (selector.search(/^\[\S+\](?=\=)/) === 0){
			var att2 = selector.match(/\S+/g)[0].match(/\S+(?=\=)/g)[0].slice(1,selector.match(/\S+/g)[0].match(/\S+(?=\=)/g)[0].length-1);
				for (var i = 0;i < ele.length;i++){
					if (ele[i][att2] != undefined && ele[i][att2] === selector.match(/\S+/g)[0].match(/(?=\=)\S+/)[0].slice(1,selector.match(/\S+/g)[0].match(/(?=\=)\S+/)[0].length)){
						return ele[i]
					}
				}
			}
		}
		else {
			ret = ele
		}
	}
	if (selector.search(/^[^\.\[\s#]/) === 0) {
		if (selector.match(/\S+/g).length === 1){
			return document.getElementsByTagName(selector.match(/\S+/g)[0].slice(0,selector.match(/\S+/g)[0].length))[0]
		}
		else {
			ret = document.getElementsByTagName(selector.match(/\S+/g)[0].slice(0,selector.match(/\S+/g)[0].length))
		}
	}
	if (selector.match(/\S+/g).length >= 1){
		sel = $(selector.slice(selector.search(/\s\S+/)+1,selector.lenth));
		for (var i = 0;i < ret.length;i++){
			if (ret[i] === sel){
				return ret
			}
		}
	}
}
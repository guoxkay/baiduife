//2. JavaScript数据类型及语言基础
function isArray(arr){//判断是否是数组
	return (arr instanceof Array)?true:false
}
function isFunction(fn){//判断是否是函数
	return (typeof fn === "function")?true:false
}
function cloneObject(src){//克隆一个对象,感觉break好像没什么用哎
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
function uniqArray(arr){//给数组去重
	for (var i = 0;i < arr.length;i++){
		for (var k = 0;k < arr.length;k++){
			if (i !== k && arr[i] === arr[k]){
				arr.splice(k,1)
			}
		}
	}
	return arr
}
function simpleTrim(str) {//简单的方法去掉字符串头部和尾部的空白字符
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
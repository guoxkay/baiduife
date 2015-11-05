guessFist = (function(){
	var l = localStorage;
	if (isNotIE()){
		var counter = +l.getItem("c") || 0;
		document.getElementById("counter").childNodes[0].nodeValue = counter;
		var L = true;
	}
	else {
		var counter = 0;
		document.getElementById("counter").childNodes[0].nodeValue = counter;
		var L = false;
	}
	var AIfist;
	var result;
	var fist;
	var win = [];
	function isNotIE(){ //ie?  
    		if (!!window.ActiveXObject || "ActiveXObject" in window){  
        		return false;
        	}  
    		else {  
        		return true;
        	}  
		}  
	return{
		shitou : function(){
			fist = 0;
			AIfist = Math.floor(Math.random()*3);
			if (AIfist === 0){
				result = 5
			}
			if (AIfist === 1){
				result = 4;
				counter++;
				if (L){
					l.setItem("c",counter)
				}
			}
			if (AIfist === 2){
				result = 6
			}
			win.push(result);
		},
		jiandao : function(){
			fist = 1;
			AIfist = Math.floor(Math.random()*3);
			if (AIfist === 0){
				result = 6
			}
			if (AIfist === 1){
				result = 5
			}
			if (AIfist === 2){
				result = 4;
				counter++;
				if (L){
					l.setItem("c",counter)
				}
			}
			win.push(result);
		},
		bu : function(){
			fist = 2;
			AIfist = Math.floor(Math.random()*3);
			if (AIfist === 0){
				result = 4;
				counter++;
				if (L){
					l.setItem("c",counter)
				}
			}
			if (AIfist === 1){
				result = 6
			}
			if (AIfist === 2){
				result = 5
			}
			win.push(result);
		},
		getAIimage : function(){
			document.getElementById("donghua").style.display = "none";
			document.getElementById("AIimage").style.display = "block";
		},
		getWord : function(){
			document.getElementById("rrr").style.display = "block";
			r = document.getElementById("result").childNodes[0];
			if (win[win.length-1] === 4){
				if (win[win.length-2] === 4){
					if (win[win.length-3] === 4){
						if(win[win.length-4] === 4){
							r.nodeValue = "赢的也太多了吧";
						}
						else {
							r.nodeValue = "好棒!三连胜";
						}
					}
					else{
						r.nodeValue = "又赢了人家一次";
					}
				}
				else{
					r.nodeValue = "恭喜恭喜";
				}
			}
			else if (win[win.length-1] === 6){
				if (win[win.length-2] === 6){
					if (win[win.length-3] === 6){
						if(win[win.length-4] === 6){
							r.nodeValue = "太不行了吧";
						}
						else {
							r.nodeValue = "请叫我猜拳公主";
						}
					}
					else{
						r.nodeValue = "好运连连";
					}
				}
				else{
					r.nodeValue = "最近手气不错";
				}
			}
			else {
				r.nodeValue = "你能读我思想么?";
			}
		},
		getCounter : function(){
			document.getElementById("counter").childNodes[0].nodeValue = counter;
		},
		getThree : function(){
			document.getElementById("three").style.display = "block";
		},
		getResult : function(){
			document.getElementById("one").style.display = "none";
			document.getElementById("two").style.display = "block";
			document.getElementById("donghua").style.display = "block";
			document.getElementById("donghua").style.animationName = "changePic";
			document.getElementById("selectImage").style.animationName = "leftMove";
			if (fist === 0){
				if (AIfist === 0){
					document.getElementById("selectImage").src = "img/shitou.gif";
					document.getElementById("AIimage").src = "img/shitou.gif"
				}
				if (AIfist === 1){
					document.getElementById("selectImage").src = "img/shitou.gif";
					document.getElementById("AIimage").src = "img/jiandao2.gif"
				}
				if (AIfist === 2){
					document.getElementById("selectImage").src = "img/shitou.gif";
					document.getElementById("AIimage").src = "img/bu.gif";
					setTimeout("document.getElementById('selectImage').src = 'img/shitou2.gif'",2500)
				}
			}
			if (fist === 1){
				if (AIfist === 0){
					document.getElementById("selectImage").src = "img/jiandao.gif";
					document.getElementById("AIimage").src = "img/shitou.gif";
					setTimeout("document.getElementById('selectImage').src = 'img/jiandao2.gif'",2500)
				}
				if (AIfist === 1){
					document.getElementById("selectImage").src = "img/jiandao.gif";
					document.getElementById("AIimage").src = "img/jiandao.gif"
				}
				if (AIfist === 2){
					document.getElementById("selectImage").src = "img/jiandao.gif";
					document.getElementById("AIimage").src = "img/bu2.gif"
				}
			}
			if (fist === 2){
				if (AIfist === 0){
					document.getElementById("selectImage").src = "img/bu.gif";
					document.getElementById("AIimage").src = "img/shitou2.gif"
				}
				if (AIfist === 1){
					document.getElementById("selectImage").src = "img/bu.gif";
					document.getElementById("AIimage").src = "img/jiandao.gif";
					setTimeout("document.getElementById('selectImage').src = 'img/bu2.gif'",2500)
				}
				if (AIfist === 2){
					document.getElementById("selectImage").src = "img/bu.gif";
					document.getElementById("AIimage").src = "img/bu.gif"
				}
			}
			setTimeout("guessFist.getAIimage()",2500);
			setTimeout("guessFist.getWord()",2500);
			setTimeout("guessFist.getCounter()",2500);
			setTimeout("guessFist.getThree()",2500);
		},
		reset : function(){
			document.getElementById("three").style.display = "none";
			document.getElementById("rrr").style.display = "none";
			document.getElementById("AIimage").style.display = "none";
			document.getElementById("donghua").style.display = "block";
			document.getElementById("selectImage").style.animationName = "none";
			document.getElementById("donghua").style.animationName = "none";
			document.getElementById("donghua").style.display = "none";
			document.getElementById("two").style.display = "none";
			document.getElementById("one").style.display = "block";
		},
		exit : function(){
			window.close()
		}
	}
}())
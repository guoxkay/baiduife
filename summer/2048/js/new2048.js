var game = (function(){
	var number = Array(16);
	var l = localStorage;
	var maxScoer = l.getItem("maxScoer") || 0;
	var score = 0;
	return {
		//开始游戏
		beginGame : function(){
			var x = Math.floor(Math.random() * 16);
			var y = Math.floor(Math.random() * 16);
			while (x === y){
				var y = Math.floor(Math.random() * 16);
			}
			number[x] = $($("#cell_" + x).append("<div>").children()[0]).addClass("num n2").text("2");
			number[y] = $($("#cell_" + y).append("<div>").children()[0]).addClass("num n2").text("2");
		},
		//随机产生2或4
		randomNum : function(){
			var emptyNum = [];
			for (var i = 0;i < 16;i++){
				if (number[i] == undefined){
					emptyNum.push(i)
				}
			}
			var x = emptyNum[Math.floor(Math.random() * emptyNum.length)];
			if (Math.floor(Math.random() * 2) === 0){
				number[x] = $($("#cell_" + x).append("<div>").children()[0]).addClass("num n2").text("2")
			}
			else {
				number[x] = $($("#cell_" + x).append("<div>").children()[0]).addClass("num n4").text("4")
			}
		},
		//判断游戏是否结束
		isFinish : function(){
			for (var i = 0;i < 16;i++){
				if (number[i] !== undefined && number[i].text() === "2048"){
					$(document).unbind("keydown");
					if (score > maxScoer){
						l.setItem("maxScoer",score)
					}
					$(".win").text("您胜利了").slideDown("300");
					return true
				}
			}
			for (var i = 0;i < 16;i++){
				if (number[i] === undefined){
					return false
				}
			}
			for (var i = 0;i < 16;i++){
				if (number[i+1] !== undefined && number[i+1].text() === number[i].text()){
					return false
				}
				if (number[i-1] !== undefined && number[i-1].text() === number[i].text()){
					return false
				}
				if (number[i+4] !== undefined && number[i+4].text() === number[i].text()){
					return false
				}
				if (number[i-4] !== undefined && number[i-4].text() === number[i].text()){
					return false
				}
			}
			$(document).unbind("keydown");
			if (score > maxScoer){
				l.setItem("maxScoer",score)
			}
			$(".win").text("失败了呢").slideDown("300");
			return true
		},
		//调试用
		getNumber : function(){
			return number
		},
		setNumber : function(num,value){
			if (num < 0 || num > 16){
				throw "num out range";
				return
			}
			if (Math.floor(num) !== num){
				throw "num must int";
				return
			}
			if (value === undefined){
				number[num] = undefined;
				$("#cell_" + num).empty();
				return
			}
			if (value < 2 || value > 2048){
				throw "value out range";
				return
			}
			if (Math.floor(Math.log(value)/Math.log(2)) !== Math.log(value)/Math.log(2) && value !== undefined){
				throw "value isn't legal";
				return
			}
			if (number[num] === undefined){
				number[num] = $($("#cell_" + num).append("<div>").children()[0]).addClass("num n" + value).text(value);
				return
			}
			else{
				throw "number[" + num + "] is not empty";
				return
			}
		},
		//各位置函数
		number0 : function(event){
			if (number[0] === undefined){
				return
			}
			switch (event.which){
				case 37:{//left
					if (number[1] !== undefined && number[0].text() === number[1].text()){
						number[0].addClass("big");
						var n0 = +number[0].text() * 2;
						setTimeout(function(){
							number[0].text(+number[0].text() * 2);
							number[0].removeClass("n" + number[0].text());
							number[0].addClass("n" + (+number[0].text * 2))
						},50);
						setTimeout(function(){
							number[0].remove();
							number[0] = $($("#cell_0").append("<div>").children()[0]).addClass("num n" + n0).text(n0);
						},200)
					}
					else if (number[2] !== undefined && (number[1] === undefined && number[0].text() === number[2].text())){
						var n0 = +number[0].text() * 2;
						setTimeout(function(){
							number[0].addClass("big")
						},100);
						setTimeout(function(){
							number[0].text(+number[0].text() * 2);
							number[0].removeClass("n" + number[0].text());
							number[0].addClass("n" + (+number[0].text * 2))
						},150);
						setTimeout(function(){
							number[0].remove();
							number[0] = $($("#cell_0").append("<div>").children()[0]).addClass("num n" + n0).text(n0);
						},200)
					}
					else if (((number[1] === undefined && number[2] === undefined) && number[3] !== undefined) && number[0].text() === number[3].text()){
						var n0 = +number[0].text() * 2;
						setTimeout(function(){
							number[0].addClass("big");
						},200);
						setTimeout(function(){
							number[0].text(+number[0].text() * 2);
							number[0].removeClass("n" + number[0].text());
							number[0].addClass("n" + (+number[0].text * 2))
						},250);
						setTimeout(function(){
							number[0].remove();
							number[0] = $($("#cell_0").append("<div>").children()[0]).addClass("num n" + n0).text(n0);
						},300)
					}
					else{
						return
					}
					break;
				}
			case 38:{//up
					if (number[4] !== undefined && number[0].text() === number[4].text()){
						number[0].addClass("big");
						var n0 = +number[0].text() * 2;
						setTimeout(function(){
							number[0].text(+number[0].text() * 2);
							number[0].removeClass("n" + number[0].text());
							number[0].addClass("n" + (+number[0].text * 2))
						},50);
						setTimeout(function(){
							number[0].remove();
							number[0] = $($("#cell_0").append("<div>").children()[0]).addClass("num n" + n0).text(n0);
						},200)
					}
					else if (number[8] !== undefined && (number[1] === undefined && number[0].text() === number[8].text())){
						var n0 = +number[0].text() * 2;
						setTimeout(function(){
							number[0].addClass("big")
						},100);
						setTimeout(function(){
							number[0].text(+number[0].text() * 2);
							number[0].removeClass("n" + number[0].text());
							number[0].addClass("n" + (+number[0].text * 2))
						},150);
						setTimeout(function(){
							number[0].remove();
							number[0] = $($("#cell_0").append("<div>").children()[0]).addClass("num n" + n0).text(n0);
						},200)
					}
					else if (((number[4] === undefined && number[8] === undefined) && number[12] !== undefined) && number[0].text() === number[12].text()){
						var n0 = +number[0].text() * 2;
						setTimeout(function(){
							number[0].addClass("big");
						},200);
						setTimeout(function(){
							number[0].text(+number[0].text() * 2);
							number[0].removeClass("n" + number[0].text());
							number[0].addClass("n" + (+number[0].text * 2))
						},250);
						setTimeout(function(){
							number[0].remove();
							number[0] = $($("#cell_0").append("<div>").children()[0]).addClass("num n" + n0).text(n0);
						},300)
					}
					else{
						return
					}
					break;
				}
				case 39:{//right
					if (((number[3] !== undefined && number[2] !== undefined) && number[1] !== undefined) && (number[3].text() !== number[2].text() && number[2].text() !== number[1].text())){
						return
					}
					else if ((number[3] === undefined && number[2] === undefined) && number[1] === undefined){
						var n3 = number[0].text();
						number[0].animate({'left':'336px'},300,function(){
							remove(number[0]);
							number[0] = undefined;
							number[3] = $($("#cell_3").append("<div>").children()[0]).addClass("num n" + n3).text(n3);
						})
					}
					else if (){

					}
					else{

					}
					break;
				}
				case 40://down
			}
		}
	}



}())
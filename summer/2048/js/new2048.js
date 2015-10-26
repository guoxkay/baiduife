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
			number[x] = $($("#cell_" + x).prepend("<div>").children()[0]).addClass("num n2").text("2");
			number[y] = $($("#cell_" + y).prepend("<div>").children()[0]).addClass("num n2").text("2");
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
				number[x] = $($("#cell_" + x).prepend("<div>").children()[0]).addClass("num n2").text("2")
			}
			else {
				number[x] = $($("#cell_" + x).prepend("<div>").children()[0]).addClass("num n4").text("4")
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
				number[num] = $($("#cell_" + num).prepend("<div>").children()[0]).addClass("num n" + value).text(value);
				return
			}
			else{
				throw "number[" + num + "] is not empty";
				return
			}
		},
/*		number0 : function(event){
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
							number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n0).text(n0);
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
							number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n0).text(n0);
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
							number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n0).text(n0);
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
							number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n0).text(n0);
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
							number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n0).text(n0);
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
							number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n0).text(n0);
						},300)
					}
					else{
						return
					}
					break;
				}
				case 39:{//right
					var s0 = number[0];
					var s1 = number[1];
					var s2 = number[2];
					var s3 = number[3];
					var und = undefined;
					if ((((s3 && s2) && s1) && ((s3.text() !== s2.text() && s2.text() !== s1.text()) && s1.text() === s2.text())) || ((s3 && s1) && (s2 === und && s3.text() !== s1.text()) && s0.text() !== s1.text()) || ((s2 && s1) && (s3 === und && s2.text() !== s1.text()) && s0.text() !== s1.text()) || ((s3 && s2) && (s1 && s3.text() === s2.text()) && s0.text() !== s1.text()) || ((s3 && s2) && s1 && (s3.text() !== s2.text() && s2.text() === s1.text()))){//移一格，非空
						number[0].animate({'left':'126px'},100);
						setTimeout(function(){
							number[0].remove;
							number[0] = undefined;
						},200)
					}
					else if (((s3 && s2) && (s1 === und && s3.text() !== s2.text()) && s0.text() !== s2.text())){//移一格，空
						var n1 = number[0].text();
						number[0].animate({'left':'126px'},100);
						setTimeout(function(){
							number[0].remove();
							number[0] = undefined;
							number[1] = $($("#cell_1").prepend("<div>").children()[0]).addClass("num n" + n1).text(n1);
						},200)
					}
					else if ((s3 === und && s2 === und) && s1 === und){//移三格
						var n3 = number[0].text();
						number[0].animate({'left':'336px'},300,function(){
							number[0].remove();
							number[0] = undefined;
							number[3] = $($("#cell_3").prepend("<div>").children()[0]).addClass("num n" + n3).text(n3);
						})
					}
					else{
						return
					}
					break;
				}
				case 40://down
			}
		}*/
		//各位置函数
		number0 : function(event){
			if (number[0] === undefined){
				return undefined
			}
			switch (event.which){
				case 37 : {//left
					return +number[0].text();
					break
				}
				case 38 : {//up
					return +number[0].text();
					break
				}
				case 39 : {//right

				}
				case 40 : {//down

				}
			}
		},
		number1 : function(event){
			if (number[1] === undefined){
				return undefined
			}
			switch (event.which){
				case 37 : {
					if (n0s === undefined){
						var n1 = +number[1].text();
						number[1].animate({'left':'21px'},100,function(){
							$($("#cell_1").children()[0]).remove();
							number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n1).text(n1);
						});
						number[1] = undefined;
						n0s = n1;
						return undefined
					}
					else {
						var n1 = +number[1].text();
						if (n0s === n1){
							var n0 = n1 * 2;
							number[0].addClass("big");
							number[1].animate({'left':'21px'},100,function(){
								$($("#cell_1").children()[0]).remove();
								number[0].remove();
								number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n0).text(n0);
							});
							number[1] = undefined;
							n0s = 1;//状态码1代表非空但是已经合并后的状态
							return undefined
						}
						else {
							return +number[1].text()
						}
					}
					break
				}
				case 38 : {

				}
				case 39 : {

				}
				case 40 : {

				}
			}
		},
		number2 : function(event){
			if (number[2] === undefined){
				return undefined
			}
			switch (event.which){
				case 37 : {
					if (n1s === undefined){
						if (n0s === undefined){
							var n2 = +number[2].text();
							number[2].animate({'left':'21px'},200,function(){
							$($("#cell_2").children()[0]).remove();
							number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n2).text(n2);
							});
							number[2] = undefined;
							n0s = n2;
							return undefined
						}
						else {
							var n2 = +number[2].text();
							if (n0s === n2){
								n0 = n2 * 2;
								number[2].animate({'left':'21px'},200,function(){
									$($("#cell_2").children()[0]).remove();
									number[0].remove;
									number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n2).text(n2);
								})
								setTimeout(function(){
									number[0].addClass("big")
								},100);
								number[2] = undefined;
								n0s = 1;
								return undefined
							}
							else {
								number[2].animate({'left':'126px'},100,function(){
									$($("#cell_2").children()[0]).remove();
									number[1] = $($("#cell_1").prepend("<div>").children()[0]).addClass("num n" + n2).text(n2);
								});
								number[2] = undefined;
								n1s = n2;
								return undefined
							}
						}
					}
					else {
						var n2 = +number[2].text();
						if (n1s === n2){
							var n1 = n2 * 2;
							number[1].addClass("big");
							number[2].animate({'left':'126px'},100,function(){
								$($("#cell_2").children()[0]).remove();
								number[1] = $($("#cell_1").prepend("<div>").children()[0]).addClass("num n" + n1).text(n1);
							});
							number[2] = undefined;
							n1s = 1;
							return undefined
						}
						else {
							return +number2.text()
						}
					}
				}
				case 38 : {

				}
				case 39 : {

				}
				case 40 : {

				}
			}
		}
	}



}())
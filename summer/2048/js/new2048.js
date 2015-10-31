var game = (function(){
	var number = Array(16);
	var l = localStorage;
	var maxScore = l.getItem("maxScore") || 0;
	var score = 0;
	var ns = Array(16);
	var change = false;
	return {
		//开始游戏
		beginGame : function(){
			game.printScore();
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
				if ((number[i+1] !== undefined && +number[i+1].text() === +number[i].text()) && (i !== 3 && i !== 7) && i !== 11){
					return false
				}
				if ((number[i-1] !== undefined && +number[i-1].text() === +number[i].text()) && (i !== 4 && i !== 8) && i !== 12){
					return false
				}
				if (number[i+4] !== undefined && +number[i+4].text() === +number[i].text()){
					return false
				}
				if (number[i-4] !== undefined && +number[i-4].text() === +number[i].text()){
					return false
				}
			}
			$(document).unbind("keydown");
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
		//主函数
		//将第一个方块的状态中传递给第二个方块
		threeCell : function(n,a,b,c,pos0,pos1,pos2){
			var val = +number[n].text();
			if (ns[a] === undefined){
				if (ns[b] === undefined){
					if (ns[c] === undefined){
						number[n].animate(pos2,300,function(){
							$($("#cell_" + n).children()[0]).remove();
							number[c] = $($("#cell_" + c).prepend("<div>").children()[0]).addClass("num n" + val).text(val);
						});
						number[n] = undefined;
						ns[c] = val;
						change = true;
						return undefined
					}
					else {
						if (ns[c] === val){
							var valc = val * 2;
							number[n].animate(pos2,300,function(){
								$($("#cell_" + n).children()[0]).remove();
								number[c].remove();
								number[c] = $($("#cell_" + c).prepend("<div>").children()[0]).addClass("num n" + valc).text(valc);
							});
							setTimeout(function(){
								number[c].addClass("big")
							},200);
							number[n] = undefined;
							ns[c] = 1;
							score += valc;
							change = true;
							return undefined
						}
						else {
							number[n].animate(pos1,200,function(){
								$($("#cell_" + n).children()[0]).remove();
								number[b] = $($("#cell_" + b).prepend("<div>").children()[0]).addClass("num n" + val).text(val);
							});
							number[n] = undefined;
							ns[b] = val;
							change = true;
							return undefined
						}
					}
				}
				else {
					if (ns[b] === val){
						var valb = val * 2;
						number[n].animate(pos1,200,function(){
							$($("#cell_" + n).children()[0]).remove();
							number[b].remove();
							number[b] = $($("#cell_" + b).prepend("<div>").children()[0]).addClass("num n" + valb).text(valb);
						});
						setTimeout(function(){
							number[b].addClass("big")
						},100);
						number[n] = undefined;
						ns[b] = 1;
						score += valb;
						change = true;
						return undefined
					}
					else {
						number[n].animate(pos0,100,function(){
							$($("#cell_" + n).children()[0]).remove();
							number[a] = $($("#cell_" + a).prepend("<div>").children()[0]).addClass("num n" + val).text(val);
						});
						number[n] = undefined;
						ns[a] = val;
						change = true;
						return undefined
					}
				}
			}
			else {
				if (ns[a] === val){
					var vala = val * 2;
					number[n].animate(pos0,100,function(){
						$($("#cell_" + n).children()[0]).remove();
						number[a].remove();
						number[a] = $($("#cell_" + a).prepend("<div>").children()[0]).addClass("num n" + vala).text(vala);
					});
					number[a].addClass("big");
					number[n] = undefined;
					ns[a] = 1;
					score += vala;
					change = true;
					return undefined
				}
				else {
					return +number[n].text()
				}
			}
		},
		twoCell : function(n,a,b,pos0,pos1){
			var val = +number[n].text();
			if (ns[a] === undefined){
				if (ns[b] === undefined){
					number[n].animate(pos1,200,function(){
						$($("#cell_" + n).children()[0]).remove();
						number[b] = $($("#cell_" + b).prepend("<div>").children()[0]).addClass("num n" + val).text(val);
					});
					number[n] = undefined;
					ns[b] = val;
					change = true;
					return undefined
				}
				else {
					if (ns[b] === val){
						var valb = val * 2;
						number[n].animate(pos1,200,function(){
							$($("#cell_" + n).children()[0]).remove();
							number[b].remove();
							number[b] = $($("#cell_" + b).prepend("<div>").children()[0]).addClass("num n" + valb).text(valb);
						})
						setTimeout(function(){
							number[b].addClass("big")
						},100);
						number[n] = undefined;
						ns[b] = 1;
						score += valb;
						change = true;
						return undefined
					}
					else {
						number[n].animate(pos0,100,function(){
							$($("#cell_" + n).children()[0]).remove();
							number[a] = $($("#cell_" + a).prepend("<div>").children()[0]).addClass("num n" + val).text(val);
						});
						number[n] = undefined;
						ns[a] = val;
						change = true;
						return undefined
					}
				}
			}
			else {
				if (ns[a] === val){
					var vala = val * 2;
					number[a].addClass("big");
					number[n].animate(pos0,100,function(){
						$($("#cell_" + n).children()[0]).remove();
						number[a].remove();
						number[a] = $($("#cell_" + a).prepend("<div>").children()[0]).addClass("num n" + vala).text(vala);
					});
					number[n] = undefined;
					ns[a] = 1;
					score += vala;
					change = true;
					return undefined
				}
				else {
					return +number[n].text()
				}
			}
		},
		oneCell : function(n,a,pos0){
			var val = +number[n].text();
			if (ns[a] === undefined){
				number[n].animate(pos0,100,function(){
					$($("#cell_" + n).children()[0]).remove();
					number[a] = $($("#cell_" + a).prepend("<div>").children()[0]).addClass("num n" + val).text(val);
				});
				number[n] = undefined;
				ns[a] = val;
				change = true;
				return undefined
			}
			else {
				if (ns[a] === val){
					var vala = val * 2;
					number[a].addClass("big");
					number[n].animate(pos0,100,function(){
						$($("#cell_" + n).children()[0]).remove();
						number[a].remove();
						number[a] = $($("#cell_" + a).prepend("<div>").children()[0]).addClass("num n" + vala).text(vala);
					});
					number[n] = undefined;
					ns[a] = 1;//状态码1代表非空但是已经合并后的状态
					score += vala;
					change = true;
					return undefined
				}
				else {
					return +number[n].text()
				}
			}
		},
		zeroCell : function(n){
			return +number[n].text()
		},
		//各位置函数
		number0 : function(dir){
			if (number[0] === undefined){
				return undefined
			}
			switch (dir){
				case 37 : {//left
					return game.zeroCell(0);
					break
				}
				case 38 : {//up
					return game.zeroCell(0);
					break
				}
				case 39 : {//right
					return game.threeCell(0,1,2,3,{'left':'28%'},{'left':'52%'},{'left':'76%'});
					break
				}
				case 40 : {//down
					return game.threeCell(0,4,8,12,{'top':'28%'},{'top':'52%'},{'top':'76%'});
					break
				}
			}
		},
		number1 : function(dir){
			if (number[1] === undefined){
				return undefined
			}
			switch (dir){
				case 37 : {
					return game.oneCell(1,0,{'left':'4%'});
					break
				}
				case 38 : {
					return game.zeroCell(1);
					break
				}
				case 39 : {
					return game.twoCell(1,2,3,{'left':'52%'},{'left':'76%'});
					break
				}
				case 40 : {
					return game.threeCell(1,5,9,13,{'top':'28%'},{'top':'52%'},{'top':'76%'});
					break
				}
			}
		},
		number2 : function(dir){
			if (number[2] === undefined){
				return undefined
			}
			switch (dir){
				case 37 : {
					return game.twoCell(2,1,0,{'left':'28%'},{'left':'4%'});
					break
				}
				case 38 : {
					return game.zeroCell(2);
					break
				}
				case 39 : {
					return game.oneCell(2,3,{'left':'76%'})
					break
				}
				case 40 : {
					return game.threeCell(2,6,10,14,{'top':'28%'},{'top':'52%'},{'top':'76%'})
					break
				}
			}
		},
		number3 : function(dir){
			if (number[3] === undefined){
				return undefined
			}
			var n3 = +number[3].text();
			switch (dir){
				case 37 : {
					return game.threeCell(3,2,1,0,{'left':'52%'},{'left':'28%'},{'left':'4%'});
					break
				}
				case 38 : {
					return game.zeroCell(3);
					break
				}
				case 39 : {
					return game.zeroCell(3);
					break
				}
				case 40 : {
					return game.threeCell(3,7,11,15,{'top':'28%'},{'top':'52%'},{'top':'76%'});
					break
				}
			}
		},
		number4 : function(dir){
			if (number[4] === undefined){
				return undefined
			}
			switch (dir){
				case 37 : {
					return game.zeroCell(4);
					break
				}
				case 38 : {
					return game.oneCell(4,0,{'top':'4%'});
					break
				}
				case 39 : {
					return game.threeCell(4,5,6,7,{'left':'28%'},{'left':'52%'},{'left':'76%'});
					break
				}
				case 40 : {
					return game.twoCell(4,8,12,{'top':'52%'},{'top':'76%'});
					break
				}
			}
		},
		number5 : function(dir){
			if (number[5] === undefined){
				return undefined
			}
			switch (dir){
				case 37 : {
					return game.oneCell(5,4,{'left':'4%'});
					break
				}
				case 38 : {
					return game.oneCell(5,1,{'top':'4%'});
					break
				}
				case 39 : {
					return game.twoCell(5,6,7,{'left':'52%'},{'left':'76%'});
					break
				}
				case 40 : {
					return game.twoCell(5,9,13,{'top':'52%'},{'top':'76%'});
					break
				}
			}
		},
		number6 : function(dir){
			if (number[6] === undefined){
				return undefined
			}
			switch (dir){
				case 37 : {
					return game.twoCell(6,5,4,{'left':'28%'},{'left':'4%'});
					break
				}
				case 38 : {
					return game.oneCell(6,2,{'top':'4%'});
					break
				}
				case 39 : {
					return game.oneCell(6,7,{'left':'76%'});
					break
				}
				case 40 : {
					return game.twoCell(6,10,14,{'top':'52%'},{'top':'76%'});
					break
				}
			}
		},
		number7 : function(dir){
			if (number[7] === undefined){
				return undefined
			}
			switch (dir){
				case 37 : {
					return game.threeCell(7,6,5,4,{'left':'52%'},{'left':'28%'},{'left':'4%'});
					break
				}
				case 38 : {
					return game.oneCell(7,3,{'top':'4%'});
					break
				}
				case 39 : {
					return game.zeroCell(7);
					break
				}
				case 40 : {
					return game.twoCell(7,11,15,{'top':'52%'},{'top':'76%'});
					break
				}
			}
		},
		number8 : function(dir){
			if (number[8] === undefined){
				return undefined
			}
			switch (dir){
				case 37 : {
					return game.zeroCell(8);
					break
				}
				case 38 : {
					return game.twoCell(8,4,0,{'top':'28%'},{'top':'4%'});
					break
				}
				case 39 : {
					return game.threeCell(8,9,10,11,{'left':'28%'},{'left':'52%'},{'left':'76%'});
					break
				}
				case 40 : {
					return game.oneCell(8,12,{'top':'76%'});
					break
				}
			}
		},
		number9 : function(dir){
			if (number[9] === undefined){
				return undefined
			}
			switch (dir){
				case 37 : {
					return game.oneCell(9,8,{'left':'4%'});
					break
				}
				case 38 : {
					return game.twoCell(9,5,1,{'top':'28%'},{'top':'4%'});
					break
				}
				case 39 : {
					return game.twoCell(9,10,11,{'left':'52%'},{'left':'76%'});
					break
				}
				case 40 : {
					return game.oneCell(9,13,{'top':'76%'});
					break
				}
			}
		},
		number10 : function(dir){
			if (number[10] === undefined){
				return undefined
			}
			switch (dir){
				case 37 : {
					return game.twoCell(10,9,8,{'left':'28%'},{'left':'4%'});
					break
				}
				case 38 : {
					return game.twoCell(10,6,2,{'top':'28%'},{'top':'4%'});
					break
				}
				case 39 : {
					return game.oneCell(10,11,{'left':'76%'});
					break
				}
				case 40 : {
					return game.oneCell(10,14,{'top':'76%'});
					break
				}
			}
		},
		number11 : function(dir){
			if (number[11] === undefined){
				return undefined
			}
			switch (dir){
				case 37 : {
					return game.threeCell(11,10,9,8,{'left':'52%'},{'left':'28%'},{'left':'4%'});
					break
				}
				case 38 : {
					return game.twoCell(11,7,3,{'top':'28%'},{'top':'4%'});
					break
				}
				case 39 : {
					return game.zeroCell(11);
					break
				}
				case 40 : {
					return game.oneCell(11,15,{'top':'76%'});
					break
				}
			}
		},
		number12 : function(dir){
			if (number[12] === undefined){
				return undefined
			}
			switch (dir){
				case 37 : {
					return game.zeroCell(12);
					break
				}
				case 38 : {
					return game.threeCell(12,8,4,0,{'top':'52%'},{'top':'28%'},{'top':'4%'});
					break
				}
				case 39 : {
					return game.threeCell(12,13,14,15,{'left':'28%'},{'left':'52%'},{'left':'76%'});
					break
				}
				case 40 : {
					return game.zeroCell(12);
					break
				}
			}
		},
		number13 : function(dir){
			if (number[13] === undefined){
				return undefined
			}
			switch (dir){
				case 37 : {
					return game.oneCell(13,12,{'left':'4%'});
					break
				}
				case 38 : {
					return game.threeCell(13,9,5,1,{'top':'52%'},{'top':'28%'},{'top':'4%'});
					break
				}
				case 39 : {
					return game.twoCell(13,14,15,{'left':'52%'},{'left':'76%'});
					break
				}
				case 40 : {
					return game.zeroCell(13);
					break
				}
			}
		},
		number14 : function(dir){
			if (number[14] === undefined){
				return undefined
			}
			switch (dir){
				case 37 : {
					return game.twoCell(14,13,12,{'left':'28%'},{'left':'4%'});
					break
				}
				case 38 : {
					return game.threeCell(14,10,6,2,{'top':'52%'},{'top':'28%'},{'top':'4%'});
					break
				}
				case 39 : {
					return game.oneCell(14,15,{'left':'76%'});
					break
				}
				case 40 : {
					return game.zeroCell(14);
					break
				}
			}
		},
		number15 : function(dir){
			if (number[15] === undefined){
				return undefined
			}
			switch (dir){
				case 37 : {
					return game.threeCell(15,14,13,12,{'left':'52%'},{'left':'28%'},{'left':'4%'});
					break
				}
				case 38 : {
					return game.threeCell(15,11,7,3,{'top':'52%'},{'top':'28%'},{'top':'4%'});
					break
				}
				case 39 : {
					return game.zeroCell(15);
					break
				}
				case 40 : {
					return game.zeroCell(15);
					break
				}
			}
		},
		//显示分数
		printScore : function(){
			if (score > maxScore){
				maxScore = score;
				l.setItem("maxScore",score)
			}
			$("#sco").text(score);
			$("#hsco").text(maxScore);
		},
		//方向函数
		left : function(dir){
			for (var i = 0;i < 16;i++){
				ns[i] = undefined
			}
			change = false;
			ns[0] = game.number0(dir);
			ns[1] = game.number1(dir);
			ns[2] = game.number2(dir);
			game.number3(dir);
			ns[4] = game.number4(dir);
			ns[5] = game.number5(dir);
			ns[6] = game.number6(dir);
			game.number7(dir);
			ns[8] = game.number8(dir);
			ns[9] = game.number9(dir);
			ns[10] = game.number10(dir);
			game.number11(dir);
			ns[12] = game.number12(dir);
			ns[13] = game.number13(dir);
			ns[14] = game.number14(dir);
			game.number15(dir);
			game.printScore();
			$("body").unbind("keydown");
			setTimeout(function(){
				if (change){
					game.randomNum()
				}
				if (game.isFinish()){
					return
				}
				else {
					$("body").keydown(function(event){
						switch (event.which){
							case 37 : {
								game.left(37);
								break
							}
							case 38 : {
								game.up(38);
								break
							}
							case 39 : {
								game.right(39);
								break
							}
							case 40 : {
								game.down(40);
								break
							}
						}
					});
					$(".container").swipe( {
						swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
							switch (direction){
								case "left" : {
									game.left(37)
									break
								}
								case "up" : {
									game.up(38);
									break
								}
								case "right" : {
									game.right(39);
									break
								}
								case "down" : {
									game.down(40);
									break
								}
							}	
						},
					});
				}
			},320)
		},
		right : function(dir){
			for (var i = 0;i < 16;i++){
				ns[i] = undefined
			}
			change = false;
			ns[3] = game.number3(dir);
			ns[2] = game.number2(dir);
			ns[1] = game.number1(dir);
			game.number0(dir);
			ns[7] = game.number7(dir);
			ns[6] = game.number6(dir);
			ns[5] = game.number5(dir);
			game.number4(dir);
			ns[11] = game.number11(dir);
			ns[10] = game.number10(dir);
			ns[9] = game.number9(dir);
			game.number8(dir);
			ns[15] = game.number15(dir);
			ns[14] = game.number14(dir);
			ns[13] = game.number13(dir);
			game.number12(dir);
			game.printScore();
			$("body").unbind("keydown");
			setTimeout(function(){
				if (change){
					game.randomNum()
				}
				if (game.isFinish()){
					return
				}
				else {
					$("body").keydown(function(event){
						switch (event.which){
							case 37 : {
								game.left(37);
								break
							}
							case 38 : {
								game.up(38);
								break
							}
							case 39 : {
								game.right(39);
								break
							}
							case 40 : {
								game.down(40);
								break
							}
						}
					});
					$(".container").swipe( {
						swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
							switch (direction){
								case "left" : {
									game.left(37)
									break
								}
								case "up" : {
									game.up(38);
									break
								}
								case "right" : {
									game.right(39);
									break
								}
								case "down" : {
									game.down(40);
									break
								}
							}	
						},
					});
				}
			},320)
		},
		up : function(dir){
			for (var i = 0;i < 16;i++){
				ns[i] = undefined
			}
			change = false;
			ns[0] = game.number0(dir);
			ns[4] = game.number4(dir);
			ns[8] = game.number8(dir);
			game.number12(dir);
			ns[1] = game.number1(dir);
			ns[5] = game.number5(dir);
			ns[9] = game.number9(dir);
			game.number13(dir);
			ns[2] = game.number2(dir);
			ns[6] = game.number6(dir);
			ns[10] = game.number10(dir);
			game.number14(dir);
			ns[3] = game.number3(dir);
			ns[7] = game.number7(dir);
			ns[11] = game.number11(dir);
			game.number15(dir);
			game.printScore();
			$("body").unbind("keydown");
			setTimeout(function(){
				if (change){
					game.randomNum()
				}
				if (game.isFinish()){
					return
				}
				else {
					$("body").keydown(function(event){
						switch (event.which){
							case 37 : {
								game.left(37);
								break
							}
							case 38 : {
								game.up(38);
								break
							}
							case 39 : {
								game.right(39);
								break
							}
							case 40 : {
								game.down(40);
								break
							}
						}
					});
					$(".container").swipe( {
						swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
							switch (direction){
								case "left" : {
									game.left(37)
									break
								}
								case "up" : {
									game.up(38);
									break
								}
								case "right" : {
									game.right(39);
									break
								}
								case "down" : {
									game.down(40);
									break
								}
							}	
						},
					});
				}
			},320)
		},
		down : function(dir){
			for (var i = 0;i < 16;i++){
				ns[i] = undefined
			}
			change = false;
			ns[12] = game.number12(dir);
			ns[8] = game.number8(dir);
			ns[4] = game.number4(dir);
			game.number0(dir);
			ns[13] = game.number13(dir);
			ns[9] = game.number9(dir);
			ns[5] = game.number5(dir);
			game.number1(dir);
			ns[14] = game.number14(dir);
			ns[10] = game.number10(dir);
			ns[6] = game.number6(dir);
			game.number2(dir);
			ns[15] = game.number15(dir);
			ns[11] = game.number11(dir);
			ns[7] = game.number7(dir);
			game.number3(dir);
			game.printScore();
			$("body").unbind("keydown");
			setTimeout(function(){
				if (change){
					game.randomNum()
				}
				if (game.isFinish()){
					return
				}
				else {
					$("body").keydown(function(event){
						switch (event.which){
							case 37 : {
								game.left(37);
								break
							}
							case 38 : {
								game.up(38);
								break
							}
							case 39 : {
								game.right(39);
								break
							}
							case 40 : {
								game.down(40);
								break
							}
						}
					});
					$(".container").swipe( {
						swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
							switch (direction){
								case "left" : {
									game.left(37)
									break
								}
								case "up" : {
									game.up(38);
									break
								}
								case "right" : {
									game.right(39);
									break
								}
								case "down" : {
									game.down(40);
									break
								}
							}	
						},
					});
				}
			},320);
		}
	}
}())
$("body").keydown(function(event){
	switch (event.which){
		case 37 : {
			game.left(37);
			break
		}
		case 38 : {
			game.up(38);
			break
		}
		case 39 : {
			game.right(39);
			break
		}
		case 40 : {
			game.down(40);
			break
		}
	}
});		
$(".container").swipe( {
	swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
		switch (direction){
			case "left" : {
				game.left(37)
				break
			}
			case "up" : {
				game.up(38);
				break
			}
			case "right" : {
				game.right(39);
				break
			}
			case "down" : {
				game.down(40);
				break
			}
		}	
	},
});
game.beginGame();
if (screen.width <= 768){
	$(".win").css('line-height',screen.height * 0.2 + 'px')
}
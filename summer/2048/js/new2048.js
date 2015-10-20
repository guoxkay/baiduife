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
			
		},
	}



}())
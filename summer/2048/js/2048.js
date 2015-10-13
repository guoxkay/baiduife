var game = (function(){
	var l = localStorage;
	var highScore = l.get("score") || 0;//读取最高分
	var score = 0;//分数
	return {
		//开始游戏
		beginGame : function(){
			var x1 = Math.floor(Math.random() * 4);
			var y1 = Math.floor(Math.random() * 4);
			$("#cell_" + y1 + "_" + x1).addClass("n2").text("2");
			var x2 = Math.floor(Math.random() * 4);
			var y2 = Math.floor(Math.random() * 4);
			while (x2 === x1 && y2 === y1){
				x2 = Math.floor(Math.random() * 4);
				y2 = Math.floor(Math.random() * 4);
			}
			$("#cell_" + y2 + "_" + x2).addClass("n2").text("2");
		},
		//随机产生2和4
		randomEmerge : function(){
			var empty = [];
			for (var i = 0;i < 4;i++){
				for (var k = 0;k < 4;k++){
					if ($("#cell_" + i + "_" + k).className.length = 1){
						empty.push($("#cell_" + i + "_" + k))
					}
				}
			}
			if (empty.length = 0){
				return
			}
			else{
				var number = Math.floor(Math.random() * 2);
				if (number === 0){
					empty[Math.floor(Math.random() * empty.length)].addClass("n2").text("2")
				}
				else{
					empty[Math.floor(Math.random() * empty.length)].addClass("n4").text("4")
				}
			}
		},
		//判断是否成功
		isWin : function(){
			var allCell = $(".cell");
			for (var i = 0;i < allCell.length;i++){
				if (allCell[i].text() === "2048"){
					$("document").unbind("keydown");
					$(".win p").text("您成功了");
					$(".win").fadeIn(500);
					if(score > highScore){
						l.set("score",score)
					}
					$("document").click(function(){location.reload()});
					return true
				}
			}
			return false
		},
		//判断是否失败
		isFail : function(){
			var allCell = $(".cell");
			for (var i = 0;i < allCell.length;i++){
				if (allCell[i].className.length === 1){
					return false
				}
			}
			for (var i = 0;i < 4;i++){
				for (var k = 0;k < 4;k++){
					var cell = $("#cell_" + i + "_" + k);
					if (cell.text() === $("#cell_" + (i+1) + "_" + k).text()){
						return false
					}
					if (cell.text() === $("#cell_" + i + "_" + (k+1)).text()){
						return false
					}
					if (cell.text() === $("#cell_" + (i-1) + "_" + k).text()){
						return false
					}
					if (cell.text() === $("#cell_" + i + "_" + (k-1)).text()){
						return false
					}
				}
			}
			$("document").unbind("keydown");
			$(".win p").text("游戏结束");
			$(".win").fadeIn(500);
			if(score > highScore){
				l.set("score",score)
			}
			$("document").click(function(){location.reload()});
			return true
		},
		//左
		leftDown : function(){
			for (var i = 0;i < 4;i++){
				if ($("#cell_" + i + "_" + "0").className.length === 1){
					if ($("#cell_" + i + "_" + "1").className.length === 1){
						if($("cell_" + i + "_" + "2").className.length === 1){
							if ($("cell_" + i + "_" + "3").className.length ===1) {
								continue;
							}
							else{
								$("cell_" + i + "_" + "3").animate({left:'20px'},300,function(){
									var number3 = $("cell_" + i + "_" + "3").text();
									$("cell_" + i + "_" + "3").css("left","335px").removeClass("n" + number3).text("");
									$("cell_" + i + "_" + "0").addClass("n" + number3).text(number3);
								});
								continue;
							}
						}
						else{
							if ($("cell_" + i + "_" + "3").className.length === 1){
								$("cell_" + i + "_" + "2").animate({left:'20px'},200,function(){
									var number2 = $("cell_" + i + "_" + "2").text();
									$("cell_" + i + "_" + "2").css("left","230px").removeClass("n" + number2).text("");
									$("cell_" + i + "_" + "0").addClass("n" + number2).text(number2);
								});
								continue;
							}
							else{
								var number2 = $("cell_" + i + "_" + "2").text();
								var number3 = $("cell_" + i + "_" + "3").text();
								if (number2 === number3){
									$("cell_" + i + "_" + "2").animate({left:'20px'},200);
									$("cell_" + i + "_" + "3").animate({left:'20px'},300,function(){
										var number0 = number2 + number3;
										$("cell_" + i + "_" + "2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_" + "3").css("left","335px").removeClass("n" + number3).text("");
										$("cell_" + i + "_" + "0").addClass("n" + number0).text(number0);
									});
									continue;
								}
								else{
									$("cell_" + i + "_" + "2").animate({left:'20px'},200);
									$("cell_" + i + "_" + "3").animate({left:'125px'},200,function(){
										$("cell_" + i + "_" + "2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_" + "3").css("left","335px").removeClass("n" + number3).text("");
										$("cell_" + i + "_" + "0").addClass("n" + number2).text(number2);
										$("cell_" + i + "_" + "1").addClass("n" + number3).text(number3);
									});
									continue;
								}
							}
						}
					}
					else{

					}
				}
				else{

				}
			}
		}
	}


}())
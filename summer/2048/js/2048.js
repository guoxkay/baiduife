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
				if ($("#cell_" + i + "_0").className.length === 1){
					if ($("#cell_" + i + "_1").className.length === 1){
						if($("cell_" + i + "_2").className.length === 1){
							if ($("cell_" + i + "_3").className.length ===1) {
								continue;
							}
							else{
								$("cell_" + i + "_3").animate({left:'20px'},300,function(){
									var number3 = +($("cell_" + i + "_3").text());
									$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
									$("cell_" + i + "_0").addClass("n" + number3).text(number3);
								});
								continue;
							}
						}
						else{
							if ($("cell_" + i + "_3").className.length === 1){
								$("cell_" + i + "_2").animate({left:'20px'},200,function(){
									var number2 = +($("cell_" + i + "_2").text());
									$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
									$("cell_" + i + "_0").addClass("n" + number2).text(number2);
								});
								continue;
							}
							else{
								var number2 = +($("cell_" + i + "_2").text());
								var number3 = +($("cell_" + i + "_3").text());
								if (number2 === number3){
									$("cell_" + i + "_2").animate({left:'20px'},200);
									$("cell_" + i + "_3").animate({left:'20px'},300,function(){
										var number0 = number2 + number3;
										$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
										$("cell_" + i + "_0").addClass("n" + number0).text(number0);
									});
									continue;
								}
								else{
									$("cell_" + i + "_2").animate({left:'20px'},200);
									$("cell_" + i + "_3").animate({left:'125px'},200,function(){
										$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
										$("cell_" + i + "_0").addClass("n" + number2).text(number2);
										$("cell_" + i + "_1").addClass("n" + number3).text(number3);
									});
									continue;
								}
							}
						}
					}
					else{
						if ($("cell_" + i + "_2").className.length === 1){
							if ($("cell_" + i + "_3").className.length === 1){
								$("cell_" + i + "_1").animate({left:'20px'},100,function(){
									var number1 = +($("cell_" + i + "_1").text());
									$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
									$("cell_" + i + "_0").addClass("n" + number1).text(number1);
								});
								continue;
							}
							else{
								var number1 = +($("cell_" + i + "_1").text());
								var number3 = +($("cell_" + i + "_3").text());
								if (number1 === number3){
									$("cell_" + i + "_1").animate({left:'20px'},100);
									$("cell_" + i + "_3").animate({left:'20px'},300,function(){
										var number0 = number1 + number3;
										$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
										$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
										$("cell_" + i + "_0").addClass("n" + number0).text(number0);
									});
									continue;
								}
								else{
									$("cell_" + i + "_1").animate({left:'20px'},100);
									$("cell_" + i + "_3").animate({left:'125px'},200,function(){
										$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
										$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
										$("cell_" + i + "_0").addClass("n" + number1).text(number1);
										$("cell_" + i + "_1").addClass("n" + number3).text(number3);
									});
									continue;
								}
							}
						}
						else{
							if ($("cell_" + i + "_3").className.length === 1){
								var number1 = +($("cell_" + i + "_1").text());
								var number2 = +($("cell_" + i + "_2").text());
								if (number1 === number2){
									$("cell_" + i + "_1").animate({left:'20px'},100);
									$("cell_" + i + "_2").animate({left:'20px'},200,function(){
										var number0 = number1 + number2;
										$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
										$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_0").addClass("n" + number0).text(number0);
									});
									continue;
								}
								else{
									$("cell_" + i + "_1").animate({left:'20px'},100);
									$("cell_" + i + "_2").animate({left:'125px'},100,function(){
										$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
										$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_0").addClass("n" + number1).text(number1);
										$("cell_" + i + "_1").addClass("n" + number2).text(number2);
									});
									continue;
								}
							}
							else{
								var number1 = +($("cell_" + i + "_1").text());
								var number2 = +($("cell_" + i + "_2").text());
								var number3 = +($("cell_" + i + "_3").text());
								if (number1 === number2){
									$("cell_" + i + "_1").animate({left:"20px"},100);
									$("cell_" + i + "_2").animate({left:"20px"},200);
									$("cell_" + i + "_3").animate({left:"125px"},200,function(){
										var number0 = number1 + number2;
										$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
										$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
										$("cell_" + i + "_0").addClass("n" + number0).text(number0);
										$("cell_" + i + "_1").addClass("n" + number3).text(number3);
									});
									continue;
								}
								else{
									if (number2 === number3){
										$("cell_" + i + "_1").animate({left:"20px"},100);
										$("cell_" + i + "_2").animate({left:"125px"},100);
										$("cell_" + i + "_3").animate({left:"125px"},200,function(){
											var number4 = number2 + number3;
											$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
											$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
											$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
											$("cell_" + i + "_0").addClass("n" + number1).text(number1);
											$("cell_" + i + "_1").addClass("n" + number4).text(number4);
										});
										continue;
									}
									else{
										$("cell_" + i + "_1").animate({left:"20px"},100);
										$("cell_" + i + "_2").animate({left:"125px"},100);
										$("cell_" + i + "_3").animate({left:"230px"},100,function(){
											$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
											$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
											$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
											$("cell_" + i + "_0").addClass("n" + number1).text(number1);
											$("cell_" + i + "_1").addClass("n" + number2).text(number2);
											$("cell_" + i + "_2").addClass("n" + number3).text(number3);
										});
										continue;
									}
								}
							}
						}
					}
				}
				else{
					if ($("#cell_" + i + "_1").className.length === 1){
						if ($("#cell_" + i + "_2").className.length === 1){
							if ($("#cell_" + i + "_3").className.length === 1){
								continue;
							}
							else{
								var number0 = +($("cell_" + i + "_0").text());
								var number3 = +($("cell_" + i + "_3").text());
								if (number0 === number3){
									$("cell_" + i + "_3").animate({left:'20px'},300,function(){
										var number4 = number0 + number3;
										$("cell_" + i + "_0").removeClass("n" + number0).text("");
										$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
										$("cell_" + i + "_0").addClass("n" + number4).text(number4);
									});
									continue;
								}
								else{
									$("cell_" + i + "_3").animate({left:'125px'},200,function(){
										$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
										$("cell_" + i + "_1").addClass("n" + number3).text(number3);
									});
									continue;
								}
							}
						}
						else{
							if ($("#cell_" + i + "_3").className.length === 1){
								var number0 = +($("cell_" + i + "_0").text());
								var number2 = +($("cell_" + i + "_2").text());
								if (number0 === number2){
									$("cell_" + i + "_2").animate({left:'20px'},200,function(){
										var number4 = number0 + number2;
										$("cell_" + i + "_0").removeClass("n" + number0).text("");
										$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_0").addClass("n" + number4).text(number4);
									});
									continue;
								}
								else{
									$("cell_" + i + "_2").animate({left:'125px'},200,function(){
										$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_1").addClass("n" + number2).text(number2);
									});
									continue;
								}
							}
							else{
								var number0 = +($("cell_" + i + "_0").text());
								var number2 = +($("cell_" + i + "_2").text());
								var number3 = +($("cell_" + i + "_3").text());
								if (number0 === number2){
									$("cell_" + i + "_2").animate({left:"20px"},200);
									$("cell_" + i + "_3").animate({left:"125px"},200,function(){
										var number4 = number0 + number2;
										$("cell_" + i + "_0").removeClass("n" + number0).text("");
										$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
										$("cell_" + i + "_0").addClass("n" + number4).text(number4);
										$("cell_" + i + "_1").addClass("n" + number3).text(number3);
									});
									continue;
								}
								else{
									if (number2 === number3){
										$("cell_" + i + "_2").animate({left:"125px"},100);
										$("cell_" + i + "_3").animate({left:"125px"},200,function(){
											var number4 = number2 + number3;
											$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
											$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
											$("cell_" + i + "_1").addClass("n" + number4).text(number4);
										});
										continue;
									}
									else{
										$("cell_" + i + "_2").animate({left:"125px"},100);
										$("cell_" + i + "_3").animate({left:"230px"},100,function(){
											$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
											$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
											$("cell_" + i + "_1").addClass("n" + number2).text(number2);
											$("cell_" + i + "_2").addClass("n" + number3).text(number3);
										});
										continue;
									}
								}
							}
						}
					}
					else{
						if ($("#cell_" + i + "_2").className.length === 1){
							if ($("#cell_" + i + "_3").className.length === 1){
								var number0 = +($("cell_" + i + "_0").text());
								var number1 = +($("cell_" + i + "_1").text());
								if (number0 === number1){
									$("cell_" + i + "_1").animate({left:'20px'},300,function(){
										var number4 = number0 + number1;
										$("cell_" + i + "_0").removeClass("n" + number0).text("");
										$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
										$("cell_" + i + "_0").addClass("n" + number4).text(number4);
									});
									continue;
								}
								else{
									continue;
								}
							}
							else{
								var number0 = +($("cell_" + i + "_0").text());
								var number1 = +($("cell_" + i + "_1").text());
								var number3 = +($("cell_" + i + "_3").text());
								if (number0 === number1){
									$("cell_" + i + "_1").animate({left:"20px"},100);
									$("cell_" + i + "_3").animate({left:"125px"},200,function(){
										var number4 = number0 + number1;
										$("cell_" + i + "_0").removeClass("n" + number0).text("");
										$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
										$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
										$("cell_" + i + "_0").addClass("n" + number4).text(number4);
										$("cell_" + i + "_1").addClass("n" + number3).text(number3);
									});
									continue;
								}
								else{
									if (number1 === number3){
										$("cell_" + i + "_3").animate({left:"125px"},200,function(){
											var number4 = number1 + number3;
											$("cell_" + i + "_1").removeClass("n" + number1);
											$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
											$("cell_" + i + "_1").addClass("n" + number4).text(number4);
										});
										continue;
									}
									else{
										$("cell_" + i + "_3").animate({left:"230px"},100,function(){
											$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
											$("cell_" + i + "_2").addClass("n" + number3).text(number3);
										});
										continue;
									}
								}
							}
						}
						else{
							if ($("#cell_" + i + "_3").className.length === 1){
								var number0 = +($("cell_" + i + "_0").text());
								var number1 = +($("cell_" + i + "_1").text());
								var number2 = +($("cell_" + i + "_2").text());
								if (number0 === number1){
									$("cell_" + i + "_1").animate({left:"20px"},100);
									$("cell_" + i + "_2").animate({left:"125px"},100,function(){
										var number4 = number0 + number1;
										$("cell_" + i + "_0").removeClass("n" + number0).text("");
										$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
										$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_0").addClass("n" + number4).text(number4);
										$("cell_" + i + "_1").addClass("n" + number2).text(number2);
									});
									continue;
								}
								else{
									if (number1 === number2){
										$("cell_" + i + "_2").animate({left:"125px"},100,function(){
											var number4 = number1 + number2;
											$("cell_" + i + "_1").removeClass("n" + number1);
											$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
											$("cell_" + i + "_1").addClass("n" + number4).text(number4);
										});
										continue;
									}
									else{
										continue;
									}
								}
							}
							else{
								var number0 = +($("cell_" + i + "_0").text());
								var number1 = +($("cell_" + i + "_1").text());
								var number2 = +($("cell_" + i + "_2").text());
								var number3 = +($("cell_" + i + "_3").text());
								if (number0 === number1){
									if (number2 === number3){
										var number4 = number0 + number1;
										var number5 = number2 + number3;
										$("cell_" + i + "_1").animate({left:"20px"},100);
										$("cell_" + i + "_2").animate({left:"125px"},100);
										$("cell_" + i + "_3").animate({left:"125px"},200,function(){
											$("cell_" + i + "_0").removeClass("n" + number0).text("");
											$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
											$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
											$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
											$("cell_" + i + "_0").addClass("n" + number4).text(number4);
											$("cell_" + i + "_1").addClass("n" + number5).text(number5);
										});
										continue;
									}
									else{
										$("cell_" + i + "_1").animate({left:"20px"},100);
										$("cell_" + i + "_2").animate({left:"125px"},100);
										$("cell_" + i + "_3").animate({left:"230px"},100,function(){
											var number4 = number0 + number1;
											$("cell_" + i + "_0").removeClass("n" + number0).text("");
											$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
											$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
											$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
											$("cell_" + i + "_0").addClass("n" + number4).text(number4);
											$("cell_" + i + "_1").addClass("n" + number2).text(number2);
											$("cell_" + i + "_2").addClass("n" + number3).text(number3);
										});
										continue;
									}
								}
								else{
									if (number1 === number2){
										$("cell_" + i + "_2").animate({left:"125px"},100);
										$("cell_" + i + "_3").animate({left:"230px"},100,function(){
											var number4 = number1 + number2;
											$("cell_" + i + "_1").removeClass("n" + number1).text("");
											$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
											$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
											$("cell_" + i + "_1").addClass("n" + number4).text(number4);
											$("cell_" + i + "_2").addClass("n" + number3).text(number3);
										});
										continue;
									}
									else{
										if (number2 === number3){
											$("cell_" + i + "_3").animate({left:"230px"},100,function(){
												var number4 = number2 + number3;
												$("cell_" + i + "_2").removeClass("n" + number2).text("");
												$("cell_" + i + "_3").css("left","335px").removeClass("n" + number3).text("");
												$("cell_" + i + "_2").addClass("n" + number4).text(number4);
											});
											continue;
										}
										else{
											continue;
										}
									}
								}
							}
						}
					}
				}
			}
			if (game.isWin()){
				return
			}
			game.randomEmerge();
			game.isFail();
		},
		//右
		rightDown : function(){
			for (var i = 0;i < 4;i++){
				if ($("#cell_" + i + "_3").className.length === 1){
					if ($("#cell_" + i + "_2").className.length === 1){
						if($("cell_" + i + "_1").className.length === 1){
							if ($("cell_" + i + "_0").className.length ===1) {
								continue;
							}
							else{
								$("cell_" + i + "_0").animate({left:'335px'},300,function(){
									var number0 = +($("cell_" + i + "_0").text());
									$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
									$("cell_" + i + "_3").addClass("n" + number0).text(number0);
								});
								continue;
							}
						}
						else{
							if ($("cell_" + i + "_0").className.length === 1){
								$("cell_" + i + "_1").animate({left:'335px'},200,function(){
									var number1 = +($("cell_" + i + "_1").text());
									$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
									$("cell_" + i + "_3").addClass("n" + number1).text(number1);
								});
								continue;
							}
							else{
								var number1 = +($("cell_" + i + "_1").text());
								var number0 = +($("cell_" + i + "_0").text());
								if (number1 === number0){
									$("cell_" + i + "_1").animate({left:'335px'},200);
									$("cell_" + i + "_0").animate({left:'335px'},300,function(){
										var number3 = number1 + number0;
										$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
										$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
										$("cell_" + i + "_3").addClass("n" + number3).text(number3);
									});
									continue;
								}
								else{
									$("cell_" + i + "_1").animate({left:'335px'},200);
									$("cell_" + i + "_0").animate({left:'230px'},200,function(){
										$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
										$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
										$("cell_" + i + "_3").addClass("n" + number1).text(number1);
										$("cell_" + i + "_2").addClass("n" + number0).text(number0);
									});
									continue;
								}
							}
						}
					}
					else{
						if ($("cell_" + i + "_1").className.length === 1){
							if ($("cell_" + i + "_0").className.length === 1){
								$("cell_" + i + "_2").animate({left:'335px'},100,function(){
									var number1 = +($("cell_" + i + "_2").text());
									$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
									$("cell_" + i + "_3").addClass("n" + number2).text(number2);
								});
								continue;
							}
							else{
								var number2 = +($("cell_" + i + "_2").text());
								var number0 = +($("cell_" + i + "_0").text());
								if (number2 === number0){
									$("cell_" + i + "_2").animate({left:'335px'},100);
									$("cell_" + i + "_0").animate({left:'335px'},300,function(){
										var number3 = number2 + number0;
										$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
										$("cell_" + i + "_3").addClass("n" + number3).text(number3);
									});
									continue;
								}
								else{
									$("cell_" + i + "_2").animate({left:'335px'},100);
									$("cell_" + i + "_0").animate({left:'230px'},200,function(){
										$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
										$("cell_" + i + "_3").addClass("n" + number3).text(number3);
										$("cell_" + i + "_2").addClass("n" + number0).text(number0);
									});
									continue;
								}
							}
						}
						else{
							if ($("cell_" + i + "_0").className.length === 1){
								var number2 = +($("cell_" + i + "_2").text());
								var number1 = +($("cell_" + i + "_1").text());
								if (number2 === number1){
									$("cell_" + i + "_2").animate({left:'335px'},100);
									$("cell_" + i + "_1").animate({left:'335px'},200,function(){
										var number3 = number2 + number1;
										$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
										$("cell_" + i + "_3").addClass("n" + number3).text(number3);
									});
									continue;
								}
								else{
									$("cell_" + i + "_2").animate({left:'335px'},100);
									$("cell_" + i + "_1").animate({left:'230px'},100,function(){
										$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
										$("cell_" + i + "_3").addClass("n" + number2).text(number2);
										$("cell_" + i + "_2").addClass("n" + number1).text(number1);
									});
									continue;
								}
							}
							else{
								var number2 = +($("cell_" + i + "_2").text());
								var number1 = +($("cell_" + i + "_1").text());
								var number0 = +($("cell_" + i + "_0").text());
								if (number2 === number1){
									$("cell_" + i + "_2").animate({left:"335px"},100);
									$("cell_" + i + "_1").animate({left:"335px"},200);
									$("cell_" + i + "_0").animate({left:"230px"},200,function(){
										var number3 = number2 + number1;
										$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
										$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
										$("cell_" + i + "_3").addClass("n" + number3).text(number3);
										$("cell_" + i + "_2").addClass("n" + number0).text(number0);
									});
									continue;
								}
								else{
									if (number1 === number0){
										$("cell_" + i + "_2").animate({left:"335px"},100);
										$("cell_" + i + "_1").animate({left:"230px"},100);
										$("cell_" + i + "_0").animate({left:"230px"},200,function(){
											var number4 = number1 + number0;
											$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
											$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
											$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
											$("cell_" + i + "_3").addClass("n" + number2).text(number2);
											$("cell_" + i + "_2").addClass("n" + number4).text(number4);
										});
										continue;
									}
									else{
										$("cell_" + i + "_2").animate({left:"335px"},100);
										$("cell_" + i + "_1").animate({left:"230px"},100);
										$("cell_" + i + "_0").animate({left:"125px"},100,function(){
											$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
											$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
											$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
											$("cell_" + i + "_3").addClass("n" + number2).text(number2);
											$("cell_" + i + "_2").addClass("n" + number1).text(number1);
											$("cell_" + i + "_1").addClass("n" + number0).text(number0);
										});
										continue;
									}
								}
							}
						}
					}
				}
				else{
					if ($("#cell_" + i + "_2").className.length === 1){
						if ($("#cell_" + i + "_1").className.length === 1){
							if ($("#cell_" + i + "_0").className.length === 1){
								continue;
							}
							else{
								var number3 = +($("cell_" + i + "_3").text());
								var number0 = +($("cell_" + i + "_0").text());
								if (number3 === number0){
									$("cell_" + i + "_0").animate({left:'335px'},300,function(){
										var number4 = number3 + number0;
										$("cell_" + i + "_3").removeClass("n" + number3).text("");
										$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
										$("cell_" + i + "_3").addClass("n" + number4).text(number4);
									});
									continue;
								}
								else{
									$("cell_" + i + "_0").animate({left:'230px'},200,function(){
										$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
										$("cell_" + i + "_2").addClass("n" + number0).text(number0);
									});
									continue;
								}
							}
						}
						else{
							if ($("#cell_" + i + "_0").className.length === 1){
								var number3 = +($("cell_" + i + "_3").text());
								var number1 = +($("cell_" + i + "_1").text());
								if (number3 === number1){
									$("cell_" + i + "_1").animate({left:'335px'},200,function(){
										var number4 = number3 + number1;
										$("cell_" + i + "_3").removeClass("n" + number3).text("");
										$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
										$("cell_" + i + "_3").addClass("n" + number4).text(number4);
									});
									continue;
								}
								else{
									$("cell_" + i + "_1").animate({left:'230px'},200,function(){
										$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
										$("cell_" + i + "_2").addClass("n" + number1).text(number1);
									});
									continue;
								}
							}
							else{
								var number3 = +($("cell_" + i + "_3").text());
								var number1 = +($("cell_" + i + "_1").text());
								var number0 = +($("cell_" + i + "_0").text());
								if (number3 === number1){
									$("cell_" + i + "_1").animate({left:"335px"},200);
									$("cell_" + i + "_0").animate({left:"230px"},200,function(){
										var number4 = number3 + number1;
										$("cell_" + i + "_3").removeClass("n" + number3).text("");
										$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
										$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
										$("cell_" + i + "_3").addClass("n" + number4).text(number4);
										$("cell_" + i + "_2").addClass("n" + number0).text(number0);
									});
									continue;
								}
								else{
									if (number1 === number0){
										$("cell_" + i + "_1").animate({left:"230px"},100);
										$("cell_" + i + "_0").animate({left:"230px"},200,function(){
											var number4 = number1 + number0;
											$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
											$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
											$("cell_" + i + "_2").addClass("n" + number4).text(number4);
										});
										continue;
									}
									else{
										$("cell_" + i + "_1").animate({left:"230px"},100);
										$("cell_" + i + "_0").animate({left:"125px"},100,function(){
											$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
											$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
											$("cell_" + i + "_2").addClass("n" + number1).text(number1);
											$("cell_" + i + "_1").addClass("n" + number0).text(number0);
										});
										continue;
									}
								}
							}
						}
					}
					else{
						if ($("#cell_" + i + "_1").className.length === 1){
							if ($("#cell_" + i + "_0").className.length === 1){
								var number3 = +($("cell_" + i + "_3").text());
								var number2 = +($("cell_" + i + "_2").text());
								if (number3 === number2){
									$("cell_" + i + "_2").animate({left:'335px'},300,function(){
										var number4 = number3 + number2;
										$("cell_" + i + "_3").removeClass("n" + number3).text("");
										$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_3").addClass("n" + number4).text(number4);
									});
									continue;
								}
								else{
									continue;
								}
							}
							else{
								var number3 = +($("cell_" + i + "_3").text());
								var number2 = +($("cell_" + i + "_2").text());
								var number0 = +($("cell_" + i + "_0").text());
								if (number3 === number2){
									$("cell_" + i + "_2").animate({left:"335px"},100);
									$("cell_" + i + "_0").animate({left:"230px"},200,function(){
										var number4 = number3 + number2;
										$("cell_" + i + "_3").removeClass("n" + number3).text("");
										$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
										$("cell_" + i + "_3").addClass("n" + number4).text(number4);
										$("cell_" + i + "_2").addClass("n" + number0).text(number0);
									});
									continue;
								}
								else{
									if (number2 === number0){
										$("cell_" + i + "_0").animate({left:"230px"},200,function(){
											var number4 = number2 + number0;
											$("cell_" + i + "_2").removeClass("n" + number2);
											$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
											$("cell_" + i + "_2").addClass("n" + number4).text(number4);
										});
										continue;
									}
									else{
										$("cell_" + i + "_0").animate({left:"125px"},100,function(){
											$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
											$("cell_" + i + "_1").addClass("n" + number0).text(number0);
										});
										continue;
									}
								}
							}
						}
						else{
							if ($("#cell_" + i + "_0").className.length === 1){
								var number3 = +($("cell_" + i + "_3").text());
								var number2 = +($("cell_" + i + "_2").text());
								var number1 = +($("cell_" + i + "_1").text());
								if (number3 === number2){
									$("cell_" + i + "_2").animate({left:"335px"},100);
									$("cell_" + i + "_1").animate({left:"230px"},100,function(){
										var number4 = number3 + number2;
										$("cell_" + i + "_3").removeClass("n" + number3).text("");
										$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
										$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
										$("cell_" + i + "_3").addClass("n" + number4).text(number4);
										$("cell_" + i + "_2").addClass("n" + number1).text(number1);
									});
									continue;
								}
								else{
									if (number2 === number1){
										$("cell_" + i + "_1").animate({left:"230px"},100,function(){
											var number4 = number2 + number1;
											$("cell_" + i + "_2").removeClass("n" + number2);
											$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
											$("cell_" + i + "_2").addClass("n" + number4).text(number4);
										});
										continue;
									}
									else{
										continue;
									}
								}
							}
							else{
								var number3 = +($("cell_" + i + "_3").text());
								var number2 = +($("cell_" + i + "_2").text());
								var number1 = +($("cell_" + i + "_1").text());
								var number0 = +($("cell_" + i + "_0").text());
								if (number3 === number2){
									if (number1 === number0){
										var number4 = number3 + number2;
										var number5 = number1 + number0;
										$("cell_" + i + "_2").animate({left:"335px"},100);
										$("cell_" + i + "_1").animate({left:"230px"},100);
										$("cell_" + i + "_0").animate({left:"230px"},200,function(){
											$("cell_" + i + "_3").removeClass("n" + number3).text("");
											$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
											$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
											$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
											$("cell_" + i + "_3").addClass("n" + number4).text(number4);
											$("cell_" + i + "_2").addClass("n" + number5).text(number5);
										});
										continue;
									}
									else{
										$("cell_" + i + "_2").animate({left:"335px"},100);
										$("cell_" + i + "_1").animate({left:"230px"},100);
										$("cell_" + i + "_0").animate({left:"125px"},100,function(){
											var number4 = number3 + number2;
											$("cell_" + i + "_3").removeClass("n" + number3).text("");
											$("cell_" + i + "_2").css("left","230px").removeClass("n" + number2).text("");
											$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
											$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
											$("cell_" + i + "_3").addClass("n" + number4).text(number4);
											$("cell_" + i + "_2").addClass("n" + number1).text(number1);
											$("cell_" + i + "_1").addClass("n" + number0).text(number0);
										});
										continue;
									}
								}
								else{
									if (number2 === number1){
										$("cell_" + i + "_1").animate({left:"230px"},100);
										$("cell_" + i + "_0").animate({left:"125px"},100,function(){
											var number4 = number2 + number1;
											$("cell_" + i + "_2").removeClass("n" + number2).text("");
											$("cell_" + i + "_1").css("left","125px").removeClass("n" + number1).text("");
											$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
											$("cell_" + i + "_2").addClass("n" + number4).text(number4);
											$("cell_" + i + "_1").addClass("n" + number0).text(number0);
										});
										continue;
									}
									else{
										if (number1 === number0){
											$("cell_" + i + "_0").animate({left:"125px"},100,function(){
												var number4 = number1 + number0;
												$("cell_" + i + "_1").removeClass("n" + number1).text("");
												$("cell_" + i + "_0").css("left","20px").removeClass("n" + number0).text("");
												$("cell_" + i + "_1").addClass("n" + number4).text(number4);
											});
											continue;
										}
										else{
											continue;
										}
									}
								}
							}
						}
					}
				}
			}
			if (game.isWin()){
				return
			}
			game.randomEmerge();
			game.isFail();
		},
		//上
		upDown : function(){
			for (var i = 0;i < 4;i++){
				if ($("#cell_0_" + i).className.length === 1){
					if ($("#cell_1_" + i).className.length === 1){
						if($("cell_2_" + i).className.length === 1){
							if ($("cell_3_" + i).className.length ===1) {
								continue;
							}
							else{
								$("cell_3_" + i).animate({top:'20px'},300,function(){
									var number3 = +($("cell_3_" + i).text());
									$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
									$("cell_0_" + i).addClass("n" + number3).text(number3);
								});
								continue;
							}
						}
						else{
							if ($("cell_3_" + i).className.length === 1){
								$("cell_2_" + i).animate({top:'20px'},200,function(){
									var number2 = +($("cell_2_" + i).text());
									$("cell_2_" + i).css("top","230px").removeClass("n" + number2).text("");
									$("cell_0_" + i).addClass("n" + number2).text(number2);
								});
								continue;
							}
							else{
								var number2 = +($("cell_2_" + i).text());
								var number3 = +($("cell_3_" + i).text());
								if (number2 === number3){
									$("cell_2_" + i).animate({top:'20px'},200);
									$("cell_3_" + i).animate({top:'20px'},300,function(){
										var number0 = number2 + number3;
										$("cell_2_" + i).css("top","230px").removeClass("n" + number2).text("");
										$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
										$("cell_0_" + i).addClass("n" + number0).text(number0);
									});
									continue;
								}
								else{
									$("cell_2_" + i).animate({top:'20px'},200);
									$("cell_3_" + i).animate({top:'125px'},200,function(){
										$("cell_2_" + i).css("top","230px").removeClass("n" + number2).text("");
										$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
										$("cell_0_" + i).addClass("n" + number2).text(number2);
										$("cell_1_" + i).addClass("n" + number3).text(number3);
									});
									continue;
								}
							}
						}
					}
					else{
						if ($("cell_2_" + i).className.length === 1){
							if ($("cell_3_" + i).className.length === 1){
								$("cell_1_" + i).animate({top:'20px'},100,function(){
									var number1 = +($("cell_1_" + i).text());
									$("cell_1_" + i).css("top","125px").removeClass("n" + number1).text("");
									$("cell_0_" + i).addClass("n" + number1).text(number1);
								});
								continue;
							}
							else{
								var number1 = +($("cell_1_" + i).text());
								var number3 = +($("cell_3_" + i).text());
								if (number1 === number3){
									$("cell_1_" + i).animate({top:'20px'},100);
									$("cell_3_" + i).animate({top:'20px'},300,function(){
										var number0 = number1 + number3;
										$("cell_1_" + i).css("top","125px").removeClass("n" + number1).text("");
										$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
										$("cell_0_" + i).addClass("n" + number0).text(number0);
									});
									continue;
								}
								else{
									$("cell_1_" + i).animate({top:'20px'},100);
									$("cell_3_" + i).animate({top:'125px'},200,function(){
										$("cell_1_" + i).css("top","125px").removeClass("n" + number1).text("");
										$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
										$("cell_0_" + i).addClass("n" + number1).text(number1);
										$("cell_1_" + i).addClass("n" + number3).text(number3);
									});
									continue;
								}
							}
						}
						else{
							if ($("cell_3_" + i).className.length === 1){
								var number1 = +($("cell_1_" + i).text());
								var number2 = +($("cell_2_" + i).text());
								if (number1 === number2){
									$("cell_1_" + i).animate({top:'20px'},100);
									$("cell_2_" + i).animate({top:'20px'},200,function(){
										var number0 = number1 + number2;
										$("cell_1_" + i).css("top","125px").removeClass("n" + number1).text("");
										$("cell_2_" + i).css("top","230px").removeClass("n" + number2).text("");
										$("cell_0_" + i).addClass("n" + number0).text(number0);
									});
									continue;
								}
								else{
									$("cell_1_" + i).animate({top:'20px'},100);
									$("cell_2_" + i).animate({top:'125px'},100,function(){
										$("cell_1_" + i).css("top","125px").removeClass("n" + number1).text("");
										$("cell_2_" + i).css("top","230px").removeClass("n" + number2).text("");
										$("cell_0_" + i).addClass("n" + number1).text(number1);
										$("cell_1_" + i).addClass("n" + number2).text(number2);
									});
									continue;
								}
							}
							else{
								var number1 = +($("cell_1_" + i).text());
								var number2 = +($("cell_2_" + i).text());
								var number3 = +($("cell_3_" + i).text());
								if (number1 === number2){
									$("cell_1_" + i).animate({top:"20px"},100);
									$("cell_2_" + i).animate({top:"20px"},200);
									$("cell_3_" + i).animate({top:"125px"},200,function(){
										var number0 = number1 + number2;
										$("cell_1_" + i).css("top","125px").removeClass("n" + number1).text("");
										$("cell_2_" + i).css("top","230px").removeClass("n" + number2).text("");
										$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
										$("cell_0_" + i).addClass("n" + number0).text(number0);
										$("cell_1_" + i).addClass("n" + number3).text(number3);
									});
									continue;
								}
								else{
									if (number2 === number3){
										$("cell_1_" + i).animate({top:"20px"},100);
										$("cell_2_" + i).animate({top:"125px"},100);
										$("cell_3_" + i).animate({top:"125px"},200,function(){
											var number4 = number2 + number3;
											$("cell_1_" + i).css("top","125px").removeClass("n" + number1).text("");
											$("cell_2_" + i).css("top","230px").removeClass("n" + number2).text("");
											$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
											$("cell_0_" + i).addClass("n" + number1).text(number1);
											$("cell_1_" + i).addClass("n" + number4).text(number4);
										});
										continue;
									}
									else{
										$("cell_1_" + i).animate({top:"20px"},100);
										$("cell_2_" + i).animate({top:"125px"},100);
										$("cell_3_" + i).animate({top:"230px"},100,function(){
											$("cell_1_" + i).css("top","125px").removeClass("n" + number1).text("");
											$("cell_2_" + i).css("top","230px").removeClass("n" + number2).text("");
											$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
											$("cell_0_" + i).addClass("n" + number1).text(number1);
											$("cell_1_" + i).addClass("n" + number2).text(number2);
											$("cell_2_" + i).addClass("n" + number3).text(number3);
										});
										continue;
									}
								}
							}
						}
					}
				}
				else{
					if ($("#cell_1_" + i).className.length === 1){
						if ($("#cell_2_" + i).className.length === 1){
							if ($("#cell_3_" + i).className.length === 1){
								continue;
							}
							else{
								var number0 = +($("cell_0_" + i).text());
								var number3 = +($("cell_3_" + i).text());
								if (number0 === number3){
									$("cell_3_" + i).animate({top:'20px'},300,function(){
										var number4 = number0 + number3;
										$("cell_0_" + i).removeClass("n" + number0).text("");
										$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
										$("cell_0_" + i).addClass("n" + number4).text(number4);
									});
									continue;
								}
								else{
									$("cell_3_" + i).animate({top:'125px'},200,function(){
										$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
										$("cell_1_" + i).addClass("n" + number3).text(number3);
									});
									continue;
								}
							}
						}
						else{
							if ($("#cell_3_" + i).className.length === 1){
								var number0 = +($("cell_0_" + i).text());
								var number2 = +($("cell_2_" + i).text());
								if (number0 === number2){
									$("cell_2_" + i).animate({top:'20px'},200,function(){
										var number4 = number0 + number2;
										$("cell_0_" + i).removeClass("n" + number0).text("");
										$("cell_2_" + i).css("top","230px").removeClass("n" + number2).text("");
										$("cell_0_" + i).addClass("n" + number4).text(number4);
									});
									continue;
								}
								else{
									$("cell_2_" + i).animate({top:'125px'},200,function(){
										$("cell_2_" + i).css("top","230px").removeClass("n" + number2).text("");
										$("cell_1_" + i).addClass("n" + number2).text(number2);
									});
									continue;
								}
							}
							else{
								var number0 = +($("cell_0_" + i).text());
								var number2 = +($("cell_2_" + i).text());
								var number3 = +($("cell_3_" + i).text());
								if (number0 === number2){
									$("cell_2_" + i).animate({top:"20px"},200);
									$("cell_3_" + i).animate({top:"125px"},200,function(){
										var number4 = number0 + number2;
										$("cell_0_" + i).removeClass("n" + number0).text("");
										$("cell_2_" + i).css("top","230px").removeClass("n" + number2).text("");
										$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
										$("cell_0_" + i).addClass("n" + number4).text(number4);
										$("cell_1_" + i).addClass("n" + number3).text(number3);
									});
									continue;
								}
								else{
									if (number2 === number3){
										$("cell_2_" + i).animate({top:"125px"},100);
										$("cell_3_" + i).animate({top:"125px"},200,function(){
											var number4 = number2 + number3;
											$("cell_2_" + i).css("top","230px").removeClass("n" + number2).text("");
											$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
											$("cell_1_" + i).addClass("n" + number4).text(number4);
										});
										continue;
									}
									else{
										$("cell_2_" + i).animate({top:"125px"},100);
										$("cell_3_" + i).animate({top:"230px"},100,function(){
											$("cell_2_" + i).css("top","230px").removeClass("n" + number2).text("");
											$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
											$("cell_1_" + i).addClass("n" + number2).text(number2);
											$("cell_2_" + i).addClass("n" + number3).text(number3);
										});
										continue;
									}
								}
							}
						}
					}
					else{
						if ($("#cell_2_" + i.className.length === 1){
							if ($("#cell_3_" + i).className.length === 1){
								var number0 = +($("cell_0_" + i).text());
								var number1 = +($("cell_1_" + i).text());
								if (number0 === number1){
									$("cell_1_" + i).animate({top:'20px'},300,function(){
										var number4 = number0 + number1;
										$("cell_0_" + i).removeClass("n" + number0).text("");
										$("cell_1_" + i).css("top","125px").removeClass("n" + number1).text("");
										$("cell_0_" + i).addClass("n" + number4).text(number4);
									});
									continue;
								}
								else{
									continue;
								}
							}
							else{
								var number0 = +($("cell_0_" + i).text());
								var number1 = +($("cell_1_" + i).text());
								var number3 = +($("cell_3_" + i).text());
								if (number0 === number1){
									$("cell_1_" + i).animate({top:"20px"},100);
									$("cell_3_" + i).animate({top:"125px"},200,function(){
										var number4 = number0 + number1;
										$("cell_0_" + i).removeClass("n" + number0).text("");
										$("cell_1_" + i).css("top","125px").removeClass("n" + number1).text("");
										$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
										$("cell_0_" + i).addClass("n" + number4).text(number4);
										$("cell_1_" + i).addClass("n" + number3).text(number3);
									});
									continue;
								}
								else{
									if (number1 === number3){
										$("cell_3_" + i).animate({top:"125px"},200,function(){
											var number4 = number1 + number3;
											$("cell_1_" + i).removeClass("n" + number1);
											$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
											$("cell_1_" + i).addClass("n" + number4).text(number4);
										});
										continue;
									}
									else{
										$("cell_3_" + i).animate({top:"230px"},100,function(){
											$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
											$("cell_2_" + i).addClass("n" + number3).text(number3);
										});
										continue;
									}
								}
							}
						}
						else{
							if ($("#cell_3_" + i).className.length === 1){
								var number0 = +($("cell_0_" + i).text());
								var number1 = +($("cell_1_" + i).text());
								var number2 = +($("cell_2_" + i).text());
								if (number0 === number1){
									$("cell_1_" + i).animate({top:"20px"},100);
									$("cell_2_" + i).animate({top:"125px"},100,function(){
										var number4 = number0 + number1;
										$("cell_0_" + i).removeClass("n" + number0).text("");
										$("cell_1_" + i).css("top","125px").removeClass("n" + number1).text("");
										$("cell_2_" + i).css("top","230px").removeClass("n" + number2).text("");
										$("cell_0_" + i).addClass("n" + number4).text(number4);
										$("cell_1_" + i).addClass("n" + number2).text(number2);
									});
									continue;
								}
								else{
									if (number1 === number2){
										$("cell_2_" + i).animate({top:"125px"},100,function(){
											var number4 = number1 + number2;
											$("cell_1_" + i).removeClass("n" + number1);
											$("cell_2_" + i).css("top","230px").removeClass("n" + number2).text("");
											$("cell_1_" + i).addClass("n" + number4).text(number4);
										});
										continue;
									}
									else{
										continue;
									}
								}
							}
							else{
								var number0 = +($("cell_0_" + i).text());
								var number1 = +($("cell_1_" + i).text());
								var number2 = +($("cell_2_" + i).text());
								var number3 = +($("cell_3_" + i).text());
								if (number0 === number1){
									if (number2 === number3){
										var number4 = number0 + number1;
										var number5 = number2 + number3;
										$("cell_1_" + i).animate({top:"20px"},100);
										$("cell_2_" + i).animate({top:"125px"},100);
										$("cell_3_" + i).animate({top:"125px"},200,function(){
											$("cell_0_" + i).removeClass("n" + number0).text("");
											$("cell_1_" + i).css("top","125px").removeClass("n" + number1).text("");
											$("cell_1_" + i).css("top","230px").removeClass("n" + number2).text("");
											$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
											$("cell_0_" + i).addClass("n" + number4).text(number4);
											$("cell_1_" + i).addClass("n" + number5).text(number5);
										});
										continue;
									}
									else{
										$("cell_1_" + i).animate({top:"20px"},100);
										$("cell_2_" + i).animate({top:"125px"},100);
										$("cell_3_" + i).animate({top:"230px"},100,function(){
											var number4 = number0 + number1;
											$("cell_0_" + i).removeClass("n" + number0).text("");
											$("cell_1_" + i).css("top","125px").removeClass("n" + number1).text("");
											$("cell_2_" + i).css("top","230px").removeClass("n" + number2).text("");
											$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
											$("cell_0_" + i).addClass("n" + number4).text(number4);
											$("cell_1_" + i).addClass("n" + number2).text(number2);
											$("cell_2_" + i).addClass("n" + number3).text(number3);
										});
										continue;
									}
								}
								else{
									if (number1 === number2){
										$("cell_2_" + i).animate({top:"125px"},100);
										$("cell_3_" + i).animate({top:"230px"},100,function(){
											var number4 = number1 + number2;
											$("cell_1_" + i).removeClass("n" + number1).text("");
											$("cell_2_" + i).css("top","230px").removeClass("n" + number2).text("");
											$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
											$("cell_1_" + i).addClass("n" + number4).text(number4);
											$("cell_2_" + i).addClass("n" + number3).text(number3);
										});
										continue;
									}
									else{
										if (number2 === number3){
											$("cell_3_" + i).animate({top:"230px"},100,function(){
												var number4 = number2 + number3;
												$("cell_2_" + i).removeClass("n" + number2).text("");
												$("cell_3_" + i).css("top","335px").removeClass("n" + number3).text("");
												$("cell_2_" + i).addClass("n" + number4).text(number4);
											});
											continue;
										}
										else{
											continue;
										}
									}
								}
							}
						}
					}
				}
			}
			if (game.isWin()){
				return
			}
			game.randomEmerge();
			game.isFail();
		},
	}


}())
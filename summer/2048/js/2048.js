<<<<<<< HEAD:summer/2048/js/2048.js
=======
//我放弃这个代码了
//重写
//这个坑跳的
var game = (function(){
	var l = localStorage;
	var highScore = l.getItem("score") || 0;//读取最高分
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
					if ($("#cell_" + i + "_" + k).attr("class") === "cell"){
						empty.push($("#cell_" + i + "_" + k))
					}
				}
			}
			if (empty.length === 0){
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
				if (allCell[i].textContent === "2048"){
					$("document").unbind("keydown");
					$(".win p").textContent = "您成功了";
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
				l.setItem("score",score)
			}
			$("document").click(function(){location.reload()});
			return true
		},
		//左
		leftDown : function(){
				if ($("#cell_0_0").attr("class") === "cell"){
					if ($("#cell_0_1").attr("class") === "cell"){
						if($("#cell_0_2").attr("class") === "cell"){
							if ($("#cell_0_3").attr("class") === "cell"){
								
							}
							else{
								$("#cell_0_3").animate({left:'20px'},300,function(){
									var number3 = +($("#cell_0_3").text());
									$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
									$("#cell_0_0").addClass("n" + number3).text(number3);
								});
								
							}
						}
						else{
							if ($("#cell_0_3").attr("class") === "cell"){
								$("#cell_0_2").animate({left:'20px'},200,function(){
									var number2 = +($("#cell_0_2").text());
									$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
									$("#cell_0_0").addClass("n" + number2).text(number2);
								});
								
							}
							else{
								var number2 = +($("#cell_0_2").text());
								var number3 = +($("#cell_0_3").text());
								if (number2 === number3){
									$("#cell_0_2").animate({left:'20px'},200);
									$("#cell_0_3").animate({left:'20px'},300,function(){
										var number0 = number2 + number3;
										$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_0").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_0_2").animate({left:'20px'},200);
									$("#cell_0_3").animate({left:'125px'},200,function(){
										$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_0").addClass("n" + number2).text(number2);
										$("#cell_0_1").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
					}
					else{
						if ($("#cell_0_2").attr("class") === "cell"){
							if ($("#cell_0_3").attr("class") === "cell"){
								$("#cell_0_1").animate({left:'20px'},100,function(){
									var number1 = +($("#cell_0_1").text());
									$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
									$("#cell_0_0").addClass("n" + number1).text(number1);
								});
								
							}
							else{
								var number1 = +($("#cell_0_1").text());
								var number3 = +($("#cell_0_3").text());
								if (number1 === number3){
									$("#cell_0_1").animate({left:'20px'},100);
									$("#cell_0_3").animate({left:'20px'},300,function(){
										var number0 = number1 + number3;
										$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_0").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_0_1").animate({left:'20px'},100);
									$("#cell_0_3").animate({left:'125px'},200,function(){
										$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_0").addClass("n" + number1).text(number1);
										$("#cell_0_1").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
						else{
							if ($("#cell_0_3").attr("class") === "cell"){
								var number1 = +($("#cell_0_1").text());
								var number2 = +($("#cell_0_2").text());
								if (number1 === number2){
									$("#cell_0_1").animate({left:'20px'},100);
									$("#cell_0_2").animate({left:'20px'},200,function(){
										var number0 = number1 + number2;
										$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_0").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_0_1").animate({left:'20px'},100);
									$("#cell_0_2").animate({left:'125px'},100,function(){
										$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_0").addClass("n" + number1).text(number1);
										$("#cell_0_1").addClass("n" + number2).text(number2);
									});
									
								}
							}
							else{
								var number1 = +($("#cell_0_1").text());
								var number2 = +($("#cell_0_2").text());
								var number3 = +($("#cell_0_3").text());
								if (number1 === number2){
									$("#cell_0_1").animate({left:"20px"},100);
									$("#cell_0_2").animate({left:"20px"},200);
									$("#cell_0_3").animate({left:"125px"},200,function(){
										var number0 = number1 + number2;
										$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_0").addClass("n" + number0).text(number0);
										$("#cell_0_1").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number2 === number3){
										$("#cell_0_1").animate({left:"20px"},100);
										$("#cell_0_2").animate({left:"125px"},100);
										$("#cell_0_3").animate({left:"125px"},200,function(){
											var number4 = number2 + number3;
											$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_0").addClass("n" + number1).text(number1);
											$("#cell_0_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_0_1").animate({left:"20px"},100);
										$("#cell_0_2").animate({left:"125px"},100);
										$("#cell_0_3").animate({left:"230px"},100,function(){
											$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_0").addClass("n" + number1).text(number1);
											$("#cell_0_1").addClass("n" + number2).text(number2);
											$("#cell_0_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
					}
				}
				else{
					if ($("##cell_0_1").attr("class") === "cell"){
						if ($("##cell_0_2").attr("class") === "cell"){
							if ($("##cell_0_3").attr("class") === "cell"){
								
							}
							else{
								var number0 = +($("#cell_0_0").text());
								var number3 = +($("#cell_0_3").text());
								if (number0 === number3){
									$("#cell_0_3").animate({left:'20px'},300,function(){
										var number4 = number0 + number3;
										$("#cell_0_0").removeClass("n" + number0).text("");
										$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_0").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_0_3").animate({left:'125px'},200,function(){
										$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_1").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
						else{
							if ($("##cell_0_3").attr("class") === "cell"){
								var number0 = +($("#cell_0_0").text());
								var number2 = +($("#cell_0_2").text());
								if (number0 === number2){
									$("#cell_0_2").animate({left:'20px'},200,function(){
										var number4 = number0 + number2;
										$("#cell_0_0").removeClass("n" + number0).text("");
										$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_0").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_0_2").animate({left:'125px'},200,function(){
										$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_1").addClass("n" + number2).text(number2);
									});
									
								}
							}
							else{
								var number0 = +($("#cell_0_0").text());
								var number2 = +($("#cell_0_2").text());
								var number3 = +($("#cell_0_3").text());
								if (number0 === number2){
									$("#cell_0_2").animate({left:"20px"},200);
									$("#cell_0_3").animate({left:"125px"},200,function(){
										var number4 = number0 + number2;
										$("#cell_0_0").removeClass("n" + number0).text("");
										$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_0").addClass("n" + number4).text(number4);
										$("#cell_0_1").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number2 === number3){
										$("#cell_0_2").animate({left:"125px"},100);
										$("#cell_0_3").animate({left:"125px"},200,function(){
											var number4 = number2 + number3;
											$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_0_2").animate({left:"125px"},100);
										$("#cell_0_3").animate({left:"230px"},100,function(){
											$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_1").addClass("n" + number2).text(number2);
											$("#cell_0_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
					}
					else{
						if ($("##cell_0_2").attr("class") === "cell"){
							if ($("##cell_0_3").attr("class") === "cell"){
								var number0 = +($("#cell_0_0").text());
								var number1 = +($("#cell_0_1").text());
								if (number0 === number1){
									$("#cell_0_1").animate({left:'20px'},300,function(){
										var number4 = number0 + number1;
										$("#cell_0_0").removeClass("n" + number0).text("");
										$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_0").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									
								}
							}
							else{
								var number0 = +($("#cell_0_0").text());
								var number1 = +($("#cell_0_1").text());
								var number3 = +($("#cell_0_3").text());
								if (number0 === number1){
									$("#cell_0_1").animate({left:"20px"},100);
									$("#cell_0_3").animate({left:"125px"},200,function(){
										var number4 = number0 + number1;
										$("#cell_0_0").removeClass("n" + number0).text("");
										$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_0").addClass("n" + number4).text(number4);
										$("#cell_0_1").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number1 === number3){
										$("#cell_0_3").animate({left:"125px"},200,function(){
											var number4 = number1 + number3;
											$("#cell_0_1").removeClass("n" + number1);
											$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_0_3").animate({left:"230px"},100,function(){
											$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
						else{
							if ($("#cell_0_3").attr("class") === "cell"){
								var number0 = +($("#cell_0_0").text());
								var number1 = +($("#cell_0_1").text());
								var number2 = +($("#cell_0_2").text());
								if (number0 === number1){
									$("#cell_0_1").animate({left:"20px"},100);
									$("#cell_0_2").animate({left:"125px"},100,function(){
										var number4 = number0 + number1;
										$("#cell_0_0").removeClass("n" + number0).text("");
										$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_0").addClass("n" + number4).text(number4);
										$("#cell_0_1").addClass("n" + number2).text(number2);
									});
									
								}
								else{
									if (number1 === number2){
										$("#cell_0_2").animate({left:"125px"},100,function(){
											var number4 = number1 + number2;
											$("#cell_0_1").removeClass("n" + number1);
											$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_0_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										
									}
								}
							}
							else{
								var number0 = +($("#cell_0_0").text());
								var number1 = +($("#cell_0_1").text());
								var number2 = +($("#cell_0_2").text());
								var number3 = +($("#cell_0_3").text());
								if (number0 === number1){
									if (number2 === number3){
										var number4 = number0 + number1;
										var number5 = number2 + number3;
										$("#cell_0_1").animate({left:"20px"},100);
										$("#cell_0_2").animate({left:"125px"},100);
										$("#cell_0_3").animate({left:"125px"},200,function(){
											$("#cell_0_0").removeClass("n" + number0).text("");
											$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_0").addClass("n" + number4).text(number4);
											$("#cell_0_1").addClass("n" + number5).text(number5);
										});
										
									}
									else{
										$("#cell_0_1").animate({left:"20px"},100);
										$("#cell_0_2").animate({left:"125px"},100);
										$("#cell_0_3").animate({left:"230px"},100,function(){
											var number4 = number0 + number1;
											$("#cell_0_0").removeClass("n" + number0).text("");
											$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_0").addClass("n" + number4).text(number4);
											$("#cell_0_1").addClass("n" + number2).text(number2);
											$("#cell_0_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
								else{
									if (number1 === number2){
										$("#cell_0_2").animate({left:"125px"},100);
										$("#cell_0_3").animate({left:"230px"},100,function(){
											var number4 = number1 + number2;
											$("#cell_0_1").removeClass("n" + number1).text("");
											$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_1").addClass("n" + number4).text(number4);
											$("#cell_0_2").addClass("n" + number3).text(number3);
										});
										
									}
									else{
										if (number2 === number3){
											$("#cell_0_3").animate({left:"230px"},100,function(){
												var number4 = number2 + number3;
												$("#cell_0_2").removeClass("n" + number2).text("");
												$("#cell_0_3").attr("style","none").removeClass("n" + number3).text("");
												$("#cell_0_2").addClass("n" + number4).text(number4);
											});
											
										}
										else{
											
										}
									}
								}
							}
						}
					}
				}
				if ($("#cell_1_0").attr("class") === "cell"){
					if ($("#cell_1_1").attr("class") === "cell"){
						if($("#cell_1_2").attr("class") === "cell"){
							if ($("#cell_1_3").attr("class") === "cell") {
								
							}
							else{
								$("#cell_1_3").animate({left:'20px'},300,function(){
									var number3 = +($("#cell_1_3").text());
									$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
									$("#cell_1_0").addClass("n" + number3).text(number3);
								});
								
							}
						}
						else{
							if ($("#cell_1_3").attr("class") === "cell"){
								$("#cell_1_2").animate({left:'20px'},200,function(){
									var number2 = +($("#cell_1_2").text());
									$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
									$("#cell_1_0").addClass("n" + number2).text(number2);
								});
								
							}
							else{
								var number2 = +($("#cell_1_2").text());
								var number3 = +($("#cell_1_3").text());
								if (number2 === number3){
									$("#cell_1_2").animate({left:'20px'},200);
									$("#cell_1_3").animate({left:'20px'},300,function(){
										var number0 = number2 + number3;
										$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_1_0").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_1_2").animate({left:'20px'},200);
									$("#cell_1_3").animate({left:'125px'},200,function(){
										$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_1_0").addClass("n" + number2).text(number2);
										$("#cell_1_1").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
					}
					else{
						if ($("#cell_1_2").attr("class") === "cell"){
							if ($("#cell_1_3").attr("class") === "cell"){
								$("#cell_1_1").animate({left:'20px'},100,function(){
									var number1 = +($("#cell_1_1").text());
									$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
									$("#cell_1_0").addClass("n" + number1).text(number1);
								});
								
							}
							else{
								var number1 = +($("#cell_1_1").text());
								var number3 = +($("#cell_1_3").text());
								if (number1 === number3){
									$("#cell_1_1").animate({left:'20px'},100);
									$("#cell_1_3").animate({left:'20px'},300,function(){
										var number0 = number1 + number3;
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_1_0").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_1_1").animate({left:'20px'},100);
									$("#cell_1_3").animate({left:'125px'},200,function(){
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_1_0").addClass("n" + number1).text(number1);
										$("#cell_1_1").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
						else{
							if ($("#cell_1_3").attr("class") === "cell"){
								var number1 = +($("#cell_1_1").text());
								var number2 = +($("#cell_1_2").text());
								if (number1 === number2){
									$("#cell_1_1").animate({left:'20px'},100);
									$("#cell_1_2").animate({left:'20px'},200,function(){
										var number0 = number1 + number2;
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_0").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_1_1").animate({left:'20px'},100);
									$("#cell_1_2").animate({left:'125px'},100,function(){
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_0").addClass("n" + number1).text(number1);
										$("#cell_1_1").addClass("n" + number2).text(number2);
									});
									
								}
							}
							else{
								var number1 = +($("#cell_1_1").text());
								var number2 = +($("#cell_1_2").text());
								var number3 = +($("#cell_1_3").text());
								if (number1 === number2){
									$("#cell_1_1").animate({left:"20px"},100);
									$("#cell_1_2").animate({left:"20px"},200);
									$("#cell_1_3").animate({left:"125px"},200,function(){
										var number0 = number1 + number2;
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_1_0").addClass("n" + number0).text(number0);
										$("#cell_1_1").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number2 === number3){
										$("#cell_1_1").animate({left:"20px"},100);
										$("#cell_1_2").animate({left:"125px"},100);
										$("#cell_1_3").animate({left:"125px"},200,function(){
											var number4 = number2 + number3;
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_0").addClass("n" + number1).text(number1);
											$("#cell_1_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_1_1").animate({left:"20px"},100);
										$("#cell_1_2").animate({left:"125px"},100);
										$("#cell_1_3").animate({left:"230px"},100,function(){
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_0").addClass("n" + number1).text(number1);
											$("#cell_1_1").addClass("n" + number2).text(number2);
											$("#cell_1_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
					}
				}
				else{
					if ($("##cell_1_1").attr("class") === "cell"){
						if ($("##cell_1_2").attr("class") === "cell"){
							if ($("##cell_1_3").attr("class") === "cell"){
								
							}
							else{
								var number0 = +($("#cell_1_0").text());
								var number3 = +($("#cell_1_3").text());
								if (number0 === number3){
									$("#cell_1_3").animate({left:'20px'},300,function(){
										var number4 = number0 + number3;
										$("#cell_1_0").removeClass("n" + number0).text("");
										$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_1_0").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_1_3").animate({left:'125px'},200,function(){
										$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_1_1").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
						else{
							if ($("##cell_1_3").attr("class") === "cell"){
								var number0 = +($("#cell_1_0").text());
								var number2 = +($("#cell_1_2").text());
								if (number0 === number2){
									$("#cell_1_2").animate({left:'20px'},200,function(){
										var number4 = number0 + number2;
										$("#cell_1_0").removeClass("n" + number0).text("");
										$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_0").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_1_2").animate({left:'125px'},200,function(){
										$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_1").addClass("n" + number2).text(number2);
									});
									
								}
							}
							else{
								var number0 = +($("#cell_1_0").text());
								var number2 = +($("#cell_1_2").text());
								var number3 = +($("#cell_1_3").text());
								if (number0 === number2){
									$("#cell_1_2").animate({left:"20px"},200);
									$("#cell_1_3").animate({left:"125px"},200,function(){
										var number4 = number0 + number2;
										$("#cell_1_0").removeClass("n" + number0).text("");
										$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_1_0").addClass("n" + number4).text(number4);
										$("#cell_1_1").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number2 === number3){
										$("#cell_1_2").animate({left:"125px"},100);
										$("#cell_1_3").animate({left:"125px"},200,function(){
											var number4 = number2 + number3;
											$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_1_2").animate({left:"125px"},100);
										$("#cell_1_3").animate({left:"230px"},100,function(){
											$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_1").addClass("n" + number2).text(number2);
											$("#cell_1_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
					}
					else{
						if ($("##cell_1_2").attr("class") === "cell"){
							if ($("##cell_1_3").attr("class") === "cell"){
								var number0 = +($("#cell_1_0").text());
								var number1 = +($("#cell_1_1").text());
								if (number0 === number1){
									$("#cell_1_1").animate({left:'20px'},300,function(){
										var number4 = number0 + number1;
										$("#cell_1_0").removeClass("n" + number0).text("");
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_1_0").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									
								}
							}
							else{
								var number0 = +($("#cell_1_0").text());
								var number1 = +($("#cell_1_1").text());
								var number3 = +($("#cell_1_3").text());
								if (number0 === number1){
									$("#cell_1_1").animate({left:"20px"},100);
									$("#cell_1_3").animate({left:"125px"},200,function(){
										var number4 = number0 + number1;
										$("#cell_1_0").removeClass("n" + number0).text("");
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_1_0").addClass("n" + number4).text(number4);
										$("#cell_1_1").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number1 === number3){
										$("#cell_1_3").animate({left:"125px"},200,function(){
											var number4 = number1 + number3;
											$("#cell_1_1").removeClass("n" + number1);
											$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_1_3").animate({left:"230px"},100,function(){
											$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
						else{
							if ($("#cell_1_3").attr("class") === "cell"){
								var number0 = +($("#cell_1_0").text());
								var number1 = +($("#cell_1_1").text());
								var number2 = +($("#cell_1_2").text());
								if (number0 === number1){
									$("#cell_1_1").animate({left:"20px"},100);
									$("#cell_1_2").animate({left:"125px"},100,function(){
										var number4 = number0 + number1;
										$("#cell_1_0").removeClass("n" + number0).text("");
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_0").addClass("n" + number4).text(number4);
										$("#cell_1_1").addClass("n" + number2).text(number2);
									});
									
								}
								else{
									if (number1 === number2){
										$("#cell_1_2").animate({left:"125px"},100,function(){
											var number4 = number1 + number2;
											$("#cell_1_1").removeClass("n" + number1);
											$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										
									}
								}
							}
							else{
								var number0 = +($("#cell_1_0").text());
								var number1 = +($("#cell_1_1").text());
								var number2 = +($("#cell_1_2").text());
								var number3 = +($("#cell_1_3").text());
								if (number0 === number1){
									if (number2 === number3){
										var number4 = number0 + number1;
										var number5 = number2 + number3;
										$("#cell_1_1").animate({left:"20px"},100);
										$("#cell_1_2").animate({left:"125px"},100);
										$("#cell_1_3").animate({left:"125px"},200,function(){
											$("#cell_1_0").removeClass("n" + number0).text("");
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_0").addClass("n" + number4).text(number4);
											$("#cell_1_1").addClass("n" + number5).text(number5);
										});
										
									}
									else{
										$("#cell_1_1").animate({left:"20px"},100);
										$("#cell_1_2").animate({left:"125px"},100);
										$("#cell_1_3").animate({left:"230px"},100,function(){
											var number4 = number0 + number1;
											$("#cell_1_0").removeClass("n" + number0).text("");
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_0").addClass("n" + number4).text(number4);
											$("#cell_1_1").addClass("n" + number2).text(number2);
											$("#cell_1_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
								else{
									if (number1 === number2){
										$("#cell_1_2").animate({left:"125px"},100);
										$("#cell_1_3").animate({left:"230px"},100,function(){
											var number4 = number1 + number2;
											$("#cell_1_1").removeClass("n" + number1).text("");
											$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_1").addClass("n" + number4).text(number4);
											$("#cell_1_2").addClass("n" + number3).text(number3);
										});
										
									}
									else{
										if (number2 === number3){
											$("#cell_1_3").animate({left:"230px"},100,function(){
												var number4 = number2 + number3;
												$("#cell_1_2").removeClass("n" + number2).text("");
												$("#cell_1_3").attr("style","none").removeClass("n" + number3).text("");
												$("#cell_1_2").addClass("n" + number4).text(number4);
											});
											
										}
										else{
											
										}
									}
								}
							}
						}
					}
				}
				if ($("#cell_2_0").attr("class") === "cell"){
					if ($("#cell_2_1").attr("class") === "cell"){
						if($("#cell_2_2").attr("class") === "cell"){
							if ($("#cell_2_3").attr("class") === "cell") {
								
							}
							else{
								$("#cell_2_3").animate({left:'20px'},300,function(){
									var number3 = +($("#cell_2_3").text());
									$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
									$("#cell_2_0").addClass("n" + number3).text(number3);
								});
								
							}
						}
						else{
							if ($("#cell_2_3").attr("class") === "cell"){
								$("#cell_2_2").animate({left:'20px'},200,function(){
									var number2 = +($("#cell_2_2").text());
									$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
									$("#cell_2_0").addClass("n" + number2).text(number2);
								});
								
							}
							else{
								var number2 = +($("#cell_2_2").text());
								var number3 = +($("#cell_2_3").text());
								if (number2 === number3){
									$("#cell_2_2").animate({left:'20px'},200);
									$("#cell_2_3").animate({left:'20px'},300,function(){
										var number0 = number2 + number3;
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_2_0").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_2_2").animate({left:'20px'},200);
									$("#cell_2_3").animate({left:'125px'},200,function(){
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_2_0").addClass("n" + number2).text(number2);
										$("#cell_2_1").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
					}
					else{
						if ($("#cell_2_2").attr("class") === "cell"){
							if ($("#cell_2_3").attr("class") === "cell"){
								$("#cell_2_1").animate({left:'20px'},100,function(){
									var number1 = +($("#cell_2_1").text());
									$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
									$("#cell_2_0").addClass("n" + number1).text(number1);
								});
								
							}
							else{
								var number1 = +($("#cell_2_1").text());
								var number3 = +($("#cell_2_3").text());
								if (number1 === number3){
									$("#cell_2_1").animate({left:'20px'},100);
									$("#cell_2_3").animate({left:'20px'},300,function(){
										var number0 = number1 + number3;
										$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_2_0").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_2_1").animate({left:'20px'},100);
									$("#cell_2_3").animate({left:'125px'},200,function(){
										$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_2_0").addClass("n" + number1).text(number1);
										$("#cell_2_1").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
						else{
							if ($("#cell_2_3").attr("class") === "cell"){
								var number1 = +($("#cell_2_1").text());
								var number2 = +($("#cell_2_2").text());
								if (number1 === number2){
									$("#cell_2_1").animate({left:'20px'},100);
									$("#cell_2_2").animate({left:'20px'},200,function(){
										var number0 = number1 + number2;
										$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_2_0").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_2_1").animate({left:'20px'},100);
									$("#cell_2_2").animate({left:'125px'},100,function(){
										$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_2_0").addClass("n" + number1).text(number1);
										$("#cell_2_1").addClass("n" + number2).text(number2);
									});
									
								}
							}
							else{
								var number1 = +($("#cell_2_1").text());
								var number2 = +($("#cell_2_2").text());
								var number3 = +($("#cell_2_3").text());
								if (number1 === number2){
									$("#cell_2_1").animate({left:"20px"},100);
									$("#cell_2_2").animate({left:"20px"},200);
									$("#cell_2_3").animate({left:"125px"},200,function(){
										var number0 = number1 + number2;
										$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_2_0").addClass("n" + number0).text(number0);
										$("#cell_2_1").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number2 === number3){
										$("#cell_2_1").animate({left:"20px"},100);
										$("#cell_2_2").animate({left:"125px"},100);
										$("#cell_2_3").animate({left:"125px"},200,function(){
											var number4 = number2 + number3;
											$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_2_0").addClass("n" + number1).text(number1);
											$("#cell_2_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_2_1").animate({left:"20px"},100);
										$("#cell_2_2").animate({left:"125px"},100);
										$("#cell_2_3").animate({left:"230px"},100,function(){
											$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_2_0").addClass("n" + number1).text(number1);
											$("#cell_2_1").addClass("n" + number2).text(number2);
											$("#cell_2_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
					}
				}
				else{
					if ($("##cell_2_1").attr("class") === "cell"){
						if ($("##cell_2_2").attr("class") === "cell"){
							if ($("##cell_2_3").attr("class") === "cell"){
								
							}
							else{
								var number0 = +($("#cell_2_0").text());
								var number3 = +($("#cell_2_3").text());
								if (number0 === number3){
									$("#cell_2_3").animate({left:'20px'},300,function(){
										var number4 = number0 + number3;
										$("#cell_2_0").removeClass("n" + number0).text("");
										$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_2_0").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_2_3").animate({left:'125px'},200,function(){
										$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_2_1").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
						else{
							if ($("##cell_2_3").attr("class") === "cell"){
								var number0 = +($("#cell_2_0").text());
								var number2 = +($("#cell_2_2").text());
								if (number0 === number2){
									$("#cell_2_2").animate({left:'20px'},200,function(){
										var number4 = number0 + number2;
										$("#cell_2_0").removeClass("n" + number0).text("");
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_2_0").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_2_2").animate({left:'125px'},200,function(){
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_2_1").addClass("n" + number2).text(number2);
									});
									
								}
							}
							else{
								var number0 = +($("#cell_2_0").text());
								var number2 = +($("#cell_2_2").text());
								var number3 = +($("#cell_2_3").text());
								if (number0 === number2){
									$("#cell_2_2").animate({left:"20px"},200);
									$("#cell_2_3").animate({left:"125px"},200,function(){
										var number4 = number0 + number2;
										$("#cell_2_0").removeClass("n" + number0).text("");
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_2_0").addClass("n" + number4).text(number4);
										$("#cell_2_1").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number2 === number3){
										$("#cell_2_2").animate({left:"125px"},100);
										$("#cell_2_3").animate({left:"125px"},200,function(){
											var number4 = number2 + number3;
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_2_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_2_2").animate({left:"125px"},100);
										$("#cell_2_3").animate({left:"230px"},100,function(){
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_2_1").addClass("n" + number2).text(number2);
											$("#cell_2_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
					}
					else{
						if ($("##cell_2_2").attr("class") === "cell"){
							if ($("##cell_2_3").attr("class") === "cell"){
								var number0 = +($("#cell_2_0").text());
								var number1 = +($("#cell_2_1").text());
								if (number0 === number1){
									$("#cell_2_1").animate({left:'20px'},300,function(){
										var number4 = number0 + number1;
										$("#cell_2_0").removeClass("n" + number0).text("");
										$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_0").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									
								}
							}
							else{
								var number0 = +($("#cell_2_0").text());
								var number1 = +($("#cell_2_1").text());
								var number3 = +($("#cell_2_3").text());
								if (number0 === number1){
									$("#cell_2_1").animate({left:"20px"},100);
									$("#cell_2_3").animate({left:"125px"},200,function(){
										var number4 = number0 + number1;
										$("#cell_2_0").removeClass("n" + number0).text("");
										$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_2_0").addClass("n" + number4).text(number4);
										$("#cell_2_1").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number1 === number3){
										$("#cell_2_3").animate({left:"125px"},200,function(){
											var number4 = number1 + number3;
											$("#cell_2_1").removeClass("n" + number1);
											$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_2_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_2_3").animate({left:"230px"},100,function(){
											$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_2_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
						else{
							if ($("#cell_2_3").attr("class") === "cell"){
								var number0 = +($("#cell_2_0").text());
								var number1 = +($("#cell_2_1").text());
								var number2 = +($("#cell_2_2").text());
								if (number0 === number1){
									$("#cell_2_1").animate({left:"20px"},100);
									$("#cell_2_2").animate({left:"125px"},100,function(){
										var number4 = number0 + number1;
										$("#cell_2_0").removeClass("n" + number0).text("");
										$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_2_0").addClass("n" + number4).text(number4);
										$("#cell_2_1").addClass("n" + number2).text(number2);
									});
									
								}
								else{
									if (number1 === number2){
										$("#cell_2_2").animate({left:"125px"},100,function(){
											var number4 = number1 + number2;
											$("#cell_2_1").removeClass("n" + number1);
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_2_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										
									}
								}
							}
							else{
								var number0 = +($("#cell_2_0").text());
								var number1 = +($("#cell_2_1").text());
								var number2 = +($("#cell_2_2").text());
								var number3 = +($("#cell_2_3").text());
								if (number0 === number1){
									if (number2 === number3){
										var number4 = number0 + number1;
										var number5 = number2 + number3;
										$("#cell_2_1").animate({left:"20px"},100);
										$("#cell_2_2").animate({left:"125px"},100);
										$("#cell_2_3").animate({left:"125px"},200,function(){
											$("#cell_2_0").removeClass("n" + number0).text("");
											$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_2_0").addClass("n" + number4).text(number4);
											$("#cell_2_1").addClass("n" + number5).text(number5);
										});
										
									}
									else{
										$("#cell_2_1").animate({left:"20px"},100);
										$("#cell_2_2").animate({left:"125px"},100);
										$("#cell_2_3").animate({left:"230px"},100,function(){
											var number4 = number0 + number1;
											$("#cell_2_0").removeClass("n" + number0).text("");
											$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_2_0").addClass("n" + number4).text(number4);
											$("#cell_2_1").addClass("n" + number2).text(number2);
											$("#cell_2_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
								else{
									if (number1 === number2){
										$("#cell_2_2").animate({left:"125px"},100);
										$("#cell_2_3").animate({left:"230px"},100,function(){
											var number4 = number1 + number2;
											$("#cell_2_1").removeClass("n" + number1).text("");
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_2_1").addClass("n" + number4).text(number4);
											$("#cell_2_2").addClass("n" + number3).text(number3);
										});
										
									}
									else{
										if (number2 === number3){
											$("#cell_2_3").animate({left:"230px"},100,function(){
												var number4 = number2 + number3;
												$("#cell_2_2").removeClass("n" + number2).text("");
												$("#cell_2_3").attr("style","none").removeClass("n" + number3).text("");
												$("#cell_2_2").addClass("n" + number4).text(number4);
											});
											
										}
										else{
											
										}
									}
								}
							}
						}
					}
				}
				if ($("#cell_3_0").attr("class") === "cell"){
					if ($("#cell_3_1").attr("class") === "cell"){
						if($("#cell_3_2").attr("class") === "cell"){
							if ($("#cell_3_3").attr("class") === "cell") {
								
							}
							else{
								$("#cell_3_3").animate({left:'20px'},300,function(){
									var number3 = +($("#cell_3_3").text());
									$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
									$("#cell_3_0").addClass("n" + number3).text(number3);
								});
								
							}
						}
						else{
							if ($("#cell_3_3").attr("class") === "cell"){
								$("#cell_3_2").animate({left:'20px'},200,function(){
									var number2 = +($("#cell_3_2").text());
									$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
									$("#cell_3_0").addClass("n" + number2).text(number2);
								});
								
							}
							else{
								var number2 = +($("#cell_3_2").text());
								var number3 = +($("#cell_3_3").text());
								if (number2 === number3){
									$("#cell_3_2").animate({left:'20px'},200);
									$("#cell_3_3").animate({left:'20px'},300,function(){
										var number0 = number2 + number3;
										$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_3_0").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_3_2").animate({left:'20px'},200);
									$("#cell_3_3").animate({left:'125px'},200,function(){
										$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_3_0").addClass("n" + number2).text(number2);
										$("#cell_3_1").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
					}
					else{
						if ($("#cell_3_2").attr("class") === "cell"){
							if ($("#cell_3_3").attr("class") === "cell"){
								$("#cell_3_1").animate({left:'20px'},100,function(){
									var number1 = +($("#cell_3_1").text());
									$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
									$("#cell_3_0").addClass("n" + number1).text(number1);
								});
								
							}
							else{
								var number1 = +($("#cell_3_1").text());
								var number3 = +($("#cell_3_3").text());
								if (number1 === number3){
									$("#cell_3_1").animate({left:'20px'},100);
									$("#cell_3_3").animate({left:'20px'},300,function(){
										var number0 = number1 + number3;
										$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_3_0").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_3_1").animate({left:'20px'},100);
									$("#cell_3_3").animate({left:'125px'},200,function(){
										$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_3_0").addClass("n" + number1).text(number1);
										$("#cell_3_1").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
						else{
							if ($("#cell_3_3").attr("class") === "cell"){
								var number1 = +($("#cell_3_1").text());
								var number2 = +($("#cell_3_2").text());
								if (number1 === number2){
									$("#cell_3_1").animate({left:'20px'},100);
									$("#cell_3_2").animate({left:'20px'},200,function(){
										var number0 = number1 + number2;
										$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_0").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_3_1").animate({left:'20px'},100);
									$("#cell_3_2").animate({left:'125px'},100,function(){
										$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_0").addClass("n" + number1).text(number1);
										$("#cell_3_1").addClass("n" + number2).text(number2);
									});
									
								}
							}
							else{
								var number1 = +($("#cell_3_1").text());
								var number2 = +($("#cell_3_2").text());
								var number3 = +($("#cell_3_3").text());
								if (number1 === number2){
									$("#cell_3_1").animate({left:"20px"},100);
									$("#cell_3_2").animate({left:"20px"},200);
									$("#cell_3_3").animate({left:"125px"},200,function(){
										var number0 = number1 + number2;
										$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_3_0").addClass("n" + number0).text(number0);
										$("#cell_3_1").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number2 === number3){
										$("#cell_3_1").animate({left:"20px"},100);
										$("#cell_3_2").animate({left:"125px"},100);
										$("#cell_3_3").animate({left:"125px"},200,function(){
											var number4 = number2 + number3;
											$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_3_0").addClass("n" + number1).text(number1);
											$("#cell_3_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_3_1").animate({left:"20px"},100);
										$("#cell_3_2").animate({left:"125px"},100);
										$("#cell_3_3").animate({left:"230px"},100,function(){
											$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_3_0").addClass("n" + number1).text(number1);
											$("#cell_3_1").addClass("n" + number2).text(number2);
											$("#cell_3_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
					}
				}
				else{
					if ($("##cell_3_1").attr("class") === "cell"){
						if ($("##cell_3_2").attr("class") === "cell"){
							if ($("##cell_3_3").attr("class") === "cell"){
								
							}
							else{
								var number0 = +($("#cell_3_0").text());
								var number3 = +($("#cell_3_3").text());
								if (number0 === number3){
									$("#cell_3_3").animate({left:'20px'},300,function(){
										var number4 = number0 + number3;
										$("#cell_3_0").removeClass("n" + number0).text("");
										$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_3_0").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_3_3").animate({left:'125px'},200,function(){
										$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_3_1").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
						else{
							if ($("##cell_3_3").attr("class") === "cell"){
								var number0 = +($("#cell_3_0").text());
								var number2 = +($("#cell_3_2").text());
								if (number0 === number2){
									$("#cell_3_2").animate({left:'20px'},200,function(){
										var number4 = number0 + number2;
										$("#cell_3_0").removeClass("n" + number0).text("");
										$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_0").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_3_2").animate({left:'125px'},200,function(){
										$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_1").addClass("n" + number2).text(number2);
									});
									
								}
							}
							else{
								var number0 = +($("#cell_3_0").text());
								var number2 = +($("#cell_3_2").text());
								var number3 = +($("#cell_3_3").text());
								if (number0 === number2){
									$("#cell_3_2").animate({left:"20px"},200);
									$("#cell_3_3").animate({left:"125px"},200,function(){
										var number4 = number0 + number2;
										$("#cell_3_0").removeClass("n" + number0).text("");
										$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_3_0").addClass("n" + number4).text(number4);
										$("#cell_3_1").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number2 === number3){
										$("#cell_3_2").animate({left:"125px"},100);
										$("#cell_3_3").animate({left:"125px"},200,function(){
											var number4 = number2 + number3;
											$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_3_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_3_2").animate({left:"125px"},100);
										$("#cell_3_3").animate({left:"230px"},100,function(){
											$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_3_1").addClass("n" + number2).text(number2);
											$("#cell_3_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
					}
					else{
						if ($("##cell_3_2").attr("class") === "cell"){
							if ($("##cell_3_3").attr("class") === "cell"){
								var number0 = +($("#cell_3_0").text());
								var number1 = +($("#cell_3_1").text());
								if (number0 === number1){
									$("#cell_3_1").animate({left:'20px'},300,function(){
										var number4 = number0 + number1;
										$("#cell_3_0").removeClass("n" + number0).text("");
										$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_0").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									
								}
							}
							else{
								var number0 = +($("#cell_3_0").text());
								var number1 = +($("#cell_3_1").text());
								var number3 = +($("#cell_3_3").text());
								if (number0 === number1){
									$("#cell_3_1").animate({left:"20px"},100);
									$("#cell_3_3").animate({left:"125px"},200,function(){
										var number4 = number0 + number1;
										$("#cell_3_0").removeClass("n" + number0).text("");
										$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_3_0").addClass("n" + number4).text(number4);
										$("#cell_3_1").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number1 === number3){
										$("#cell_3_3").animate({left:"125px"},200,function(){
											var number4 = number1 + number3;
											$("#cell_3_1").removeClass("n" + number1);
											$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_3_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_3_3").animate({left:"230px"},100,function(){
											$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_3_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
						else{
							if ($("#cell_3_3").attr("class") === "cell"){
								var number0 = +($("#cell_3_0").text());
								var number1 = +($("#cell_3_1").text());
								var number2 = +($("#cell_3_2").text());
								if (number0 === number1){
									$("#cell_3_1").animate({left:"20px"},100);
									$("#cell_3_2").animate({left:"125px"},100,function(){
										var number4 = number0 + number1;
										$("#cell_3_0").removeClass("n" + number0).text("");
										$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_0").addClass("n" + number4).text(number4);
										$("#cell_3_1").addClass("n" + number2).text(number2);
									});
									
								}
								else{
									if (number1 === number2){
										$("#cell_3_2").animate({left:"125px"},100,function(){
											var number4 = number1 + number2;
											$("#cell_3_1").removeClass("n" + number1);
											$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										
									}
								}
							}
							else{
								var number0 = +($("#cell_3_0").text());
								var number1 = +($("#cell_3_1").text());
								var number2 = +($("#cell_3_2").text());
								var number3 = +($("#cell_3_3").text());
								if (number0 === number1){
									if (number2 === number3){
										var number4 = number0 + number1;
										var number5 = number2 + number3;
										$("#cell_3_1").animate({left:"20px"},100);
										$("#cell_3_2").animate({left:"125px"},100);
										$("#cell_3_3").animate({left:"125px"},200,function(){
											$("#cell_3_0").removeClass("n" + number0).text("");
											$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_3_0").addClass("n" + number4).text(number4);
											$("#cell_3_1").addClass("n" + number5).text(number5);
										});
										
									}
									else{
										$("#cell_3_1").animate({left:"20px"},100);
										$("#cell_3_2").animate({left:"125px"},100);
										$("#cell_3_3").animate({left:"230px"},100,function(){
											var number4 = number0 + number1;
											$("#cell_3_0").removeClass("n" + number0).text("");
											$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_3_0").addClass("n" + number4).text(number4);
											$("#cell_3_1").addClass("n" + number2).text(number2);
											$("#cell_3_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
								else{
									if (number1 === number2){
										$("#cell_3_2").animate({left:"125px"},100);
										$("#cell_3_3").animate({left:"230px"},100,function(){
											var number4 = number1 + number2;
											$("#cell_3_1").removeClass("n" + number1).text("");
											$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_3_1").addClass("n" + number4).text(number4);
											$("#cell_3_2").addClass("n" + number3).text(number3);
										});
										
									}
									else{
										if (number2 === number3){
											$("#cell_3_3").animate({left:"230px"},100,function(){
												var number4 = number2 + number3;
												$("#cell_3_2").removeClass("n" + number2).text("");
												$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
												$("#cell_3_2").addClass("n" + number4).text(number4);
											});
											
										}
										else{
											
										}
									}
								}
							}
						}
					}
				}
			setTimeout(function(){
				if (game.isWin()){
					return
				}
				game.randomEmerge();
				game.isFail();
			},300)	
		},
		//右
		rightDown : function(){
				if ($("#cell_0_3").attr("class") === "cell"){
					if ($("#cell_0_2").attr("class") === "cell"){
						if($("#cell_0_1").attr("class") === "cell"){
							if ($("#cell_0_0").attr("class") === "cell") {
								
							}
							else{
								$("#cell_0_0").animate({left:'335px'},300,function(){
									var number0 = +($("#cell_0_0").text());
									$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
									$("#cell_0_3").addClass("n" + number0).text(number0);
								});
								
							}
						}
						else{
							if ($("#cell_0_0").attr("class") === "cell"){
								$("#cell_0_1").animate({left:'335px'},200,function(){
									var number1 = +($("#cell_0_1").text());
									$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
									$("#cell_0_3").addClass("n" + number1).text(number1);
								});
								
							}
							else{
								var number1 = +($("#cell_0_1").text());
								var number0 = +($("#cell_0_0").text());
								if (number1 === number0){
									$("#cell_0_1").animate({left:'335px'},200);
									$("#cell_0_0").animate({left:'335px'},300,function(){
										var number3 = number1 + number0;
										$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_0_3").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_0_1").animate({left:'335px'},200);
									$("#cell_0_0").animate({left:'230px'},200,function(){
										$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_0_3").addClass("n" + number1).text(number1);
										$("#cell_0_2").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
					}
					else{
						if ($("#cell_0_1").attr("class") === "cell"){
							if ($("#cell_0_0").attr("class") === "cell"){
								$("#cell_0_2").animate({left:'335px'},100,function(){
									var number1 = +($("#cell_0_2").text());
									$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
									$("#cell_0_3").addClass("n" + number2).text(number2);
								});
								
							}
							else{
								var number2 = +($("#cell_0_2").text());
								var number0 = +($("#cell_0_0").text());
								if (number2 === number0){
									$("#cell_0_2").animate({left:'335px'},100);
									$("#cell_0_0").animate({left:'335px'},300,function(){
										var number3 = number2 + number0;
										$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_0_3").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_0_2").animate({left:'335px'},100);
									$("#cell_0_0").animate({left:'230px'},200,function(){
										$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_0_3").addClass("n" + number3).text(number3);
										$("#cell_0_2").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
						else{
							if ($("#cell_0_0").attr("class") === "cell"){
								var number2 = +($("#cell_0_2").text());
								var number1 = +($("#cell_0_1").text());
								if (number2 === number1){
									$("#cell_0_2").animate({left:'335px'},100);
									$("#cell_0_1").animate({left:'335px'},200,function(){
										var number3 = number2 + number1;
										$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_3").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_0_2").animate({left:'335px'},100);
									$("#cell_0_1").animate({left:'230px'},100,function(){
										$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_3").addClass("n" + number2).text(number2);
										$("#cell_0_2").addClass("n" + number1).text(number1);
									});
									
								}
							}
							else{
								var number2 = +($("#cell_0_2").text());
								var number1 = +($("#cell_0_1").text());
								var number0 = +($("#cell_0_0").text());
								if (number2 === number1){
									$("#cell_0_2").animate({left:"335px"},100);
									$("#cell_0_1").animate({left:"335px"},200);
									$("#cell_0_0").animate({left:"230px"},200,function(){
										var number3 = number2 + number1;
										$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_0_3").addClass("n" + number3).text(number3);
										$("#cell_0_2").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number1 === number0){
										$("#cell_0_2").animate({left:"335px"},100);
										$("#cell_0_1").animate({left:"230px"},100);
										$("#cell_0_0").animate({left:"230px"},200,function(){
											var number4 = number1 + number0;
											$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_0_3").addClass("n" + number2).text(number2);
											$("#cell_0_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_0_2").animate({left:"335px"},100);
										$("#cell_0_1").animate({left:"230px"},100);
										$("#cell_0_0").animate({left:"125px"},100,function(){
											$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_0_3").addClass("n" + number2).text(number2);
											$("#cell_0_2").addClass("n" + number1).text(number1);
											$("#cell_0_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
					}
				}
				else{
					if ($("#cell_0_2").attr("class") === "cell"){
						if ($("#cell_0_1").attr("class") === "cell"){
							if ($("#cell_0_0").attr("class") === "cell"){
								
							}
							else{
								var number3 = +($("#cell_0_3").text());
								var number0 = +($("#cell_0_0").text());
								if (number3 === number0){
									$("#cell_0_0").animate({left:'335px'},300,function(){
										var number4 = number3 + number0;
										$("#cell_0_3").removeClass("n" + number3).text("");
										$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_0_3").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_0_0").animate({left:'230px'},200,function(){
										$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_0_2").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
						else{
							if ($("#cell_0_0").attr("class") === "cell"){
								var number3 = +($("#cell_0_3").text());
								var number1 = +($("#cell_0_1").text());
								if (number3 === number1){
									$("#cell_0_1").animate({left:'335px'},200,function(){
										var number4 = number3 + number1;
										$("#cell_0_3").removeClass("n" + number3).text("");
										$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_3").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_0_1").animate({left:'230px'},200,function(){
										$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_2").addClass("n" + number1).text(number1);
									});
									
								}
							}
							else{
								var number3 = +($("#cell_0_3").text());
								var number1 = +($("#cell_0_1").text());
								var number0 = +($("#cell_0_0").text());
								if (number3 === number1){
									$("#cell_0_1").animate({left:"335px"},200);
									$("#cell_0_0").animate({left:"230px"},200,function(){
										var number4 = number3 + number1;
										$("#cell_0_3").removeClass("n" + number3).text("");
										$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_0_3").addClass("n" + number4).text(number4);
										$("#cell_0_2").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number1 === number0){
										$("#cell_0_1").animate({left:"230px"},100);
										$("#cell_0_0").animate({left:"230px"},200,function(){
											var number4 = number1 + number0;
											$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_0_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_0_1").animate({left:"230px"},100);
										$("#cell_0_0").animate({left:"125px"},100,function(){
											$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_0_2").addClass("n" + number1).text(number1);
											$("#cell_0_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
					}
					else{
						if ($("#cell_0_1").attr("class") === "cell"){
							if ($("#cell_0_0").attr("class") === "cell"){
								var number3 = +($("#cell_0_3").text());
								var number2 = +($("#cell_0_2").text());
								if (number3 === number2){
									$("#cell_0_2").animate({left:'335px'},300,function(){
										var number4 = number3 + number2;
										$("#cell_0_3").removeClass("n" + number3).text("");
										$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_3").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									
								}
							}
							else{
								var number3 = +($("#cell_0_3").text());
								var number2 = +($("#cell_0_2").text());
								var number0 = +($("#cell_0_0").text());
								if (number3 === number2){
									$("#cell_0_2").animate({left:"335px"},100);
									$("#cell_0_0").animate({left:"230px"},200,function(){
										var number4 = number3 + number2;
										$("#cell_0_3").removeClass("n" + number3).text("");
										$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_0_3").addClass("n" + number4).text(number4);
										$("#cell_0_2").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number2 === number0){
										$("#cell_0_0").animate({left:"230px"},200,function(){
											var number4 = number2 + number0;
											$("#cell_0_2").removeClass("n" + number2);
											$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_0_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_0_0").animate({left:"125px"},100,function(){
											$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_0_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
						else{
							if ($("#cell_0_0").attr("class") === "cell"){
								var number3 = +($("#cell_0_3").text());
								var number2 = +($("#cell_0_2").text());
								var number1 = +($("#cell_0_1").text());
								if (number3 === number2){
									$("#cell_0_2").animate({left:"335px"},100);
									$("#cell_0_1").animate({left:"230px"},100,function(){
										var number4 = number3 + number2;
										$("#cell_0_3").removeClass("n" + number3).text("");
										$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_3").addClass("n" + number4).text(number4);
										$("#cell_0_2").addClass("n" + number1).text(number1);
									});
									
								}
								else{
									if (number2 === number1){
										$("#cell_0_1").animate({left:"230px"},100,function(){
											var number4 = number2 + number1;
											$("#cell_0_2").removeClass("n" + number2);
											$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										
									}
								}
							}
							else{
								var number3 = +($("#cell_0_3").text());
								var number2 = +($("#cell_0_2").text());
								var number1 = +($("#cell_0_1").text());
								var number0 = +($("#cell_0_0").text());
								if (number3 === number2){
									if (number1 === number0){
										var number4 = number3 + number2;
										var number5 = number1 + number0;
										$("#cell_0_2").animate({left:"335px"},100);
										$("#cell_0_1").animate({left:"230px"},100);
										$("#cell_0_0").animate({left:"230px"},200,function(){
											$("#cell_0_3").removeClass("n" + number3).text("");
											$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_0_3").addClass("n" + number4).text(number4);
											$("#cell_0_2").addClass("n" + number5).text(number5);
										});
										
									}
									else{
										$("#cell_0_2").animate({left:"335px"},100);
										$("#cell_0_1").animate({left:"230px"},100);
										$("#cell_0_0").animate({left:"125px"},100,function(){
											var number4 = number3 + number2;
											$("#cell_0_3").removeClass("n" + number3).text("");
											$("#cell_0_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_0_3").addClass("n" + number4).text(number4);
											$("#cell_0_2").addClass("n" + number1).text(number1);
											$("#cell_0_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
								else{
									if (number2 === number1){
										$("#cell_0_1").animate({left:"230px"},100);
										$("#cell_0_0").animate({left:"125px"},100,function(){
											var number4 = number2 + number1;
											$("#cell_0_2").removeClass("n" + number2).text("");
											$("#cell_0_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_0_2").addClass("n" + number4).text(number4);
											$("#cell_0_1").addClass("n" + number0).text(number0);
										});
										
									}
									else{
										if (number1 === number0){
											$("#cell_0_0").animate({left:"125px"},100,function(){
												var number4 = number1 + number0;
												$("#cell_0_1").removeClass("n" + number1).text("");
												$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
												$("#cell_0_1").addClass("n" + number4).text(number4);
											});
											
										}
										else{
											
										}
									}
								}
							}
						}
					}
				}
				if ($("#cell_1_3").attr("class") === "cell"){
					if ($("#cell_1_2").attr("class") === "cell"){
						if($("#cell_1_1").attr("class") === "cell"){
							if ($("#cell_1_0").attr("class") === "cell") {
								
							}
							else{
								$("#cell_1_0").animate({left:'335px'},300,function(){
									var number0 = +($("#cell_1_0").text());
									$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
									$("#cell_1_3").addClass("n" + number0).text(number0);
								});
								
							}
						}
						else{
							if ($("#cell_1_0").attr("class") === "cell"){
								$("#cell_1_1").animate({left:'335px'},200,function(){
									var number1 = +($("#cell_1_1").text());
									$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
									$("#cell_1_3").addClass("n" + number1).text(number1);
								});
								
							}
							else{
								var number1 = +($("#cell_1_1").text());
								var number0 = +($("#cell_1_0").text());
								if (number1 === number0){
									$("#cell_1_1").animate({left:'335px'},200);
									$("#cell_1_0").animate({left:'335px'},300,function(){
										var number3 = number1 + number0;
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_1_3").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_1_1").animate({left:'335px'},200);
									$("#cell_1_0").animate({left:'230px'},200,function(){
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_1_3").addClass("n" + number1).text(number1);
										$("#cell_1_2").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
					}
					else{
						if ($("#cell_1_1").attr("class") === "cell"){
							if ($("#cell_1_0").attr("class") === "cell"){
								$("#cell_1_2").animate({left:'335px'},100,function(){
									var number1 = +($("#cell_1_2").text());
									$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
									$("#cell_1_3").addClass("n" + number2).text(number2);
								});
								
							}
							else{
								var number2 = +($("#cell_1_2").text());
								var number0 = +($("#cell_1_0").text());
								if (number2 === number0){
									$("#cell_1_2").animate({left:'335px'},100);
									$("#cell_1_0").animate({left:'335px'},300,function(){
										var number3 = number2 + number0;
										$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_1_3").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_1_2").animate({left:'335px'},100);
									$("#cell_1_0").animate({left:'230px'},200,function(){
										$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_1_3").addClass("n" + number3).text(number3);
										$("#cell_1_2").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
						else{
							if ($("#cell_1_0").attr("class") === "cell"){
								var number2 = +($("#cell_1_2").text());
								var number1 = +($("#cell_1_1").text());
								if (number2 === number1){
									$("#cell_1_2").animate({left:'335px'},100);
									$("#cell_1_1").animate({left:'335px'},200,function(){
										var number3 = number2 + number1;
										$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_1_3").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_1_2").animate({left:'335px'},100);
									$("#cell_1_1").animate({left:'230px'},100,function(){
										$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_1_3").addClass("n" + number2).text(number2);
										$("#cell_1_2").addClass("n" + number1).text(number1);
									});
									
								}
							}
							else{
								var number2 = +($("#cell_1_2").text());
								var number1 = +($("#cell_1_1").text());
								var number0 = +($("#cell_1_0").text());
								if (number2 === number1){
									$("#cell_1_2").animate({left:"335px"},100);
									$("#cell_1_1").animate({left:"335px"},200);
									$("#cell_1_0").animate({left:"230px"},200,function(){
										var number3 = number2 + number1;
										$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_1_3").addClass("n" + number3).text(number3);
										$("#cell_1_2").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number1 === number0){
										$("#cell_1_2").animate({left:"335px"},100);
										$("#cell_1_1").animate({left:"230px"},100);
										$("#cell_1_0").animate({left:"230px"},200,function(){
											var number4 = number1 + number0;
											$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_1_3").addClass("n" + number2).text(number2);
											$("#cell_1_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_1_2").animate({left:"335px"},100);
										$("#cell_1_1").animate({left:"230px"},100);
										$("#cell_1_0").animate({left:"125px"},100,function(){
											$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_1_3").addClass("n" + number2).text(number2);
											$("#cell_1_2").addClass("n" + number1).text(number1);
											$("#cell_1_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
					}
				}
				else{
					if ($("#cell_1_2").attr("class") === "cell"){
						if ($("#cell_1_1").attr("class") === "cell"){
							if ($("#cell_1_0").attr("class") === "cell"){
								
							}
							else{
								var number3 = +($("#cell_1_3").text());
								var number0 = +($("#cell_1_0").text());
								if (number3 === number0){
									$("#cell_1_0").animate({left:'335px'},300,function(){
										var number4 = number3 + number0;
										$("#cell_1_3").removeClass("n" + number3).text("");
										$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_1_3").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_1_0").animate({left:'230px'},200,function(){
										$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_1_2").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
						else{
							if ($("#cell_1_0").attr("class") === "cell"){
								var number3 = +($("#cell_1_3").text());
								var number1 = +($("#cell_1_1").text());
								if (number3 === number1){
									$("#cell_1_1").animate({left:'335px'},200,function(){
										var number4 = number3 + number1;
										$("#cell_1_3").removeClass("n" + number3).text("");
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_1_3").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_1_1").animate({left:'230px'},200,function(){
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_1_2").addClass("n" + number1).text(number1);
									});
									
								}
							}
							else{
								var number3 = +($("#cell_1_3").text());
								var number1 = +($("#cell_1_1").text());
								var number0 = +($("#cell_1_0").text());
								if (number3 === number1){
									$("#cell_1_1").animate({left:"335px"},200);
									$("#cell_1_0").animate({left:"230px"},200,function(){
										var number4 = number3 + number1;
										$("#cell_1_3").removeClass("n" + number3).text("");
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_1_3").addClass("n" + number4).text(number4);
										$("#cell_1_2").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number1 === number0){
										$("#cell_1_1").animate({left:"230px"},100);
										$("#cell_1_0").animate({left:"230px"},200,function(){
											var number4 = number1 + number0;
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_1_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_1_1").animate({left:"230px"},100);
										$("#cell_1_0").animate({left:"125px"},100,function(){
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_1_2").addClass("n" + number1).text(number1);
											$("#cell_1_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
					}
					else{
						if ($("#cell_1_1").attr("class") === "cell"){
							if ($("#cell_1_0").attr("class") === "cell"){
								var number3 = +($("#cell_1_3").text());
								var number2 = +($("#cell_1_2").text());
								if (number3 === number2){
									$("#cell_1_2").animate({left:'335px'},300,function(){
										var number4 = number3 + number2;
										$("#cell_1_3").removeClass("n" + number3).text("");
										$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_3").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									
								}
							}
							else{
								var number3 = +($("#cell_1_3").text());
								var number2 = +($("#cell_1_2").text());
								var number0 = +($("#cell_1_0").text());
								if (number3 === number2){
									$("#cell_1_2").animate({left:"335px"},100);
									$("#cell_1_0").animate({left:"230px"},200,function(){
										var number4 = number3 + number2;
										$("#cell_1_3").removeClass("n" + number3).text("");
										$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_1_3").addClass("n" + number4).text(number4);
										$("#cell_1_2").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number2 === number0){
										$("#cell_1_0").animate({left:"230px"},200,function(){
											var number4 = number2 + number0;
											$("#cell_1_2").removeClass("n" + number2);
											$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_1_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_1_0").animate({left:"125px"},100,function(){
											$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_1_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
						else{
							if ($("#cell_1_0").attr("class") === "cell"){
								var number3 = +($("#cell_1_3").text());
								var number2 = +($("#cell_1_2").text());
								var number1 = +($("#cell_1_1").text());
								if (number3 === number2){
									$("#cell_1_2").animate({left:"335px"},100);
									$("#cell_1_1").animate({left:"230px"},100,function(){
										var number4 = number3 + number2;
										$("#cell_1_3").removeClass("n" + number3).text("");
										$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_1_3").addClass("n" + number4).text(number4);
										$("#cell_1_2").addClass("n" + number1).text(number1);
									});
									
								}
								else{
									if (number2 === number1){
										$("#cell_1_1").animate({left:"230px"},100,function(){
											var number4 = number2 + number1;
											$("#cell_1_2").removeClass("n" + number2);
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_1_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										
									}
								}
							}
							else{
								var number3 = +($("#cell_1_3").text());
								var number2 = +($("#cell_1_2").text());
								var number1 = +($("#cell_1_1").text());
								var number0 = +($("#cell_1_0").text());
								if (number3 === number2){
									if (number1 === number0){
										var number4 = number3 + number2;
										var number5 = number1 + number0;
										$("#cell_1_2").animate({left:"335px"},100);
										$("#cell_1_1").animate({left:"230px"},100);
										$("#cell_1_0").animate({left:"230px"},200,function(){
											$("#cell_1_3").removeClass("n" + number3).text("");
											$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_1_3").addClass("n" + number4).text(number4);
											$("#cell_1_2").addClass("n" + number5).text(number5);
										});
										
									}
									else{
										$("#cell_1_2").animate({left:"335px"},100);
										$("#cell_1_1").animate({left:"230px"},100);
										$("#cell_1_0").animate({left:"125px"},100,function(){
											var number4 = number3 + number2;
											$("#cell_1_3").removeClass("n" + number3).text("");
											$("#cell_1_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_1_3").addClass("n" + number4).text(number4);
											$("#cell_1_2").addClass("n" + number1).text(number1);
											$("#cell_1_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
								else{
									if (number2 === number1){
										$("#cell_1_1").animate({left:"230px"},100);
										$("#cell_1_0").animate({left:"125px"},100,function(){
											var number4 = number2 + number1;
											$("#cell_1_2").removeClass("n" + number2).text("");
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_1_2").addClass("n" + number4).text(number4);
											$("#cell_1_1").addClass("n" + number0).text(number0);
										});
										
									}
									else{
										if (number1 === number0){
											$("#cell_1_0").animate({left:"125px"},100,function(){
												var number4 = number1 + number0;
												$("#cell_1_1").removeClass("n" + number1).text("");
												$("#cell_1_0").attr("style","none").removeClass("n" + number0).text("");
												$("#cell_1_1").addClass("n" + number4).text(number4);
											});
											
										}
										else{
											
										}
									}
								}
							}
						}
					}
				}
				if ($("#cell_2_3").attr("class") === "cell"){
					if ($("#cell_2_2").attr("class") === "cell"){
						if($("#cell_2_1").attr("class") === "cell"){
							if ($("#cell_2_0").attr("class") === "cell") {
								
							}
							else{
								$("#cell_2_0").animate({left:'335px'},300,function(){
									var number0 = +($("#cell_2_0").text());
									$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
									$("#cell_2_3").addClass("n" + number0).text(number0);
								});
								
							}
						}
						else{
							if ($("#cell_2_0").attr("class") === "cell"){
								$("#cell_2_1").animate({left:'335px'},200,function(){
									var number1 = +($("#cell_2_1").text());
									$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
									$("#cell_2_3").addClass("n" + number1).text(number1);
								});
								
							}
							else{
								var number1 = +($("#cell_2_1").text());
								var number0 = +($("#cell_2_0").text());
								if (number1 === number0){
									$("#cell_2_1").animate({left:'335px'},200);
									$("#cell_2_0").animate({left:'335px'},300,function(){
										var number3 = number1 + number0;
										$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_2_3").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_2_1").animate({left:'335px'},200);
									$("#cell_2_0").animate({left:'230px'},200,function(){
										$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_2_3").addClass("n" + number1).text(number1);
										$("#cell_2_2").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
					}
					else{
						if ($("#cell_2_1").attr("class") === "cell"){
							if ($("#cell_2_0").attr("class") === "cell"){
								$("#cell_2_2").animate({left:'335px'},100,function(){
									var number1 = +($("#cell_2_2").text());
									$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
									$("#cell_2_3").addClass("n" + number2).text(number2);
								});
								
							}
							else{
								var number2 = +($("#cell_2_2").text());
								var number0 = +($("#cell_2_0").text());
								if (number2 === number0){
									$("#cell_2_2").animate({left:'335px'},100);
									$("#cell_2_0").animate({left:'335px'},300,function(){
										var number3 = number2 + number0;
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_2_3").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_2_2").animate({left:'335px'},100);
									$("#cell_2_0").animate({left:'230px'},200,function(){
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_2_3").addClass("n" + number3).text(number3);
										$("#cell_2_2").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
						else{
							if ($("#cell_2_0").attr("class") === "cell"){
								var number2 = +($("#cell_2_2").text());
								var number1 = +($("#cell_2_1").text());
								if (number2 === number1){
									$("#cell_2_2").animate({left:'335px'},100);
									$("#cell_2_1").animate({left:'335px'},200,function(){
										var number3 = number2 + number1;
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_3").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_2_2").animate({left:'335px'},100);
									$("#cell_2_1").animate({left:'230px'},100,function(){
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_3").addClass("n" + number2).text(number2);
										$("#cell_2_2").addClass("n" + number1).text(number1);
									});
									
								}
							}
							else{
								var number2 = +($("#cell_2_2").text());
								var number1 = +($("#cell_2_1").text());
								var number0 = +($("#cell_2_0").text());
								if (number2 === number1){
									$("#cell_2_2").animate({left:"335px"},100);
									$("#cell_2_1").animate({left:"335px"},200);
									$("#cell_2_0").animate({left:"230px"},200,function(){
										var number3 = number2 + number1;
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_2_3").addClass("n" + number3).text(number3);
										$("#cell_2_2").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number1 === number0){
										$("#cell_2_2").animate({left:"335px"},100);
										$("#cell_2_1").animate({left:"230px"},100);
										$("#cell_2_0").animate({left:"230px"},200,function(){
											var number4 = number1 + number0;
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_3").addClass("n" + number2).text(number2);
											$("#cell_2_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_2_2").animate({left:"335px"},100);
										$("#cell_2_1").animate({left:"230px"},100);
										$("#cell_2_0").animate({left:"125px"},100,function(){
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_3").addClass("n" + number2).text(number2);
											$("#cell_2_2").addClass("n" + number1).text(number1);
											$("#cell_2_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
					}
				}
				else{
					if ($("#cell_2_2").attr("class") === "cell"){
						if ($("#cell_2_1").attr("class") === "cell"){
							if ($("#cell_2_0").attr("class") === "cell"){
								
							}
							else{
								var number3 = +($("#cell_2_3").text());
								var number0 = +($("#cell_2_0").text());
								if (number3 === number0){
									$("#cell_2_0").animate({left:'335px'},300,function(){
										var number4 = number3 + number0;
										$("#cell_2_3").removeClass("n" + number3).text("");
										$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_2_3").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_2_0").animate({left:'230px'},200,function(){
										$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_2_2").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
						else{
							if ($("#cell_2_0").attr("class") === "cell"){
								var number3 = +($("#cell_2_3").text());
								var number1 = +($("#cell_2_1").text());
								if (number3 === number1){
									$("#cell_2_1").animate({left:'335px'},200,function(){
										var number4 = number3 + number1;
										$("#cell_2_3").removeClass("n" + number3).text("");
										$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_3").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_2_1").animate({left:'230px'},200,function(){
										$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_2").addClass("n" + number1).text(number1);
									});
									
								}
							}
							else{
								var number3 = +($("#cell_2_3").text());
								var number1 = +($("#cell_2_1").text());
								var number0 = +($("#cell_2_0").text());
								if (number3 === number1){
									$("#cell_2_1").animate({left:"335px"},200);
									$("#cell_2_0").animate({left:"230px"},200,function(){
										var number4 = number3 + number1;
										$("#cell_2_3").removeClass("n" + number3).text("");
										$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_2_3").addClass("n" + number4).text(number4);
										$("#cell_2_2").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number1 === number0){
										$("#cell_2_1").animate({left:"230px"},100);
										$("#cell_2_0").animate({left:"230px"},200,function(){
											var number4 = number1 + number0;
											$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_2_1").animate({left:"230px"},100);
										$("#cell_2_0").animate({left:"125px"},100,function(){
											$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_2").addClass("n" + number1).text(number1);
											$("#cell_2_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
					}
					else{
						if ($("#cell_2_1").attr("class") === "cell"){
							if ($("#cell_2_0").attr("class") === "cell"){
								var number3 = +($("#cell_2_3").text());
								var number2 = +($("#cell_2_2").text());
								if (number3 === number2){
									$("#cell_2_2").animate({left:'335px'},300,function(){
										var number4 = number3 + number2;
										$("#cell_2_3").removeClass("n" + number3).text("");
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_2_3").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									
								}
							}
							else{
								var number3 = +($("#cell_2_3").text());
								var number2 = +($("#cell_2_2").text());
								var number0 = +($("#cell_2_0").text());
								if (number3 === number2){
									$("#cell_2_2").animate({left:"335px"},100);
									$("#cell_2_0").animate({left:"230px"},200,function(){
										var number4 = number3 + number2;
										$("#cell_2_3").removeClass("n" + number3).text("");
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_2_3").addClass("n" + number4).text(number4);
										$("#cell_2_2").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number2 === number0){
										$("#cell_2_0").animate({left:"230px"},200,function(){
											var number4 = number2 + number0;
											$("#cell_2_2").removeClass("n" + number2);
											$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_2_0").animate({left:"125px"},100,function(){
											$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
						else{
							if ($("#cell_2_0").attr("class") === "cell"){
								var number3 = +($("#cell_2_3").text());
								var number2 = +($("#cell_2_2").text());
								var number1 = +($("#cell_2_1").text());
								if (number3 === number2){
									$("#cell_2_2").animate({left:"335px"},100);
									$("#cell_2_1").animate({left:"230px"},100,function(){
										var number4 = number3 + number2;
										$("#cell_2_3").removeClass("n" + number3).text("");
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_3").addClass("n" + number4).text(number4);
										$("#cell_2_2").addClass("n" + number1).text(number1);
									});
									
								}
								else{
									if (number2 === number1){
										$("#cell_2_1").animate({left:"230px"},100,function(){
											var number4 = number2 + number1;
											$("#cell_2_2").removeClass("n" + number2);
											$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										
									}
								}
							}
							else{
								var number3 = +($("#cell_2_3").text());
								var number2 = +($("#cell_2_2").text());
								var number1 = +($("#cell_2_1").text());
								var number0 = +($("#cell_2_0").text());
								if (number3 === number2){
									if (number1 === number0){
										var number4 = number3 + number2;
										var number5 = number1 + number0;
										$("#cell_2_2").animate({left:"335px"},100);
										$("#cell_2_1").animate({left:"230px"},100);
										$("#cell_2_0").animate({left:"230px"},200,function(){
											$("#cell_2_3").removeClass("n" + number3).text("");
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_3").addClass("n" + number4).text(number4);
											$("#cell_2_2").addClass("n" + number5).text(number5);
										});
										
									}
									else{
										$("#cell_2_2").animate({left:"335px"},100);
										$("#cell_2_1").animate({left:"230px"},100);
										$("#cell_2_0").animate({left:"125px"},100,function(){
											var number4 = number3 + number2;
											$("#cell_2_3").removeClass("n" + number3).text("");
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_3").addClass("n" + number4).text(number4);
											$("#cell_2_2").addClass("n" + number1).text(number1);
											$("#cell_2_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
								else{
									if (number2 === number1){
										$("#cell_2_1").animate({left:"230px"},100);
										$("#cell_2_0").animate({left:"125px"},100,function(){
											var number4 = number2 + number1;
											$("#cell_2_2").removeClass("n" + number2).text("");
											$("#cell_2_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_2").addClass("n" + number4).text(number4);
											$("#cell_2_1").addClass("n" + number0).text(number0);
										});
										
									}
									else{
										if (number1 === number0){
											$("#cell_2_0").animate({left:"125px"},100,function(){
												var number4 = number1 + number0;
												$("#cell_2_1").removeClass("n" + number1).text("");
												$("#cell_2_0").attr("style","none").removeClass("n" + number0).text("");
												$("#cell_2_1").addClass("n" + number4).text(number4);
											});
											
										}
										else{
											
										}
									}
								}
							}
						}
					}
				}
				if ($("#cell_3_3").attr("class") === "cell"){
					if ($("#cell_3_2").attr("class") === "cell"){
						if($("#cell_3_1").attr("class") === "cell"){
							if ($("#cell_3_0").attr("class") === "cell") {
								
							}
							else{
								$("#cell_3_0").animate({left:'335px'},300,function(){
									var number0 = +($("#cell_3_0").text());
									$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
									$("#cell_3_3").addClass("n" + number0).text(number0);
								});
								
							}
						}
						else{
							if ($("#cell_3_0").attr("class") === "cell"){
								$("#cell_3_1").animate({left:'335px'},200,function(){
									var number1 = +($("#cell_3_1").text());
									$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
									$("#cell_3_3").addClass("n" + number1).text(number1);
								});
								
							}
							else{
								var number1 = +($("#cell_3_1").text());
								var number0 = +($("#cell_3_0").text());
								if (number1 === number0){
									$("#cell_3_1").animate({left:'335px'},200);
									$("#cell_3_0").animate({left:'335px'},300,function(){
										var number3 = number1 + number0;
										$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_3").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_3_1").animate({left:'335px'},200);
									$("#cell_3_0").animate({left:'230px'},200,function(){
										$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_3").addClass("n" + number1).text(number1);
										$("#cell_3_2").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
					}
					else{
						if ($("#cell_3_1").attr("class") === "cell"){
							if ($("#cell_3_0").attr("class") === "cell"){
								$("#cell_3_2").animate({left:'335px'},100,function(){
									var number1 = +($("#cell_3_2").text());
									$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
									$("#cell_3_3").addClass("n" + number2).text(number2);
								});
								
							}
							else{
								var number2 = +($("#cell_3_2").text());
								var number0 = +($("#cell_3_0").text());
								if (number2 === number0){
									$("#cell_3_2").animate({left:'335px'},100);
									$("#cell_3_0").animate({left:'335px'},300,function(){
										var number3 = number2 + number0;
										$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_3").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_3_2").animate({left:'335px'},100);
									$("#cell_3_0").animate({left:'230px'},200,function(){
										$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_3").addClass("n" + number3).text(number3);
										$("#cell_3_2").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
						else{
							if ($("#cell_3_0").attr("class") === "cell"){
								var number2 = +($("#cell_3_2").text());
								var number1 = +($("#cell_3_1").text());
								if (number2 === number1){
									$("#cell_3_2").animate({left:'335px'},100);
									$("#cell_3_1").animate({left:'335px'},200,function(){
										var number3 = number2 + number1;
										$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_3").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_3_2").animate({left:'335px'},100);
									$("#cell_3_1").animate({left:'230px'},100,function(){
										$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_3").addClass("n" + number2).text(number2);
										$("#cell_3_2").addClass("n" + number1).text(number1);
									});
									
								}
							}
							else{
								var number2 = +($("#cell_3_2").text());
								var number1 = +($("#cell_3_1").text());
								var number0 = +($("#cell_3_0").text());
								if (number2 === number1){
									$("#cell_3_2").animate({left:"335px"},100);
									$("#cell_3_1").animate({left:"335px"},200);
									$("#cell_3_0").animate({left:"230px"},200,function(){
										var number3 = number2 + number1;
										$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_3").addClass("n" + number3).text(number3);
										$("#cell_3_2").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number1 === number0){
										$("#cell_3_2").animate({left:"335px"},100);
										$("#cell_3_1").animate({left:"230px"},100);
										$("#cell_3_0").animate({left:"230px"},200,function(){
											var number4 = number1 + number0;
											$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_3").addClass("n" + number2).text(number2);
											$("#cell_3_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_3_2").animate({left:"335px"},100);
										$("#cell_3_1").animate({left:"230px"},100);
										$("#cell_3_0").animate({left:"125px"},100,function(){
											$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_3").addClass("n" + number2).text(number2);
											$("#cell_3_2").addClass("n" + number1).text(number1);
											$("#cell_3_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
					}
				}
				else{
					if ($("#cell_3_2").attr("class") === "cell"){
						if ($("#cell_3_1").attr("class") === "cell"){
							if ($("#cell_3_0").attr("class") === "cell"){
								
							}
							else{
								var number3 = +($("#cell_3_3").text());
								var number0 = +($("#cell_3_0").text());
								if (number3 === number0){
									$("#cell_3_0").animate({left:'335px'},300,function(){
										var number4 = number3 + number0;
										$("#cell_3_3").removeClass("n" + number3).text("");
										$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_3").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_3_0").animate({left:'230px'},200,function(){
										$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_2").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
						else{
							if ($("#cell_3_0").attr("class") === "cell"){
								var number3 = +($("#cell_3_3").text());
								var number1 = +($("#cell_3_1").text());
								if (number3 === number1){
									$("#cell_3_1").animate({left:'335px'},200,function(){
										var number4 = number3 + number1;
										$("#cell_3_3").removeClass("n" + number3).text("");
										$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_3").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_3_1").animate({left:'230px'},200,function(){
										$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_2").addClass("n" + number1).text(number1);
									});
									
								}
							}
							else{
								var number3 = +($("#cell_3_3").text());
								var number1 = +($("#cell_3_1").text());
								var number0 = +($("#cell_3_0").text());
								if (number3 === number1){
									$("#cell_3_1").animate({left:"335px"},200);
									$("#cell_3_0").animate({left:"230px"},200,function(){
										var number4 = number3 + number1;
										$("#cell_3_3").removeClass("n" + number3).text("");
										$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_3").addClass("n" + number4).text(number4);
										$("#cell_3_2").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number1 === number0){
										$("#cell_3_1").animate({left:"230px"},100);
										$("#cell_3_0").animate({left:"230px"},200,function(){
											var number4 = number1 + number0;
											$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_3_1").animate({left:"230px"},100);
										$("#cell_3_0").animate({left:"125px"},100,function(){
											$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_2").addClass("n" + number1).text(number1);
											$("#cell_3_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
					}
					else{
						if ($("#cell_3_1").attr("class") === "cell"){
							if ($("#cell_3_0").attr("class") === "cell"){
								var number3 = +($("#cell_3_3").text());
								var number2 = +($("#cell_3_2").text());
								if (number3 === number2){
									$("#cell_3_2").animate({left:'335px'},300,function(){
										var number4 = number3 + number2;
										$("#cell_3_3").removeClass("n" + number3).text("");
										$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_3").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									
								}
							}
							else{
								var number3 = +($("#cell_3_3").text());
								var number2 = +($("#cell_3_2").text());
								var number0 = +($("#cell_3_0").text());
								if (number3 === number2){
									$("#cell_3_2").animate({left:"335px"},100);
									$("#cell_3_0").animate({left:"230px"},200,function(){
										var number4 = number3 + number2;
										$("#cell_3_3").removeClass("n" + number3).text("");
										$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_3").addClass("n" + number4).text(number4);
										$("#cell_3_2").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number2 === number0){
										$("#cell_3_0").animate({left:"230px"},200,function(){
											var number4 = number2 + number0;
											$("#cell_3_2").removeClass("n" + number2);
											$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_3_0").animate({left:"125px"},100,function(){
											$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
						else{
							if ($("#cell_3_0").attr("class") === "cell"){
								var number3 = +($("#cell_3_3").text());
								var number2 = +($("#cell_3_2").text());
								var number1 = +($("#cell_3_1").text());
								if (number3 === number2){
									$("#cell_3_2").animate({left:"335px"},100);
									$("#cell_3_1").animate({left:"230px"},100,function(){
										var number4 = number3 + number2;
										$("#cell_3_3").removeClass("n" + number3).text("");
										$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_3").addClass("n" + number4).text(number4);
										$("#cell_3_2").addClass("n" + number1).text(number1);
									});
									
								}
								else{
									if (number2 === number1){
										$("#cell_3_1").animate({left:"230px"},100,function(){
											var number4 = number2 + number1;
											$("#cell_3_2").removeClass("n" + number2);
											$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_3_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										
									}
								}
							}
							else{
								var number3 = +($("#cell_3_3").text());
								var number2 = +($("#cell_3_2").text());
								var number1 = +($("#cell_3_1").text());
								var number0 = +($("#cell_3_0").text());
								if (number3 === number2){
									if (number1 === number0){
										var number4 = number3 + number2;
										var number5 = number1 + number0;
										$("#cell_3_2").animate({left:"335px"},100);
										$("#cell_3_1").animate({left:"230px"},100);
										$("#cell_3_0").animate({left:"230px"},200,function(){
											$("#cell_3_3").removeClass("n" + number3).text("");
											$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_3").addClass("n" + number4).text(number4);
											$("#cell_3_2").addClass("n" + number5).text(number5);
										});
										
									}
									else{
										$("#cell_3_2").animate({left:"335px"},100);
										$("#cell_3_1").animate({left:"230px"},100);
										$("#cell_3_0").animate({left:"125px"},100,function(){
											var number4 = number3 + number2;
											$("#cell_3_3").removeClass("n" + number3).text("");
											$("#cell_3_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_3").addClass("n" + number4).text(number4);
											$("#cell_3_2").addClass("n" + number1).text(number1);
											$("#cell_3_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
								else{
									if (number2 === number1){
										$("#cell_3_1").animate({left:"230px"},100);
										$("#cell_3_0").animate({left:"125px"},100,function(){
											var number4 = number2 + number1;
											$("#cell_3_2").removeClass("n" + number2).text("");
											$("#cell_3_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_2").addClass("n" + number4).text(number4);
											$("#cell_3_1").addClass("n" + number0).text(number0);
										});
										
									}
									else{
										if (number1 === number0){
											$("#cell_3_0").animate({left:"125px"},100,function(){
												var number4 = number1 + number0;
												$("#cell_3_1").removeClass("n" + number1).text("");
												$("#cell_3_0").attr("style","none").removeClass("n" + number0).text("");
												$("#cell_3_1").addClass("n" + number4).text(number4);
											});
											
										}
										else{
											
										}
									}
								}
							}
						}
					}
				}
			setTimeout(function(){
				if (game.isWin()){
					return
				}
				game.randomEmerge();
				game.isFail();
			},300)
		},
		//上
		upDown : function(){
				if ($("#cell_0_0").attr("class") === "cell"){
					if ($("#cell_1_0").attr("class") === "cell"){
						if($("#cell_2_0").attr("class") === "cell"){
							if ($("#cell_3_0").attr("class") === "cell") {
								
							}
							else{
								$("#cell_3_0").animate({top:'20px'},300,function(){
									var number3 = +($("#cell_3_0").text());
									$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
									$("#cell_0_0").addClass("n" + number3).text(number3);
								});
								
							}
						}
						else{
							if ($("#cell_3_0").attr("class") === "cell"){
								$("#cell_2_0").animate({top:'20px'},200,function(){
									var number2 = +($("#cell_2_0").text());
									$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
									$("#cell_0_0").addClass("n" + number2).text(number2);
								});
								
							}
							else{
								var number2 = +($("#cell_2_0").text());
								var number3 = +($("#cell_3_0").text());
								if (number2 === number3){
									$("#cell_2_0").animate({top:'20px'},200);
									$("#cell_3_0").animate({top:'20px'},300,function(){
										var number0 = number2 + number3;
										$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_0").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_2_0").animate({top:'20px'},200);
									$("#cell_3_0").animate({top:'125px'},200,function(){
										$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_0").addClass("n" + number2).text(number2);
										$("#cell_1_0").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
					}
					else{
						if ($("#cell_2_0").attr("class") === "cell"){
							if ($("#cell_3_0").attr("class") === "cell"){
								$("#cell_1_0").animate({top:'20px'},100,function(){
									var number1 = +($("#cell_1_0").text());
									$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
									$("#cell_0_0").addClass("n" + number1).text(number1);
								});
								
							}
							else{
								var number1 = +($("#cell_1_0").text());
								var number3 = +($("#cell_3_0").text());
								if (number1 === number3){
									$("#cell_1_0").animate({top:'20px'},100);
									$("#cell_3_0").animate({top:'20px'},300,function(){
										var number0 = number1 + number3;
										$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_0").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_1_0").animate({top:'20px'},100);
									$("#cell_3_0").animate({top:'125px'},200,function(){
										$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_0").addClass("n" + number1).text(number1);
										$("#cell_1_0").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
						else{
							if ($("#cell_3_0").attr("class") === "cell"){
								var number1 = +($("#cell_1_0").text());
								var number2 = +($("#cell_2_0").text());
								if (number1 === number2){
									$("#cell_1_0").animate({top:'20px'},100);
									$("#cell_2_0").animate({top:'20px'},200,function(){
										var number0 = number1 + number2;
										$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_0").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_1_0").animate({top:'20px'},100);
									$("#cell_2_0").animate({top:'125px'},100,function(){
										$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_0").addClass("n" + number1).text(number1);
										$("#cell_1_0").addClass("n" + number2).text(number2);
									});
									
								}
							}
							else{
								var number1 = +($("#cell_1_0").text());
								var number2 = +($("#cell_2_0").text());
								var number3 = +($("#cell_3_0").text());
								if (number1 === number2){
									$("#cell_1_0").animate({top:"20px"},100);
									$("#cell_2_0").animate({top:"20px"},200);
									$("#cell_3_0").animate({top:"125px"},200,function(){
										var number0 = number1 + number2;
										$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_0").addClass("n" + number0).text(number0);
										$("#cell_1_0").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number2 === number3){
										$("#cell_1_0").animate({top:"20px"},100);
										$("#cell_2_0").animate({top:"125px"},100);
										$("#cell_3_0").animate({top:"125px"},200,function(){
											var number4 = number2 + number3;
											$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_0").addClass("n" + number1).text(number1);
											$("#cell_1_0").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_1_0").animate({top:"20px"},100);
										$("#cell_2_0").animate({top:"125px"},100);
										$("#cell_3_0").animate({top:"230px"},100,function(){
											$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_0").addClass("n" + number1).text(number1);
											$("#cell_1_0").addClass("n" + number2).text(number2);
											$("#cell_2_0").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
					}
				}
				else{
					if ($("#cell_1_0").attr("class") === "cell"){
						if ($("#cell_2_0").attr("class") === "cell"){
							if ($("#cell_3_0").attr("class") === "cell"){
								
							}
							else{
								var number0 = +($("#cell_0_0").text());
								var number3 = +($("#cell_3_0").text());
								if (number0 === number3){
									$("#cell_3_0").animate({top:'20px'},300,function(){
										var number4 = number0 + number3;
										$("#cell_0_0").removeClass("n" + number0).text("");
										$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_0").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_3_0").animate({top:'125px'},200,function(){
										$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_1_0").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
						else{
							if ($("#cell_3_0").attr("class") === "cell"){
								var number0 = +($("#cell_0_0").text());
								var number2 = +($("#cell_2_0").text());
								if (number0 === number2){
									$("#cell_2_0").animate({top:'20px'},200,function(){
										var number4 = number0 + number2;
										$("#cell_0_0").removeClass("n" + number0).text("");
										$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_0").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_2_0").animate({top:'125px'},200,function(){
										$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_0").addClass("n" + number2).text(number2);
									});
									
								}
							}
							else{
								var number0 = +($("#cell_0_0").text());
								var number2 = +($("#cell_2_0").text());
								var number3 = +($("#cell_3_0").text());
								if (number0 === number2){
									$("#cell_2_0").animate({top:"20px"},200);
									$("#cell_3_0").animate({top:"125px"},200,function(){
										var number4 = number0 + number2;
										$("#cell_0_0").removeClass("n" + number0).text("");
										$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_0").addClass("n" + number4).text(number4);
										$("#cell_1_0").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number2 === number3){
										$("#cell_2_0").animate({top:"125px"},100);
										$("#cell_3_0").animate({top:"125px"},200,function(){
											var number4 = number2 + number3;
											$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_0").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_2_0").animate({top:"125px"},100);
										$("#cell_3_0").animate({top:"230px"},100,function(){
											$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_0").addClass("n" + number2).text(number2);
											$("#cell_2_0").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
					}
					else{
						if ($("#cell_2_0").attr("class") === "cell"){
							if ($("#cell_3_0").attr("class") === "cell"){
								var number0 = +($("#cell_0_0").text());
								var number1 = +($("#cell_1_0").text());
								if (number0 === number1){
									$("#cell_1_0").animate({top:'20px'},300,function(){
										var number4 = number0 + number1;
										$("#cell_0_0").removeClass("n" + number0).text("");
										$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_0").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									
								}
							}
							else{
								var number0 = +($("#cell_0_0").text());
								var number1 = +($("#cell_1_0").text());
								var number3 = +($("#cell_3_0").text());
								if (number0 === number1){
									$("#cell_1_0").animate({top:"20px"},100);
									$("#cell_3_0").animate({top:"125px"},200,function(){
										var number4 = number0 + number1;
										$("#cell_0_0").removeClass("n" + number0).text("");
										$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_0").addClass("n" + number4).text(number4);
										$("#cell_1_0").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number1 === number3){
										$("#cell_3_0").animate({top:"125px"},200,function(){
											var number4 = number1 + number3;
											$("#cell_1_0").removeClass("n" + number1);
											$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_0").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_3_0").animate({top:"230px"},100,function(){
											$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_2_0").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
						else{
							if ($("#cell_3_0").attr("class") === "cell"){
								var number0 = +($("#cell_0_0").text());
								var number1 = +($("#cell_1_0").text());
								var number2 = +($("#cell_2_0").text());
								if (number0 === number1){
									$("#cell_1_0").animate({top:"20px"},100);
									$("#cell_2_0").animate({top:"125px"},100,function(){
										var number4 = number0 + number1;
										$("#cell_0_0").removeClass("n" + number0).text("");
										$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_0").addClass("n" + number4).text(number4);
										$("#cell_1_0").addClass("n" + number2).text(number2);
									});
									
								}
								else{
									if (number1 === number2){
										$("#cell_2_0").animate({top:"125px"},100,function(){
											var number4 = number1 + number2;
											$("#cell_1_0").removeClass("n" + number1);
											$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_0").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										
									}
								}
							}
							else{
								var number0 = +($("#cell_0_0").text());
								var number1 = +($("#cell_1_0").text());
								var number2 = +($("#cell_2_0").text());
								var number3 = +($("#cell_3_0").text());
								if (number0 === number1){
									if (number2 === number3){
										var number4 = number0 + number1;
										var number5 = number2 + number3;
										$("#cell_1_0").animate({top:"20px"},100);
										$("#cell_2_0").animate({top:"125px"},100);
										$("#cell_3_0").animate({top:"125px"},200,function(){
											$("#cell_0_0").removeClass("n" + number0).text("");
											$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_0").addClass("n" + number4).text(number4);
											$("#cell_1_0").addClass("n" + number5).text(number5);
										});
										
									}
									else{
										$("#cell_1_0").animate({top:"20px"},100);
										$("#cell_2_0").animate({top:"125px"},100);
										$("#cell_3_0").animate({top:"230px"},100,function(){
											var number4 = number0 + number1;
											$("#cell_0_0").removeClass("n" + number0).text("");
											$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_0").addClass("n" + number4).text(number4);
											$("#cell_1_0").addClass("n" + number2).text(number2);
											$("#cell_2_0").addClass("n" + number3).text(number3);
										});
										
									}
								}
								else{
									if (number1 === number2){
										$("#cell_2_0").animate({top:"125px"},100);
										$("#cell_3_0").animate({top:"230px"},100,function(){
											var number4 = number1 + number2;
											$("#cell_1_0").removeClass("n" + number1).text("");
											$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_0").addClass("n" + number4).text(number4);
											$("#cell_2_0").addClass("n" + number3).text(number3);
										});
										
									}
									else{
										if (number2 === number3){
											$("#cell_3_0").animate({top:"230px"},100,function(){
												var number4 = number2 + number3;
												$("#cell_2_0").removeClass("n" + number2).text("");
												$("#cell_3_0").attr("style","none").removeClass("n" + number3).text("");
												$("#cell_2_0").addClass("n" + number4).text(number4);
											});
											
										}
										else{
											
										}
									}
								}
							}
						}
					}
				}
			if ($("#cell_0_1").attr("class") === "cell"){
					if ($("#cell_1_1").attr("class") === "cell"){
						if($("#cell_2_1").attr("class") === "cell"){
							if ($("#cell_3_1").attr("class") === "cell") {
								
							}
							else{
								$("#cell_3_1").animate({top:'20px'},300,function(){
									var number3 = +($("#cell_3_1").text());
									$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
									$("#cell_0_1").addClass("n" + number3).text(number3);
								});
								
							}
						}
						else{
							if ($("#cell_3_1").attr("class") === "cell"){
								$("#cell_2_1").animate({top:'20px'},200,function(){
									var number2 = +($("#cell_2_1").text());
									$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
									$("#cell_0_1").addClass("n" + number2).text(number2);
								});
								
							}
							else{
								var number2 = +($("#cell_2_1").text());
								var number3 = +($("#cell_3_1").text());
								if (number2 === number3){
									$("#cell_2_1").animate({top:'20px'},200);
									$("#cell_3_1").animate({top:'20px'},300,function(){
										var number0 = number2 + number3;
										$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_1").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_2_1").animate({top:'20px'},200);
									$("#cell_3_1").animate({top:'125px'},200,function(){
										$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_1").addClass("n" + number2).text(number2);
										$("#cell_1_1").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
					}
					else{
						if ($("#cell_2_1").attr("class") === "cell"){
							if ($("#cell_3_1").attr("class") === "cell"){
								$("#cell_1_1").animate({top:'20px'},100,function(){
									var number1 = +($("#cell_1_1").text());
									$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
									$("#cell_0_1").addClass("n" + number1).text(number1);
								});
								
							}
							else{
								var number1 = +($("#cell_1_1").text());
								var number3 = +($("#cell_3_1").text());
								if (number1 === number3){
									$("#cell_1_1").animate({top:'20px'},100);
									$("#cell_3_1").animate({top:'20px'},300,function(){
										var number0 = number1 + number3;
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_1").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_1_1").animate({top:'20px'},100);
									$("#cell_3_1").animate({top:'125px'},200,function(){
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_1").addClass("n" + number1).text(number1);
										$("#cell_1_1").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
						else{
							if ($("#cell_3_1").attr("class") === "cell"){
								var number1 = +($("#cell_1_1").text());
								var number2 = +($("#cell_2_1").text());
								if (number1 === number2){
									$("#cell_1_1").animate({top:'20px'},100);
									$("#cell_2_1").animate({top:'20px'},200,function(){
										var number0 = number1 + number2;
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_1").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_1_1").animate({top:'20px'},100);
									$("#cell_2_1").animate({top:'125px'},100,function(){
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_1").addClass("n" + number1).text(number1);
										$("#cell_1_1").addClass("n" + number2).text(number2);
									});
									
								}
							}
							else{
								var number1 = +($("#cell_1_1").text());
								var number2 = +($("#cell_2_1").text());
								var number3 = +($("#cell_3_1").text());
								if (number1 === number2){
									$("#cell_1_1").animate({top:"20px"},100);
									$("#cell_2_1").animate({top:"20px"},200);
									$("#cell_3_1").animate({top:"125px"},200,function(){
										var number0 = number1 + number2;
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_1").addClass("n" + number0).text(number0);
										$("#cell_1_1").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number2 === number3){
										$("#cell_1_1").animate({top:"20px"},100);
										$("#cell_2_1").animate({top:"125px"},100);
										$("#cell_3_1").animate({top:"125px"},200,function(){
											var number4 = number2 + number3;
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_1").addClass("n" + number1).text(number1);
											$("#cell_1_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_1_1").animate({top:"20px"},100);
										$("#cell_2_1").animate({top:"125px"},100);
										$("#cell_3_1").animate({top:"230px"},100,function(){
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_1").addClass("n" + number1).text(number1);
											$("#cell_1_1").addClass("n" + number2).text(number2);
											$("#cell_2_1").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
					}
				}
				else{
					if ($("#cell_1_1").attr("class") === "cell"){
						if ($("#cell_2_1").attr("class") === "cell"){
							if ($("#cell_3_1").attr("class") === "cell"){
								
							}
							else{
								var number0 = +($("#cell_0_1").text());
								var number3 = +($("#cell_3_1").text());
								if (number0 === number3){
									$("#cell_3_1").animate({top:'20px'},300,function(){
										var number4 = number0 + number3;
										$("#cell_0_1").removeClass("n" + number0).text("");
										$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_1").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_3_1").animate({top:'125px'},200,function(){
										$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_1_1").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
						else{
							if ($("#cell_3_1").attr("class") === "cell"){
								var number0 = +($("#cell_0_1").text());
								var number2 = +($("#cell_2_1").text());
								if (number0 === number2){
									$("#cell_2_1").animate({top:'20px'},200,function(){
										var number4 = number0 + number2;
										$("#cell_0_1").removeClass("n" + number0).text("");
										$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_1").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_2_1").animate({top:'125px'},200,function(){
										$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_1").addClass("n" + number2).text(number2);
									});
									
								}
							}
							else{
								var number0 = +($("#cell_0_1").text());
								var number2 = +($("#cell_2_1").text());
								var number3 = +($("#cell_3_1").text());
								if (number0 === number2){
									$("#cell_2_1").animate({top:"20px"},200);
									$("#cell_3_1").animate({top:"125px"},200,function(){
										var number4 = number0 + number2;
										$("#cell_0_1").removeClass("n" + number0).text("");
										$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_1").addClass("n" + number4).text(number4);
										$("#cell_1_1").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number2 === number3){
										$("#cell_2_1").animate({top:"125px"},100);
										$("#cell_3_1").animate({top:"125px"},200,function(){
											var number4 = number2 + number3;
											$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_2_1").animate({top:"125px"},100);
										$("#cell_3_1").animate({top:"230px"},100,function(){
											$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_1").addClass("n" + number2).text(number2);
											$("#cell_2_1").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
					}
					else{
						if ($("#cell_2_1").attr("class") === "cell"){
							if ($("#cell_3_1").attr("class") === "cell"){
								var number0 = +($("#cell_0_1").text());
								var number1 = +($("#cell_1_1").text());
								if (number0 === number1){
									$("#cell_1_1").animate({top:'20px'},300,function(){
										var number4 = number0 + number1;
										$("#cell_0_1").removeClass("n" + number0).text("");
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_1").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									
								}
							}
							else{
								var number0 = +($("#cell_0_1").text());
								var number1 = +($("#cell_1_1").text());
								var number3 = +($("#cell_3_1").text());
								if (number0 === number1){
									$("#cell_1_1").animate({top:"20px"},100);
									$("#cell_3_1").animate({top:"125px"},200,function(){
										var number4 = number0 + number1;
										$("#cell_0_1").removeClass("n" + number0).text("");
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_1").addClass("n" + number4).text(number4);
										$("#cell_1_1").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number1 === number3){
										$("#cell_3_1").animate({top:"125px"},200,function(){
											var number4 = number1 + number3;
											$("#cell_1_1").removeClass("n" + number1);
											$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_3_1").animate({top:"230px"},100,function(){
											$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_2_1").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
						else{
							if ($("#cell_3_1").attr("class") === "cell"){
								var number0 = +($("#cell_0_1").text());
								var number1 = +($("#cell_1_1").text());
								var number2 = +($("#cell_2_1").text());
								if (number0 === number1){
									$("#cell_1_1").animate({top:"20px"},100);
									$("#cell_2_1").animate({top:"125px"},100,function(){
										var number4 = number0 + number1;
										$("#cell_0_1").removeClass("n" + number0).text("");
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_1").addClass("n" + number4).text(number4);
										$("#cell_1_1").addClass("n" + number2).text(number2);
									});
									
								}
								else{
									if (number1 === number2){
										$("#cell_2_1").animate({top:"125px"},100,function(){
											var number4 = number1 + number2;
											$("#cell_1_1").removeClass("n" + number1);
											$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										
									}
								}
							}
							else{
								var number0 = +($("#cell_0_1").text());
								var number1 = +($("#cell_1_1").text());
								var number2 = +($("#cell_2_1").text());
								var number3 = +($("#cell_3_1").text());
								if (number0 === number1){
									if (number2 === number3){
										var number4 = number0 + number1;
										var number5 = number2 + number3;
										$("#cell_1_1").animate({top:"20px"},100);
										$("#cell_2_1").animate({top:"125px"},100);
										$("#cell_3_1").animate({top:"125px"},200,function(){
											$("#cell_0_1").removeClass("n" + number0).text("");
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_1").addClass("n" + number4).text(number4);
											$("#cell_1_1").addClass("n" + number5).text(number5);
										});
										
									}
									else{
										$("#cell_1_1").animate({top:"20px"},100);
										$("#cell_2_1").animate({top:"125px"},100);
										$("#cell_3_1").animate({top:"230px"},100,function(){
											var number4 = number0 + number1;
											$("#cell_0_1").removeClass("n" + number0).text("");
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_1").addClass("n" + number4).text(number4);
											$("#cell_1_1").addClass("n" + number2).text(number2);
											$("#cell_2_1").addClass("n" + number3).text(number3);
										});
										
									}
								}
								else{
									if (number1 === number2){
										$("#cell_2_1").animate({top:"125px"},100);
										$("#cell_3_1").animate({top:"230px"},100,function(){
											var number4 = number1 + number2;
											$("#cell_1_1").removeClass("n" + number1).text("");
											$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_1").addClass("n" + number4).text(number4);
											$("#cell_2_1").addClass("n" + number3).text(number3);
										});
										
									}
									else{
										if (number2 === number3){
											$("#cell_3_1").animate({top:"230px"},100,function(){
												var number4 = number2 + number3;
												$("#cell_2_1").removeClass("n" + number2).text("");
												$("#cell_3_1").attr("style","none").removeClass("n" + number3).text("");
												$("#cell_2_1").addClass("n" + number4).text(number4);
											});
											
										}
										else{
											
										}
									}
								}
							}
						}
					}
				}
				if ($("#cell_0_2").attr("class") === "cell"){
					if ($("#cell_1_2").attr("class") === "cell"){
						if($("#cell_2_2").attr("class") === "cell"){
							if ($("#cell_3_2").attr("class") === "cell") {
								
							}
							else{
								$("#cell_3_2").animate({top:'20px'},300,function(){
									var number3 = +($("#cell_3_2").text());
									$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
									$("#cell_0_2").addClass("n" + number3).text(number3);
								});
								
							}
						}
						else{
							if ($("#cell_3_2").attr("class") === "cell"){
								$("#cell_2_2").animate({top:'20px'},200,function(){
									var number2 = +($("#cell_2_2").text());
									$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
									$("#cell_0_2").addClass("n" + number2).text(number2);
								});
								
							}
							else{
								var number2 = +($("#cell_2_2").text());
								var number3 = +($("#cell_3_2").text());
								if (number2 === number3){
									$("#cell_2_2").animate({top:'20px'},200);
									$("#cell_3_2").animate({top:'20px'},300,function(){
										var number0 = number2 + number3;
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_2").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_2_2").animate({top:'20px'},200);
									$("#cell_3_2").animate({top:'125px'},200,function(){
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_2").addClass("n" + number2).text(number2);
										$("#cell_1_2").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
					}
					else{
						if ($("#cell_2_2").attr("class") === "cell"){
							if ($("#cell_3_2").attr("class") === "cell"){
								$("#cell_1_2").animate({top:'20px'},100,function(){
									var number1 = +($("#cell_1_2").text());
									$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
									$("#cell_0_2").addClass("n" + number1).text(number1);
								});
								
							}
							else{
								var number1 = +($("#cell_1_2").text());
								var number3 = +($("#cell_3_2").text());
								if (number1 === number3){
									$("#cell_1_2").animate({top:'20px'},100);
									$("#cell_3_2").animate({top:'20px'},300,function(){
										var number0 = number1 + number3;
										$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_2").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_1_2").animate({top:'20px'},100);
									$("#cell_3_2").animate({top:'125px'},200,function(){
										$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_2").addClass("n" + number1).text(number1);
										$("#cell_1_2").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
						else{
							if ($("#cell_3_2").attr("class") === "cell"){
								var number1 = +($("#cell_1_2").text());
								var number2 = +($("#cell_2_2").text());
								if (number1 === number2){
									$("#cell_1_2").animate({top:'20px'},100);
									$("#cell_2_2").animate({top:'20px'},200,function(){
										var number0 = number1 + number2;
										$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_2").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_1_2").animate({top:'20px'},100);
									$("#cell_2_2").animate({top:'125px'},100,function(){
										$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_2").addClass("n" + number1).text(number1);
										$("#cell_1_2").addClass("n" + number2).text(number2);
									});
									
								}
							}
							else{
								var number1 = +($("#cell_1_2").text());
								var number2 = +($("#cell_2_2").text());
								var number3 = +($("#cell_3_2").text());
								if (number1 === number2){
									$("#cell_1_2").animate({top:"20px"},100);
									$("#cell_2_2").animate({top:"20px"},200);
									$("#cell_3_2").animate({top:"125px"},200,function(){
										var number0 = number1 + number2;
										$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_2").addClass("n" + number0).text(number0);
										$("#cell_1_2").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number2 === number3){
										$("#cell_1_2").animate({top:"20px"},100);
										$("#cell_2_2").animate({top:"125px"},100);
										$("#cell_3_2").animate({top:"125px"},200,function(){
											var number4 = number2 + number3;
											$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_2").addClass("n" + number1).text(number1);
											$("#cell_1_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_1_2").animate({top:"20px"},100);
										$("#cell_2_2").animate({top:"125px"},100);
										$("#cell_3_2").animate({top:"230px"},100,function(){
											$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_2").addClass("n" + number1).text(number1);
											$("#cell_1_2").addClass("n" + number2).text(number2);
											$("#cell_2_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
					}
				}
				else{
					if ($("#cell_1_2").attr("class") === "cell"){
						if ($("#cell_2_2").attr("class") === "cell"){
							if ($("#cell_3_2").attr("class") === "cell"){
								
							}
							else{
								var number0 = +($("#cell_0_2").text());
								var number3 = +($("#cell_3_2").text());
								if (number0 === number3){
									$("#cell_3_2").animate({top:'20px'},300,function(){
										var number4 = number0 + number3;
										$("#cell_0_2").removeClass("n" + number0).text("");
										$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_2").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_3_2").animate({top:'125px'},200,function(){
										$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_1_2").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
						else{
							if ($("#cell_3_2").attr("class") === "cell"){
								var number0 = +($("#cell_0_2").text());
								var number2 = +($("#cell_2_2").text());
								if (number0 === number2){
									$("#cell_2_2").animate({top:'20px'},200,function(){
										var number4 = number0 + number2;
										$("#cell_0_2").removeClass("n" + number0).text("");
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_2").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_2_2").animate({top:'125px'},200,function(){
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_2").addClass("n" + number2).text(number2);
									});
									
								}
							}
							else{
								var number0 = +($("#cell_0_2").text());
								var number2 = +($("#cell_2_2").text());
								var number3 = +($("#cell_3_2").text());
								if (number0 === number2){
									$("#cell_2_2").animate({top:"20px"},200);
									$("#cell_3_2").animate({top:"125px"},200,function(){
										var number4 = number0 + number2;
										$("#cell_0_2").removeClass("n" + number0).text("");
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_2").addClass("n" + number4).text(number4);
										$("#cell_1_2").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number2 === number3){
										$("#cell_2_2").animate({top:"125px"},100);
										$("#cell_3_2").animate({top:"125px"},200,function(){
											var number4 = number2 + number3;
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_2_2").animate({top:"125px"},100);
										$("#cell_3_2").animate({top:"230px"},100,function(){
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_2").addClass("n" + number2).text(number2);
											$("#cell_2_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
					}
					else{
						if ($("#cell_2_2").attr("class") === "cell"){
							if ($("#cell_3_2").attr("class") === "cell"){
								var number0 = +($("#cell_0_2").text());
								var number1 = +($("#cell_1_2").text());
								if (number0 === number1){
									$("#cell_1_2").animate({top:'20px'},300,function(){
										var number4 = number0 + number1;
										$("#cell_0_2").removeClass("n" + number0).text("");
										$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_2").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									
								}
							}
							else{
								var number0 = +($("#cell_0_2").text());
								var number1 = +($("#cell_1_2").text());
								var number3 = +($("#cell_3_2").text());
								if (number0 === number1){
									$("#cell_1_2").animate({top:"20px"},100);
									$("#cell_3_2").animate({top:"125px"},200,function(){
										var number4 = number0 + number1;
										$("#cell_0_2").removeClass("n" + number0).text("");
										$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_2").addClass("n" + number4).text(number4);
										$("#cell_1_2").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number1 === number3){
										$("#cell_3_2").animate({top:"125px"},200,function(){
											var number4 = number1 + number3;
											$("#cell_1_2").removeClass("n" + number1);
											$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_3_2").animate({top:"230px"},100,function(){
											$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_2_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
						else{
							if ($("#cell_3_2").attr("class") === "cell"){
								var number0 = +($("#cell_0_2").text());
								var number1 = +($("#cell_1_2").text());
								var number2 = +($("#cell_2_2").text());
								if (number0 === number1){
									$("#cell_1_2").animate({top:"20px"},100);
									$("#cell_2_2").animate({top:"125px"},100,function(){
										var number4 = number0 + number1;
										$("#cell_0_2").removeClass("n" + number0).text("");
										$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_2").addClass("n" + number4).text(number4);
										$("#cell_1_2").addClass("n" + number2).text(number2);
									});
									
								}
								else{
									if (number1 === number2){
										$("#cell_2_2").animate({top:"125px"},100,function(){
											var number4 = number1 + number2;
											$("#cell_1_2").removeClass("n" + number1);
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										
									}
								}
							}
							else{
								var number0 = +($("#cell_0_2").text());
								var number1 = +($("#cell_1_2").text());
								var number2 = +($("#cell_2_2").text());
								var number3 = +($("#cell_3_2").text());
								if (number0 === number1){
									if (number2 === number3){
										var number4 = number0 + number1;
										var number5 = number2 + number3;
										$("#cell_1_2").animate({top:"20px"},100);
										$("#cell_2_2").animate({top:"125px"},100);
										$("#cell_3_2").animate({top:"125px"},200,function(){
											$("#cell_0_2").removeClass("n" + number0).text("");
											$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_2").addClass("n" + number4).text(number4);
											$("#cell_1_2").addClass("n" + number5).text(number5);
										});
										
									}
									else{
										$("#cell_1_2").animate({top:"20px"},100);
										$("#cell_2_2").animate({top:"125px"},100);
										$("#cell_3_2").animate({top:"230px"},100,function(){
											var number4 = number0 + number1;
											$("#cell_0_2").removeClass("n" + number0).text("");
											$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_2").addClass("n" + number4).text(number4);
											$("#cell_1_2").addClass("n" + number2).text(number2);
											$("#cell_2_2").addClass("n" + number3).text(number3);
										});
										
									}
								}
								else{
									if (number1 === number2){
										$("#cell_2_2").animate({top:"125px"},100);
										$("#cell_3_2").animate({top:"230px"},100,function(){
											var number4 = number1 + number2;
											$("#cell_1_2").removeClass("n" + number1).text("");
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_2").addClass("n" + number4).text(number4);
											$("#cell_2_2").addClass("n" + number3).text(number3);
										});
										
									}
									else{
										if (number2 === number3){
											$("#cell_3_2").animate({top:"230px"},100,function(){
												var number4 = number2 + number3;
												$("#cell_2_2").removeClass("n" + number2).text("");
												$("#cell_3_2").attr("style","none").removeClass("n" + number3).text("");
												$("#cell_2_2").addClass("n" + number4).text(number4);
											});
											
										}
										else{
											
										}
									}
								}
							}
						}
					}
				}
				if ($("#cell_0_3").attr("class") === "cell"){
					if ($("#cell_1_3").attr("class") === "cell"){
						if($("#cell_2_3").attr("class") === "cell"){
							if ($("#cell_3_3").attr("class") === "cell") {
								
							}
							else{
								$("#cell_3_3").animate({top:'20px'},300,function(){
									var number3 = +($("#cell_3_3").text());
									$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
									$("#cell_0_3").addClass("n" + number3).text(number3);
								});
								
							}
						}
						else{
							if ($("#cell_3_3").attr("class") === "cell"){
								$("#cell_2_3").animate({top:'20px'},200,function(){
									var number2 = +($("#cell_2_3").text());
									$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
									$("#cell_0_3").addClass("n" + number2).text(number2);
								});
								
							}
							else{
								var number2 = +($("#cell_2_3").text());
								var number3 = +($("#cell_3_3").text());
								if (number2 === number3){
									$("#cell_2_3").animate({top:'20px'},200);
									$("#cell_3_3").animate({top:'20px'},300,function(){
										var number0 = number2 + number3;
										$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_3").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_2_3").animate({top:'20px'},200);
									$("#cell_3_3").animate({top:'125px'},200,function(){
										$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_3").addClass("n" + number2).text(number2);
										$("#cell_1_3").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
					}
					else{
						if ($("#cell_2_3").attr("class") === "cell"){
							if ($("#cell_3_3").attr("class") === "cell"){
								$("#cell_1_3").animate({top:'20px'},100,function(){
									var number1 = +($("#cell_1_3").text());
									$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
									$("#cell_0_3").addClass("n" + number1).text(number1);
								});
								
							}
							else{
								var number1 = +($("#cell_1_3").text());
								var number3 = +($("#cell_3_3").text());
								if (number1 === number3){
									$("#cell_1_3").animate({top:'20px'},100);
									$("#cell_3_3").animate({top:'20px'},300,function(){
										var number0 = number1 + number3;
										$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_3").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_1_3").animate({top:'20px'},100);
									$("#cell_3_3").animate({top:'125px'},200,function(){
										$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_3").addClass("n" + number1).text(number1);
										$("#cell_1_3").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
						else{
							if ($("#cell_3_3").attr("class") === "cell"){
								var number1 = +($("#cell_1_3").text());
								var number2 = +($("#cell_2_3").text());
								if (number1 === number2){
									$("#cell_1_3").animate({top:'20px'},100);
									$("#cell_2_3").animate({top:'20px'},200,function(){
										var number0 = number1 + number2;
										$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_3").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									$("#cell_1_3").animate({top:'20px'},100);
									$("#cell_2_3").animate({top:'125px'},100,function(){
										$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_3").addClass("n" + number1).text(number1);
										$("#cell_1_3").addClass("n" + number2).text(number2);
									});
									
								}
							}
							else{
								var number1 = +($("#cell_1_3").text());
								var number2 = +($("#cell_2_3").text());
								var number3 = +($("#cell_3_3").text());
								if (number1 === number2){
									$("#cell_1_3").animate({top:"20px"},100);
									$("#cell_2_3").animate({top:"20px"},200);
									$("#cell_3_3").animate({top:"125px"},200,function(){
										var number0 = number1 + number2;
										$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_3").addClass("n" + number0).text(number0);
										$("#cell_1_3").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number2 === number3){
										$("#cell_1_3").animate({top:"20px"},100);
										$("#cell_2_3").animate({top:"125px"},100);
										$("#cell_3_3").animate({top:"125px"},200,function(){
											var number4 = number2 + number3;
											$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_3").addClass("n" + number1).text(number1);
											$("#cell_1_3").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_1_3").animate({top:"20px"},100);
										$("#cell_2_3").animate({top:"125px"},100);
										$("#cell_3_3").animate({top:"230px"},100,function(){
											$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_3").addClass("n" + number1).text(number1);
											$("#cell_1_3").addClass("n" + number2).text(number2);
											$("#cell_2_3").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
					}
				}
				else{
					if ($("#cell_1_3").attr("class") === "cell"){
						if ($("#cell_2_3").attr("class") === "cell"){
							if ($("#cell_3_3").attr("class") === "cell"){
								
							}
							else{
								var number0 = +($("#cell_0_3").text());
								var number3 = +($("#cell_3_3").text());
								if (number0 === number3){
									$("#cell_3_3").animate({top:'20px'},300,function(){
										var number4 = number0 + number3;
										$("#cell_0_3").removeClass("n" + number0).text("");
										$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_3").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_3_3").animate({top:'125px'},200,function(){
										$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_1_3").addClass("n" + number3).text(number3);
									});
									
								}
							}
						}
						else{
							if ($("#cell_3_3").attr("class") === "cell"){
								var number0 = +($("#cell_0_3").text());
								var number2 = +($("#cell_2_3").text());
								if (number0 === number2){
									$("#cell_2_3").animate({top:'20px'},200,function(){
										var number4 = number0 + number2;
										$("#cell_0_3").removeClass("n" + number0).text("");
										$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_3").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_2_3").animate({top:'125px'},200,function(){
										$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_3").addClass("n" + number2).text(number2);
									});
									
								}
							}
							else{
								var number0 = +($("#cell_0_3").text());
								var number2 = +($("#cell_2_3").text());
								var number3 = +($("#cell_3_3").text());
								if (number0 === number2){
									$("#cell_2_3").animate({top:"20px"},200);
									$("#cell_3_3").animate({top:"125px"},200,function(){
										var number4 = number0 + number2;
										$("#cell_0_3").removeClass("n" + number0).text("");
										$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_3").addClass("n" + number4).text(number4);
										$("#cell_1_3").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number2 === number3){
										$("#cell_2_3").animate({top:"125px"},100);
										$("#cell_3_3").animate({top:"125px"},200,function(){
											var number4 = number2 + number3;
											$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_3").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_2_3").animate({top:"125px"},100);
										$("#cell_3_3").animate({top:"230px"},100,function(){
											$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_3").addClass("n" + number2).text(number2);
											$("#cell_2_3").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
					}
					else{
						if ($("#cell_2_3").attr("class") === "cell"){
							if ($("#cell_3_3").attr("class") === "cell"){
								var number0 = +($("#cell_0_3").text());
								var number1 = +($("#cell_1_3").text());
								if (number0 === number1){
									$("#cell_1_3").animate({top:'20px'},300,function(){
										var number4 = number0 + number1;
										$("#cell_0_3").removeClass("n" + number0).text("");
										$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_3").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									
								}
							}
							else{
								var number0 = +($("#cell_0_3").text());
								var number1 = +($("#cell_1_3").text());
								var number3 = +($("#cell_3_3").text());
								if (number0 === number1){
									$("#cell_1_3").animate({top:"20px"},100);
									$("#cell_3_3").animate({top:"125px"},200,function(){
										var number4 = number0 + number1;
										$("#cell_0_3").removeClass("n" + number0).text("");
										$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
										$("#cell_0_3").addClass("n" + number4).text(number4);
										$("#cell_1_3").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									if (number1 === number3){
										$("#cell_3_3").animate({top:"125px"},200,function(){
											var number4 = number1 + number3;
											$("#cell_1_3").removeClass("n" + number1);
											$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_3").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_3_3").animate({top:"230px"},100,function(){
											$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_2_3").addClass("n" + number3).text(number3);
										});
										
									}
								}
							}
						}
						else{
							if ($("#cell_3_3").attr("class") === "cell"){
								var number0 = +($("#cell_0_3").text());
								var number1 = +($("#cell_1_3").text());
								var number2 = +($("#cell_2_3").text());
								if (number0 === number1){
									$("#cell_1_3").animate({top:"20px"},100);
									$("#cell_2_3").animate({top:"125px"},100,function(){
										var number4 = number0 + number1;
										$("#cell_0_3").removeClass("n" + number0).text("");
										$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_3").addClass("n" + number4).text(number4);
										$("#cell_1_3").addClass("n" + number2).text(number2);
									});
									
								}
								else{
									if (number1 === number2){
										$("#cell_2_3").animate({top:"125px"},100,function(){
											var number4 = number1 + number2;
											$("#cell_1_3").removeClass("n" + number1);
											$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_3").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										
									}
								}
							}
							else{
								var number0 = +($("#cell_0_3").text());
								var number1 = +($("#cell_1_3").text());
								var number2 = +($("#cell_2_3").text());
								var number3 = +($("#cell_3_3").text());
								if (number0 === number1){
									if (number2 === number3){
										var number4 = number0 + number1;
										var number5 = number2 + number3;
										$("#cell_1_3").animate({top:"20px"},100);
										$("#cell_2_3").animate({top:"125px"},100);
										$("#cell_3_3").animate({top:"125px"},200,function(){
											$("#cell_0_3").removeClass("n" + number0).text("");
											$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_3").addClass("n" + number4).text(number4);
											$("#cell_1_3").addClass("n" + number5).text(number5);
										});
										
									}
									else{
										$("#cell_1_3").animate({top:"20px"},100);
										$("#cell_2_3").animate({top:"125px"},100);
										$("#cell_3_3").animate({top:"230px"},100,function(){
											var number4 = number0 + number1;
											$("#cell_0_3").removeClass("n" + number0).text("");
											$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_0_3").addClass("n" + number4).text(number4);
											$("#cell_1_3").addClass("n" + number2).text(number2);
											$("#cell_2_3").addClass("n" + number3).text(number3);
										});
										
									}
								}
								else{
									if (number1 === number2){
										$("#cell_2_3").animate({top:"125px"},100);
										$("#cell_3_3").animate({top:"230px"},100,function(){
											var number4 = number1 + number2;
											$("#cell_1_3").removeClass("n" + number1).text("");
											$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
											$("#cell_1_3").addClass("n" + number4).text(number4);
											$("#cell_2_3").addClass("n" + number3).text(number3);
										});
										
									}
									else{
										if (number2 === number3){
											$("#cell_3_3").animate({top:"230px"},100,function(){
												var number4 = number2 + number3;
												$("#cell_2_3").removeClass("n" + number2).text("");
												$("#cell_3_3").attr("style","none").removeClass("n" + number3).text("");
												$("#cell_2_3").addClass("n" + number4).text(number4);
											});
											
										}
										else{
											
										}
									}
								}
							}
						}
					}
				}
			setTimeout(function(){
				if (game.isWin()){
					return
				}
				game.randomEmerge();
				game.isFail();
			},300)	
		},
		//下
		DownDown : function(){
				if ($("#cell_3_0").attr("class") === "cell"){
					if ($("#cell_2_0").attr("class") === "cell"){
						if($("#cell_1_0").attr("class") === "cell"){
							if ($("#cell_0_0").attr("class") === "cell") {
								
							}
							else{
								$("#cell_0_0").animate({top:'335px'},300,function(){
									var number0 = +($("#cell_0_0").text());
									$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
									$("#cell_3_0").addClass("n" + number0).text(number0);
								});
								
							}
						}
						else{
							if ($("#cell_0_0").attr("class") === "cell"){
								$("#cell_1_0").animate({top:'335px'},200,function(){
									var number1 = +($("#cell_1_0").text());
									$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
									$("#cell_3_0").addClass("n" + number1).text(number1);
								});
								
							}
							else{
								var number1 = +($("#cell_1_0").text());
								var number0 = +($("#cell_0_0").text());
								if (number1 === number0){
									$("#cell_1_0").animate({top:'335px'},200);
									$("#cell_0_0").animate({top:'335px'},300,function(){
										var number3 = number1 + number0;
										$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_0").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_1_0").animate({top:'335px'},200);
									$("#cell_0_0").animate({top:'230px'},200,function(){
										$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_0").addClass("n" + number1).text(number1);
										$("#cell_2_0").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
					}
					else{
						if ($("#cell_1_0").attr("class") === "cell"){
							if ($("#cell_0_0").attr("class") === "cell"){
								$("#cell_2_0").animate({top:'335px'},100,function(){
									var number2 = +($("#cell_2_0").text());
									$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
									$("#cell_3_0").addClass("n" + number2).text(number2);
								});
								
							}
							else{
								var number2 = +($("#cell_2_0").text());
								var number0 = +($("#cell_0_0").text());
								if (number2 === number0){
									$("#cell_2_0").animate({top:'335px'},100);
									$("#cell_0_0").animate({top:'335px'},300,function(){
										var number3 = number2 + number0;
										$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_0").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_2_0").animate({top:'335px'},100);
									$("#cell_0_0").animate({top:'230px'},200,function(){
										$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_0").addClass("n" + number2).text(number2);
										$("#cell_2_0").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
						else{
							if ($("#cell_0_0").attr("class") === "cell"){
								var number2 = +($("#cell_2_0").text());
								var number1 = +($("#cell_1_0").text());
								if (number2 === number1){
									$("#cell_2_0").animate({top:'335px'},100);
									$("#cell_1_0").animate({top:'335px'},200,function(){
										var number3 = number2 + number1;
										$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_0").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_2_0").animate({top:'335px'},100);
									$("#cell_1_0").animate({top:'230px'},100,function(){
										$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_0").addClass("n" + number2).text(number2);
										$("#cell_2_0").addClass("n" + number1).text(number1);
									});
									
								}
							}
							else{
								var number2 = +($("#cell_2_0").text());
								var number1 = +($("#cell_1_0").text());
								var number0 = +($("#cell_0_0").text());
								if (number2 === number1){
									$("#cell_2_0").animate({top:"335px"},100);
									$("#cell_1_0").animate({top:"335px"},200);
									$("#cell_0_0").animate({top:"230px"},200,function(){
										var number3 = number2 + number1;
										$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_0").addClass("n" + number3).text(number3);
										$("#cell_2_0").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number1 === number0){
										$("#cell_2_0").animate({top:"335px"},100);
										$("#cell_1_0").animate({top:"230px"},100);
										$("#cell_0_0").animate({top:"230px"},200,function(){
											var number4 = number1 + number0;
											$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_0").addClass("n" + number2).text(number2);
											$("#cell_2_0").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_2_0").animate({top:"335px"},100);
										$("#cell_1_0").animate({top:"230px"},100);
										$("#cell_0_0").animate({top:"125px"},100,function(){
											$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_0").addClass("n" + number2).text(number2);
											$("#cell_2_0").addClass("n" + number1).text(number1);
											$("#cell_1_0").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
					}
				}
				else{
					if ($("#cell_2_0").attr("class") === "cell"){
						if ($("#cell_1_0").attr("class") === "cell"){
							if ($("#cell_0_0").attr("class") === "cell"){
								
							}
							else{
								var number3 = +($("#cell_3_0").text());
								var number0 = +($("#cell_0_0").text());
								if (number3 === number0){
									$("#cell_0_0").animate({top:'335px'},300,function(){
										var number4 = number0 + number3;
										$("#cell_3_0").removeClass("n" + number3).text("");
										$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_0").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_0_0").animate({top:'230px'},200,function(){
										$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_2_0").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
						else{
							if ($("#cell_0_0").attr("class") === "cell"){
								var number3 = +($("#cell_3_0").text());
								var number1 = +($("#cell_1_0").text());
								if (number3 === number1){
									$("#cell_1_0").animate({top:'335px'},200,function(){
										var number4 = number3 + number1;
										$("#cell_3_0").removeClass("n" + number3).text("");
										$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_0").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_1_0").animate({top:'230px'},200,function(){
										$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_0").addClass("n" + number1).text(number1);
									});
									
								}
							}
							else{
								var number3 = +($("#cell_3_0").text());
								var number1 = +($("#cell_1_0").text());
								var number0 = +($("#cell_0_0").text());
								if (number3 === number1){
									$("#cell_1_0").animate({top:"335px"},200);
									$("#cell_0_0").animate({top:"230px"},200,function(){
										var number4 = number3 + number1;
										$("#cell_3_0").removeClass("n" + number3).text("");
										$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_0").addClass("n" + number4).text(number4);
										$("#cell_2_0").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number1 === number0){
										$("#cell_1_0").animate({top:"230px"},100);
										$("#cell_0_0").animate({top:"230px"},200,function(){
											var number4 = number1 + number0;
											$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_0").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_1_0").animate({top:"230px"},100);
										$("#cell_0_0").animate({top:"125px"},100,function(){
											$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_0").addClass("n" + number1).text(number1);
											$("#cell_1_0").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
					}
					else{
						if ($("#cell_1_0").attr("class") === "cell"){
							if ($("#cell_0_0").attr("class") === "cell"){
								var number3 = +($("#cell_3_0").text());
								var number2 = +($("#cell_2_0").text());
								if (number3 === number2){
									$("#cell_2_0").animate({top:'335px'},300,function(){
										var number4 = number3 + number2;
										$("#cell_3_0").removeClass("n" + number3).text("");
										$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_0").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									
								}
							}
							else{
								var number3 = +($("#cell_3_0").text());
								var number2 = +($("#cell_2_0").text());
								var number0 = +($("#cell_0_0").text());
								if (number3 === number2){
									$("#cell_2_0").animate({top:"335px"},100);
									$("#cell_0_0").animate({top:"230px"},200,function(){
										var number4 = number0 + number1;
										$("#cell_3_0").removeClass("n" + number3).text("");
										$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_0").addClass("n" + number4).text(number4);
										$("#cell_2_0").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number2 === number0){
										$("#cell_0_0").animate({top:"230px"},200,function(){
											var number4 = number2 + number0;
											$("#cell_2_0").removeClass("n" + number2);
											$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_0").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_0_0").animate({top:"125px"},100,function(){
											$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_1_0").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
						else{
							if ($("#cell_0_0").attr("class") === "cell"){
								var number3 = +($("#cell_3_0").text());
								var number2 = +($("#cell_2_0").text());
								var number1 = +($("#cell_1_0").text());
								if (number3 === number2){
									$("#cell_2_0").animate({top:"335px"},100);
									$("#cell_1_0").animate({top:"230px"},100,function(){
										var number4 = number3 + number2;
										$("#cell_3_0").removeClass("n" + number3).text("");
										$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_0").addClass("n" + number4).text(number4);
										$("#cell_2_0").addClass("n" + number1).text(number1);
									});
									
								}
								else{
									if (number2 === number1){
										$("#cell_1_0").animate({top:"230px"},100,function(){
											var number4 = number2 + number1;
											$("#cell_2_0").removeClass("n" + number2);
											$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_0").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										
									}
								}
							}
							else{
								var number3 = +($("#cell_3_0").text());
								var number2 = +($("#cell_2_0").text());
								var number1 = +($("#cell_1_0").text());
								var number0 = +($("#cell_0_0").text());
								if (number3 === number2){
									if (number1 === number0){
										var number4 = number3 + number2;
										var number5 = number1 + number0;
										$("#cell_2_0").animate({top:"335px"},100);
										$("#cell_1_0").animate({top:"230px"},100);
										$("#cell_0_0").animate({top:"230px"},200,function(){
											$("#cell_3_0").removeClass("n" + number3).text("");
											$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_0").addClass("n" + number4).text(number4);
											$("#cell_2_0").addClass("n" + number5).text(number5);
										});
										
									}
									else{
										$("#cell_2_0").animate({top:"335px"},100);
										$("#cell_1_0").animate({top:"230px"},100);
										$("#cell_0_0").animate({top:"125px"},100,function(){
											var number4 = number3 + number2;
											$("#cell_3_0").removeClass("n" + number3).text("");
											$("#cell_2_0").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_0").addClass("n" + number4).text(number4);
											$("#cell_2_0").addClass("n" + number1).text(number1);
											$("#cell_1_0").addClass("n" + number0).text(number0);
										});
										
									}
								}
								else{
									if (number2 === number1){
										$("#cell_1_0").animate({top:"230px"},100);
										$("#cell_0_0").animate({top:"125px"},100,function(){
											var number4 = number2 + number1;
											$("#cell_2_0").removeClass("n" + number2).text("");
											$("#cell_1_0").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_0").addClass("n" + number4).text(number4);
											$("#cell_1_0").addClass("n" + number0).text(number0);
										});
										
									}
									else{
										if (number1 === number0){
											$("#cell_0_0").animate({top:"125px"},100,function(){
												var number4 = number1 + number0;
												$("#cell_1_0").removeClass("n" + number1).text("");
												$("#cell_0_0").attr("style","none").removeClass("n" + number0).text("");
												$("#cell_1_0").addClass("n" + number4).text(number4);
											});
											
										}
										else{
											
										}
									}
								}
							}
						}
					}
				}
			if ($("#cell_3_1").attr("class") === "cell"){
					if ($("#cell_2_1").attr("class") === "cell"){
						if($("#cell_1_1").attr("class") === "cell"){
							if ($("#cell_0_1").attr("class") === "cell") {
								
							}
							else{
								$("#cell_0_1").animate({top:'335px'},300,function(){
									var number0 = +($("#cell_0_1").text());
									$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
									$("#cell_3_1").addClass("n" + number0).text(number0);
								});
								
							}
						}
						else{
							if ($("#cell_0_1").attr("class") === "cell"){
								$("#cell_1_1").animate({top:'335px'},200,function(){
									var number1 = +($("#cell_1_1").text());
									$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
									$("#cell_3_1").addClass("n" + number1).text(number1);
								});
								
							}
							else{
								var number1 = +($("#cell_1_1").text());
								var number0 = +($("#cell_0_1").text());
								if (number1 === number0){
									$("#cell_1_1").animate({top:'335px'},200);
									$("#cell_0_1").animate({top:'335px'},300,function(){
										var number3 = number1 + number0;
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_1").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_1_1").animate({top:'335px'},200);
									$("#cell_0_1").animate({top:'230px'},200,function(){
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_1").addClass("n" + number1).text(number1);
										$("#cell_2_1").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
					}
					else{
						if ($("#cell_1_1").attr("class") === "cell"){
							if ($("#cell_0_1").attr("class") === "cell"){
								$("#cell_2_1").animate({top:'335px'},100,function(){
									var number2 = +($("#cell_2_1").text());
									$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
									$("#cell_3_1").addClass("n" + number2).text(number2);
								});
								
							}
							else{
								var number2 = +($("#cell_2_1").text());
								var number0 = +($("#cell_0_1").text());
								if (number2 === number0){
									$("#cell_2_1").animate({top:'335px'},100);
									$("#cell_0_1").animate({top:'335px'},300,function(){
										var number3 = number2 + number0;
										$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_1").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_2_1").animate({top:'335px'},100);
									$("#cell_0_1").animate({top:'230px'},200,function(){
										$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_1").addClass("n" + number2).text(number2);
										$("#cell_2_1").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
						else{
							if ($("#cell_0_1").attr("class") === "cell"){
								var number2 = +($("#cell_2_1").text());
								var number1 = +($("#cell_1_1").text());
								if (number2 === number1){
									$("#cell_2_1").animate({top:'335px'},100);
									$("#cell_1_1").animate({top:'335px'},200,function(){
										var number3 = number2 + number1;
										$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_1").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_2_1").animate({top:'335px'},100);
									$("#cell_1_1").animate({top:'230px'},100,function(){
										$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_1").addClass("n" + number2).text(number2);
										$("#cell_2_1").addClass("n" + number1).text(number1);
									});
									
								}
							}
							else{
								var number2 = +($("#cell_2_1").text());
								var number1 = +($("#cell_1_1").text());
								var number0 = +($("#cell_0_1").text());
								if (number2 === number1){
									$("#cell_2_1").animate({top:"335px"},100);
									$("#cell_1_1").animate({top:"335px"},200);
									$("#cell_0_1").animate({top:"230px"},200,function(){
										var number3 = number2 + number1;
										$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_1").addClass("n" + number3).text(number3);
										$("#cell_2_1").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number1 === number0){
										$("#cell_2_1").animate({top:"335px"},100);
										$("#cell_1_1").animate({top:"230px"},100);
										$("#cell_0_1").animate({top:"230px"},200,function(){
											var number4 = number1 + number0;
											$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_1").addClass("n" + number2).text(number2);
											$("#cell_2_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_2_1").animate({top:"335px"},100);
										$("#cell_1_1").animate({top:"230px"},100);
										$("#cell_0_1").animate({top:"125px"},100,function(){
											$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_1").addClass("n" + number2).text(number2);
											$("#cell_2_1").addClass("n" + number1).text(number1);
											$("#cell_1_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
					}
				}
				else{
					if ($("#cell_2_1").attr("class") === "cell"){
						if ($("#cell_1_1").attr("class") === "cell"){
							if ($("#cell_0_1").attr("class") === "cell"){
								
							}
							else{
								var number3 = +($("#cell_3_1").text());
								var number0 = +($("#cell_0_1").text());
								if (number3 === number0){
									$("#cell_0_1").animate({top:'335px'},300,function(){
										var number4 = number0 + number3;
										$("#cell_3_1").removeClass("n" + number3).text("");
										$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_1").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_0_1").animate({top:'230px'},200,function(){
										$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_2_1").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
						else{
							if ($("#cell_0_1").attr("class") === "cell"){
								var number3 = +($("#cell_3_1").text());
								var number1 = +($("#cell_1_1").text());
								if (number3 === number1){
									$("#cell_1_1").animate({top:'335px'},200,function(){
										var number4 = number3 + number1;
										$("#cell_3_1").removeClass("n" + number3).text("");
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_1").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_1_1").animate({top:'230px'},200,function(){
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_1").addClass("n" + number1).text(number1);
									});
									
								}
							}
							else{
								var number3 = +($("#cell_3_1").text());
								var number1 = +($("#cell_1_1").text());
								var number0 = +($("#cell_0_1").text());
								if (number3 === number1){
									$("#cell_1_1").animate({top:"335px"},200);
									$("#cell_0_1").animate({top:"230px"},200,function(){
										var number4 = number3 + number1;
										$("#cell_3_1").removeClass("n" + number3).text("");
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_1").addClass("n" + number4).text(number4);
										$("#cell_2_1").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number1 === number0){
										$("#cell_1_1").animate({top:"230px"},100);
										$("#cell_0_1").animate({top:"230px"},200,function(){
											var number4 = number1 + number0;
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_1_1").animate({top:"230px"},100);
										$("#cell_0_1").animate({top:"125px"},100,function(){
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_1").addClass("n" + number1).text(number1);
											$("#cell_1_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
					}
					else{
						if ($("#cell_1_1").attr("class") === "cell"){
							if ($("#cell_0_1").attr("class") === "cell"){
								var number3 = +($("#cell_3_1").text());
								var number2 = +($("#cell_2_1").text());
								if (number3 === number2){
									$("#cell_2_1").animate({top:'335px'},300,function(){
										var number4 = number3 + number2;
										$("#cell_3_1").removeClass("n" + number3).text("");
										$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_1").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									
								}
							}
							else{
								var number3 = +($("#cell_3_1").text());
								var number2 = +($("#cell_2_1").text());
								var number0 = +($("#cell_0_1").text());
								if (number3 === number2){
									$("#cell_2_1").animate({top:"335px"},100);
									$("#cell_0_1").animate({top:"230px"},200,function(){
										var number4 = number0 + number1;
										$("#cell_3_1").removeClass("n" + number3).text("");
										$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_1").addClass("n" + number4).text(number4);
										$("#cell_2_1").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number2 === number0){
										$("#cell_0_1").animate({top:"230px"},200,function(){
											var number4 = number2 + number0;
											$("#cell_2_1").removeClass("n" + number2);
											$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_0_1").animate({top:"125px"},100,function(){
											$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_1_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
						else{
							if ($("#cell_0_1").attr("class") === "cell"){
								var number3 = +($("#cell_3_1").text());
								var number2 = +($("#cell_2_1").text());
								var number1 = +($("#cell_1_1").text());
								if (number3 === number2){
									$("#cell_2_1").animate({top:"335px"},100);
									$("#cell_1_1").animate({top:"230px"},100,function(){
										var number4 = number3 + number2;
										$("#cell_3_1").removeClass("n" + number3).text("");
										$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_1").addClass("n" + number4).text(number4);
										$("#cell_2_1").addClass("n" + number1).text(number1);
									});
									
								}
								else{
									if (number2 === number1){
										$("#cell_1_1").animate({top:"230px"},100,function(){
											var number4 = number2 + number1;
											$("#cell_2_1").removeClass("n" + number2);
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_1").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										
									}
								}
							}
							else{
								var number3 = +($("#cell_3_1").text());
								var number2 = +($("#cell_2_1").text());
								var number1 = +($("#cell_1_1").text());
								var number0 = +($("#cell_0_1").text());
								if (number3 === number2){
									if (number1 === number0){
										var number4 = number3 + number2;
										var number5 = number1 + number0;
										$("#cell_2_1").animate({top:"335px"},100);
										$("#cell_1_1").animate({top:"230px"},100);
										$("#cell_0_1").animate({top:"230px"},200,function(){
											$("#cell_3_1").removeClass("n" + number3).text("");
											$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_1").addClass("n" + number4).text(number4);
											$("#cell_2_1").addClass("n" + number5).text(number5);
										});
										
									}
									else{
										$("#cell_2_1").animate({top:"335px"},100);
										$("#cell_1_1").animate({top:"230px"},100);
										$("#cell_0_1").animate({top:"125px"},100,function(){
											var number4 = number3 + number2;
											$("#cell_3_1").removeClass("n" + number3).text("");
											$("#cell_2_1").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_1").addClass("n" + number4).text(number4);
											$("#cell_2_1").addClass("n" + number1).text(number1);
											$("#cell_1_1").addClass("n" + number0).text(number0);
										});
										
									}
								}
								else{
									if (number2 === number1){
										$("#cell_1_1").animate({top:"230px"},100);
										$("#cell_0_1").animate({top:"125px"},100,function(){
											var number4 = number2 + number1;
											$("#cell_2_1").removeClass("n" + number2).text("");
											$("#cell_1_1").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_1").addClass("n" + number4).text(number4);
											$("#cell_1_1").addClass("n" + number0).text(number0);
										});
										
									}
									else{
										if (number1 === number0){
											$("#cell_0_1").animate({top:"125px"},100,function(){
												var number4 = number1 + number0;
												$("#cell_1_1").removeClass("n" + number1).text("");
												$("#cell_0_1").attr("style","none").removeClass("n" + number0).text("");
												$("#cell_1_1").addClass("n" + number4).text(number4);
											});
											
										}
										else{
											
										}
									}
								}
							}
						}
					}
				}
				if ($("#cell_3_2").attr("class") === "cell"){
					if ($("#cell_2_2").attr("class") === "cell"){
						if($("#cell_1_2").attr("class") === "cell"){
							if ($("#cell_0_2").attr("class") === "cell") {
								
							}
							else{
								$("#cell_0_2").animate({top:'335px'},300,function(){
									var number0 = +($("#cell_0_2").text());
									$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
									$("#cell_3_2").addClass("n" + number0).text(number0);
								});
								
							}
						}
						else{
							if ($("#cell_0_2").attr("class") === "cell"){
								$("#cell_1_2").animate({top:'335px'},200,function(){
									var number1 = +($("#cell_1_2").text());
									$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
									$("#cell_3_2").addClass("n" + number1).text(number1);
								});
								
							}
							else{
								var number1 = +($("#cell_1_2").text());
								var number0 = +($("#cell_0_2").text());
								if (number1 === number0){
									$("#cell_1_2").animate({top:'335px'},200);
									$("#cell_0_2").animate({top:'335px'},300,function(){
										var number3 = number1 + number0;
										$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_2").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_1_2").animate({top:'335px'},200);
									$("#cell_0_2").animate({top:'230px'},200,function(){
										$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_2").addClass("n" + number1).text(number1);
										$("#cell_2_2").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
					}
					else{
						if ($("#cell_1_2").attr("class") === "cell"){
							if ($("#cell_0_2").attr("class") === "cell"){
								$("#cell_2_2").animate({top:'335px'},100,function(){
									var number2 = +($("#cell_2_2").text());
									$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
									$("#cell_3_2").addClass("n" + number2).text(number2);
								});
								
							}
							else{
								var number2 = +($("#cell_2_2").text());
								var number0 = +($("#cell_0_2").text());
								if (number2 === number0){
									$("#cell_2_2").animate({top:'335px'},100);
									$("#cell_0_2").animate({top:'335px'},300,function(){
										var number3 = number2 + number0;
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_2").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_2_2").animate({top:'335px'},100);
									$("#cell_0_2").animate({top:'230px'},200,function(){
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_2").addClass("n" + number2).text(number2);
										$("#cell_2_2").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
						else{
							if ($("#cell_0_2").attr("class") === "cell"){
								var number2 = +($("#cell_2_2").text());
								var number1 = +($("#cell_1_2").text());
								if (number2 === number1){
									$("#cell_2_2").animate({top:'335px'},100);
									$("#cell_1_2").animate({top:'335px'},200,function(){
										var number3 = number2 + number1;
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_2").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_2_2").animate({top:'335px'},100);
									$("#cell_1_2").animate({top:'230px'},100,function(){
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_2").addClass("n" + number2).text(number2);
										$("#cell_2_2").addClass("n" + number1).text(number1);
									});
									
								}
							}
							else{
								var number2 = +($("#cell_2_2").text());
								var number1 = +($("#cell_1_2").text());
								var number0 = +($("#cell_0_2").text());
								if (number2 === number1){
									$("#cell_2_2").animate({top:"335px"},100);
									$("#cell_1_2").animate({top:"335px"},200);
									$("#cell_0_2").animate({top:"230px"},200,function(){
										var number3 = number2 + number1;
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_2").addClass("n" + number3).text(number3);
										$("#cell_2_2").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number1 === number0){
										$("#cell_2_2").animate({top:"335px"},100);
										$("#cell_1_2").animate({top:"230px"},100);
										$("#cell_0_2").animate({top:"230px"},200,function(){
											var number4 = number1 + number0;
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_2").addClass("n" + number2).text(number2);
											$("#cell_2_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_2_2").animate({top:"335px"},100);
										$("#cell_1_2").animate({top:"230px"},100);
										$("#cell_0_2").animate({top:"125px"},100,function(){
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_2").addClass("n" + number2).text(number2);
											$("#cell_2_2").addClass("n" + number1).text(number1);
											$("#cell_1_2").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
					}
				}
				else{
					if ($("#cell_2_2").attr("class") === "cell"){
						if ($("#cell_1_2").attr("class") === "cell"){
							if ($("#cell_0_2").attr("class") === "cell"){
								
							}
							else{
								var number3 = +($("#cell_3_2").text());
								var number0 = +($("#cell_0_2").text());
								if (number3 === number0){
									$("#cell_0_2").animate({top:'335px'},300,function(){
										var number4 = number0 + number3;
										$("#cell_3_2").removeClass("n" + number3).text("");
										$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_2").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_0_2").animate({top:'230px'},200,function(){
										$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_2_2").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
						else{
							if ($("#cell_0_2").attr("class") === "cell"){
								var number3 = +($("#cell_3_2").text());
								var number1 = +($("#cell_1_2").text());
								if (number3 === number1){
									$("#cell_1_2").animate({top:'335px'},200,function(){
										var number4 = number3 + number1;
										$("#cell_3_2").removeClass("n" + number3).text("");
										$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_2").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_1_2").animate({top:'230px'},200,function(){
										$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_2").addClass("n" + number1).text(number1);
									});
									
								}
							}
							else{
								var number3 = +($("#cell_3_2").text());
								var number1 = +($("#cell_1_2").text());
								var number0 = +($("#cell_0_2").text());
								if (number3 === number1){
									$("#cell_1_2").animate({top:"335px"},200);
									$("#cell_0_2").animate({top:"230px"},200,function(){
										var number4 = number3 + number1;
										$("#cell_3_2").removeClass("n" + number3).text("");
										$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_2").addClass("n" + number4).text(number4);
										$("#cell_2_2").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number1 === number0){
										$("#cell_1_2").animate({top:"230px"},100);
										$("#cell_0_2").animate({top:"230px"},200,function(){
											var number4 = number1 + number0;
											$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_1_2").animate({top:"230px"},100);
										$("#cell_0_2").animate({top:"125px"},100,function(){
											$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_2").addClass("n" + number1).text(number1);
											$("#cell_1_2").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
					}
					else{
						if ($("#cell_1_2").attr("class") === "cell"){
							if ($("#cell_0_2").attr("class") === "cell"){
								var number3 = +($("#cell_3_2").text());
								var number2 = +($("#cell_2_2").text());
								if (number3 === number2){
									$("#cell_2_2").animate({top:'335px'},300,function(){
										var number4 = number3 + number2;
										$("#cell_3_2").removeClass("n" + number3).text("");
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_2").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									
								}
							}
							else{
								var number3 = +($("#cell_3_2").text());
								var number2 = +($("#cell_2_2").text());
								var number0 = +($("#cell_0_2").text());
								if (number3 === number2){
									$("#cell_2_2").animate({top:"335px"},100);
									$("#cell_0_2").animate({top:"230px"},200,function(){
										var number4 = number0 + number1;
										$("#cell_3_2").removeClass("n" + number3).text("");
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_2").addClass("n" + number4).text(number4);
										$("#cell_2_2").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number2 === number0){
										$("#cell_0_2").animate({top:"230px"},200,function(){
											var number4 = number2 + number0;
											$("#cell_2_2").removeClass("n" + number2);
											$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_0_2").animate({top:"125px"},100,function(){
											$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_1_2").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
						else{
							if ($("#cell_0_2").attr("class") === "cell"){
								var number3 = +($("#cell_3_2").text());
								var number2 = +($("#cell_2_2").text());
								var number1 = +($("#cell_1_2").text());
								if (number3 === number2){
									$("#cell_2_2").animate({top:"335px"},100);
									$("#cell_1_2").animate({top:"230px"},100,function(){
										var number4 = number3 + number2;
										$("#cell_3_2").removeClass("n" + number3).text("");
										$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_2").addClass("n" + number4).text(number4);
										$("#cell_2_2").addClass("n" + number1).text(number1);
									});
									
								}
								else{
									if (number2 === number1){
										$("#cell_1_2").animate({top:"230px"},100,function(){
											var number4 = number2 + number1;
											$("#cell_2_2").removeClass("n" + number2);
											$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_2").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										
									}
								}
							}
							else{
								var number3 = +($("#cell_3_2").text());
								var number2 = +($("#cell_2_2").text());
								var number1 = +($("#cell_1_2").text());
								var number0 = +($("#cell_0_2").text());
								if (number3 === number2){
									if (number1 === number0){
										var number4 = number3 + number2;
										var number5 = number1 + number0;
										$("#cell_2_2").animate({top:"335px"},100);
										$("#cell_1_2").animate({top:"230px"},100);
										$("#cell_0_2").animate({top:"230px"},200,function(){
											$("#cell_3_2").removeClass("n" + number3).text("");
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_2").addClass("n" + number4).text(number4);
											$("#cell_2_2").addClass("n" + number5).text(number5);
										});
										
									}
									else{
										$("#cell_2_2").animate({top:"335px"},100);
										$("#cell_1_2").animate({top:"230px"},100);
										$("#cell_0_2").animate({top:"125px"},100,function(){
											var number4 = number3 + number2;
											$("#cell_3_2").removeClass("n" + number3).text("");
											$("#cell_2_2").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_2").addClass("n" + number4).text(number4);
											$("#cell_2_2").addClass("n" + number1).text(number1);
											$("#cell_1_2").addClass("n" + number0).text(number0);
										});
										
									}
								}
								else{
									if (number2 === number1){
										$("#cell_1_2").animate({top:"230px"},100);
										$("#cell_0_2").animate({top:"125px"},100,function(){
											var number4 = number2 + number1;
											$("#cell_2_2").removeClass("n" + number2).text("");
											$("#cell_1_2").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_2").addClass("n" + number4).text(number4);
											$("#cell_1_2").addClass("n" + number0).text(number0);
										});
										
									}
									else{
										if (number1 === number0){
											$("#cell_0_2").animate({top:"125px"},100,function(){
												var number4 = number1 + number0;
												$("#cell_1_2").removeClass("n" + number1).text("");
												$("#cell_0_2").attr("style","none").removeClass("n" + number0).text("");
												$("#cell_1_2").addClass("n" + number4).text(number4);
											});
											
										}
										else{
											
										}
									}
								}
							}
						}
					}
				}
				if ($("#cell_3_3").attr("class") === "cell"){
					if ($("#cell_2_3").attr("class") === "cell"){
						if($("#cell_1_3").attr("class") === "cell"){
							if ($("#cell_0_3").attr("class") === "cell") {
								
							}
							else{
								$("#cell_0_3").animate({top:'335px'},300,function(){
									var number0 = +($("#cell_0_3").text());
									$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
									$("#cell_3_3").addClass("n" + number0).text(number0);
								});
								
							}
						}
						else{
							if ($("#cell_0_3").attr("class") === "cell"){
								$("#cell_1_3").animate({top:'335px'},200,function(){
									var number1 = +($("#cell_1_3").text());
									$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
									$("#cell_3_3").addClass("n" + number1).text(number1);
								});
								
							}
							else{
								var number1 = +($("#cell_1_3").text());
								var number0 = +($("#cell_0_3").text());
								if (number1 === number0){
									$("#cell_1_3").animate({top:'335px'},200);
									$("#cell_0_3").animate({top:'335px'},300,function(){
										var number3 = number1 + number0;
										$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_3").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_1_3").animate({top:'335px'},200);
									$("#cell_0_3").animate({top:'230px'},200,function(){
										$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_3").addClass("n" + number1).text(number1);
										$("#cell_2_3").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
					}
					else{
						if ($("#cell_1_3").attr("class") === "cell"){
							if ($("#cell_0_3").attr("class") === "cell"){
								$("#cell_2_3").animate({top:'335px'},100,function(){
									var number2 = +($("#cell_2_3").text());
									$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
									$("#cell_3_3").addClass("n" + number2).text(number2);
								});
								
							}
							else{
								var number2 = +($("#cell_2_3").text());
								var number0 = +($("#cell_0_3").text());
								if (number2 === number0){
									$("#cell_2_3").animate({top:'335px'},100);
									$("#cell_0_3").animate({top:'335px'},300,function(){
										var number3 = number2 + number0;
										$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_3").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_2_3").animate({top:'335px'},100);
									$("#cell_0_3").animate({top:'230px'},200,function(){
										$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_3").addClass("n" + number2).text(number2);
										$("#cell_2_3").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
						else{
							if ($("#cell_0_3").attr("class") === "cell"){
								var number2 = +($("#cell_2_3").text());
								var number1 = +($("#cell_1_3").text());
								if (number2 === number1){
									$("#cell_2_3").animate({top:'335px'},100);
									$("#cell_1_3").animate({top:'335px'},200,function(){
										var number3 = number2 + number1;
										$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_3").addClass("n" + number3).text(number3);
									});
									
								}
								else{
									$("#cell_2_3").animate({top:'335px'},100);
									$("#cell_1_3").animate({top:'230px'},100,function(){
										$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_3").addClass("n" + number2).text(number2);
										$("#cell_2_3").addClass("n" + number1).text(number1);
									});
									
								}
							}
							else{
								var number2 = +($("#cell_2_3").text());
								var number1 = +($("#cell_1_3").text());
								var number0 = +($("#cell_0_3").text());
								if (number2 === number1){
									$("#cell_2_3").animate({top:"335px"},100);
									$("#cell_1_3").animate({top:"335px"},200);
									$("#cell_0_3").animate({top:"230px"},200,function(){
										var number3 = number2 + number1;
										$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_3").addClass("n" + number3).text(number3);
										$("#cell_2_3").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number1 === number0){
										$("#cell_2_3").animate({top:"335px"},100);
										$("#cell_1_3").animate({top:"230px"},100);
										$("#cell_0_3").animate({top:"230px"},200,function(){
											var number4 = number1 + number0;
											$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_3").addClass("n" + number2).text(number2);
											$("#cell_2_3").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_2_3").animate({top:"335px"},100);
										$("#cell_1_3").animate({top:"230px"},100);
										$("#cell_0_3").animate({top:"125px"},100,function(){
											$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_3").addClass("n" + number2).text(number2);
											$("#cell_2_3").addClass("n" + number1).text(number1);
											$("#cell_1_3").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
					}
				}
				else{
					if ($("#cell_2_3").attr("class") === "cell"){
						if ($("#cell_1_3").attr("class") === "cell"){
							if ($("#cell_0_3").attr("class") === "cell"){
								
							}
							else{
								var number3 = +($("#cell_3_3").text());
								var number0 = +($("#cell_0_3").text());
								if (number3 === number0){
									$("#cell_0_3").animate({top:'335px'},300,function(){
										var number4 = number0 + number3;
										$("#cell_3_3").removeClass("n" + number3).text("");
										$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_3").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_0_3").animate({top:'230px'},200,function(){
										$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_2_3").addClass("n" + number0).text(number0);
									});
									
								}
							}
						}
						else{
							if ($("#cell_0_3").attr("class") === "cell"){
								var number3 = +($("#cell_3_3").text());
								var number1 = +($("#cell_1_3").text());
								if (number3 === number1){
									$("#cell_1_3").animate({top:'335px'},200,function(){
										var number4 = number3 + number1;
										$("#cell_3_3").removeClass("n" + number3).text("");
										$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_3").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									$("#cell_1_3").animate({top:'230px'},200,function(){
										$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_2_3").addClass("n" + number1).text(number1);
									});
									
								}
							}
							else{
								var number3 = +($("#cell_3_3").text());
								var number1 = +($("#cell_1_3").text());
								var number0 = +($("#cell_0_3").text());
								if (number3 === number1){
									$("#cell_1_3").animate({top:"335px"},200);
									$("#cell_0_3").animate({top:"230px"},200,function(){
										var number4 = number3 + number1;
										$("#cell_3_3").removeClass("n" + number3).text("");
										$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_3").addClass("n" + number4).text(number4);
										$("#cell_2_3").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number1 === number0){
										$("#cell_1_3").animate({top:"230px"},100);
										$("#cell_0_3").animate({top:"230px"},200,function(){
											var number4 = number1 + number0;
											$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_3").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_1_3").animate({top:"230px"},100);
										$("#cell_0_3").animate({top:"125px"},100,function(){
											$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_3").addClass("n" + number1).text(number1);
											$("#cell_1_3").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
					}
					else{
						if ($("#cell_1_3").attr("class") === "cell"){
							if ($("#cell_0_3").attr("class") === "cell"){
								var number3 = +($("#cell_3_3").text());
								var number2 = +($("#cell_2_3").text());
								if (number3 === number2){
									$("#cell_2_3").animate({top:'335px'},300,function(){
										var number4 = number3 + number2;
										$("#cell_3_3").removeClass("n" + number3).text("");
										$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_3_3").addClass("n" + number4).text(number4);
									});
									
								}
								else{
									
								}
							}
							else{
								var number3 = +($("#cell_3_3").text());
								var number2 = +($("#cell_2_3").text());
								var number0 = +($("#cell_0_3").text());
								if (number3 === number2){
									$("#cell_2_3").animate({top:"335px"},100);
									$("#cell_0_3").animate({top:"230px"},200,function(){
										var number4 = number0 + number1;
										$("#cell_3_3").removeClass("n" + number3).text("");
										$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
										$("#cell_3_3").addClass("n" + number4).text(number4);
										$("#cell_2_3").addClass("n" + number0).text(number0);
									});
									
								}
								else{
									if (number2 === number0){
										$("#cell_0_3").animate({top:"230px"},200,function(){
											var number4 = number2 + number0;
											$("#cell_2_3").removeClass("n" + number2);
											$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_3").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										$("#cell_0_3").animate({top:"125px"},100,function(){
											$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_1_3").addClass("n" + number0).text(number0);
										});
										
									}
								}
							}
						}
						else{
							if ($("#cell_0_3").attr("class") === "cell"){
								var number3 = +($("#cell_3_3").text());
								var number2 = +($("#cell_2_3").text());
								var number1 = +($("#cell_1_3").text());
								if (number3 === number2){
									$("#cell_2_3").animate({top:"335px"},100);
									$("#cell_1_3").animate({top:"230px"},100,function(){
										var number4 = number3 + number2;
										$("#cell_3_3").removeClass("n" + number3).text("");
										$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
										$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
										$("#cell_3_3").addClass("n" + number4).text(number4);
										$("#cell_2_3").addClass("n" + number1).text(number1);
									});
									
								}
								else{
									if (number2 === number1){
										$("#cell_1_3").animate({top:"230px"},100,function(){
											var number4 = number2 + number1;
											$("#cell_2_3").removeClass("n" + number2);
											$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_2_3").addClass("n" + number4).text(number4);
										});
										
									}
									else{
										
									}
								}
							}
							else{
								var number3 = +($("#cell_3_3").text());
								var number2 = +($("#cell_2_3").text());
								var number1 = +($("#cell_1_3").text());
								var number0 = +($("#cell_0_3").text());
								if (number3 === number2){
									if (number1 === number0){
										var number4 = number3 + number2;
										var number5 = number1 + number0;
										$("#cell_2_3").animate({top:"335px"},100);
										$("#cell_1_3").animate({top:"230px"},100);
										$("#cell_0_3").animate({top:"230px"},200,function(){
											$("#cell_3_3").removeClass("n" + number3).text("");
											$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_3").addClass("n" + number4).text(number4);
											$("#cell_2_3").addClass("n" + number5).text(number5);
										});
										
									}
									else{
										$("#cell_2_3").animate({top:"335px"},100);
										$("#cell_1_3").animate({top:"230px"},100);
										$("#cell_0_3").animate({top:"125px"},100,function(){
											var number4 = number3 + number2;
											$("#cell_3_3").removeClass("n" + number3).text("");
											$("#cell_2_3").attr("style","none").removeClass("n" + number2).text("");
											$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_3_3").addClass("n" + number4).text(number4);
											$("#cell_2_3").addClass("n" + number1).text(number1);
											$("#cell_1_3").addClass("n" + number0).text(number0);
										});
										
									}
								}
								else{
									if (number2 === number1){
										$("#cell_1_3").animate({top:"230px"},100);
										$("#cell_0_3").animate({top:"125px"},100,function(){
											var number4 = number2 + number1;
											$("#cell_2_3").removeClass("n" + number2).text("");
											$("#cell_1_3").attr("style","none").removeClass("n" + number1).text("");
											$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
											$("#cell_2_3").addClass("n" + number4).text(number4);
											$("#cell_1_3").addClass("n" + number0).text(number0);
										});
										
									}
									else{
										if (number1 === number0){
											$("#cell_0_3").animate({top:"125px"},100,function(){
												var number4 = number1 + number0;
												$("#cell_1_3").removeClass("n" + number1).text("");
												$("#cell_0_3").attr("style","none").removeClass("n" + number0).text("");
												$("#cell_1_3").addClass("n" + number4).text(number4);
											});
											
										}
										else{
											
										}
									}
								}
							}
						}
					}
				}
			setTimeout(function(){
				if (game.isWin()){
					return
				}
				game.randomEmerge();
				game.isFail();
			},300)
		}
	}
}())
$("body").keydown(function(event){
	if (event.which === 38){
		game.upDown();
	}
	if (event.which === 40){
		game.DownDown()
	}
	if (event.which === 37){
		game.leftDown()
	}
	if (event.which === 39){
		game.rightDown()
	}
})
//game.beginGame()
>>>>>>> origin/master:summer/2048/js/2048旧.js

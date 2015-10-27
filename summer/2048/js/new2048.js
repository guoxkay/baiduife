var game = (function(){
	var number = Array(16);
	var l = localStorage;
	var maxScoer = l.getItem("maxScoer") || 0;
	var score = 0;
	var n0s,n1s,n2s,n3s,n4s,n5s,n6s,n7s,n8s,n9s,n10s,n11s,n12s,n13s,n14s,n15s;
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
		//各位置函数
		number0 : function(event){
			if (number[0] === undefined){
				return undefined
			}
			n0 = +number[0].text();
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
					if (n1s === undefined){
						if (n2s === undefined){
							if (n3s === undefined){
								number[0].animate({'left':'336px'},300,function(){
									$($("#cell_0").children()[0]).remove();
									number[3] = $($("#cell_3").prepend("<div>").children()[0]).addClass("num n" + n0).text(n0);
								});
								number[0] = undefined;
								n3s = n0;
								return undefined
							}
							else {
								if (n3s === n0){
									var n3 = n0 * 2;
									number[0].animate({'left':'336px'},300,function(){
										$($("#cell_0").children()[0]).remove();
										number[3].remove();
										number[3] = $($("#cell_3").prepend("<div>").children()[0]).addClass("num n" + n3).text(n3);
									});
									setTimeout(function(){
										number[3].addClass("big")
									},200);
									number[0] = undefined;
									n3s = 1;
									score += n3;
									return undefined
								}
								else {
									number[0].animate({'left':'231px'},200,function(){
										$($("#cell_0").children()[0]).remove();
										number[2] = $($("#cell_2").prepend("<div>").children()[0]).addClass("num n" + n0).text(n0);
									});
									number[0] = undefined;
									n2s = n0;
									return undefined
								}
							}
						}
						else {
							if (n2s === n0){
								var n2 = n0 * 2;
								number[0].animate({'left':'231px'},200,function(){
									$($("#cell_0").children()[0]).remove();
									number[2].remove();
									number[2] = $($("#cell_2").prepend("<div>").children()[0]).addClass("num n" + n2).text(n2);
								});
								setTimeout(function(){
									number[2].addClass("big")
								},100);
								number[0] = undefined;
								n2s = 1;
								score += n2;
								return undefined
							}
							else {
								number[0].animate({'left':'126px'},100,function(){
									$($("#cell_0").children()[0]).remove();
									number[1] = $($("#cell_1").prepend("<div>").children()[0]).addClass("num n" + n0).text(n0);
								});
								number[0] = undefined;
								n1s = n0;
								return undefined
							}
						}
					}
					else {
						if (n1s === n0){
							var n1 = n0 * 2;
							number[0].animate({'left':'126px'},100,function(){
								$($("#cell_0").children()[0]).remove();
								number[1].remove();
								number[1] = $($("#cell_1").prepend("<div>").children()[0]).addClass("num n" + n1).text(n1);
							});
							number[1].addClass("big");
							number[0] = undefined;
							n1s = 1;
							score += n1;
							return undefined
						}
						else {
							return number[0].text()
						}
					}
					break
				}
				case 40 : {//down
					if (n4s === undefined){
						if (n8s === undefined){
							if (n12s === undefined){
								number[0].animate({'top':'336px'},300,function(){
									$($("#cell_0").children()[0]).remove();
									number[12] = $($("#cell_12").prepend("<div>").children()[0]).addClass("num n" + n0).text(n0);
								});
								number[0] = undefined;
								n12s = n0;
								return undefined
							}
							else {
								if (n12s === n0){
									var n12 = n0 * 2;
									number[0].animate({'top':'336px'},300,function(){
										$($("#cell_0").children()[0]).remove();
										number[12].remove();
										number[12] = $($("#cell_12").prepend("<div>").children()[0]).addClass("num n" + n12).text(n12);
									});
									setTimeout(function(){
										number[12].addClass("big")
									},200);
									number[0] = undefined;
									n12s = 1;
									score += n12;
									return undefined
								}
								else {
									number[0].animate({'top':'231px'},200,function(){
										$($("#cell_0").children()[0]).remove();
										number[8] = $($("#cell_8").prepend("<div>").children()[0]).addClass("num n" + n0).text(n0);
									});
									number[0] = undefined;
									n8s = n0;
									return undefined
								}
							}
						}
						else {
							if (n8s === n0){
								var n8 = n0 * 2;
								number[0].animate({'top':'231px'},200,function(){
									$($("#cell_0").children()[0]).remove();
									number[8].remove();
									number[8] = $($("#cell_8").prepend("<div>").children()[0]).addClass("num n" + n8).text(n8);
								});
								setTimeout(function(){
									number[8].addClass("big")
								},100);
								number[0] = undefined;
								n8s = 1;
								score += n8;
								return undefined
							}
							else {
								number[0].animate({'top':'126px'},100,function(){
									$($("#cell_0").children()[0]).remove();
									number[4] = $($("#cell_4").prepend("<div>").children()[0]).addClass("num n" + n0).text(n0);
								});
								number[0] = undefined;
								n4s = n0;
								return undefined
							}
						}
					}
					else {
						if (n4s === n0){
							var n4 = n0 * 2;
							number[0].animate({'top':'126px'},100,function(){
								$($("#cell_0").children()[0]).remove();
								number[4].remove();
								number[4] = $($("#cell_4").prepend("<div>").children()[0]).addClass("num n" + n4).text(n4);
							});
							number[4].addClass("big");
							number[0] = undefined;
							n4s = 1;
							score += n4;
							return undefined
						}
						else {
							return number[0].text()
						}
					}
					break
				}
			}
		},
		number1 : function(event){
			if (number[1] === undefined){
				return undefined
			}
			var n1 = +number[1].text();
			switch (event.which){
				case 37 : {
					if (n0s === undefined){
						number[1].animate({'left':'21px'},100,function(){
							$($("#cell_1").children()[0]).remove();
							number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n1).text(n1);
						});
						number[1] = undefined;
						n0s = n1;
						return undefined
					}
					else {
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
							score += n0;
							return undefined
						}
						else {
							return +number[1].text()
						}
					}
					break
				}
				case 38 : {
					return +number[1].text()
				}
				case 39 : {
					if (n2s === undefined){
						if (n3s === undefined){
							number[1].animate({'left':'336px'},200,function(){
								$($("#cell_1").children()[0]).remove();
								number[3] = $($("#cell_3").prepend("<div>").children()[0]).addClass("num n" + n1).text(n1);
							});
							number[1] = undefined;
							n3s = n1;
							return undefined
						}
						else {
							if (n3s === n1){
								n3 = n1 * 2;
								number[1].animate({'left':'336px'},200,function(){
									$($("#cell_1").children()[0]).remove();
									number[3].remove;
									number[3] = $($("#cell_3").prepend("<div>").children()[0]).addClass("num n" + n1).text(n1);
								})
								setTimeout(function(){
									number[3].addClass("big")
								},100);
								number[1] = undefined;
								n3s = 1;
								score += n3;
								return undefined
							}
							else {
								number[1].animate({'left':'231px'},100,function(){
									$($("#cell_1").children()[0]).remove();
									number[2] = $($("#cell_2").prepend("<div>").children()[0]).addClass("num n" + n1).text(n1);
								});
								number[1] = undefined;
								n2s = n1;
								return undefined
							}
						}
					}
					else {
						if (n2s === n1){
							var n2 = n1 * 2;
							number[2].addClass("big");
							number[1].animate({'left':'231px'},100,function(){
								$($("#cell_1").children()[0]).remove();
								number[2] = $($("#cell_2").prepend("<div>").children()[0]).addClass("num n" + n2).text(n2);
							});
							number[1] = undefined;
							n2s = 1;
							score += n2;
							return undefined
						}
						else {
							return +number[1].text()
						}
					}
					break
				}
				case 40 : {
					if (n5s === undefined){
						if (n9s === undefined){
							if (n13s === undefined){
								number[1].animate({'top':'336px'},300,function(){
									$($("#cell_1").children()[0]).remove();
									number[13] = $($("#cell_13").prepend("<div>").children()[0]).addClass("num n" + n1).text(n1);
								});
								number[1] = undefined;
								n13s = n1;
								return undefined
							}
							else {
								if (n13s === n1){
									var n13 = n1 * 2;
									number[1].animate({'top':'336px'},300,function(){
										$($("#cell_1").children()[0]).remove();
										number[13].remove();
										number[13] = $($("#cell_13").prepend("<div>").children()[0]).addClass("num n" + n13).text(n13);
									});
									setTimeout(function(){
										number[13].addClass("big")
									},200);
									number[1] = undefined;
									n13s = 1;
									score += n13;
									return undefined
								}
								else {
									number[1].animate({'top':'231px'},200,function(){
										$($("#cell_1").children()[0]).remove();
										number[9] = $($("#cell_9").prepend("<div>").children()[0]).addClass("num n" + n1).text(n1);
									});
									number[1] = undefined;
									n9s = n1;
									return undefined
								}
							}
						}
						else {
							if (n9s === n1){
								var n9 = n1 * 2;
								number[1].animate({'top':'231px'},200,function(){
									$($("#cell_1").children()[0]).remove();
									number[9].remove();
									number[9] = $($("#cell_9").prepend("<div>").children()[0]).addClass("num n" + n9).text(n9);
								});
								setTimeout(function(){
									number[9].addClass("big")
								},100);
								number[1] = undefined;
								n9s = 1;
								score += n9;
								return undefined
							}
							else {
								number[1].animate({'top':'126px'},100,function(){
									$($("#cell_1").children()[0]).remove();
									number[5] = $($("#cell_5").prepend("<div>").children()[0]).addClass("num n" + n1).text(n1);
								});
								number[1] = undefined;
								n5s = n1;
								return undefined
							}
						}
					}
					else {
						if (n5s === n1){
							var n5 = n1 * 2;
							number[1].animate({'top':'126px'},100,function(){
								$($("#cell_1").children()[0]).remove();
								number[5].remove();
								number[5] = $($("#cell_5").prepend("<div>").children()[0]).addClass("num n" + n5).text(n5);
							});
							number[5].addClass("big");
							number[1] = undefined;
							n5s = 1;
							score += n5;
							return undefined
						}
						else {
							return number[1].text()
						}
					}
					break
				}
			}
		},
		number2 : function(event){
			if (number[2] === undefined){
				return undefined
			}
			var n2 = +number[2].text();
			switch (event.which){
				case 37 : {
					if (n1s === undefined){
						if (n0s === undefined){
							number[2].animate({'left':'21px'},200,function(){
								$($("#cell_2").children()[0]).remove();
								number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n2).text(n2);
							});
							number[2] = undefined;
							n0s = n2;
							return undefined
						}
						else {
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
								score += n0;
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
						if (n1s === n2){
							var n1 = n2 * 2;
							number[1].addClass("big");
							number[2].animate({'left':'126px'},100,function(){
								$($("#cell_2").children()[0]).remove();
								number[1] = $($("#cell_1").prepend("<div>").children()[0]).addClass("num n" + n1).text(n1);
							});
							number[2] = undefined;
							n1s = 1;
							score += n1;
							return undefined
						}
						else {
							return +number[2].text()
						}
					}
					break
				}
				case 38 : {
					return +number[2].text()
				}
				case 39 : {
					if (n3s === undefined){
						number[2].animate({'left':'336px'},100,function(){
							$($("#cell_2").children()[0]).remove();
							number[3] = $($("#cell_3").prepend("<div>").children()[0]).addClass("num n" + n2).text(n2);
						});
						number[2] = undefined;
						n3s = n2;
						return undefined
					}
					else {
						if (n3s === n2){
							var n3 = n2 * 2;
							number[3].addClass("big");
							number[2].animate({'left':'336px'},100,function(){
								$($("#cell_2").children()[0]).remove();
								number[3].remove();
								number[3] = $($("#cell_3").prepend("<div>").children()[0]).addClass("num n" + n3).text(n3);
							});
							number[2] = undefined;
							n3s = 1;//状态码1代表非空但是已经合并后的状态
							score += n3;
							return undefined
						}
						else {
							return +number[2].text()
						}
					}
					break
				}
				case 40 : {
					if (n6s === undefined){
						if (n10s === undefined){
							if (n14s === undefined){
								number[2].animate({'top':'336px'},300,function(){
									$($("#cell_2").children()[0]).remove();
									number[14] = $($("#cell_14").prepend("<div>").children()[0]).addClass("num n" + n2).text(n2);
								});
								number[2] = undefined;
								n14s = n2;
								return undefined
							}
							else {
								if (n14s === n2){
									var n14 = n2 * 2;
									number[2].animate({'top':'336px'},300,function(){
										$($("#cell_2").children()[0]).remove();
										number[14].remove();
										number[14] = $($("#cell_14").prepend("<div>").children()[0]).addClass("num n" + n14).text(n14);
									});
									setTimeout(function(){
										number[14].addClass("big")
									},200);
									number[2] = undefined;
									n14s = 1;
									score += n14;
									return undefined
								}
								else {
									number[2].animate({'top':'231px'},200,function(){
										$($("#cell_2").children()[0]).remove();
										number[10] = $($("#cell_10").prepend("<div>").children()[0]).addClass("num n" + n2).text(n2);
									});
									number[2] = undefined;
									n10s = n2;
									return undefined
								}
							}
						}
						else {
							if (n10s === n2){
								var n10 = n2 * 2;
								number[2].animate({'top':'231px'},200,function(){
									$($("#cell_2").children()[0]).remove();
									number[10].remove();
									number[10] = $($("#cell_10").prepend("<div>").children()[0]).addClass("num n" + n10).text(n10);
								});
								setTimeout(function(){
									number[10].addClass("big")
								},100);
								number[2] = undefined;
								n10s = 1;
								score += n10;
								return undefined
							}
							else {
								number[2].animate({'top':'126px'},100,function(){
									$($("#cell_2").children()[0]).remove();
									number[6] = $($("#cell_6").prepend("<div>").children()[0]).addClass("num n" + n2).text(n2);
								});
								number[2] = undefined;
								n6s = n2;
								return undefined
							}
						}
					}
					else {
						if (n6s === n2){
							var n6 = n2 * 2;
							number[2].animate({'top':'126px'},100,function(){
								$($("#cell_2").children()[0]).remove();
								number[6].remove();
								number[6] = $($("#cell_6").prepend("<div>").children()[0]).addClass("num n" + n6).text(n6);
							});
							number[6].addClass("big");
							number[2] = undefined;
							n6s = 1;
							score += n6;
							return undefined
						}
						else {
							return number[2].text()
						}
					}
					break
				}
			}
		},
		number3 : function(event){
			if (number[3] === undefined){
				return undefined
			}
			var n3 = +number[3].text();
			switch (event.which){
				case 37 : {
					if (n2s === undefined){
						if (n1s === undefined){
							if (n0s === undefined){
								number[3].animate({'left':'21px'},300,function(){
									$($("#cell_3").children()[0]).remove();
									number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n3).text(n3);
								});
								number[3] = undefined;
								n0s = n3;
								return undefined
							}
							else {
								if (n0s === n3){
									var n0 = n3 * 2;
									number[3].animate({'left':'21px'},300,function(){
										$($("#cell_3").children()[0]).remove();
										number[0].remove();
										number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n0).text(n0);
									});
									setTimeout(function(){
										number[0].addClass("big")
									},200);
									number[3] = undefined;
									n0s = 1;
									score += n0;
									return undefined
								}
								else {
									number[3].animate({'left':'126px'},200,function(){
										$($("#cell_3").children()[0]).remove();
										number[1] = $($("#cell_1").prepend("<div>").children()[0]).addClass("num n" + n3).text(n3);
									});
									number[3] = undefined;
									n1s = n3;
									return undefined
								}
							}
						}
						else {
							if (n1s === n3){
								var n1 = n3 * 2;
								number[3].animate({'left':'126px'},200,function(){
									$($("#cell_3").children()[0]).remove();
									number[1].remove();
									number[1] = $($("#cell_1").prepend("<div>").children()[0]).addClass("num n" + n1).text(n1);
								});
								setTimeout(function(){
									number[1].addClass("big")
								},100);
								number[3] = undefined;
								n1s = 1;
								score += n1;
								return undefined
							}
							else {
								number[3].animate({'left':'231px'},100,function(){
									$($("#cell_3").children()[0]).remove();
									number[2] = $($("#cell_2").prepend("<div>").children()[0]).addClass("num n" + n3).text(n3);
								});
								number[3] = undefined;
								n2s = n3;
								return undefined
							}
						}
					}
					else {
						if (n2s === n3){
							var n2 = n3 * 2;
							number[3].animate({'left':'231px'},100,function(){
								$($("#cell_3").children()[0]).remove();
								number[2].remove();
								number[2] = $($("#cell_2").prepend("<div>").children()[0]).addClass("num n" + n2).text(n2);
							});
							number[2].addClass("big");
							number[3] = undefined;
							n2s = 1;
							score += n2;
							return undefined
						}
						else {
							return number[3].text()
						}
					}
					break
				}
				case 38 : {
					return +number[3].text()
				}
				case 39 : {
					return +number[3].text()
				}
				case 40 : {
					if (n7s === undefined){
						if (n11s === undefined){
							if (n15s === undefined){
								number[3].animate({'top':'336px'},300,function(){
									$($("#cell_3").children()[0]).remove();
									number[15] = $($("#cell_15").prepend("<div>").children()[0]).addClass("num n" + n3).text(n3);
								});
								number[3] = undefined;
								n15s = n3;
								return undefined
							}
							else {
								if (n15s === n3){
									var n15 = n3 * 2;
									number[3].animate({'top':'336px'},300,function(){
										$($("#cell_3").children()[0]).remove();
										number[15].remove();
										number[15] = $($("#cell_15").prepend("<div>").children()[0]).addClass("num n" + n15).text(n15);
									});
									setTimeout(function(){
										number[15].addClass("big")
									},200);
									number[3] = undefined;
									n15s = 1;
									score += n15;
									return undefined
								}
								else {
									number[3].animate({'top':'231px'},200,function(){
										$($("#cell_3").children()[0]).remove();
										number[11] = $($("#cell_11").prepend("<div>").children()[0]).addClass("num n" + n3).text(n3);
									});
									number[3] = undefined;
									n11s = n3;
									return undefined
								}
							}
						}
						else {
							if (n11s === n3){
								var n11 = n3 * 2;
								number[3].animate({'top':'231px'},200,function(){
									$($("#cell_3").children()[0]).remove();
									number[11].remove();
									number[11] = $($("#cell_11").prepend("<div>").children()[0]).addClass("num n" + n11).text(n11);
								});
								setTimeout(function(){
									number[11].addClass("big")
								},100);
								number[3] = undefined;
								n11s = 1;
								score += n11;
								return undefined
							}
							else {
								number[3].animate({'top':'126px'},100,function(){
									$($("#cell_3").children()[0]).remove();
									number[7] = $($("#cell_7").prepend("<div>").children()[0]).addClass("num n" + n3).text(n3);
								});
								number[3] = undefined;
								n7s = n3;
								return undefined
							}
						}
					}
					else {
						if (n7s === n3){
							var n7 = n3 * 2;
							number[3].animate({'top':'126px'},100,function(){
								$($("#cell_3").children()[0]).remove();
								number[7].remove();
								number[7] = $($("#cell_7").prepend("<div>").children()[0]).addClass("num n" + n7).text(n7);
							});
							number[7].addClass("big");
							number[3] = undefined;
							n7s = 1;
							score += n7;
							return undefined
						}
						else {
							return number[3].text()
						}
					}
					break
				}
			}
		},
/*		left : function(a){
			n0s = game.number0(a);
			n1s = game.number1(a);
			n2s = game.number2(a);
			game.number3(a)
		}*/
	}



}())
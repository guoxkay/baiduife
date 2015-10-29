var game = (function(){
	var number = Array(16);
	var l = localStorage;
	var maxScore = l.getItem("maxScore") || 0;
	var score = 0;
	var ns = Array(16);
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
		threeCell : function(n,a,b,c,dire,pos){
			var val = +number[n].text();
			if (ns[a] === undefined){
				if (ns[b] === undefined){
					if (ns[c] === undefined){
						number[n].animate({dire:pos[2]},300,function(){
							$($("#cell_" + n).children()[0]).remove();
							number[c] = $($("#cell_" + c).prepend("<div>").children()[0]).addClass("num n" + val).text(val);
						});
						number[n] = undefined;
						ns[c] = val;
						return undefined
					}
					else {
						if (ns[c] === val){
							var valc = val * 2;
							number[n].animate({dire:pos[2]},300,function(){
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
							return undefined
						}
						else {
							number[n].animate({dire:pos[1]},200,function(){
								$($("#cell_" + n).children()[0]).remove();
								number[b] = $($("#cell_" + b).prepend("<div>").children()[0]).addClass("num n" + val).text(val);
							});
							number[n] = undefined;
							ns[b] = val;
							return undefined
						}
					}
				}
				else {
					if (ns[b] === n3){
						var valb = val * 2;
						number[n].animate({dire:pos[1]},200,function(){
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
						return undefined
					}
					else {
						number[n].animate({dire:pos[0]},100,function(){
							$($("#cell_" + n).children()[0]).remove();
							number[a] = $($("#cell_" + a).prepend("<div>").children()[0]).addClass("num n" + val).text(val);
						});
						number[n] = undefined;
						ns[a] = val;
						return undefined
					}
				}
			}
			else {
				if (ns[a] === val){
					var vala = val * 2;
					number[n].animate({dire:pos[0]},100,function(){
						$($("#cell_" + n).children()[0]).remove();
						number[a].remove();
						number[a] = $($("#cell_" + a).prepend("<div>").children()[0]).addClass("num n" + vala).text(vala);
					});
					number[a].addClass("big");
					number[n] = undefined;
					ns[a] = 1;
					score += vala;
					return undefined
				}
				else {
					return number[n].text()
				}
			}
		},
		twoCell : function(n,a,b,dire,pos){
			var val = +number[n].text();
			if (ns[a] === undefined){
				if (ns[b] === undefined){
					number[n].animate({dire:pos[1]},200,function(){
						$($("#cell_" + n).children()[0]).remove();
						number[b] = $($("#cell_" + b).prepend("<div>").children()[0]).addClass("num n" + val).text(val);
					});
					number[n] = undefined;
					ns[b] = val;
					return undefined
				}
				else {
					if (ns[b] === val){
						var valb = val * 2;
						number[n].animate({dire:pos[1]},200,function(){
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
						return undefined
					}
					else {
						number[n].animate({dire:pos[0]},100,function(){
							$($("#cell_" + n).children()[0]).remove();
							number[a] = $($("#cell_" + a).prepend("<div>").children()[0]).addClass("num n" + val).text(val);
						});
						number[n] = undefined;
						ns[a] = val;
						return undefined
					}
				}
			}
			else {
				if (ns[a] === val){
					var vala = val * 2;
					number[a].addClass("big");
					number[n].animate({dire:pos[0]},100,function(){
						$($("#cell_" + n).children()[0]).remove();
						number[a].remove();
						number[a] = $($("#cell_" + a).prepend("<div>").children()[0]).addClass("num n" + vala).text(vala);
					});
					number[n] = undefined;
					ns[a] = 1;
					score += vala;
					return undefined
				}
				else {
					return +number[n].text()
				}
			}
		},
		oneCell : function(n,a,dire,pos){
			var val = number[n].text();
			if (ns[a] === undefined){
				number[n].animate({dire:pos[0]},100,function(){
					$($("#cell_" + n).children()[0]).remove();
					number[a] = $($("#cell_0" + a).prepend("<div>").children()[0]).addClass("num n" + val).text(val);
				});
				number[n] = undefined;
				ns[a] = n1;
				return undefined
			}
			else {
				if (ns[a] === val){
					var vala = val * 2;
					number[a].addClass("big");
					number[n].animate({dire:pos[0]},100,function(){
						$($("#cell_" + n).children()[0]).remove();
						number[a].remove();
						number[a] = $($("#cell_" + a).prepend("<div>").children()[0]).addClass("num n" + vala).text(vala);
					});
					number[n] = undefined;
					ns[a] = 1;//状态码1代表非空但是已经合并后的状态
					score += vala;
					return undefined
				}
				else {
					return +number[n].text()
				}
			}
		},
		zeroCell : function(n){
			return +number[n].text
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
					return +number[1].text();
					break
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
								var n3 = n1 * 2;
								number[1].animate({'left':'336px'},200,function(){
									$($("#cell_1").children()[0]).remove();
									number[3].remove();
									number[3] = $($("#cell_3").prepend("<div>").children()[0]).addClass("num n" + n3).text(n3);
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
								number[2].remove();
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
								var n0 = n2 * 2;
								number[2].animate({'left':'21px'},200,function(){
									$($("#cell_2").children()[0]).remove();
									number[0].remove();
									number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n0).text(n0);
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
								number[1].remove();
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
					return +number[2].text();
					break
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
					break
				}
				case 39 : {
					return +number[3].text()
					break
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
		number4 : function(event){
			if (number[4] === undefined){
				return undefined
			}
			var n4 = +number[4].text();
			switch (event.which){
				case 37 : {
					return +number[4].text();
					break
				}
				case 38 : {
					if (n0s === undefined){
						number[4].animate({'top':'21px'},100,function(){
							$($("#cell_4").children()[0]).remove();
							number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n4).text(n4);
						});
						number[4] = undefined;
						n0s = n4;
						return undefined
					}
					else {
						if (n0s === n4){
							var n0 = n4 * 2;
							number[0].addClass("big");
							number[4].animate({'top':'21px'},100,function(){
								$($("#cell_4").children()[0]).remove();
								number[0].remove();
								number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n0).text(n0);
							});
							number[4] = undefined;
							n0s = 1;//状态码1代表非空但是已经合并后的状态
							score += n0;
							return undefined
						}
						else {
							return +number[4].text()
						}
					}
					break
				}
				case 39 : {
					if (n5s === undefined){
						if (n6s === undefined){
							if (n7s === undefined){
								number[4].animate({'left':'336px'},300,function(){
									$($("#cell_4").children()[0]).remove();
									number[7] = $($("#cell_7").prepend("<div>").children()[0]).addClass("num n" + n4).text(n4);
								});
								number[4] = undefined;
								n7s = n4;
								return undefined
							}
							else {
								if (n7s === n4){
									var n7 = n4 * 2;
									number[4].animate({'left':'336px'},300,function(){
										$($("#cell_4").children()[0]).remove();
										number[7].remove();
										number[7] = $($("#cell_7").prepend("<div>").children()[0]).addClass("num n" + n7).text(n7);
									});
									setTimeout(function(){
										number[7].addClass("big")
									},200);
									number[4] = undefined;
									n7s = 1;
									score += n7;
									return undefined
								}
								else {
									number[4].animate({'left':'231px'},200,function(){
										$($("#cell_4").children()[0]).remove();
										number[6] = $($("#cell_6").prepend("<div>").children()[0]).addClass("num n" + n4).text(n4);
									});
									number[4] = undefined;
									n6s = n4;
									return undefined
								}
							}
						}
						else {
							if (n6s === n4){
								var n6 = n4 * 2;
								number[4].animate({'left':'231px'},200,function(){
									$($("#cell_4").children()[0]).remove();
									number[6].remove();
									number[6] = $($("#cell_6").prepend("<div>").children()[0]).addClass("num n" + n6).text(n6);
								});
								setTimeout(function(){
									number[6].addClass("big")
								},100);
								number[4] = undefined;
								n6s = 1;
								score += n6;
								return undefined
							}
							else {
								number[4].animate({'left':'126px'},100,function(){
									$($("#cell_4").children()[0]).remove();
									number[5] = $($("#cell_5").prepend("<div>").children()[0]).addClass("num n" + n4).text(n4);
								});
								number[4] = undefined;
								n5s = n4;
								return undefined
							}
						}
					}
					else {
						if (n5s === n4){
							var n5 = n4 * 2;
							number[4].animate({'left':'126px'},100,function(){
								$($("#cell_4").children()[0]).remove();
								number[5].remove();
								number[5] = $($("#cell_5").prepend("<div>").children()[0]).addClass("num n" + n5).text(n5);
							});
							number[5].addClass("big");
							number[4] = undefined;
							n5s = 1;
							score += n5;
							return undefined
						}
						else {
							return number[4].text()
						}
					}
					break
				}
				case 40 : {
					if (n8s === undefined){
						if (n12s === undefined){
							number[4].animate({'top':'336px'},200,function(){
								$($("#cell_4").children()[0]).remove();
								number[12] = $($("#cell_12").prepend("<div>").children()[0]).addClass("num n" + n4).text(n4);
							});
							number[4] = undefined;
							n12s = n4;
							return undefined
						}
						else {
							if (n12s === n4){
								var n12 = n4 * 2;
								number[4].animate({'top':'336px'},200,function(){
									$($("#cell_4").children()[0]).remove();
									number[12].remove();
									number[12] = $($("#cell_12").prepend("<div>").children()[0]).addClass("num n" + n12).text(n12);
								})
								setTimeout(function(){
									number[12].addClass("big")
								},100);
								number[4] = undefined;
								n12s = 1;
								score += n12;
								return undefined
							}
							else {
								number[4].animate({'top':'231px'},100,function(){
									$($("#cell_4").children()[0]).remove();
									number[8] = $($("#cell_8").prepend("<div>").children()[0]).addClass("num n" + n4).text(n4);
								});
								number[4] = undefined;
								n8s = n4;
								return undefined
							}
						}
					}
					else {
						if (n8s === n4){
							var n8 = n4 * 2;
							number[8].addClass("big");
							number[4].animate({'top':'231px'},100,function(){
								$($("#cell_4").children()[0]).remove();
								number[8].remove();
								number[8] = $($("#cell_8").prepend("<div>").children()[0]).addClass("num n" + n8).text(n8);
							});
							number[4] = undefined;
							n8s = 1;
							score += n8;
							return undefined
						}
						else {
							return +number[4].text()
						}
					}
					break
				}
			}
		},
		number5 : function(event){
			if (number[5] === undefined){
				return undefined
			}
			var n5 = +number[5].text();
			switch (event.which){
				case 37 : {
					if (n4s === undefined){
						number[5].animate({'left':'21px'},100,function(){
							$($("#cell_5").children()[0]).remove();
							number[4] = $($("#cell_4").prepend("<div>").children()[0]).addClass("num n" + n5).text(n5);
						});
						number[5] = undefined;
						n4s = n5;
						return undefined
					}
					else {
						if (n4s === n5){
							var n4 = n5 * 2;
							number[4].addClass("big");
							number[5].animate({'left':'21px'},100,function(){
								$($("#cell_5").children()[0]).remove();
								number[4].remove();
								number[4] = $($("#cell_4").prepend("<div>").children()[0]).addClass("num n" + n4).text(n4);
							});
							number[5] = undefined;
							n4s = 1;//状态码1代表非空但是已经合并后的状态
							score += n4;
							return undefined
						}
						else {
							return +number[5].text()
						}
					}
					break
				}
				case 38 : {
					if (n1s === undefined){
						number[5].animate({'top':'21px'},100,function(){
							$($("#cell_5").children()[0]).remove();
							number[1] = $($("#cell_1").prepend("<div>").children()[0]).addClass("num n" + n5).text(n5);
						});
						number[5] = undefined;
						n1s = n5;
						return undefined
					}
					else {
						if (n1s === n5){
							var n1 = n5 * 2;
							number[1].addClass("big");
							number[5].animate({'top':'21px'},100,function(){
								$($("#cell_5").children()[0]).remove();
								number[1].remove();
								number[1] = $($("#cell_1").prepend("<div>").children()[0]).addClass("num n" + n1).text(n1);
							});
							number[5] = undefined;
							n1s = 1;//状态码1代表非空但是已经合并后的状态
							score += n1;
							return undefined
						}
						else {
							return +number[5].text()
						}
					}
					break
				}
				case 39 : {
					if (n6s === undefined){
						if (n7s === undefined){
							number[5].animate({'left':'336px'},200,function(){
								$($("#cell_5").children()[0]).remove();
								number[7] = $($("#cell_7").prepend("<div>").children()[0]).addClass("num n" + n5).text(n5);
							});
							number[5] = undefined;
							n7s = n5;
							return undefined
						}
						else {
							if (n7s === n5){
								var n7 = n5 * 2;
								number[5].animate({'left':'336px'},200,function(){
									$($("#cell_5").children()[0]).remove();
									number[7].remove();
									number[7] = $($("#cell_7").prepend("<div>").children()[0]).addClass("num n" + n7).text(n7);
								})
								setTimeout(function(){
									number[7].addClass("big")
								},100);
								number[5] = undefined;
								n7s = 1;
								score += n7;
								return undefined
							}
							else {
								number[5].animate({'left':'231px'},100,function(){
									$($("#cell_5").children()[0]).remove();
									number[6] = $($("#cell_6").prepend("<div>").children()[0]).addClass("num n" + n5).text(n5);
								});
								number[5] = undefined;
								n6s = n5;
								return undefined
							}
						}
					}
					else {
						if (n6s === n5){
							var n6 = n5 * 2;
							number[6].addClass("big");
							number[5].animate({'left':'231px'},100,function(){
								$($("#cell_5").children()[0]).remove();
								number[6].remove();
								number[6] = $($("#cell_6").prepend("<div>").children()[0]).addClass("num n" + n6).text(n6);
							});
							number[5] = undefined;
							n6s = 1;
							score += n6;
							return undefined
						}
						else {
							return +number[5].text()
						}
					}
					break
				}
				case 40 : {
					if (n9s === undefined){
						if (n13s === undefined){
							number[5].animate({'top':'336px'},200,function(){
								$($("#cell_5").children()[0]).remove();
								number[13] = $($("#cell_13").prepend("<div>").children()[0]).addClass("num n" + n5).text(n5);
							});
							number[5] = undefined;
							n13s = n5;
							return undefined
						}
						else {
							if (n13s === n5){
								var n13 = n5 * 2;
								number[5].animate({'top':'336px'},200,function(){
									$($("#cell_5").children()[0]).remove();
									number[13].remove();
									number[13] = $($("#cell_13").prepend("<div>").children()[0]).addClass("num n" + n13).text(n13);
								})
								setTimeout(function(){
									number[13].addClass("big")
								},100);
								number[5] = undefined;
								n13s = 1;
								score += n13;
								return undefined
							}
							else {
								number[5].animate({'top':'231px'},100,function(){
									$($("#cell_5").children()[0]).remove();
									number[9] = $($("#cell_9").prepend("<div>").children()[0]).addClass("num n" + n5).text(n5);
								});
								number[5] = undefined;
								n9s = n5;
								return undefined
							}
						}
					}
					else {
						if (n9s === n5){
							var n9 = n5 * 2;
							number[9].addClass("big");
							number[5].animate({'top':'231px'},100,function(){
								$($("#cell_5").children()[0]).remove();
								number[9].remove();
								number[9] = $($("#cell_9").prepend("<div>").children()[0]).addClass("num n" + n9).text(n9);
							});
							number[5] = undefined;
							n9s = 1;
							score += n9;
							return undefined
						}
						else {
							return +number[5].text()
						}
					}
					break
				}
			}
		},
		number6 : function(event){
			if (number[6] === undefined){
				return undefined
			}
			var n6 = +number[6].text();
			switch (event.which){
				case 37 : {
					if (n5s === undefined){
						if (n4s === undefined){
							number[6].animate({'left':'21px'},200,function(){
								$($("#cell_6").children()[0]).remove();
								number[4] = $($("#cell_4").prepend("<div>").children()[0]).addClass("num n" + n6).text(n6);
							});
							number[6] = undefined;
							n4s = n6;
							return undefined
						}
						else {
							if (n4s === n6){
								var n4 = n6 * 2;
								number[6].animate({'left':'21px'},200,function(){
									$($("#cell_6").children()[0]).remove();
									number[4].remove();
									number[4] = $($("#cell_4").prepend("<div>").children()[0]).addClass("num n" + n4).text(n4);
								})
								setTimeout(function(){
									number[4].addClass("big")
								},100);
								number[6] = undefined;
								n4s = 1;
								score += n4;
								return undefined
							}
							else {
								number[6].animate({'left':'126px'},100,function(){
									$($("#cell_6").children()[0]).remove();
									number[5] = $($("#cell_5").prepend("<div>").children()[0]).addClass("num n" + n6).text(n6);
								});
								number[6] = undefined;
								n5s = n6;
								return undefined
							}
						}
					}
					else {
						if (n5s === n6){
							var n5 = n6 * 2;
							number[5].addClass("big");
							number[6].animate({'left':'126px'},100,function(){
								$($("#cell_6").children()[0]).remove();
								number[5].remove();
								number[5] = $($("#cell_5").prepend("<div>").children()[0]).addClass("num n" + n5).text(n5);
							});
							number[6] = undefined;
							n5s = 1;
							score += n5;
							return undefined
						}
						else {
							return +number[6].text()
						}
					}
					break
				}
				case 38 : {
					if (n2s === undefined){
						number[6].animate({'top':'21px'},100,function(){
							$($("#cell_6").children()[0]).remove();
							number[2] = $($("#cell_2").prepend("<div>").children()[0]).addClass("num n" + n6).text(n6);
						});
						number[6] = undefined;
						n2s = n6;
						return undefined
					}
					else {
						if (n2s === n6){
							var n2 = n6 * 2;
							number[2].addClass("big");
							number[6].animate({'top':'21px'},100,function(){
								$($("#cell_6").children()[0]).remove();
								number[2].remove();
								number[2] = $($("#cell_2").prepend("<div>").children()[0]).addClass("num n" + n2).text(n2);
							});
							number[6] = undefined;
							n2s = 1;//状态码1代表非空但是已经合并后的状态
							score += n2;
							return undefined
						}
						else {
							return +number[6].text()
						}
					}
					break
				}
				case 39 : {
					if (n7s === undefined){
						number[6].animate({'left':'336px'},100,function(){
							$($("#cell_6").children()[0]).remove();
							number[7] = $($("#cell_7").prepend("<div>").children()[0]).addClass("num n" + n6).text(n6);
						});
						number[6] = undefined;
						n7s = n6;
						return undefined
					}
					else {
						if (n7s === n6){
							var n7 = n6 * 2;
							number[7].addClass("big");
							number[6].animate({'left':'336px'},100,function(){
								$($("#cell_6").children()[0]).remove();
								number[7].remove();
								number[7] = $($("#cell_7").prepend("<div>").children()[0]).addClass("num n" + n7).text(n7);
							});
							number[6] = undefined;
							n7s = 1;//状态码1代表非空但是已经合并后的状态
							score += n7;
							return undefined
						}
						else {
							return +number[6].text()
						}
					}
					break
				}
				case 40 : {
					if (n10s === undefined){
						if (n14s === undefined){
							number[6].animate({'top':'336px'},200,function(){
								$($("#cell_6").children()[0]).remove();
								number[14] = $($("#cell_14").prepend("<div>").children()[0]).addClass("num n" + n6).text(n6);
							});
							number[6] = undefined;
							n14s = n6;
							return undefined
						}
						else {
							if (n14s === n6){
								var n14 = n6 * 2;
								number[6].animate({'top':'336px'},200,function(){
									$($("#cell_6").children()[0]).remove();
									number[14].remove();
									number[14] = $($("#cell_14").prepend("<div>").children()[0]).addClass("num n" + n14).text(n14);
								})
								setTimeout(function(){
									number[14].addClass("big")
								},100);
								number[6] = undefined;
								n14s = 1;
								score += n14;
								return undefined
							}
							else {
								number[6].animate({'top':'231px'},100,function(){
									$($("#cell_6").children()[0]).remove();
									number[10] = $($("#cell_10").prepend("<div>").children()[0]).addClass("num n" + n6).text(n6);
								});
								number[6] = undefined;
								n10s = n6;
								return undefined
							}
						}
					}
					else {
						if (n10s === n6){
							var n10 = n6 * 2;
							number[10].addClass("big");
							number[6].animate({'top':'231px'},100,function(){
								$($("#cell_6").children()[0]).remove();
								number[10].remove();
								number[10] = $($("#cell_10").prepend("<div>").children()[0]).addClass("num n" + n10).text(n10);
							});
							number[6] = undefined;
							n10s = 1;
							score += n10;
							return undefined
						}
						else {
							return +number[6].text()
						}
					}
					break
				}
			}
		},
		number7 : function(event){
			if (number[7] === undefined){
				return undefined
			}
			var n7 = +number[7].text();
			switch (event.which){
				case 37 : {
					if (n6s === undefined){
						if (n5s === undefined){
							if (n4s === undefined){
								number[7].animate({'left':'21px'},300,function(){
									$($("#cell_7").children()[0]).remove();
									number[4] = $($("#cell_4").prepend("<div>").children()[0]).addClass("num n" + n7).text(n7);
								});
								number[7] = undefined;
								n4s = n7;
								return undefined
							}
							else {
								if (n4s === n7){
									var n4 = n7 * 2;
									number[7].animate({'left':'21px'},300,function(){
										$($("#cell_7").children()[0]).remove();
										number[4].remove();
										number[4] = $($("#cell_4").prepend("<div>").children()[0]).addClass("num n" + n4).text(n4);
									});
									setTimeout(function(){
										number[4].addClass("big")
									},200);
									number[7] = undefined;
									n4s = 1;
									score += n4;
									return undefined
								}
								else {
									number[7].animate({'left':'126px'},200,function(){
										$($("#cell_7").children()[0]).remove();
										number[5] = $($("#cell_5").prepend("<div>").children()[0]).addClass("num n" + n7).text(n7);
									});
									number[7] = undefined;
									n5s = n7;
									return undefined
								}
							}
						}
						else {
							if (n5s === n7){
								var n5 = n7 * 2;
								number[7].animate({'left':'126px'},200,function(){
									$($("#cell_7").children()[0]).remove();
									number[5].remove();
									number[5] = $($("#cell_5").prepend("<div>").children()[0]).addClass("num n" + n5).text(n5);
								});
								setTimeout(function(){
									number[5].addClass("big")
								},100);
								number[7] = undefined;
								n5s = 1;
								score += n5;
								return undefined
							}
							else {
								number[7].animate({'left':'231px'},100,function(){
									$($("#cell_7").children()[0]).remove();
									number[6] = $($("#cell_6").prepend("<div>").children()[0]).addClass("num n" + n7).text(n7);
								});
								number[7] = undefined;
								n6s = n7;
								return undefined
							}
						}
					}
					else {
						if (n6s === n7){
							var n6 = n7 * 2;
							number[7].animate({'left':'231px'},100,function(){
								$($("#cell_7").children()[0]).remove();
								number[6].remove();
								number[6] = $($("#cell_6").prepend("<div>").children()[0]).addClass("num n" + n6).text(n6);
							});
							number[6].addClass("big");
							number[7] = undefined;
							n6s = 1;
							score += n6;
							return undefined
						}
						else {
							return number[7].text()
						}
					}
					break
				}
				case 38 : {
					if (n3s === undefined){
						number[7].animate({'top':'21px'},100,function(){
							$($("#cell_7").children()[0]).remove();
							number[3] = $($("#cell_3").prepend("<div>").children()[0]).addClass("num n" + n7).text(n7);
						});
						number[7] = undefined;
						n3s = n7;
						return undefined
					}
					else {
						if (n3s === n7){
							var n3 = n7 * 2;
							number[3].addClass("big");
							number[7].animate({'top':'21px'},100,function(){
								$($("#cell_7").children()[0]).remove();
								number[3].remove();
								number[3] = $($("#cell_3").prepend("<div>").children()[0]).addClass("num n" + n3).text(n3);
							});
							number[7] = undefined;
							n3s = 1;//状态码1代表非空但是已经合并后的状态
							score += n3;
							return undefined
						}
						else {
							return +number[7].text()
						}
					}
					break
				}
				case 39 : {
					return +number[7].text();
					break
				}
				case 40 : {
					if (n11s === undefined){
						if (n15s === undefined){
							number[7].animate({'top':'336px'},200,function(){
								$($("#cell_7").children()[0]).remove();
								number[15] = $($("#cell_15").prepend("<div>").children()[0]).addClass("num n" + n7).text(n7);
							});
							number[7] = undefined;
							n15s = n7;
							return undefined
						}
						else {
							if (n15s === n7){
								var n15 = n7 * 2;
								number[7].animate({'top':'336px'},200,function(){
									$($("#cell_7").children()[0]).remove();
									number[15].remove();
									number[15] = $($("#cell_15").prepend("<div>").children()[0]).addClass("num n" + n15).text(n15);
								})
								setTimeout(function(){
									number[15].addClass("big")
								},100);
								number[7] = undefined;
								n15s = 1;
								score += n15;
								return undefined
							}
							else {
								number[7].animate({'top':'231px'},100,function(){
									$($("#cell_7").children()[0]).remove();
									number[11] = $($("#cell_11").prepend("<div>").children()[0]).addClass("num n" + n7).text(n7);
								});
								number[7] = undefined;
								n11s = n7;
								return undefined
							}
						}
					}
					else {
						if (n11s === n7){
							var n11 = n7 * 2;
							number[11].addClass("big");
							number[7].animate({'top':'231px'},100,function(){
								$($("#cell_7").children()[0]).remove();
								number[11].remove();
								number[11] = $($("#cell_11").prepend("<div>").children()[0]).addClass("num n" + n11).text(n11);
							});
							number[7] = undefined;
							n11s = 1;
							score += n11;
							return undefined
						}
						else {
							return +number[7].text()
						}
					}
					break
				}
			}
		},
		number8 : function(event){
			if (number[8] === undefined){
				return undefined
			}
			var n8 = +number[8].text();
			switch (event.which){
				case 37 : {
					return +number[8].text();
					break
				}
				case 38 : {
					if (n4s === undefined){
						if (n0s === undefined){
							number[8].animate({'top':'21px'},200,function(){
								$($("#cell_8").children()[0]).remove();
								number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n8).text(n8);
							});
							number[8] = undefined;
							n0s = n8;
							return undefined
						}
						else {
							if (n0s === n8){
								var n0 = n8 * 2;
								number[8].animate({'top':'21px'},200,function(){
									$($("#cell_8").children()[0]).remove();
									number[0].remove();
									number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n0).text(n0);
								})
								setTimeout(function(){
									number[0].addClass("big")
								},100);
								number[8] = undefined;
								n0s = 1;
								score += n0;
								return undefined
							}
							else {
								number[8].animate({'top':'126px'},100,function(){
									$($("#cell_8").children()[0]).remove();
									number[4] = $($("#cell_4").prepend("<div>").children()[0]).addClass("num n" + n8).text(n8);
								});
								number[8] = undefined;
								n4s = n8;
								return undefined
							}
						}
					}
					else {
						if (n4s === n8){
							var n4 = n8 * 2;
							number[4].addClass("big");
							number[8].animate({'top':'126px'},100,function(){
								$($("#cell_8").children()[0]).remove();
								number[4].remove();
								number[4] = $($("#cell_4").prepend("<div>").children()[0]).addClass("num n" + n4).text(n4);
							});
							number[8] = undefined;
							n4s = 1;
							score += n4;
							return undefined
						}
						else {
							return +number[8].text()
						}
					}
					break
				}
				case 39 : {
					if (n9s === undefined){
						if (n10s === undefined){
							if (n11s === undefined){
								number[8].animate({'left':'336px'},300,function(){
									$($("#cell_8").children()[0]).remove();
									number[11] = $($("#cell_11").prepend("<div>").children()[0]).addClass("num n" + n8).text(n8);
								});
								number[8] = undefined;
								n11s = n8;
								return undefined
							}
							else {
								if (n11s === n8){
									var n11 = n8 * 2;
									number[8].animate({'left':'336px'},300,function(){
										$($("#cell_8").children()[0]).remove();
										number[11].remove();
										number[11] = $($("#cell_11").prepend("<div>").children()[0]).addClass("num n" + n11).text(n11);
									});
									setTimeout(function(){
										number[11].addClass("big")
									},200);
									number[8] = undefined;
									n11s = 1;
									score += n11;
									return undefined
								}
								else {
									number[8].animate({'left':'231px'},200,function(){
										$($("#cell_8").children()[0]).remove();
										number[10] = $($("#cell_10").prepend("<div>").children()[0]).addClass("num n" + n8).text(n8);
									});
									number[8] = undefined;
									n10s = n8;
									return undefined
								}
							}
						}
						else {
							if (n10s === n8){
								var n10 = n8 * 2;
								number[8].animate({'left':'231px'},200,function(){
									$($("#cell_8").children()[0]).remove();
									number[10].remove();
									number[10] = $($("#cell_10").prepend("<div>").children()[0]).addClass("num n" + n10).text(n10);
								});
								setTimeout(function(){
									number[10].addClass("big")
								},100);
								number[8] = undefined;
								n10s = 1;
								score += n10;
								return undefined
							}
							else {
								number[8].animate({'left':'126px'},100,function(){
									$($("#cell_8").children()[0]).remove();
									number[9] = $($("#cell_9").prepend("<div>").children()[0]).addClass("num n" + n8).text(n8);
								});
								number[8] = undefined;
								n9s = n8;
								return undefined
							}
						}
					}
					else {
						if (n9s === n8){
							var n9 = n8 * 2;
							number[8].animate({'left':'126px'},100,function(){
								$($("#cell_8").children()[0]).remove();
								number[9].remove();
								number[9] = $($("#cell_9").prepend("<div>").children()[0]).addClass("num n" + n9).text(n9);
							});
							number[9].addClass("big");
							number[8] = undefined;
							n9s = 1;
							score += n9;
							return undefined
						}
						else {
							return number[8].text()
						}
					}
					break
				}
				case 40 : {
					if (n12s === undefined){
						number[8].animate({'top':'336px'},100,function(){
							$($("#cell_8").children()[0]).remove();
							number[12] = $($("#cell_12").prepend("<div>").children()[0]).addClass("num n" + n8).text(n8);
						});
						number[8] = undefined;
						n12s = n8;
						return undefined
					}
					else {
						if (n12s === n8){
							var n12 = n8 * 2;
							number[12].addClass("big");
							number[8].animate({'top':'336px'},100,function(){
								$($("#cell_8").children()[0]).remove();
								number[12].remove();
								number[12] = $($("#cell_12").prepend("<div>").children()[0]).addClass("num n" + n12).text(n12);
							});
							number[8] = undefined;
							n12s = 1;//状态码1代表非空但是已经合并后的状态
							score += n12;
							return undefined
						}
						else {
							return +number[8].text()
						}
					}
					break
				}
			}
		},
		number9 : function(event){
			if (number[9] === undefined){
				return undefined
			}
			var n9 = +number[9].text();
			switch (event.which){
				case 37 : {
					if (n8s === undefined){
						number[9].animate({'left':'21px'},100,function(){
							$($("#cell_9").children()[0]).remove();
							number[8] = $($("#cell_8").prepend("<div>").children()[0]).addClass("num n" + n9).text(n9);
						});
						number[9] = undefined;
						n8s = n9;
						return undefined
					}
					else {
						if (n8s === n9){
							var n8 = n9 * 2;
							number[8].addClass("big");
							number[9].animate({'left':'21px'},100,function(){
								$($("#cell_9").children()[0]).remove();
								number[8].remove();
								number[8] = $($("#cell_8").prepend("<div>").children()[0]).addClass("num n" + n8).text(n8);
							});
							number[9] = undefined;
							n8s = 1;//状态码1代表非空但是已经合并后的状态
							score += n8;
							return undefined
						}
						else {
							return +number[9].text()
						}
					}
					break
				}
				case 38 : {
					if (n5s === undefined){
						if (n1s === undefined){
							number[9].animate({'top':'21px'},200,function(){
								$($("#cell_9").children()[0]).remove();
								number[1] = $($("#cell_1").prepend("<div>").children()[0]).addClass("num n" + n9).text(n9);
							});
							number[9] = undefined;
							n1s = n9;
							return undefined
						}
						else {
							if (n1s === n9){
								var n1 = n9 * 2;
								number[9].animate({'top':'21px'},200,function(){
									$($("#cell_9").children()[0]).remove();
									number[1].remove();
									number[1] = $($("#cell_1").prepend("<div>").children()[0]).addClass("num n" + n1).text(n1);
								})
								setTimeout(function(){
									number[1].addClass("big")
								},100);
								number[9] = undefined;
								n1s = 1;
								score += n1;
								return undefined
							}
							else {
								number[9].animate({'top':'126px'},100,function(){
									$($("#cell_9").children()[0]).remove();
									number[5] = $($("#cell_5").prepend("<div>").children()[0]).addClass("num n" + n9).text(n9);
								});
								number[9] = undefined;
								n5s = n9;
								return undefined
							}
						}
					}
					else {
						if (n5s === n9){
							var n5 = n9 * 2;
							number[5].addClass("big");
							number[9].animate({'top':'126px'},100,function(){
								$($("#cell_9").children()[0]).remove();
								number[5].remove()
								number[5] = $($("#cell_5").prepend("<div>").children()[0]).addClass("num n" + n5).text(n5);
							});
							number[9] = undefined;
							n5s = 1;
							score += n5;
							return undefined
						}
						else {
							return +number[9].text()
						}
					}
					break
				}
				case 39 : {
					if (n10s === undefined){
						if (n11s === undefined){
							number[9].animate({'left':'336px'},200,function(){
								$($("#cell_9").children()[0]).remove();
								number[11] = $($("#cell_11").prepend("<div>").children()[0]).addClass("num n" + n9).text(n9);
							});
							number[9] = undefined;
							n11s = n9;
							return undefined
						}
						else {
							if (n11s === n9){
								var n11 = n9 * 2;
								number[9].animate({'left':'336px'},200,function(){
									$($("#cell_9").children()[0]).remove();
									number[11].remove();
									number[11] = $($("#cell_11").prepend("<div>").children()[0]).addClass("num n" + n11).text(n11);
								})
								setTimeout(function(){
									number[11].addClass("big")
								},100);
								number[9] = undefined;
								n11s = 1;
								score += n11;
								return undefined
							}
							else {
								number[9].animate({'left':'231px'},100,function(){
									$($("#cell_9").children()[0]).remove();
									number[10] = $($("#cell_10").prepend("<div>").children()[0]).addClass("num n" + n9).text(n9);
								});
								number[9] = undefined;
								n10s = n9;
								return undefined
							}
						}
					}
					else {
						if (n10s === n9){
							var n10 = n9 * 2;
							number[10].addClass("big");
							number[9].animate({'left':'231px'},100,function(){
								$($("#cell_9").children()[0]).remove();
								number[10].remove();
								number[10] = $($("#cell_10").prepend("<div>").children()[0]).addClass("num n" + n10).text(n10);
							});
							number[9] = undefined;
							n10s = 1;
							score += n10;
							return undefined
						}
						else {
							return +number[9].text()
						}
					}
					break
				}
				case 40 : {
					if (n13s === undefined){
						number[9].animate({'top':'336px'},100,function(){
							$($("#cell_9").children()[0]).remove();
							number[13] = $($("#cell_13").prepend("<div>").children()[0]).addClass("num n" + n9).text(n9);
						});
						number[9] = undefined;
						n13s = n9;
						return undefined
					}
					else {
						if (n13s === n9){
							var n13 = n9 * 2;
							number[13].addClass("big");
							number[9].animate({'top':'336px'},100,function(){
								$($("#cell_9").children()[0]).remove();
								number[13].remove();
								number[13] = $($("#cell_13").prepend("<div>").children()[0]).addClass("num n" + n13).text(n13);
							});
							number[9] = undefined;
							n13s = 1;//状态码1代表非空但是已经合并后的状态
							score += n13;
							return undefined
						}
						else {
							return +number[9].text()
						}
					}
					break
				}
			}
		},
		number10 : function(event){
			if (number[10] === undefined){
				return undefined
			}
			var n10 = +number[10].text();
			switch (event.which){
				case 37 : {
					if (n9s === undefined){
						if (n8s === undefined){
							number[10].animate({'left':'21px'},200,function(){
								$($("#cell_10").children()[0]).remove();
								number[8] = $($("#cell_8").prepend("<div>").children()[0]).addClass("num n" + n10).text(n10);
							});
							number[10] = undefined;
							n8s = n10;
							return undefined
						}
						else {
							if (n8s === n10){
								var n8 = n10 * 2;
								number[10].animate({'left':'21px'},200,function(){
									$($("#cell_10").children()[0]).remove();
									number[8].remove();
									number[8] = $($("#cell_8").prepend("<div>").children()[0]).addClass("num n" + n8).text(n8);
								})
								setTimeout(function(){
									number[8].addClass("big")
								},100);
								number[10] = undefined;
								n8s = 1;
								score += n8;
								return undefined
							}
							else {
								number[10].animate({'left':'126px'},100,function(){
									$($("#cell_10").children()[0]).remove();
									number[9] = $($("#cell_9").prepend("<div>").children()[0]).addClass("num n" + n10).text(n10);
								});
								number[10] = undefined;
								n9s = n10;
								return undefined
							}
						}
					}
					else {
						if (n9s === n10){
							var n9 = n10 * 2;
							number[9].addClass("big");
							number[10].animate({'left':'126px'},100,function(){
								$($("#cell_10").children()[0]).remove();
								number[9].remove();
								number[9] = $($("#cell_9").prepend("<div>").children()[0]).addClass("num n" + n9).text(n9);
							});
							number[10] = undefined;
							n9s = 1;
							score += n9;
							return undefined
						}
						else {
							return +number[10].text()
						}
					}
					break
				}
				case 38 : {
					if (n6s === undefined){
						if (n2s === undefined){
							number[10].animate({'top':'21px'},200,function(){
								$($("#cell_10").children()[0]).remove();
								number[2] = $($("#cell_2").prepend("<div>").children()[0]).addClass("num n" + n10).text(n10);
							});
							number[10] = undefined;
							n2s = n10;
							return undefined
						}
						else {
							if (n2s === n10){
								var n2 = n10 * 2;
								number[10].animate({'top':'21px'},200,function(){
									$($("#cell_10").children()[0]).remove();
									number[2].remove();
									number[2] = $($("#cell_2").prepend("<div>").children()[0]).addClass("num n" + n2).text(n2);
								})
								setTimeout(function(){
									number[2].addClass("big")
								},100);
								number[10] = undefined;
								n2s = 1;
								score += n2;
								return undefined
							}
							else {
								number[10].animate({'top':'126px'},100,function(){
									$($("#cell_10").children()[0]).remove();
									number[6] = $($("#cell_6").prepend("<div>").children()[0]).addClass("num n" + n10).text(n10);
								});
								number[10] = undefined;
								n6s = n10;
								return undefined
							}
						}
					}
					else {
						if (n6s === n10){
							var n6 = n10 * 2;
							number[6].addClass("big");
							number[10].animate({'top':'126px'},100,function(){
								$($("#cell_10").children()[0]).remove();
								number[6].remove();
								number[6] = $($("#cell_6").prepend("<div>").children()[0]).addClass("num n" + n6).text(n6);
							});
							number[10] = undefined;
							n6s = 1;
							score += n6;
							return undefined
						}
						else {
							return +number[10].text()
						}
					}
					break
				}
				case 39 : {
					if (n11s === undefined){
						number[10].animate({'left':'336px'},100,function(){
							$($("#cell_10").children()[0]).remove();
							number[11] = $($("#cell_11").prepend("<div>").children()[0]).addClass("num n" + n10).text(n10);
						});
						number[10] = undefined;
						n11s = n10;
						return undefined
					}
					else {
						if (n11s === n10){
							var n11 = n10 * 2;
							number[11].addClass("big");
							number[10].animate({'left':'336px'},100,function(){
								$($("#cell_10").children()[0]).remove();
								number[11].remove();
								number[11] = $($("#cell_11").prepend("<div>").children()[0]).addClass("num n" + n11).text(n11);
							});
							number[10] = undefined;
							n11s = 1;//状态码1代表非空但是已经合并后的状态
							score += n11;
							return undefined
						}
						else {
							return +number[10].text()
						}
					}
					break
				}
				case 40 : {
					if (n14s === undefined){
						number[10].animate({'top':'336px'},100,function(){
							$($("#cell_10").children()[0]).remove();
							number[14] = $($("#cell_14").prepend("<div>").children()[0]).addClass("num n" + n10).text(n10);
						});
						number[10] = undefined;
						n14s = n10;
						return undefined
					}
					else {
						if (n14s === n10){
							var n14 = n10 * 2;
							number[14].addClass("big");
							number[10].animate({'top':'336px'},100,function(){
								$($("#cell_10").children()[0]).remove();
								number[14].remove();
								number[14] = $($("#cell_14").prepend("<div>").children()[0]).addClass("num n" + n14).text(n14);
							});
							number[10] = undefined;
							n14s = 1;//状态码1代表非空但是已经合并后的状态
							score += n14;
							return undefined
						}
						else {
							return +number[10].text()
						}
					}
					break
				}
			}
		},
		number11 : function(event){
			if (number[11] === undefined){
				return undefined
			}
			var n11 = +number[11].text();
			switch (event.which){
				case 37 : {
					if (n10s === undefined){
						if (n9s === undefined){
							if (n8s === undefined){
								number[11].animate({'left':'21px'},300,function(){
									$($("#cell_11").children()[0]).remove();
									number[8] = $($("#cell_8").prepend("<div>").children()[0]).addClass("num n" + n11).text(n11);
								});
								number[11] = undefined;
								n8s = n11;
								return undefined
							}
							else {
								if (n8s === n11){
									var n8 = n11 * 2;
									number[11].animate({'left':'21px'},300,function(){
										$($("#cell_11").children()[0]).remove();
										number[8].remove();
										number[8] = $($("#cell_8").prepend("<div>").children()[0]).addClass("num n" + n8).text(n8);
									});
									setTimeout(function(){
										number[8].addClass("big")
									},200);
									number[11] = undefined;
									n8s = 1;
									score += n8;
									return undefined
								}
								else {
									number[11].animate({'left':'126px'},200,function(){
										$($("#cell_11").children()[0]).remove();
										number[9] = $($("#cell_9").prepend("<div>").children()[0]).addClass("num n" + n11).text(n11);
									});
									number[11] = undefined;
									n9s = n11;
									return undefined
								}
							}
						}
						else {
							if (n9s === n11){
								var n9 = n11 * 2;
								number[11].animate({'left':'126px'},200,function(){
									$($("#cell_11").children()[0]).remove();
									number[9].remove();
									number[9] = $($("#cell_9").prepend("<div>").children()[0]).addClass("num n" + n9).text(n9);
								});
								setTimeout(function(){
									number[9].addClass("big")
								},100);
								number[11] = undefined;
								n9s = 1;
								score += n9;
								return undefined
							}
							else {
								number[11].animate({'left':'231px'},100,function(){
									$($("#cell_11").children()[0]).remove();
									number[10] = $($("#cell_10").prepend("<div>").children()[0]).addClass("num n" + n11).text(n11);
								});
								number[11] = undefined;
								n10s = n11;
								return undefined
							}
						}
					}
					else {
						if (n10s === n11){
							var n10 = n11 * 2;
							number[11].animate({'left':'231px'},100,function(){
								$($("#cell_11").children()[0]).remove();
								number[10].remove();
								number[10] = $($("#cell_10").prepend("<div>").children()[0]).addClass("num n" + n10).text(n10);
							});
							number[10].addClass("big");
							number[11] = undefined;
							n10s = 1;
							score += n10;
							return undefined
						}
						else {
							return number[11].text()
						}
					}
					break
				}
				case 38 : {
					if (n7s === undefined){
						if (n3s === undefined){
							number[11].animate({'top':'21px'},200,function(){
								$($("#cell_11").children()[0]).remove();
								number[3] = $($("#cell_3").prepend("<div>").children()[0]).addClass("num n" + n11).text(n11);
							});
							number[11] = undefined;
							n3s = n11;
							return undefined
						}
						else {
							if (n3s === n11){
								var n3 = n11 * 2;
								number[11].animate({'top':'21px'},200,function(){
									$($("#cell_11").children()[0]).remove();
									number[3].remove();
									number[3] = $($("#cell_3").prepend("<div>").children()[0]).addClass("num n" + n3).text(n3);
								})
								setTimeout(function(){
									number[3].addClass("big")
								},100);
								number[11] = undefined;
								n3s = 1;
								score += n3;
								return undefined
							}
							else {
								number[11].animate({'top':'126px'},100,function(){
									$($("#cell_11").children()[0]).remove();
									number[7] = $($("#cell_7").prepend("<div>").children()[0]).addClass("num n" + n11).text(n11);
								});
								number[11] = undefined;
								n7s = n11;
								return undefined
							}
						}
					}
					else {
						if (n7s === n11){
							var n7 = n11 * 2;
							number[7].addClass("big");
							number[11].animate({'top':'126px'},100,function(){
								$($("#cell_11").children()[0]).remove();
								number[7].remove();
								number[7] = $($("#cell_7").prepend("<div>").children()[0]).addClass("num n" + n7).text(n7);
							});
							number[11] = undefined;
							n7s = 1;
							score += n7;
							return undefined
						}
						else {
							return +number[11].text()
						}
					}
					break
				}
				case 39 : {
					return +number[11].text();
					break
				}
				case 40 : {
					if (n15s === undefined){
						number[11].animate({'top':'336px'},100,function(){
							$($("#cell_11").children()[0]).remove();
							number[15] = $($("#cell_15").prepend("<div>").children()[0]).addClass("num n" + n11).text(n11);
						});
						number[11] = undefined;
						n15s = n11;
						return undefined
					}
					else {
						if (n15s === n11){
							var n15 = n11 * 2;
							number[15].addClass("big");
							number[11].animate({'top':'336px'},100,function(){
								$($("#cell_11").children()[0]).remove();
								number[15].remove();
								number[15] = $($("#cell_15").prepend("<div>").children()[0]).addClass("num n" + n15).text(n15);
							});
							number[11] = undefined;
							n15s = 1;//状态码1代表非空但是已经合并后的状态
							score += n15;
							return undefined
						}
						else {
							return +number[11].text()
						}
					}
					break
				}
			}
		},
		number12 : function(event){
			if (number[12] === undefined){
				return undefined
			}
			var n12 = +number[12].text();
			switch (event.which){
				case 37 : {
					return +number[12].text();
					break
				}
				case 38 : {
					if (n8s === undefined){
						if (n4s === undefined){
							if (n0s === undefined){
								number[12].animate({'top':'21px'},300,function(){
									$($("#cell_12").children()[0]).remove();
									number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n12).text(n12);
								});
								number[12] = undefined;
								n0s = n12;
								return undefined
							}
							else {
								if (n0s === n12){
									var n0 = n12 * 2;
									number[12].animate({'top':'21px'},300,function(){
										$($("#cell_12").children()[0]).remove();
										number[0].remove();
										number[0] = $($("#cell_0").prepend("<div>").children()[0]).addClass("num n" + n0).text(n0);
									});
									setTimeout(function(){
										number[0].addClass("big")
									},200);
									number[12] = undefined;
									n0s = 1;
									score += n0;
									return undefined
								}
								else {
									number[12].animate({'top':'126px'},200,function(){
										$($("#cell_12").children()[0]).remove();
										number[4] = $($("#cell_4").prepend("<div>").children()[0]).addClass("num n" + n12).text(n12);
									});
									number[12] = undefined;
									n4s = n12;
									return undefined
								}
							}
						}
						else {
							if (n4s === n12){
								var n4 = n12 * 2;
								number[12].animate({'top':'126px'},200,function(){
									$($("#cell_12").children()[0]).remove();
									number[4].remove();
									number[4] = $($("#cell_4").prepend("<div>").children()[0]).addClass("num n" + n4).text(n4);
								});
								setTimeout(function(){
									number[4].addClass("big")
								},100);
								number[12] = undefined;
								n4s = 1;
								score += n4;
								return undefined
							}
							else {
								number[12].animate({'top':'231px'},100,function(){
									$($("#cell_12").children()[0]).remove();
									number[8] = $($("#cell_8").prepend("<div>").children()[0]).addClass("num n" + n12).text(n12);
								});
								number[12] = undefined;
								n8s = n12;
								return undefined
							}
						}
					}
					else {
						if (n8s === n12){
							var n8 = n12 * 2;
							number[12].animate({'top':'231px'},100,function(){
								$($("#cell_12").children()[0]).remove();
								number[8].remove();
								number[8] = $($("#cell_8").prepend("<div>").children()[0]).addClass("num n" + n8).text(n8);
							});
							number[8].addClass("big");
							number[12] = undefined;
							n8s = 1;
							score += n8;
							return undefined
						}
						else {
							return number[12].text()
						}
					}
					break
				}
				case 39 : {
					if (n13s === undefined){
						if (n14s === undefined){
							if (n15s === undefined){
								number[12].animate({'left':'336px'},300,function(){
									$($("#cell_12").children()[0]).remove();
									number[15] = $($("#cell_15").prepend("<div>").children()[0]).addClass("num n" + n12).text(n12);
								});
								number[12] = undefined;
								n15s = n12;
								return undefined
							}
							else {
								if (n15s === n12){
									var n15 = n12 * 2;
									number[12].animate({'left':'336px'},300,function(){
										$($("#cell_12").children()[0]).remove();
										number[15].remove();
										number[15] = $($("#cell_15").prepend("<div>").children()[0]).addClass("num n" + n15).text(n15);
									});
									setTimeout(function(){
										number[15].addClass("big")
									},200);
									number[12] = undefined;
									n15s = 1;
									score += n15;
									return undefined
								}
								else {
									number[12].animate({'left':'231px'},200,function(){
										$($("#cell_12").children()[0]).remove();
										number[14] = $($("#cell_14").prepend("<div>").children()[0]).addClass("num n" + n12).text(n12);
									});
									number[12] = undefined;
									n14s = n12;
									return undefined
								}
							}
						}
						else {
							if (n14s === n12){
								var n14 = n12 * 2;
								number[12].animate({'left':'231px'},200,function(){
									$($("#cell_12").children()[0]).remove();
									number[14].remove();
									number[14] = $($("#cell_14").prepend("<div>").children()[0]).addClass("num n" + n14).text(n14);
								});
								setTimeout(function(){
									number[14].addClass("big")
								},100);
								number[12] = undefined;
								n14s = 1;
								score += n14;
								return undefined
							}
							else {
								number[12].animate({'left':'126px'},100,function(){
									$($("#cell_12").children()[0]).remove();
									number[13] = $($("#cell_13").prepend("<div>").children()[0]).addClass("num n" + n12).text(n12);
								});
								number[12] = undefined;
								n13s = n12;
								return undefined
							}
						}
					}
					else {
						if (n13s === n12){
							var n13 = n12 * 2;
							number[12].animate({'left':'126px'},100,function(){
								$($("#cell_12").children()[0]).remove();
								number[13].remove();
								number[13] = $($("#cell_13").prepend("<div>").children()[0]).addClass("num n" + n13).text(n13);
							});
							number[13].addClass("big");
							number[12] = undefined;
							n13s = 1;
							score += n13;
							return undefined
						}
						else {
							return number[12].text()
						}
					}
					break
				}
				case 40 : {
					return +number[12].text();
					break
				}
			}
		},
		number13 : function(event){
			if (number[13] === undefined){
				return undefined
			}
			var n13 = +number[13].text();
			switch (event.which){
				case 37 : {
					if (n12s === undefined){
						number[13].animate({'left':'21px'},100,function(){
							$($("#cell_13").children()[0]).remove();
							number[12] = $($("#cell_12").prepend("<div>").children()[0]).addClass("num n" + n13).text(n13);
						});
						number[13] = undefined;
						n12s = n13;
						return undefined
					}
					else {
						if (n12s === n13){
							var n12 = n13 * 2;
							number[12].addClass("big");
							number[13].animate({'left':'21px'},100,function(){
								$($("#cell_13").children()[0]).remove();
								number[12].remove();
								number[12] = $($("#cell_12").prepend("<div>").children()[0]).addClass("num n" + n12).text(n12);
							});
							number[13] = undefined;
							n12s = 1;//状态码1代表非空但是已经合并后的状态
							score += n12;
							return undefined
						}
						else {
							return +number[13].text()
						}
					}
					break
				}
				case 38 : {
					if (n9s === undefined){
						if (n5s === undefined){
							if (n1s === undefined){
								number[13].animate({'top':'21px'},300,function(){
									$($("#cell_13").children()[0]).remove();
									number[1] = $($("#cell_1").prepend("<div>").children()[0]).addClass("num n" + n13).text(n13);
								});
								number[13] = undefined;
								n1s = n13;
								return undefined
							}
							else {
								if (n1s === n13){
									var n1 = n13 * 2;
									number[13].animate({'top':'21px'},300,function(){
										$($("#cell_13").children()[0]).remove();
										number[1].remove();
										number[1] = $($("#cell_1").prepend("<div>").children()[0]).addClass("num n" + n1).text(n1);
									});
									setTimeout(function(){
										number[1].addClass("big")
									},200);
									number[13] = undefined;
									n1s = 1;
									score += n1;
									return undefined
								}
								else {
									number[13].animate({'top':'126px'},200,function(){
										$($("#cell_13").children()[0]).remove();
										number[5] = $($("#cell_5").prepend("<div>").children()[0]).addClass("num n" + n13).text(n13);
									});
									number[13] = undefined;
									n5s = n13;
									return undefined
								}
							}
						}
						else {
							if (n5s === n13){
								var n5 = n13 * 2;
								number[13].animate({'top':'126px'},200,function(){
									$($("#cell_13").children()[0]).remove();
									number[5].remove();
									number[5] = $($("#cell_5").prepend("<div>").children()[0]).addClass("num n" + n5).text(n5);
								});
								setTimeout(function(){
									number[5].addClass("big")
								},100);
								number[13] = undefined;
								n5s = 1;
								score += n5;
								return undefined
							}
							else {
								number[13].animate({'top':'231px'},100,function(){
									$($("#cell_13").children()[0]).remove();
									number[9] = $($("#cell_9").prepend("<div>").children()[0]).addClass("num n" + n13).text(n13);
								});
								number[13] = undefined;
								n9s = n13;
								return undefined
							}
						}
					}
					else {
						if (n9s === n13){
							var n9 = n13 * 2;
							number[13].animate({'top':'231px'},100,function(){
								$($("#cell_13").children()[0]).remove();
								number[9].remove();
								number[9] = $($("#cell_9").prepend("<div>").children()[0]).addClass("num n" + n9).text(n9);
							});
							number[9].addClass("big");
							number[13] = undefined;
							n9s = 1;
							score += n9;
							return undefined
						}
						else {
							return number[13].text()
						}
					}
					break
				}
				case 39 : {
					if (n14s === undefined){
						if (n15s === undefined){
							number[13].animate({'left':'336px'},200,function(){
								$($("#cell_13").children()[0]).remove();
								number[15] = $($("#cell_15").prepend("<div>").children()[0]).addClass("num n" + n13).text(n13);
							});
							number[13] = undefined;
							n15s = n13;
							return undefined
						}
						else {
							if (n15s === n13){
								var n15 = n13 * 2;
								number[13].animate({'left':'336px'},200,function(){
									$($("#cell_13").children()[0]).remove();
									number[15].remove();
									number[15] = $($("#cell_15").prepend("<div>").children()[0]).addClass("num n" + n15).text(n15);
								})
								setTimeout(function(){
									number[15].addClass("big")
								},100);
								number[13] = undefined;
								n15s = 1;
								score += n15;
								return undefined
							}
							else {
								number[13].animate({'left':'231px'},100,function(){
									$($("#cell_13").children()[0]).remove();
									number[14] = $($("#cell_14").prepend("<div>").children()[0]).addClass("num n" + n13).text(n13);
								});
								number[13] = undefined;
								n14s = n13;
								return undefined
							}
						}
					}
					else {
						if (n14s === n13){
							var n14 = n13 * 2;
							number[14].addClass("big");
							number[13].animate({'left':'231px'},100,function(){
								$($("#cell_13").children()[0]).remove();
								number[14].remove();
								number[14] = $($("#cell_14").prepend("<div>").children()[0]).addClass("num n" + n14).text(n14);
							});
							number[13] = undefined;
							n14s = 1;
							score += n14;
							return undefined
						}
						else {
							return +number[13].text()
						}
					}
					break
				}
				case 40 : {
					+number[13].text();
					break
				}
			}
		},
		number14 : function(event){
			if (number[14] === undefined){
				return undefined
			}
			var n14 = +number[14].text();
			switch (event.which){
				case 37 : {
					if (n13s === undefined){
						if (n12s === undefined){
							number[14].animate({'left':'21px'},200,function(){
								$($("#cell_14").children()[0]).remove();
								number[12] = $($("#cell_12").prepend("<div>").children()[0]).addClass("num n" + n14).text(n14);
							});
							number[14] = undefined;
							n12s = n14;
							return undefined
						}
						else {
							if (n12s === n14){
								var n12 = n14 * 2;
								number[14].animate({'left':'21px'},200,function(){
									$($("#cell_14").children()[0]).remove();
									number[12].remove();
									number[12] = $($("#cell_12").prepend("<div>").children()[0]).addClass("num n" + n12).text(n12);
								})
								setTimeout(function(){
									number[12].addClass("big")
								},100);
								number[14] = undefined;
								n12s = 1;
								score += n12;
								return undefined
							}
							else {
								number[14].animate({'left':'126px'},100,function(){
									$($("#cell_14").children()[0]).remove();
									number[13] = $($("#cell_13").prepend("<div>").children()[0]).addClass("num n" + n14).text(n14);
								});
								number[14] = undefined;
								n13s = n14;
								return undefined
							}
						}
					}
					else {
						if (n13s === n14){
							var n13 = n14 * 2;
							number[13].addClass("big");
							number[14].animate({'left':'126px'},100,function(){
								$($("#cell_14").children()[0]).remove();
								number[13].remove();
								number[13] = $($("#cell_13").prepend("<div>").children()[0]).addClass("num n" + n13).text(n13);
							});
							number[14] = undefined;
							n13s = 1;
							score += n13;
							return undefined
						}
						else {
							return +number[14].text()
						}
					}
					break
				}
				case 38 : {
					if (n10s === undefined){
						if (n6s === undefined){
							if (n2s === undefined){
								number[14].animate({'top':'21px'},300,function(){
									$($("#cell_14").children()[0]).remove();
									number[2] = $($("#cell_2").prepend("<div>").children()[0]).addClass("num n" + n14).text(n14);
								});
								number[14] = undefined;
								n2s = n14;
								return undefined
							}
							else {
								if (n2s === n14){
									var n2 = n14 * 2;
									number[14].animate({'top':'21px'},300,function(){
										$($("#cell_14").children()[0]).remove();
										number[2].remove();
										number[2] = $($("#cell_2").prepend("<div>").children()[0]).addClass("num n" + n2).text(n2);
									});
									setTimeout(function(){
										number[2].addClass("big")
									},200);
									number[14] = undefined;
									n2s = 1;
									score += n2;
									return undefined
								}
								else {
									number[14].animate({'top':'126px'},200,function(){
										$($("#cell_14").children()[0]).remove();
										number[6] = $($("#cell_6").prepend("<div>").children()[0]).addClass("num n" + n14).text(n14);
									});
									number[14] = undefined;
									n6s = n14;
									return undefined
								}
							}
						}
						else {
							if (n6s === n14){
								var n6 = n14 * 2;
								number[14].animate({'top':'126px'},200,function(){
									$($("#cell_14").children()[0]).remove();
									number[6].remove();
									number[6] = $($("#cell_6").prepend("<div>").children()[0]).addClass("num n" + n6).text(n6);
								});
								setTimeout(function(){
									number[6].addClass("big")
								},100);
								number[14] = undefined;
								n6s = 1;
								score += n6;
								return undefined
							}
							else {
								number[14].animate({'top':'231px'},100,function(){
									$($("#cell_14").children()[0]).remove();
									number[10] = $($("#cell_10").prepend("<div>").children()[0]).addClass("num n" + n14).text(n14);
								});
								number[14] = undefined;
								n10s = n14;
								return undefined
							}
						}
					}
					else {
						if (n10s === n14){
							var n10 = n14 * 2;
							number[14].animate({'top':'231px'},100,function(){
								$($("#cell_14").children()[0]).remove();
								number[10].remove();
								number[10] = $($("#cell_10").prepend("<div>").children()[0]).addClass("num n" + n10).text(n10);
							});
							number[10].addClass("big");
							number[14] = undefined;
							n10s = 1;
							score += n10;
							return undefined
						}
						else {
							return number[14].text()
						}
					}
					break
				}
				case 39 : {
					if (n15s === undefined){
						number[14].animate({'left':'336px'},100,function(){
							$($("#cell_14").children()[0]).remove();
							number[15] = $($("#cell_15").prepend("<div>").children()[0]).addClass("num n" + n14).text(n14);
						});
						number[14] = undefined;
						n15s = n14;
						return undefined
					}
					else {
						if (n15s === n14){
							var n15 = n14 * 2;
							number[15].addClass("big");
							number[14].animate({'left':'336px'},100,function(){
								$($("#cell_14").children()[0]).remove();
								number[15].remove();
								number[15] = $($("#cell_15").prepend("<div>").children()[0]).addClass("num n" + n15).text(n15);
							});
							number[14] = undefined;
							n15s = 1;//状态码1代表非空但是已经合并后的状态
							score += n15;
							return undefined
						}
						else {
							return +number[14].text()
						}
					}
					break
				}
				case 40 : {
					+number[14].text();
					break
				}
			}
		},
		number15 : function(event){
			if (number[15] === undefined){
				return undefined
			}
			var n15 = +number[15].text();
			switch (event.which){
				case 37 : {
					if (n14s === undefined){
						if (n13s === undefined){
							if (n12s === undefined){
								number[15].animate({'left':'21px'},300,function(){
									$($("#cell_15").children()[0]).remove();
									number[12] = $($("#cell_12").prepend("<div>").children()[0]).addClass("num n" + n15).text(n15);
								});
								number[15] = undefined;
								n12s = n15;
								return undefined
							}
							else {
								if (n12s === n15){
									var n12 = n15 * 2;
									number[15].animate({'left':'21px'},300,function(){
										$($("#cell_15").children()[0]).remove();
										number[12].remove();
										number[12] = $($("#cell_12").prepend("<div>").children()[0]).addClass("num n" + n12).text(n12);
									});
									setTimeout(function(){
										number[12].addClass("big")
									},200);
									number[15] = undefined;
									n12s = 1;
									score += n12;
									return undefined
								}
								else {
									number[15].animate({'left':'126px'},200,function(){
										$($("#cell_15").children()[0]).remove();
										number[13] = $($("#cell_13").prepend("<div>").children()[0]).addClass("num n" + n15).text(n15);
									});
									number[15] = undefined;
									n13s = n15;
									return undefined
								}
							}
						}
						else {
							if (n13s === n15){
								var n13 = n15 * 2;
								number[15].animate({'left':'126px'},200,function(){
									$($("#cell_15").children()[0]).remove();
									number[13].remove();
									number[13] = $($("#cell_13").prepend("<div>").children()[0]).addClass("num n" + n13).text(n13);
								});
								setTimeout(function(){
									number[13].addClass("big")
								},100);
								number[15] = undefined;
								n13s = 1;
								score += n13;
								return undefined
							}
							else {
								number[15].animate({'left':'231px'},100,function(){
									$($("#cell_15").children()[0]).remove();
									number[14] = $($("#cell_14").prepend("<div>").children()[0]).addClass("num n" + n15).text(n15);
								});
								number[15] = undefined;
								n14s = n15;
								return undefined
							}
						}
					}
					else {
						if (n14s === n15){
							var n14 = n15 * 2;
							number[15].animate({'left':'231px'},100,function(){
								$($("#cell_15").children()[0]).remove();
								number[14].remove();
								number[14] = $($("#cell_14").prepend("<div>").children()[0]).addClass("num n" + n14).text(n14);
							});
							number[14].addClass("big");
							number[15] = undefined;
							n14s = 1;
							score += n14;
							return undefined
						}
						else {
							return number[15].text()
						}
					}
					break
				}
				case 38 : {
					if (n11s === undefined){
						if (n7s === undefined){
							if (n3s === undefined){
								number[15].animate({'top':'21px'},300,function(){
									$($("#cell_15").children()[0]).remove();
									number[3] = $($("#cell_3").prepend("<div>").children()[0]).addClass("num n" + n15).text(n15);
								});
								number[15] = undefined;
								n3s = n15;
								return undefined
							}
							else {
								if (n3s === n15){
									var n3 = n15 * 2;
									number[15].animate({'top':'21px'},300,function(){
										$($("#cell_15").children()[0]).remove();
										number[3].remove();
										number[3] = $($("#cell_3").prepend("<div>").children()[0]).addClass("num n" + n3).text(n3);
									});
									setTimeout(function(){
										number[3].addClass("big")
									},200);
									number[15] = undefined;
									n3s = 1;
									score += n3;
									return undefined
								}
								else {
									number[15].animate({'top':'126px'},200,function(){
										$($("#cell_15").children()[0]).remove();
										number[7] = $($("#cell_7").prepend("<div>").children()[0]).addClass("num n" + n15).text(n15);
									});
									number[15] = undefined;
									n7s = n15;
									return undefined
								}
							}
						}
						else {
							if (n7s === n15){
								var n7 = n15 * 2;
								number[15].animate({'top':'126px'},200,function(){
									$($("#cell_15").children()[0]).remove();
									number[7].remove();
									number[7] = $($("#cell_7").prepend("<div>").children()[0]).addClass("num n" + n7).text(n7);
								});
								setTimeout(function(){
									number[7].addClass("big")
								},100);
								number[15] = undefined;
								n7s = 1;
								score += n7;
								return undefined
							}
							else {
								number[15].animate({'top':'231px'},100,function(){
									$($("#cell_15").children()[0]).remove();
									number[11] = $($("#cell_11").prepend("<div>").children()[0]).addClass("num n" + n15).text(n15);
								});
								number[15] = undefined;
								n11s = n15;
								return undefined
							}
						}
					}
					else {
						if (n11s === n15){
							var n11 = n15 * 2;
							number[15].animate({'top':'231px'},100,function(){
								$($("#cell_15").children()[0]).remove();
								number[11].remove();
								number[11] = $($("#cell_11").prepend("<div>").children()[0]).addClass("num n" + n11).text(n11);
							});
							number[11].addClass("big");
							number[15] = undefined;
							n11s = 1;
							score += n11;
							return undefined
						}
						else {
							return number[15].text()
						}
					}
					break
				}
				case 39 : {
					return number[15].text();
					break
				}
				case 40 : {
					return number[15].text();
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
		left : function(event){
			ns[0] = game.number0(event);
			ns[1] = game.number1(event);
			ns[2] = game.number2(event);
			game.number3(event);
			ns[4] = game.number4(event);
			ns[5] = game.number5(event);
			ns[6] = game.number6(event);
			game.number7(event);
			ns[8] = game.number8(event);
			ns[9] = game.number9(event);
			ns[10] = game.number10(event);
			game.number11(event);
			ns[12] = game.number12(event);
			ns[13] = game.number13(event);
			ns[14] = game.number14(event);
			game.number15(event);
			game.printScore();
			$("body").unbind("keydown");
			if (game.isFinish()){
				return
			}
			else {
				setTimeout(function(){
					$("body").keydown(function(event){
						switch (event.which){
							case 37 : {
								game.left(event);
								break
							}
							case 38 : {
								game.up(event);
								break
							}
							case 39 : {
								game.right(event);
								break
							}
							case 40 : {
								game.down(event);
								break
							}
						}
					});
					game.randomNum()
				},300);
			}
		},
		right : function(event){
			ns[3] = game.number3(event);
			ns[2] = game.number2(event);
			ns[1] = game.number1(event);
			game.number0(event);
			ns[7] = game.number7(event);
			ns[6] = game.number6(event);
			ns[5] = game.number5(event);
			game.number4(event);
			ns[11] = game.number11(event);
			ns[10] = game.number10(event);
			ns[9] = game.number9(event);
			game.number8(event);
			ns[15] = game.number15(event);
			ns[14] = game.number14(event);
			ns[13] = game.number13(event);
			game.number12(event);
			game.printScore();
			$("body").unbind("keydown");
			if (game.isFinish()){
				return
			}
			else {
				setTimeout(function(){
					$("body").keydown(function(event){
						switch (event.which){
							case 37 : {
								game.left(event);
								break
							}
							case 38 : {
								game.up(event);
								break
							}
							case 39 : {
								game.right(event);
								break
							}
							case 40 : {
								game.down(event);
								break
							}
						}
					});
					game.randomNum()
				},300);
			}
		},
		up : function(event){
			ns[0] = game.number0(event);
			ns[4] = game.number4(event);
			ns[8] = game.number8(event);
			game.number12(event);
			ns[1] = game.number1(event);
			ns[5] = game.number5(event);
			ns[9] = game.number9(event);
			game.number13(event);
			ns[2] = game.number2(event);
			ns[6] = game.number6(event);
			ns[10] = game.number10(event);
			game.number14(event);
			ns[3] = game.number3(event);
			ns[7] = game.number7(event);
			ns[11] = game.number11(event);
			game.number15(event);
			game.printScore();
			$("body").unbind("keydown");
			if (game.isFinish()){
				return
			}
			else {
				setTimeout(function(){
					$("body").keydown(function(event){
						switch (event.which){
							case 37 : {
								game.left(event);
								break
							}
							case 38 : {
								game.up(event);
								break
							}
							case 39 : {
								game.right(event);
								break
							}
							case 40 : {
								game.down(event);
								break
							}
						}
					});
					game.randomNum()
				},300);
			}
		},
		down : function(event){
			ns[12] = game.number12(event);
			ns[8] = game.number8(event);
			ns[4] = game.number4(event);
			game.number0(event);
			ns[13] = game.number13(event);
			ns[9] = game.number9(event);
			ns[5] = game.number5(event);
			game.number1(event);
			ns[14] = game.number14(event);
			ns[10] = game.number10(event);
			ns[6] = game.number6(event);
			game.number2(event);
			ns[15] = game.number15(event);
			ns[11] = game.number11(event);
			ns[7] = game.number7(event);
			game.number3(event);
			game.printScore();
			$("body").unbind("keydown");
			if (game.isFinish()){
				return
			}
			else {
				setTimeout(function(){
					$("body").keydown(function(event){
						switch (event.which){
							case 37 : {
								game.left(event);
								break
							}
							case 38 : {
								game.up(event);
								break
							}
							case 39 : {
								game.right(event);
								break
							}
							case 40 : {
								game.down(event);
								break
							}
						}
					});
					game.randomNum()
				},300);
			}
		}
	}
}())
$("body").keydown(function(event){
	switch (event.which){
		case 37 : {
			game.left(event);
			break
		}
		case 38 : {
			game.up(event);
			break
		}
		case 39 : {
			game.right(event);
			break
		}
		case 40 : {
			game.down(event);
			break
		}
	}
});
game.beginGame()
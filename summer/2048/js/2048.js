var game = (function(){
	var l = localStorage;
	var highScore = l.get("score");//读取最高分
	var score = 0;//分数
	return {
		//开始游戏
		beginGame : function(){
			var xA = Math.floor(Math.random() * 4);
			var yA = Math.floor(Math.random() * 4);
			$("#cell_" + yA + "_" + xA).
		}
	}


}())
var userInterest = {
	getInterest : function(){
		return $("#in").value
	},
	getInterestArr : function(){
		var str = userInterest.getInterest();
		str = trim(str);
		return str.match(/[^\n\ \ \，\;\、\s\,]+(?=[\ \ \，\;\、\s\,])|[^\n\ \ \，\;\、\s\,]+$/g)
	},
	printInterest : function(){
		var inter = userInterest.getInterestArr() || alert("please input your interest");
		var str = "";
		for (var i = 0;i < inter.length;i++){
			str = str + " " + inter[i];
			$("#int").innerHTML = str
		}
		event.preventDefault()
	}
}
window.onload = $("#bu").addEventListener("click",userInterest.printInterest,false);
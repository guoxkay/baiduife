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
		if (userInterest.getInterestArr() == undefined){
			$("#wro").innerHTML = "please input your interest";
			event.preventDefault();
			return
		}
		else{
			var inter = userInterest.getInterestArr()
		}		
		inter = uniqArray(inter);
		if (inter.length > 10){
			$("#wro").innerHTML = "爱好不能超过十个";
			event.preventDefault();
			return
		}
		var intChildLength = document.getElementById("int").childNodes.length;
		if (intChildLength !== 0){
			for(var i = 0;i < intChildLength;i++){
				document.getElementById("int").removeChild(document.getElementById("int").lastChild);
			}
		} 
		$("#wro").innerHTML = "";
		for (var i = 0;i < inter.length;i++){
			document.getElementById("int").appendChild(document.createElement("p")).innerHTML = inter[i];
			document.getElementById("int").lastChild.insertBefore(document.createElement("input"),document.getElementById("int").lastChild.lastChild).type = "checkbox";
			document.getElementById("int").lastChild.insertBefore(document.createElement("input"),document.getElementById("int").lastChild.lastChild).value = inter[i]
		}
		event.preventDefault()
	}
}
window.onload = $("#bu").addEventListener("click",userInterest.printInterest,false);
var time = {
	userTime : 0,
	getInputTime : function(){
		if ($("#time").value.match(/\d+(?=\-)|\d+$/g).length !== 3 || $("#time").value.match(/\d+(?=\-)|\d+$/g)[1] > 12 || $("#time").value.match(/\d+(?=\-)|\d+$/g)[2] > 31){
			return alert("请输入正确的时间")
		}
		var inputTime = Date.parse($("#time").value);
		if (inputTime < Date.now()){
			return alert("请输入一个未来的时间")
		}
		else {
			return inputTime
		}
	},
	printUserTime : function(){
		time.userTime = time.getInputTime();
		var span = document.getElementsByTagName("span");
		span[0].innerHTML = "  ";
		span[1].innerHTML = "  ";
		span[2].innerHTML = "  ";
		span[3].innerHTML = "  ";
		span[4].innerHTML = "  ";
		span[5].innerHTML = "  ";
		span[6].innerHTML = "  ";
		if (time.userTime === undefined){
			return false
		}
		span[0].innerHTML = $("#time").value.match(/\d+(?=\-)|\d+$/g)[0];
		span[1].innerHTML = $("#time").value.match(/\d+(?=\-)|\d+$/g)[1];
		span[2].innerHTML = $("#time").value.match(/\d+(?=\-)|\d+$/g)[2];
		event.preventDefault()
	},
	printTime : function(){
		var nowTime = Date.now();
		if(event){
			event.preventDefault();
		}
		if (time.userTime > nowTime){
			var timetime = time.userTime - nowTime;
			var day = Math.floor(timetime / 86400000);
			var hour = Math.floor((timetime % 86400000) / 3600000);
			var minute = Math.floor(((timetime % 86400000) % 3600000) / 60000);
			var second = Math.floor((((timetime % 86400000) % 3600000) % 60000) / 1000);
			var span = document.getElementsByTagName("span");
			span[3].innerHTML = day;
			span[4].innerHTML = hour;
			span[5].innerHTML = minute;
			span[6].innerHTML = second;
			setTimeout(time.printTime,1000)
		}
		else{
			span[3].innerHTML = 0;
			span[4].innerHTML = 0;
			span[5].innerHTML = 0;
			span[6].innerHTML = 0;
		}
	}
}
window.onload = $("#anniu").addEventListener("click",time.printUserTime,false);
window.onload = $("#anniu").addEventListener("click",time.printTime,false);
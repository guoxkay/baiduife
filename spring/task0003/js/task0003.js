misson = (function(){
//创建任务对象的类
	var Task = function(name,class,content){
		//定义任务名称，任务创建时间，任务完成状态，任务类别和任务内容
		this.name = name;
		this.createTime = Date.now();
		this.finish = false;
		this.class = class;
		this.content = content;
	}
	Task.prototype = {
		//定义任务对象的方法
		constructor : Task,
		//修改任务内容
		editContent : function(newContent){
			this.content = content
		},
		//改变任务完成状态
		doFinish : function(){
			if (this.finish === false){
				this.finish = true
			}
			if (this.finish === true){
				this.finish = false
			}
		},
		//修改任务名称
		editName : function(newName){
			this.name = newName
		},
		//修改任务类别
		editClass : function(newClass){
			this.class = newClass
		}
	}
	var l = localStorage;
	//读取分类列表和任务列表
	var classes = l.getItem("cla") || [];
	var tasks = l.getItem("tas") || [];
	//读取任务
	var missons = Array(tasks.length)
	for (var i = 0;i < tasks.length;i++){
		missons[i] = l.getItem(tasks[i])
	}
	return {
		//显示任务列表函数
		printClasses : function{
			var classList = document.getElementById("cc");
			for (var i = 0;i < classes.length;i++){
				var newNode = document.createElement("li");
				var newTextNode = document.createTextNode(classes[i]);
				classList.appendChild(newNode);
				classList.lastChild.appendChild(newTextNode)
			}
		}
	}

//+++++++++++++++++++++++++++
}())
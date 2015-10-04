misson = (function(){
//创建任务对象的类
	var Task = function(name,category,content){
		//定义任务名称，任务创建时间，任务完成状态，任务类别和任务内容
		this.name = name;
		this.createTime = Date.now();
		this.finish = false;
		this.category = category;
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
		editClass : function(newCategory){
			this.category = newCategory
		}
	}
	var l = localStorage;
	//读取分类列表和任务列表
	var classes = JSON.parse(l.getItem("cla")) || ["默认分类"];
	var tasks = JSON.parse(l.getItem("tas")) || [];
	//读取任务
	var missons = Array(tasks.length)
	for (var i = 0;i < tasks.length;i++){
		missons[i] = JSON.parse(l.getItem(tasks[i]))
	}
	return {
		//显示任务列表函数
		printClasses : function(){
			var classList = document.getElementById("cc");
			for (var i = 0;i < classes.length;i++){
				var newNode = document.createElement("li");
				var newTextNode = document.createTextNode(classes[i]);
				classList.appendChild(newNode);
				classList.lastChild.class = classes[i];
				classList.lastChild.appendChild(newTextNode);
				var counter = 0;
				for(k = 0;k < missons.length;k++){
					if (missons[k].Category === classes[i]){
						counter++
					}
				}
				classList.lastChild.appendChild("(" + counter + ")")
				var cha = document.createElement("img");
				classList.lastChild.appendChild(cha);
				classList.lastChild.lastChild.src = "image/delete.png"
			}
		},
		//显示某分类任务列表
		printTaskList : function(class){
			var taskList = document.getElementById("taskList")
			for (var i = 0;i < missons.length;i++){
				if (missons[i].Category === class){
					var newNode = document.createElement("li");
					var newTextNode = document.createTextNode(missons[i].name);
					taskList.appendChild(newNode);
					taskList.lastChild.class = "tasks";
					taskList.lastChild.appendChild(newTextNode);
					var cha = document.createElement("img");
					taskList.lastChild.appendChild(cha);
					taskList.lastChild.lastChild.src = "image/delete.png"
				}
			}
		},
		//给任务列表上色
		colorTask : function(){
			var taskLists = document.getElementsByClassName("tasks")
			for (var i = 0;i < taskLists.length;i++){
				if (i % 2 === 1){
					taskLists[i].style.backgroundColor = "#fafaee"
				}
			}
		},
		//显示任务详细信息
		printTask : function(task){
			document.getElementById("taskName").childNodes[0] = task.name;
			document.getElementById("createTime").childNodes[0] = task.createTime;
			document.getElementById("conts")..childNodes[0] = task.content;
		},
		//显示删除按钮
		printDeleteCha : function(){
			this.lastChild.style.display = "inline-block"
		},
		//创建新分类
		createClass : function(newClass){
			if (newClass === ""){
				return false
			}
			if (newClass.length > 10){
				alert("请输入少于十个字符的分类名");
				return false
			}
			for (i = 0;i < classes.length;i++){
				if (newClass === classes[i]){
					alert("该分类已存在");
					return false
				}
			}
			classes.push(newClass);
			l.setItem("cla",JSON.stringify(classes))
		}
		//创建新任务
		createTask : function(){
			var name = document.getElementById("inputName").value;
			var Category = document.getElementById("taskClass").value;
			var content = document.getElementById("taskCOntent").value;
			for (i = 0;i < tasks.length;i++){
				if (name === tasks[i]){
					alert("该任务已存在");
					return false
				}
			}
			var task = new Task(name,Category,content);
			tasks.push(task.name);
			l.setItem("tas",JSON.stringify(tasks));
			l.setItem(task.name,JSON.stringify(task))
		}
		//修改任务名称
	}


}())
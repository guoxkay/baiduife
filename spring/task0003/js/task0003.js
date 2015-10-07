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
misson = (function(){
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
		getClasses : function(){
			return classes
		},
		getTasks : function(){
			return tasks
		},
		getMissons : function(){
			return missons
		},
		//显示分类列表函数
		printClasses : function(){
			var classList = document.getElementById("cc");
			for (var i = 0;i < classes.length;i++){
				var newNode = document.createElement("li");
				var newTextNode = document.createTextNode(classes[i]);
				classList.appendChild(newNode);
				classList.lastChild.class = classes[i];
				classList.lastChild.addEventListener("click",function(){misson.printTaskList(this.class)},false);
				classList.lastChild.addEventListener("mouseover",misson.printDeleteCha(),false);
				classList.lastChild.addEventListener("mouseout",misson.hiddenDeleteCha(),false);
				classList.lastChild.appendChild(newTextNode);
				var counter = 0;
				for(k = 0;k < missons.length;k++){
					if (missons[k].Category === classes[i]){
						counter++
					}
				}
				classList.lastChild.appendChild("(" + counter + ")");
				var cha = document.createElement("img");
				classList.lastChild.appendChild(cha);
				classList.lastChild.lastChild.src = "image/delete.png";
				classList.lastChild.lastChild.value = newTextNode;
				classList.lastChild.lastChild.addEventListener("click",function(){misson.deleteClass(this.value)},false)
			}
		},
		//显示某分类任务列表
		printTaskList : function(class){
			var taskList = document.getElementById("taskList");
			for (var i = 0;i < missons.length;i++){
				if (missons[i].Category === class){
					var newNode = document.createElement("li");
					var newTextNode = document.createTextNode(missons[i].name);
					taskList.appendChild(newNode);
					taskList.lastChild.class = "tasks";
					taskList.lastChild.appendChild(newTextNode);
					taskList.lastChild.addEventListener("click",function(){misson.printTask(this.textContent)},false);
					taskList.lastChild.addEventListener("mouseover",misson.printDeleteCha(),false);
					taskList.lastChild.addEventListener("mouseout",misson.hiddenDeleteCha(),false);
					var cha = document.createElement("img");
					taskList.lastChild.appendChild(cha);
					taskList.lastChild.lastChild.src = "image/delete.png";
					taskList.lastChild.lastChild.value = newTextNode;
					taskList.lastChild.lastChild.addEventListener("click",function(){misson.deleteTask(this.value)})
				}
			}
		},
		/*显示已完成列表
		printFinishTask : function(){;
			var taskList = document.getElementById("taskList");
			for (var i = 0;i < missons.length;i++){
				if 暂时先不弄
			}
		}*/
		//给任务列表上色
		colorTask : function(){
			var taskLists = document.getElementsByClassName("tasks");
			for (var i = 0;i < taskLists.length;i++){
				if (i % 2 === 1){
					taskLists[i].style.backgroundColor = "#fafaee"
				}
			}
		},
		//显示任务详细信息
		printTask : function(taskName){
			for (i = 0;i < missons.length;i++){
				if (missons.name === taskName) {
					document.getElementById("taskName").setAttribute("tt",missons[i].name);
					document.getElementById("taskName").textContent = missons[i].name;
					document.getElementById("createTime").textContent = missons[i].createTime;
					document.getElementById("conts").textContent = missons[i].content;
				}
			}
		},
		//显示删除按钮
		printDeleteCha : function(){
			this.lastChild.style.display = "inline-block"
		},
		//隐藏删除按钮
		hiddenDeleteCha : function(){
			this.lastChild.style.display = "none"
		},
		//打开新增分类面板
		openAddClass : function(){
			document.getElementById("addCla2").hidden = false;
			event.preventDefault()
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
		},
		//打开创建任务面板
		openCreate : function(){
			document.getElementById("addTask").style.display = "block";
			var taskClass = document.getElementById("taskClass");
			for (var i = 0;i < classes.length;i++){
				var newNode = document.createElement("option");
				var newTextNode = document.createTextNode(classes(i));
				taskClass.appendChild(newNode);
				taskClass.lastChild.value = classes(i);
				taskClass.lastChild.appendChild(newTextNode)
			}
			event.preventDefault()
		},
		//创建新任务
		createTask : function(){
			var name = document.getElementById("inputName").value;
			var Category = document.getElementById("taskClass").value;
			var content = document.getElementById("taskCOntent").value;
			for (var i = 0;i < tasks.length;i++){
				if (name === tasks[i]){
					alert("该任务已存在");
					return false
				}
			}
			var task = new Task(name,Category,content);
			tasks.push(task.name);
			l.setItem("tas",JSON.stringify(tasks));
			l.setItem(task.name,JSON.stringify(task))
		},
		//修改任务
		editTask :  function(){
			document.getElementById("taskName").contenteditable = true;
			document.getElementById("conts").contenteditable= true;
			document.getElementById("edit").hidden = true;
			document.getElementById("done").hidden = false;
			event.preventDefault()
		},
		//修改任务完成
		editTaskDone : function(){
			var name = document.getElementById("taskName").getAttribute("tt");
			l.removeItem(name);
			for (var i = 0;i < tasks.length;i++){
				if (tasks[i] === name) {
					tasks.splice(i,1)
				};
			}
			for (var i = 0;i < missons.length;i++){
				if (missons[i].name === name){
					missons[i].name = document.getElementById("taskName").textContent;
					missons[i].content = document.getElementById("conts").textContent;
					l.setItem(missons.name,JSON.stringify(task));
					tasks.push(missons.name);
					l.setItem("tas",JSON.stringify(tasks));
					document.getElementById("taskName").getAttribute("tt") = missons[i].name;
				}
			}
		},
		//删除任务
		deleteTask : function(taskName){
			l.removeItem(taskName);
			for (var i = 0;i < tasks.length;i++){
				if (tasks[i] === taskName){
					tasks.splice(i,1)
				}
			}
			l.setItem("tas",JSON.stringify(tasks))
		},
		//删除分类及该分类下任务
		deleteClass : function(className){
			for (var i = 0;i < classes.length;i++){
				if (classes[i] === className){
					classes.splice(i,1)
				}
			}
			l.setItem("cla",JSON.stringify(classes));
			for (var i = 0;i < missons.length;i++){
				if (missons.category === className) {
					misson.deleteTask(missons.name)
				};
			}
		},
		//修改任务完成状态
		finished : function(){
			var name = document.getElementById("taskName").textContent;
			for (var i = 0;i < missons.length;i++){
				if (missons[i] === name){
					if (missons[i].finish){
						missons[i].finish = false
					}
					else {
						missons[i].finish = true
					}
				l.setItem(missons[i].name,JSON.stringify(missons[i]))
				}
			}
			event.preventDefault()
		}
	}
}())
document.getElementById("addCla").addEventListener("click",misson.openAddClass,false);
document.getElementById("addTas").addEventListener("click",misson.openCreate,false);
document.getElementById("taskGo").addEventListener("click",misson.createTask,false);
document.getElementById("fin").addEventListener("click",misson.finished,false);
document.getElementById("edit").addEventListener("click",misson.editTask,false);
document.getElementById("done").addEventListener("click",misson.editTaskDone,false);
misson.printClasses();
misson.printTaskList(misson.getClasses()[0]);
misson.colorTask();
misson.printTask(misson.getTasks()[0]);


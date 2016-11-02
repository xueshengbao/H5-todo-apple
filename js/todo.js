$(function(){
	//添加按钮
	var add=$("#header .add");
	//输入框
	var input=$("#header input");
	//生成内容部分
	var ul=$("#uls");
	//创建数组
	var todos=[];
//	接触其实位置
	var a;
	
	
	//完成、未完成切换
	
	ul.on("touchstart",'li',function(e){
		
		 a = e.originalEvent.changedTouches[0].clientX;
		
		
	})
	ul.on("touchend",'li',function(e){
		
		var b = e.originalEvent.changedTouches[0].clientX;
		if(b-a>50){				
			$(this).addClass("done");
			todos[$(this).index()].state=1;
			localStorage.todos=JSON.stringify(todos);
		}
		if(b-a<-50){
			$(this).removeClass("done");
			todos[$(this).index()].state=0;
			localStorage.todos=JSON.stringify(todos);
		}
	})
	
	
	//添加数据
	
	if(localStorage.todos){
		todos=JSON.parse(localStorage.todos);
		for(var i=0;i<todos.length;i++){
			var c=(todos[i].state)?'done':'';
			$('<li class="'+c+'"><div class="content">'+todos[i].name+'</div><div class="delete">×</div></li>').appendTo(ul);
		}
		
	}
	
	//添加内容
	
	add.on("touchend",function(){
		var v=$.trim(input.val())
		if(!v){
			return;
		}
		var todo={
			name:v,
			state:0
		}
		todos.push(todo);
		localStorage.todos=JSON.stringify(todos)
		$('<li><div class="content">'+v+'</div><div class="delete">×</div></li>').appendTo(ul);
		input.val('').focus();		
	})
	
	
	var divs=$("#floor div");
	console.log(divs)
	divs.on("touchend",function(){
		
		
		divs.removeClass("index");
		$(this).addClass("index");
		var data=$(this).attr('data-role');
		ul.find("li").show();
		console.log(this)
		if(data==='ac'){
			$(this).addClass("index");
			ul.find("li").hide();
			ul.find("li.done").show();
		}
		if(data==='co'){
			$(this).addClass("index");	
			ul.find("li").show();
			ul.find("li.done").hide();
		}
	})
//	var all=$("#floor .all");	
//	var active=$("#floor .active");
//	var completed=$("#floor .completed");
//	all.on("click",function(){
//		$("#floor div").removeClass("index");
//		all.addClass("index");
//		ul.find().
//	})
	
	//li右侧消除按钮
	
	ul.on("touchend",".delete",function(){
		var index=$(this).closest("li").index();
		todos.splice(index,1);
		localStorage.todos=JSON.stringify(todos);
		$(this).closest("li").addClass("delete-d")
		$(this).closest("li").delay(600).queue(function(){
			$(this).remove().dequeue();
		})
		
		
	})
	
	//删除已完成
	var clear=$(".all-clear");
	clear.on("touchend",function(){
		var newtodos=[];
		for(var i=0;i<todos.length;i++){
			if(todos[i].state===0)
			newtodos.push(todos[i]);
		}
		todos=newtodos;
		localStorage.todos=JSON.stringify(todos);
		var lis=ul.find("li.done")
		
		lis.delay(600).queue(function(){
			$(this).addClass("delete-d").dequeue().delay(600).addClass("delete-d").queue(function(){
				$(this).remove().dequeue();
			});
		})
		
	})
	
	
	
	
	
	
	
})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	




	
	
	
	
	
	
	
	

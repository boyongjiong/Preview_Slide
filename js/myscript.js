	/* 1.首先定义数组data(实际生产环境中，应由后台给出) */
	var data = [
		{img:1,h2:"Creative",h3:"DULT"},
		{img:2,h2:"Friendly",h3:"DEVIL"},
		{img:3,h2:"Tranquilent",h3:"COMPATRIOT"},
		{img:4,h2:"Insecure",h3:"HUSSLER"},
		{img:5,h2:"Loving",h3:"REBEL"},
		{img:6,h2:"Passionate",h3:"SEEKER"},
		{img:7,h2:"Crazy",h3:"FRIEND"},
	];

	/* 2.通用函数（获取一个dom元素的通用方法） */
	var g = function(id){
		if(id.substr(0,1) == "."){
			return document.getElementsByClassName(id.substr(1));
		}
		return document.getElementById(id);
	}

	/* 3.添加幻灯片的操作（所有幻灯片&对应的按钮） */
	function addSliders(){
		//3.1获取模板
		var tplMain = g("template-main").innerHTML
				.replace(/^\s*/,"")
				.replace(/\s*$/,"");
		var tplCtrl = g("template-ctrl").innerHTML
				.replace(/^\s*/,"")
				.replace(/\s*$/,"");
		//3.2定义最终输出 HTML 的变量
		var outMain = [];
		var outCtrl = [];

		//3.3遍历所有数据，构建最终输出HTML
		for(i in data){
			var _htmlMain = tplMain
						.replace(/{{index}}/g,data[i].img)
						.replace(/{{h2}}/g,data[i].h2)
						.replace(/{{h3}}/g,data[i].h3)
						//
						.replace(/{{css}}/g,["","main-i_right"][i%2]);
			var _htmlCtrl = tplCtrl
						.replace(/{{index}}/g,data[i].img);

			outMain.push(_htmlMain);
			outCtrl.push(_htmlCtrl);
		}

		//3.4 把HTML回写到对应的DOM里面
		g("template-main").innerHTML = outMain.join("");
		g("template-ctrl").innerHTML = outCtrl.join("");

		//7.1增加 #main-background
		g("template-main").innerHTML += tplMain
						.replace(/{{index}}/g,"{{index}}")
						.replace(/{{h2}}/g,data[i].h2)
						.replace(/{{h3}}/g,data[i].h3);
		g("main-{{index}}").id = "main-background";
	}
	/* 4.幻灯片切换 */
	function switchSlider(n){
		//4.1获得要展现的幻灯片&dom元素
		var main = g("main-"+n);
		var ctrl = g("ctrl-"+n);

		//4.2获得所有的幻灯片以及控制按钮
		var clearMain = g(".main-i");
		var clearCtrl = g(".ctrl-i");

		//4.3清除它们的 active 样式
		for(i=0; i<clearCtrl.length; i++){

			clearMain[i].className = clearMain[i].className
					.replace(" main-i_active","");
			clearCtrl[i].className = clearCtrl[i].className
					.replace(" ctrl-i_active","");
		} 

		//4.4 为当前控制按钮和幻灯片添加附加样式
		main.className += " main-i_active";
		ctrl.className += " ctrl-i_active";

		//7.2 切换时，复制上一张幻灯片到 main-background 中
		setTimeout(function(){
			g("main-background").innerHTML = main.innerHTML;
		},1000);
	}
	
	/* 6.动态调整图片的margin-top 以使其垂直居中 */	
	function movePictures(){
		var pictures = g(".picture");
		for(i=0; i<pictures.length; i++){
			pictures[i].style.marginTop = (-1 * pictures[i].clientHeight/2) + "px";
		}
	}
	/* 5.定义何时处理幻灯片输出 */
	window.onload = function(){
		addSliders();
		switchSlider(1);
		setTimeout(function(){
		movePictures();
		},100);
	}

	//弹性最佳方案：addLoadEvent函数 唯一的参数是打算在页面加载完毕执行函数的名字
	// function addLoadEvent(func){
	// 	var oldonload = window.onload;
	// 	if(typeof window.onload != "function"){
	// 		window.onload = func;
	// 	}
	// 	else{
	// 		window.onload = function(){
	// 			oldonload();
	// 			func();
	// 		}
	// 	}
	// }

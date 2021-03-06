/*
*封装一个获取元素的样式函数 兼容性设置
*
*/
function getStyle(obj,attr){
		if(window.getComputedStyle){
			return getComputedStyle(obj,null)[attr];
		}else{
			return obj.currentStyle[attr];
		}
}
/*
*
*封装一个移动的动画
*参数：
*obj:要执行动画的对象
* attr:要执行动画的样式；比如left top width height
* target：执行动画的目标位置
* speed:移动的速度，（正数向右移动，负数向左移动）
* callback:回调函数，这个函数将会在动画执行完毕以后执行
*/
function move(obj,attr,target,speed,callback){
	// 关闭上一个定时器
	clearInterval(obj.timer)
	// 获取元素目前的位置
	var current = parseInt(getStyle(obj,attr));
	// 判断速度的正负值
	// 如果是从0-800，则speed正的
	// 如果是800-0,则speed负的
	if(current>target){
		speed=-speed;
	}
	// 开启一个定位器，用来执行动画效果
	// 向执行动画的对象中添加一个timer属性，用来保存自己的定时器的标识
	obj.timer=setInterval(function(){
		// 获取obj原来的left的值
		var oldValue = parseInt(getStyle(obj,attr));
		// 在旧的值基础上增加
		var newValue = oldValue + speed;
		// 判断newValue是否大于800
		// 向左移动时，需要判断newValue是否小于target
		// 向右移动时，需要判断newValue是否大于target
		if((speed<0&&newValue<target)||(speed>0&&newValue>target)){
			newValue=target;
		}
		// 将新值付给obj
		obj.style[attr]=newValue + "px";
		// 当元素移动到0px时，使其停止执行动画
		if(newValue == target){
			// 达到目标，关闭定时器
			clearInterval(obj.timer);
			//动画执行完毕，调用回调函数
			callback&&callback();
		}
	},30)
}
//定义一个函数，用来向一个元素中添加指定的class属性值
/*
*参数:
* obj 要添加class属性的元素
* cn 要添加的class值
*/
function addClass(obj,cn){
	// 检查obj中是否含有cn
	if(!hasClass(obj,cn)){
		obj.className += " "+ cn;
	}
}

/*
*判断一个元素中是否含有指定的class属性值
* 如果有class,则返回true,没有返回false
*/
function hasClass(obj,cn){
	var reg = new RegExp("\\b" + cn  + "\\b");
	return reg.test(obj.className);
}

/*
*删除一个元素中的指定的class属性
*/
function remove(obj,cn){
	// 创建一个正则表达式
	var reg = new RegExp("\\b" + cn + "\\b");
	obj.className = obj.className.replace(reg,"");
}

/*
* toggleClass可以用来切换一个类
*/
function toggleClass(obj,cn){
	//判断obj中是否含有cn
	if(hasClass(obj.cn)){
		removeClass(obj,cn);
	}else{
		addClass(obj,cn);
	}
}
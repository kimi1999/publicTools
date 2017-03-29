// JavaScript Document
/**
 *version: 1.0
 *author: luckyzhangxf@163.com
 *date: 2014/05/19
 *describe: 我的JS工具函数积累
 *	1.随机打乱数组（不太乱/非常乱）
 *	2.选项卡切换
 *
 */
 
/**
 * 1.1  随机打乱数组,js内置函数  （不太乱）
 */
 function muddledArray(myArr){
	 return myArr.sort(function(){return Math.random()>0.5?-1:1;}) ;
	 }
/**
 * 1.2  随机打乱数组  （非常乱）
 */
function mixArray(myArr){
	var aArr = myArr,
		num = myArr.length;
	for (var i = 0; i < num; i++) {  
            var iRand = parseInt(num * Math.random());  
            var temp = aArr[i];  
            aArr[i] = aArr[iRand];  
            aArr[iRand] = temp; 
        }  
      return aArr; 
	}

/**
 * 1.3  数组逆序
 */	
arr.reverse();//只会讲原数组 逆序 不会创建新数组（如果想要保留原数组 则需要new一个数组等于原数组 然后逆序这个新数组）

/**
 * 1.3.1 将数组逆序后返回
 *   @param  arr : 逆序前的数组（array）
 *   @return reArr : 逆序后的数组（array）
 */	
function getReverse(arr){
	var reArr = [];
	for(var i=arr.length-1; i>=0; i--){
		reArr.push(arr[i]);
		}
	return reArr;
	}

/**
 * 1.4. 冒泡排序  
 *
 *  @param  arr : 每个元素为字符串 的数组  （array）。
 *  @return   将数组中的元素 按字节长度 从小到大 排序后返回。
 *  注： 基于 3.1 
 */
function bubbleSort(arr){//（将数组中的元素按照 字节长度有小到大 排序）
	for(var i=0; i<arr.length; i++){
		for(var j=i; j<arr.length; j++){
			if( arr[j].byteLength() < arr[i].byteLength()){
				var temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
				}
			}
		}
	return arr;
	}	
/**
 * 1.5. 将数组中的全部元素 分堆（每num个构成一个小数组）
 *   @param  arr : 分堆前的数组（array）
 *   @param  num : 每多少个 分一堆 (number)
 *   @return reArr : 分堆后的数组（array）
 */	
function pilesArr(arr,num){
	var reArr = [],
		pileNo = Math.ceil(arr.length/num);
	for(var i=1;i<=pileNo; i++){
		var smallArr = [],
			maxJ = i*num>arr.length ? arr.length : i*num;
		for(var j=(i-1)*num; j<maxJ; j++){
			smallArr.push(arr[j]);
			}
		reArr.push(smallArr);
		}
	return reArr;
	} 	
/**
 * 1.6. 去除数组中的重复元素
 *   @param  arr : 需要去重复的数组（array）
 *   @return reArr : 去除重复后的数组（array）
 */	
function deleRepeatOfArr(arr){
	var reArr = arr;
	for(var i=0; i<reArr.length; i++){
		for(var j=i+1; j<reArr.length; j++){
			if(reArr[j]==reArr[i]){
				reArr.splice(j,1);
				}
			}
		}
	return reArr;
	}

	
/**
 * 2  选项卡切换
 *   tabs:选项卡
 *   contents:内容区
 *   trigFun:触发事件
 *   ckClass:选中选项卡 的class
 *   cbFun: 回调函数(可选)
 */
function changeTabs(tabs,contents,trigFun,ckClass,cbFun){
	tabs.on(trigFun,function(){
		$(this).removeClass(ckClass);
		tabs.eq($(this).index()).addClass(ckClass);
		contents.hide();
		contents.eq($(this).index()).show();
		if(cbFun) return cbFun
		});
	}

/*****************************3*************************************/	 
/**
 *3.1. 计算字符串的字节长度   
 *      <!--   /[^\x00-\xff]/g   匹配任意个双字节的字符 包括汉字  -->
 *      <!--   /[\u4e00-\u9fa5]/g   匹配任意个中文字符  -->
 */
String.prototype.byteLength = function(){
		return this.replace(/[^\x00-\xff]/g,'xx').length;
	}
String.prototype.byteLength1 = function(){
		var len=0;
		for(var i=0; i<this.length; i++){
			if(this.charCodeAt(i)>255){len +=2;}
			else{len++;}
			}
		return len;	
	}
//通过指定的charCode得到字符串	
var test = String.fromCharCode(256, 108, 97, 105, 110); 	
console.info(test);
	 
/**
 *3.2. 按照最大字节长度截取字符串
 *   num:最大长度
 */	
String.prototype.getSubString = function(num){
	var str = this,len = 0,result = "";
	for(var i=0;len<=num;i++){
		if(str.charCodeAt(i) > 255){
			len += 2;
			if(len <= num){
				result += str.charAt(i);
			}else{
				break;
			}
		}else{
			len++;
			if(len <=num){
				result += str.charAt(i);
			}else{
				break;
			}
		}
	}
	return result;
}

/**
 * 3.3  获得输入框剩下可输入 字符长度
 *   textarea:输入框的jQuery对象
 *   totalLen:允许输入的最大   字节长度（一个汉字为两个字节）
 */
function getInputRestLen(textarea,totalLen){
	var MAX = totalLen,//可输入的最大字节长度
		text = textarea.val(),
		restLength = MAX;
	textarea.on("keyup",function(e){
		if(e.keyCode != 13){//回车键 
			if(text.byteLength() > MAX){
				text = text.getSubString(MAX);
				textarea.val(text);
				}
			restLength = MAX - text.byteLength();
			if (restLength < 0) {
				restLength = 0;
				textarea.attr("readonly","readonly");
				}
			}
		});
	return restLength;
	}
/*****************************3*************************************/	 

/**
 * 4  轮播
 *   playType : 轮播类型 默认为0 ： 单纯的隐藏显示 1 ： 左右滑动
 *   mainArea : 轮播大区域  鼠标划入该区域 停止轮播
 *   content : 轮播内容总区域  jQuery对象
 *   targ : 轮播中每一小块儿 外围的html标签
 *   left : 左翻 按钮
 *   right : 右翻 按钮
 *   indexBtn : 直跳按钮 按钮
 *   indexBtnAc : 直跳按钮 选中的 class
 *	 autoFlag : 是否自动轮播 默认 否
 *	 autoTimer ： 轮播间隔  默认5秒
 *
 */
function shuffling(settings){
	this.playType = settings.playType || 0;
	this.mainArea = settings.mainArea;
	this.content = settings.content;
	this.targ = settings.targ;
	this.left = settings.left || null;
	this.right = settings.right || null;
	this.indexBtn = settings.indexBtn || null;
	this.indexBtnAc = settings.indexBtnAc;
	this.autoFlag = settings.autoFlag || false;
	this.autoTimer = settings.autoTimer || 5000;
	this.init().bindEvent();
	}
shuffling.prototype = {
	init : function(){
		this.scrollIng = false;
		this.aLength = this.content.find(this.targ).length;
		if(this.playType==1){//轮播类型为1  左右滑动 先克隆 第一个和最后一个 实现无缝轮播
			this.aWidth = this.content.find(this.targ).width();
			var newHtml = this.content.html();
			newHtml += newHtml + newHtml;
			this.content.html(newHtml);
			this.content.css({position:"absolute",width:this.aLength*3*this.aWidth ,left:-(this.aWidth*this.aLength)});
			}
		this.nowIndex = 0;
		this.targetIndex = 0;
		if(this.autoFlag){
			this._autoPlay();
			}
		return this;
		},
	bindEvent : function(){
		var self = this;
		if(self.right){//右翻
			self.right.on("click",function(){
				if(!self.scrollIng){
					self.targetIndex ++;
					self.scroll("right");
					}
				});
			}
		if(self.left){//左翻
			self.left.on("click",function(){
				if(!self.scrollIng){
					self.targetIndex --;
					self.scroll("left");
					}
				});
			}
		if(self.indexBtn){//直接跳转 按钮
			self.indexBtn.on("click",function(){
				if(!self.scrollIng){
					self.targetIndex = $(this).index();
					self.scroll("right");
					}
				});
			}
		if(self.autoFlag){
			self.mainArea.on("mouseenter",function(){//若允许自动轮播 鼠标划入轮播区域 停止轮播
				clearInterval(self.timer);
				})
				.on("mouseleave",function(){//鼠标滑出轮播区域 开始轮播
					self._autoPlay();
					});
			}
		},
	scroll : function(type){
		if(this.scrollIng)return false;
		this.scrollIng = true;
		var self = this;
		if(self.targetIndex < 0) self.targetIndex = self.aLength-1;
		else if(self.targetIndex >= self.aLength) self.targetIndex = 0;
		if(self.playType == 1){
		var targetLeft = parseInt(this.content.css("left"));
		switch(type){
			case "right":
				targetLeft -= self.aWidth;
				break;
			case "left":
				targetLeft += parseInt(self.aWidth);
			}
		self.content.animate({left:targetLeft + "px"},500,function(){
			if(self.targetIndex == 0){
				self.content.css("left",-(self.aWidth * self.aLength) + "px");
				}
			else if(self.targetIndex == self.aLength - 1){
				self.content.css("left",-(self.aWidth * (self.aLength - 1)) + "px");
				}
			self.scrollIng = false;
			});
			}
		else{
			self.content.find(self.targ).hide();
			self.content.find(self.targ).eq(self.targetIndex).show();
			self.scrollIng = false;
			}
		if(self.indexBtn){
			self.indexBtn.removeClass(self.indexBtnAc);
			self.indexBtn.eq(self.targetIndex).addClass(self.indexBtnAc);
			}
		self.nowIndex = self.targetIndex
		},
	_autoPlay : function(){
		var self = this;
		self.timer = setInterval(function(){
				self.targetIndex++;
				self.scroll("right");
				},self.autoTimer);
		}
		
	}
	
/**
 *5.1  将指定格式的时间转换成时间戳  （如2014/05/19 16:30:32  转化成  Date {Thu Jun 19 2014 16:30:32 GMT+0800}）
 */
function strToDate(str){
	var YY = str.substr(0,4),// 年
		MM = str.substr(5,2),// 月
		DD = str.substr(8,2),// 日
		hh = str.substr(11,2),// 时
		mm = str.substr(14,2),// 分
		ss = str.substr(17,2);// 秒
	return new Date(YY,MM,DD,hh,mm,ss);
	}
/**
 * 6. 将URL后面的参数转换成一个对象
 *     url : url地址
 */	
function urlParamToObj(url){
	var reg_url =/^[^\?]+\?([\w\W]+)$/,
        reg_para=/([^&=]+)=([\w\W]*?)(&|$)/g, //g is very important
        arr_url = reg_url.exec( url ),
        ret        = {};
    if( arr_url && arr_url[1] ){
        var str_para = arr_url[1],result;
        while((result = reg_para.exec(str_para)) != null){
            ret[result[1]] = result[2];
        }
    }
    return ret;
	
	}
/**
 * 7. 点赞 点击后 “+1” 飘过效果
 *     settings : 传入参数
 */	
function voteAffterAnimate(settings){
	var voteArea = settings.voteArea,//投票/点赞 点击区域
		affterText = settings.affterText || "+1",//需要飘过的文字说明
		pageY = settings.pageY,//动画框 初始时 距离页面顶部的距离
		pageX = settings.pageX;//动画框 初始时 距离页面左边的距离
	if(!$("#afterVoteDiv")[0]){
		var str = '<div id="afterVoteDiv" style="position:absolute;top:'+pageY+'px;left:'+pageX+'px;z-index:100000;color:red; width:100px; height:30px; line-height:30px; text-align:center; font-size:15px; font-weight:bolder; display:none;">'+affterText+'</div>';
		$("body").append(str);
		}
		
	var oldTop = pageY;
	var movIng = false;
	voteArea.on("click",function(){
		$("#afterVoteDiv").css({"top":oldTop+"px","filter":"alpha(opacity=1)","opacity":"1"});	
		if(!movIng){
			movIng = true;
			$("#afterVoteDiv").show();
			$("#afterVoteDiv").animate({"top":oldTop-50+"px","filter":"alpha(opacity=0)","opacity":"0"},2000,function(){
				$("#afterVoteDiv").hide();
				movIng = false;
				});
			}
		
		});
	}
/**
 * 8. 鼠标划入指定区域 隐藏的小窗口出现  鼠标离开该区域和小窗口时 小窗口隐藏
 */	
function showOrHide(btn,content){
	var mInContent = true;
	btn.on("mouseenter",function(){
		content.slideDown("normal");
		}).on("mouseleave",function(){
			mInContent = false;
			var timer = setTimeout(function(){
				if(!mInContent){
					content.hide();
					}
				clearTimeout(timer);
				},20);
			});
	content.on("mouseenter",function(){
		mInContent = true;
		}).on("mouseleave",function(){
			$(this).hide();
			mInContent = false;
			});
	}
/**
 * 9. 不足10 的数字前面补0
 */
function addZero(num){
	var nu = parseInt(num);
	return nu>=10 ? nu : "0"+nu;
	}
/**
 * 10. 初始化图片尺寸 
 *  载入图片前 在img标签中onload 时 执行 onload="sizeChange(this,80)"   按照 指定宽度或高度 等比缩放图片
 *
 */
function sizeChange(obj,limitWidth) {
	var _width = obj.clientWidth;
	var _height = obj.clientHeight;
	if (_width >= _height) {
		obj.style.height = limitWidth;
		} 
	else {
		obj.style.width = limitWidth;
		}
	}
/**
 * 11. 获取服务器时间
 *
 */
function getServerTime(){
	var httpRequest,
		ServerDate;
	if(window.ActiveXobject){
		httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
		}
	else if(window.XMLHttpRequest){
		httpRequest = new XMLHttpRequest();
		}
	httpRequest.open('HEAD','.',false);//获取服务器时间，XHR不能跨域!!!
	httpRequest.send(null);
	ServerDate = new Date(httpRequest.getResponseHeader('Date'));
	return new Date(ServerDate);
	}
/**
 * 12. 判断是否为闰年  
 *
 *  @param  year : 传入年份  （string 或者 number）
 *  @return   true ,是闰年； false ,不是闰年  （Boolean）
 */
function isLeapYear(year){
	var reg = /^\d+$/g;
	if(reg.test(year)){
		var y = parseInt(year);
		return ((y%4==0&&y%100!=0)||(y%100==0&&y%400==0)) ? true : false;
		 }
	else{
		throw '年份必须是纯数字.....';
		return false;
		}
	}
	
/**
 * 13. 判断是否为正确的手机号码
 *
 *  @param  phone : 传入要验证的字符串  （string 或者 number）
 *  @return   true ,是合法的手机号码； false ,不是合法的手机号码  （Boolean）
 */
function isPhoneNo(phone){
	var reg = /^1[38]{1}[0-9]{9}$|^15[012356789]{1}[0-9]{8}$/;
	if(/^\d+$/g.test(phone)){
		if(reg.test(phone)) return true;
		else return false;
		}
	else{
		throw '手机号码只能是纯数字.....';
		return false;
		}
	
	}
/**
 * 14. PC端 金额输入框初始化
 *
 *  @param   v : 输入框已经输入的值  （string）
 *  @param   code ,当前按键 的keyCode 
 *  @param   o ,要初始化的 输入框  jQuery对象
 */
 
function checkNumInput(v,code,o){
	var keyCodes = "96,97,98,99,100,101,102,103,104,105,110";
	if(keyCodes.indexOf(code) == -1) o.val(v.substring(0,v.length-1));
	else{
		if(code == 96){
			if(v == "00") o.val("0");
			}
		else{
			if(code==110){
				if(v.length==1) $(this).val("0.")
				else if(v.substring(0,v.length-1).indexOf(".") != -1){
					o.val(v.substring(0,v.length-1));
					}
				}
			if(/^0\d+/.test(v)) o.val(v.substring(1));
			}
		}
	}
/*	用法 如下
$("#highPrice").on("keyup",function(e){
	var v = $(this).val(),
		code = e.keyCode;
	checkNumInput(v,code,$(this));
	});
*/	


/**
 * 15. 检测滚动条是否到达窗口底部
 *
 */
$(window).on("scroll",function(){
		var a = document.documentElement.scrollTop==0? document.body.clientHeight : document.documentElement.clientHeight;
		var b = document.documentElement.scrollTop==0? document.body.scrollTop : document.documentElement.scrollTop;
		var c = document.documentElement.scrollTop==0? document.body.scrollHeight : document.documentElement.scrollHeight;
		if(a+b>=c){
			//滚动条 已经 滚动到最底部
			}
		}); 
 
/**
 * 16. 检测页面是否加载完成
 */
document.onreadystatechange = checkLoading;//判断页面加载到什么进度
function checkLoading(){
	if(document.readyState == "complete"){//加载完成
		//Uninitialized   未初始化
		//Loading         载入
		//Loaded          载入完成
		//Interactive     交互
		//complete        页面加载完
		}
	} 
/**
 * 17. 给dom元素添加事件监听 兼容各种浏览器
 *   @param  elm : 添加事件监听的html元素 （DOM Object）
 *   @param  evType : evType 监听的事件类型 需要监听多个事件  用空格隔开 如：“mousedown”   （String）
 *   @param  fn : elm元素监听到type事件后执行函数
 * " click focus keyup input propertychange "
 */	
function addEvent(elm, evType, fn) {
	var typeArr = evType.split(' ');
	for(var i=0; i<typeArr.length; i++){
		if (elm.addEventListener) {
			elm.addEventListener(typeArr[i], fn);//DOM2.0
			}
		else if (elm.attachEvent) {
			elm.attachEvent('on' + typeArr[i], fn);//IE5+
			}
		else {
			elm['on' + typeArr[i]] = fn;//DOM 0
			}
		}
	} 
/**
 * 18. jQuery ajax实例 （超时 和 error 怎么用）
 *
 */	
var ajaxTimeoutTest = $.ajax({
	url : url,//请求地址
	type : "get",//请求方式 get（ 若为post 者传递的参数 用data 属性）
	dataType : "json",//返回数据的格式 （有：text、html、xml、json、jsonp<跨域>）
	timeout:10000,//超时时间 10s
	success : function(data){//请求成功
		
		},
	error:function(XMLHttpRequest,textStatus,errorThrown){//请求失败
		//XMLHttpRequest   请求对象 
		//textStatus       错误信息 （"timeout", "error", "notmodified" 和 "parsererror"。）
		//errorThrown      可能捕获的错误对象 
		/*
		 XMLHttpRequest.readyState: 
		 	0 － （未初始化）还没有调用send()方法 
			1 － （载入）已调用send()方法，正在发送请求 			
			2 － （载入完成）send()方法执行完成，已经接收到全部响应内容 		
			3 － （交互）正在解析响应内容 			
			4 － （完成）响应内容解析完成，可以在客户端调用了
		XMLHttpRequest.status:
		//很多
		*/
		},
	complete : function(XMLHttpRequest,textStatus){//请求完成后的回调函数（失败成功均执行）
		//XMLHttpRequest   请求对象 
		//textStatus       成功信息/错误信息（"timeout", "error", "notmodified" 和 "parsererror"。）
		}
	});
/**
 * 19. 通过客户端是否有touch事件 判断是触屏手机还是PC端 
 *
 */
function isTouchDevice(){
	return ("createTouch" in document) || ('ontouchstart' in window); 
	} 
		
		
/**
 * 20. 输出的时候改变   原样输出（如 &lt;在页面原样输出：&lt;           <在页面原样输出<） 
 *  
 *  html常用转义字符实体名称  和 实体编号 对应表   http://114.xixik.com/character/
 */	
function replaceHtmlEscapeStr(str){
		return str.replace(/\&/g,"&#38").replace(/\</g,"&lt;").replace(/\>/g,"&gt;")
		}


/**
 * 21. html5画布 将页面置灰的方法 
 *   @param imgs 需要置灰的img数组  dom对象 组成的数组
 *
 * 用法如下：
	var imgs = document.getElementsByTagName("img");	
	grayscaleImgs(imgs)
 */		
function grayscaleImgs(imgs){
	/*html5 画布将彩色图片画成灰色的方法 图片需和页面同源 需有服务器支持*/
	var myGrayFun = function(src) {
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var imgObj = new Image();
		imgObj.src = src;
		imgObj.onload = function() { 
			if (imgObj.width != canvas.width){
				canvas.width = imgObj.width;
				}
			if (imgObj.height != canvas.height){
				canvas.height = imgObj.height;
				}
		} 
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(imgObj, 0, 0);
		
		var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
		for (var y = 0; y < imgPixels.height; y++) {
			for (var x = 0; x < imgPixels.width; x++) {
				var i = (y * 4) * imgPixels.width + x * 4;
				var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				imgPixels.data[i] = avg;
				imgPixels.data[i + 1] = avg;
				imgPixels.data[i + 2] = avg;
			}
		}
		ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		return canvas.toDataURL();
		}
		
	for(var i=0; i<imgs.length;i++){
		var oldSrc = imgs[i].src;
		imgs[i].src = grayscaleImg(oldSrc);
		}	
	}

/**
 * 22. 初始化输入框的光标位置在左边  当输入框有值时 光标在左边该值的后面
 *   @param iputDom  需要初始化的输入框的 DOM 对象
 *
 */	
function initInputCursorPos(iputDom){
	var pos = iputDom.value.length;
	if(iputDom.setSelectionRange) {
		iputDom.focus(); 
		iputDom.setSelectionRange(pos,pos); 
		} 
	else if (iputDom.createTextRange){
		var range = iputDom.createTextRange(); 
		range.collapse(true); 
		range.moveEnd('character', pos); 
		range.moveStart('character', pos); 
		range.select(); 
		}
	}
/**
 * 23. 禁止form表单中 输入框的 回车提交事件 （可以检测输入框的keyDown 事件 在表单提交前执行某些方法 发请求等 然后在js中提交表单 ）
 *   @param formDom  需要禁止回车提交的form表单 DOM 对象
 *
 */	
function forbidEnterSubmitForm(formDom){
	formDom.onkeyPress = function(e){
		e=e||window.event;
		if((e.which||e.keyCode) == 13){
			return false;
			}
		}
	}	
/**
 * 24. 鼠标滚轮 上下滚动时 执行不同的方法 （在被监听区域 滚动滚轮 页面的滚动条不会 滚动）
 *   @param elm  需要添加鼠标滚动监听的元素 DOM 对象
 *   @param dFun  滚轮  向下滚动 执行的方法
 *   @param uFun  滚轮  向上滚动 执行的方法
 *   注:  后面 注释掉的部分和和三元表达式那一行 是等效的  方便理解 留那里          这个方法 需要前面  addEvent()   的支持 
 */	
function addMouseWheel(elm,dFun,uFun){
	addEvent(elm,"mousewheel DOMMouseScroll",function(e){
		var e = e || window.event;
		e.preventDefault();
		e.wheelDelta ? (e.wheelDelta>0 ? uFun() : dFun()) : (e.detail<0 ? uFun() : dFun());
		return false;
		/*
		if(e.wheelDelta){<!--其他浏览器-->	
			if(e.wheelDelta>0){
				//alert("滚轮向上滚了  001");
				uFun();
				}
			else{
				//alert("滚轮向下滚了  002");
				dFun();
				}
			}
		else{<!--针对火狐 3.5-->	
			if(e.detail<0){
				//alert("滚轮向上滚了  003");
				uFun();
				}
			else{
				//alert("滚轮向下滚了  004");
				dFun();
				}
			}
		*/
		});
	}	
	
/**
 * 25. 通用 倒计时 方法
 */		
function zxf_countdown(obj){
    var now = new Date(),
        tomorrow = new Date;
    tomorrow.setDate(tomorrow.getDate()+1);
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);
    this.startDate = obj.startDate || now;
    this.endDate = obj.endDate || tomorrow;
    this.cb = obj.cb || null;
    this.timer = null;
    this.needDay = obj.needDay || false;
    this.init();
}
zxf_countdown.prototype = {
    init: function(){
        var str2Time = function(d){
            var retD = null;
            if(typeof d == "string"){
                var dt = new Date(),
                    dArr = d.split(/\D/g);
                if(dArr[0]){dt.setFullYear(dArr[0]);}
                if(dArr[1]){dt.setMonth(parseInt(dArr[1])-1)}
                if(dArr[2]){dt.setDate(dArr[2])}
                if(dArr[3]){dt.setHours(dArr[3])}
                if(dArr[4]){dt.setMinutes(dArr[4])}
                if(dArr[5]){dt.setSeconds(dArr[5])}
                retD = dt;
            }
            else{
                retD = d;
            }
            return retD.getTime();
        }
        this.startTime = str2Time(this.startDate);
        this.endTime = str2Time(this.endDate);
        this.timeGap = this.endTime-this.startTime;
        console.log(this.timeGap);
        this.secendsOfDay = 24*60*60;
        this.secendsOfHour = 60*60;
        this.secendsOfMinute = 60;
        this.countDown();
        return this;
    },
    countDown: function(){
        var self = this;
        self.timer = setInterval(function(){
            self.timeGap -= 1000;
            if(self.timeGap<0){
                self.timeGap = 0;
                clearInterval(self.timer);
            }
            self.doCallBack();
        },1000);
        return this;
    },
    doCallBack: function(){
        var addZero = function(str){
            return parseInt(str)>=10 ? parseInt(str) : "0"+parseInt(str);
        }
        if(this.cb){
            var restTime = "",
                timeGap = this.timeGap;
            if(this.needDay){
                restTime += addZero(timeGap/(this.secendsOfDay*1000))+"天";
                timeGap = timeGap%(this.secendsOfDay*1000)
            }
            restTime += addZero(timeGap/(this.secendsOfHour*1000))+":";
            timeGap = timeGap%(this.secendsOfHour*1000);
            restTime += addZero(timeGap/(this.secendsOfMinute*1000))+":";
            timeGap = timeGap%(this.secendsOfMinute*1000);
            restTime += addZero(timeGap/1000);
            this.cb(restTime);
        }
        return this;
    }
}
if(false){
    /**
     * author : Jimi
     * email : luckyzhangxf@163.com
     * date : 2016/08/22
     * discribe : 倒计时通用方法
     */
    new zxf_countdown({
        startDate: "2016-08-22 17:25:00",/*可选 倒计时开始时间 string or date 默认为当前时间 */
        endDate: "2016-08-24 17:25:00",/*可选 倒计时结束时间  string or date 默认为当天最后一秒*/
        needDay: false,/* 可选 剩余时间是否需要显示 天 boolean  默认false */
        cb: function(str){/* 必须  每1秒钟 回调一次 function str为剩余时间的字符串*/
            //console.log(str);
            $(".count-down-letters").text(str);
        }
    });
}



	
/**
 * 26. 给页面增加一个 显示百分比的加载动画 （图片懒加载完成后 加载动画消失）
 */		
var progressWrap = null,
    progressCont = null,
    progressNum = null,
    progressBar = null;
(function(){
    var htmlStr = '<div class="progress-wrap" style="z-index: 9990;background-color: black; position: absolute; top: 0; left: 0;width: 100%;height: 100%"><div class="progress-cont" style="width: 100%;height: 50px;line-height: 50px;font-size: 30px;text-align: center;color: #fff; position: fixed;top: 50%; margin-top: -50px">加载中...... <em class="progress-number" style="font-style: normal;">0%</em> </div><div class="progress-bar" style="width: 0%;height: 5px; background-color: #fff; position: fixed;top: 50%; margin-top: 10px;"></div></div>';
    $("body").append(htmlStr);
    progressWrap = $(".progress-wrap");
    progressCont = $(".progress-cont");
    progressNum = $(".progress-number");
    progressBar = $(".progress-bar");

})();
var pageLoadingAnimate = function(obj){
    var obj = obj || {};
    this.imgLazyCont = obj.imgLazyCont || $("body");
    this.imgDomArr = this.imgLazyCont.find("img[img-url]");
    this.loadImgIndex = 0;
    this.loadAnimateTime = obj.loadAnimateTime || 0;
    this.loadTimer = null;
    this.progress = 0;
    if(this.imgDomArr.length<1 && !this.loadAnimateTime){
        this.loadAnimateTime = 500;
    }
    this.init();
}
pageLoadingAnimate.prototype = {
    init: function () {
        var self = this;
        if(this.loadAnimateTime){
            self.loadTimer = setInterval(function(){
                self.progress += 1;
                if(self.progress==100){
                    clearInterval(self.loadTimer);
                }
                self.setProgress();
            },self.loadAnimateTime/100);
        }
        if(this.imgDomArr[0]){
            this.loadImg();
        }
        return this;
    },
    setProgress: function(){
        var progress = this.loadAnimateTime ? this.progress : parseInt(this.loadImgIndex*100/this.imgDomArr.length);
        if(!this.loadAnimateTime && this.loadImgIndex==this.imgDomArr.length-1){
            progress=100;
        }
        progressNum.text(progress+"%");
        progressBar.css("width",progress+"%");
        if(progress==100){
            progressWrap.hide();
        }
        return this;
    },
    loadImg: function(){
        var self = this;
        self.setProgress();
        var img = new Image();
        img.src = self.imgDomArr.eq(self.loadImgIndex).attr("img-url");
        var afterLoad = function(){
            self.imgDomArr.eq(self.loadImgIndex).attr("src",img.src);
            self.loadImgIndex++;
            if(self.loadImgIndex<self.imgDomArr.length){
                self.loadImg();
            }
        }
        img.onload = function(){
            afterLoad();
        }
        img.error = function(){
            afterLoad();
        }
        return this;
    }
};

if(false){
    /**
     * author : Jimi
     * email : luckyzhangxf@163.com
     * date : 2016/08/22
     * discribe : 页面加载等待动画 ， 同时包含 图片懒加载（将需要懒加载的图片的src的值写在自定义属性img-url里）
     */
    /* 调用方法  参数为一个对象{} 或 不传(此时默认图片加载完 加载动画结束，没有懒加载的图片时，默认加载动画显示1秒) */
    new pageLoadingAnimate({
        loadAnimateTime: 1000,/* 可选 加载动画显示的时间 优先级最高 ms */
        imgLazyCont: $("body")/* 可选 需要懒加载图片的区域 jQuery对象 不传默认为 $("body") 【注：会寻找这个区域的所有属性带有img-url的img元素，此img默认的src为空，img-url的值为懒加载后图片的地址 进行懒加载】 */
    });

}


	

/*************************************cookie相关*************************************/
//网络资源  http://www.cnblogs.com/fishtreeyu/archive/2011/10/06/2200280.html
function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setHours(0);
    exdate.setMinutes(0);
    exdate.setSeconds(0);
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + encodeURIComponent(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return decodeURIComponent(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}	
 
<!----------------------------------原生js工具函数----------------------------------------->	
	
/* 1. hasClass 实现*/		
Object.prototype.hasClass=function(cl){
	return this.className.match(new RegExp('(\\s|^)'+cl+'(\\s|$)'))==null ? false : true;
	}
/* 2. addClass 实现*/				
Object.prototype.addClass=function(cl){
	if(!this.hasClass(cl)){ this.className += ' '+cl; }
	}	
/* 3. removeClass 实现*/				
Object.prototype.removeClass=function(cl){
	var reg = new RegExp("(^|\\s)"+cl+"(\\s|$)");
	if(this.hasClass(cl)){this.className = this.className.replace(reg,"");}
	}
/* 4. toggleClass 实现*/				
Object.prototype.toggleClass=function(cl){
	if(this.hasClass(cl)){this.removeClass(cl);}
	else{this.addClass(cl);}
	}
/* 5. 原生js  trim() 去除字符串 头尾空格 的实现*/			
String.prototype.trim=function(){return this.replace(/\s*/,"").replace(/\s*$/,"");}		
/** 
 * 6. 原生js  获取当前元素 下一个兄弟节点  
 *  @param node 当前节点的id 或 当前节点 （string或dom对象）
 */				
Object.prototype.getNextNode=function(){
	var nextNode = this.nextSibling;
	if(!nextNode){return null;}
	if(!document.all){
		while(true){
			if(nextNode.nodeType==1){break;}
			else{
				if(nextNode.nextSibling){
					nextNode = nextNode.nextSibling;
					}
				else{break;}
				}
			}
		}
	return nextNode;
	}	
/** 
 * 7. 原生js  获取当前元素 上一个兄弟节点  
 *  @param node 当前节点的id 或 当前节点 （string或dom对象）
 */	
Object.prototype.getPrevNode=function(){
	var prevNode = this.previousSibling;
	if(!prevNode){return null}
	if(!document.all){
		while(true){
			if(prevNode.nodeType==1){break;}
			else{
				if(prevNode.previousSibling){
					prevNode = prevNode.previousSibling;
					}
				else{break;}
				}
			}
		}
	return prevNode;
	}	
/** 
 * 8. 原生js  获取当前元素 的所有出文本外的子节点
 *  @param node 当前节点的id 或 当前节点 （string或dom对象）
 */	
Object.prototype.getChildNodes=function(){
	var childs = this.childNodes,
		retChilds = [];
	for(var i=0; i<childs.length; i++){
		if(childs[i].nodeType==1){
			retChilds.push(childs[i]);
			}
		}
	return retChilds[0] ? retChilds : null;
	}
/** 
 * 9. 原生js  获取或设置当前元素 的样式
 *  @param elm 当前节点的id 或 当前节点 （string或dom对象）  必须
 *  @param name  要获取或设置（此时有value参数时为设置；没有时为获取）的样式名称（string）  或 要设置的样式组以键值对 组成的对象(object)  必须
 *  @param value 要设置的样式的值     （string） 可选
 *
 *  用法如下： window.onload = function(){
	var cont = document.getElementById("myCont");
	//设置一个样式
	CSS(cont,"background-color","gray");
	//获取一个样式
	alert(CSS(cont,"height"));
	//设置一组样式
	CSS(cont,{"background-color":"green","border-color":"red"});
	}		
 */
function CSS(elm,name,value){
	var elm = typeof elm=="string" ? document.getElementById(elm) : elm;
	var Style = function(elm,n,v){
		var str = elm.getAttribute("style"),
			reg = new RegExp(n+":"+"([^;]*;$)");
		if(arguments.length==2){
			if(name=="height"){
				return elm.offsetHeight;
				}
			else if(name=="width"){
				return elm.offsetWidth;
				}
			if(str.match(reg)){
				return str.match(reg)[1].replace(";","");
				}
			else{return " ";}
			}
		else{
			if(str.match(reg)){
				elm.setAttribute("style",str.replace(str.match(reg)[1],v+";"));
				}
			else{
				str += " "+n+":"+v+";";
				elm.setAttribute("style",str);	
				}
			}
		}
	if(arguments.length<2){return null;}
	if(arguments.length==3){
		Style(elm,name,value);
		}
	else{
		if(typeof name=="string"){
			return Style(elm,name);
			}
		else{
			for(var i in name){
				Style(elm,i,name[i]);
				}
			}
		}
	}
/** 
 * 10. 原生js  在元素内 最前面插入一个节点
 *  @param elm 当前节点的id 或 当前节点 （string或dom对象）
 *  @param node 需要插入的元素 （dom对象）
 */		
function prependChild(elm,node){
	var elm = typeof elm=="string" ? document.getElementById(elm) : elm;
	if(elm.hasChildNodes()){
		elm.insertBefore(node,elm.firstChild);
		}
	else{
		elm.appendChild(node);/*appendChild 是原生js提供的*/
		}
	}	
/** 
 * 11. 原生js  当前元素后面 插入一个节点
 *  @param elm 当前节点的id 或 当前节点 （string或dom对象）
 *  @param node 需要插入的元素 （dom对象）
 */		
function insertAfter(elm,node){
	var elm = typeof elm=="string" ? document.getElementById(elm) : elm;
	if(elm.nextSibling != null){
		elm.parentNode.insertBefore(node,elm.nextSibling);
		}
	else{
		elm.parentNode.appendChild(node);
		}
	}
	
	
/* 图片上下 弹性抖动动画 */
function JumpObj(elem, range, startFunc, endFunc) {
	var curMax = range = range || 6;
   	startFunc = startFunc || function(){};
	endFunc = endFunc || function(){};
	var drct = 0;
	var step = 1;

	init();

	function init() { elem.style.position = 'relative';active() }
	function active() { elem.onmouseover = function(e) {if(!drct)jump()} }
	function deactive() { elem.onmouseover = null }

	function jump() {
		 var t = parseInt(elem.style.top);
		if (!drct) motionStart();
		else {
			var nextTop = t - step * drct;
			if (nextTop >= -curMax && nextTop <= 0) elem.style.top = nextTop + 'px';
			else if(nextTop < -curMax) drct = -1;
		   else {
				var nextMax = curMax / 2;
				if (nextMax < 1) {motionOver();return;}
				curMax = nextMax;
				drct = 1;
			}
		}
		setTimeout(function(){jump()}, 200 / (curMax+3) + drct * 3);
	 }
	function motionStart() {
		startFunc.apply(this);
		elem.style.top='0';
		drct = 1;
	}
	  function motionOver() {
		endFunc.apply(this);
		curMax = range;
		drct = 0;
		elem.style.top = '0';
	}

	this.jump = jump;
	this.active = active;
	this.deactive = deactive;
}	
if(false){
	$(function(){
		 $("#ul img").each(function(k,img){
			new JumpObj(img,10);
			//第一个参数代表元素对象
			//第二个参数代表抖动幅度
		});
	});
}	
	
	

/* x.正则*/
var myRrg1 = /^[a-zA-Z0-9]+|^[\u4E00-\u9FFF]+/;/* 匹配 数字 字母 汉字开头的字符串 */

var phoneReg = /^1[3478]{1}\d{9}$|^15[012356789]{1}\d{8}/; /* 匹配  合法的手机号码 */
 
var mailReg = /^\w+@[a-zA-Z0-9]{2,}\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2})?$/;/* 匹配邮箱 */

 
 
 
 
 


function deBug(str){
	var newP = document.createElement("p");
	newP.style.width = "240px";
	newP.innerHTML += "<br/>"+str+"  什么玩意儿<br/><br/><br/><br/><br/><br/>";
	document.getElementsByTagName("body")[0].appendChild(newP);
	} 
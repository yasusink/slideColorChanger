var targetSelector=".testBox";

var start_r;
var start_g;
var start_b;
var end_r;
var end_g;
var end_b;

var tween_sta;

var start_point;
var end_point;
var init_callback;

var arrayObj=new Array;
var changeColor_value;
var nowColor_value;


function setProp(tObj){
		//
		start_r=tObj.start_r;
		start_g=tObj.start_g;
		start_b=tObj.start_b;
		//
		end_r=tObj.end_r;
		end_g=tObj.end_g;
		end_b=tObj.end_b;
		//
		tween_sta=tObj.tween;	
		//
		start_point=tObj.start_point;
		end_slide_point=tObj.end_point;
		//
		init_callback=true;
		//
		setObj();
}

function setObj(){

		arrayObj=new Array(
			{
				min_value:start_r,
				max_value:end_r,
				start_slide_point:start_point,
				end_slide_point:end_point
			},
			{
				min_value:start_g,
				max_value:end_g,
				start_slide_point:start_point,
				end_slide_point:end_point
			},
			{
				min_value:start_b,
				max_value:end_b,
				start_slide_point:start_point,
				end_slide_point:end_point
			}
		);
		$(this).slidecounter(arrayObj);
		$.fn.slidecounter.setCallBackFunction(callbackFnc);
}

function callbackFnc(tValue){
	if(tween_sta){
		if(init_callback){
			changeColor(tValue[0].pram,tValue[1].pram,tValue[2].pram);
			init_callback=false;
		}else{
			 changeColor_tween(tValue[0].pram,tValue[1].pram,tValue[2].pram);
		}
	}else{
		changeColor(tValue[0].pram,tValue[1].pram,tValue[2].pram);
	}
}

function toHex(dec){
	 hexChar="0123456789ABCDEF";
	 if(dec>255){
	 	return null;
	 }
	 var i=dec %16;
	 var j=(dec -i)/16;
	 var result=hexChar.charAt(j);
	 result+=hexChar.charAt(i);
	 return result;
}



function changeColor_tween(tr,tg,tb){
	changeColor_value= "#" + toHex(tr) + toHex(tg) + toHex(tb);
	
	nowColor_value=$(targetSelector).css("background-color").toString();
	nowColor_value = nowColor_value.replace("rgb(","");
	nowColor_value = nowColor_value.replace(")","");
	nowColor_value = nowColor_value.split(",");
	nowColor_value = "#" + toHex(nowColor_value[0]) + toHex(nowColor_value[1]) + toHex(nowColor_value[2]);

	$(targetSelector).tween({
	  	 backgroundColor: {
	     start: nowColor_value,
	     stop: changeColor_value,
	     time: 0,
	     duration: 1,
	     effect: 'easeIn'
	 }
	});

	$.play();

}

function changeColor(tr,tg,tb){
	changeColor_value= "#" + toHex(tr) + toHex(tg) + toHex(tb);
	$(targetSelector).css("background-color",changeColor_value);
}


$(function(){

	initObj();

});
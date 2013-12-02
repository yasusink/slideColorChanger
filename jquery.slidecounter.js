(function($) {

	$.fn.slidecounter=function(options){

		var defaults={
			start_slide_point:0,
			end_slide_point:500,
			max_value:1000,
			min_value:0
		};

		var slide_value;
		var cbf;
		var opt=new Array();
		var defaultArray=new Array();
		var backOptionArray=new Array();

		$(window).scroll(function(){
			changeSlidePoint();
		});

		function init(){
			for(var i=0;i<options.length;i++){
				defaultArray[i]=$.extend(true,{},defaults);
				opt[i]=$.extend(defaultArray[i],options[i]);
				opt[i].slide_width=opt[i].end_slide_point-opt[i].start_slide_point;
				opt[i].change_value=opt[i].max_value-opt[i].min_value;
				opt[i].change_rate=opt[i].change_value/opt[i].slide_width;
			}
			//
			changeSlidePoint();
		}

		function changeSlidePoint(){
			slide_value=$('body').scrollTop();
			changePram();
		}

		function changePram(){
			for(var i=0;i<opt.length;i++){
				if(slide_value>=opt[i].start_slide_point){
					opt[i].now_value=((slide_value-opt[i].start_slide_point)*opt[i].change_rate)+opt[i].min_value;
				}else{
					opt[i].now_value=0;
				}

				var backOption={
					pram: Math.round(opt[i].now_value),
					slide_point:slide_value
				};

				backOptionArray[i]=backOption;

			}
			cbf(backOptionArray);
		};
		//
		//public function
		//
		$.fn.slidecounter.setCallBackFunction=function(tFnc){
			cbf=tFnc;
			init();
		};


	};

})(jQuery);
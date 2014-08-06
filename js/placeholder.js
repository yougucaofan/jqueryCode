define(function(require, exports, module){
	'use strict';
	function placeHolder(){
		if('placeholder' in document.createElement('input')) return;//支持则返回
		var elem=$('[placeholder]');
		elem.each(function(){
			$(this).addClass('empty');//默认加上empty，说明没有输入内容
			var defautValue=$(this).attr('placeholder');
			$(this).click(function(){
				var val=$(this).val();
				if(val==defautValue){
					$(this).val('');
				};
				$(this).removeClass('empty');//点击的时候去掉empty
			}).blur(function(){
				var val=$(this).val();
				if(!$.trim(val)){//为空时则还原，加上empty
					$(this).val(defautValue);
					$(this).addClass('empty');
				};
			}).val(defautValue);//默认加上value值
		})
	};
	module.exports=placeHolder;
})
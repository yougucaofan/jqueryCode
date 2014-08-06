function getSelectText(elem){
	var txt;
	if(window.getSelection){//ff
		if(elem && elem.nodeName.toLowerCase()=='textarea'){
			txt = elem.value.substring(elem.selectionStart,elem.selectionEnd);			
			elem.focus();
		}else{
			txt = window.getSelection();
		};		
	}else{//ie
		txt=document.selection.createRange().text;
	};
	return txt;
};
define(function(){
	return getSelectText;
});
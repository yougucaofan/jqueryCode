define(function(require,exports,modules){
	function insetTopic(elem,str){
		this.elem=elem;
		this.topic=str;
		this.txt='#'+str+'#';
	};
	insetTopic.prototype={
		_render:function(){
			var getSelectText=require('apps/getSelectText'),
				val=this.elem.value;
			getSelectText=getSelectText(elem);//获取textarea里的选取值
			if(getSelectText == this.topic) return//选中的正好是当前话题则什么也不作

			if(!getSelectText && val.indexOf(this.txt) == -1){//如果选中值为空且
				this._insertCon();
			}
			if(getSelectText){
				this.txt='#'+getSelectText+'#';//刷新话题值为选中的值
				if(val.indexOf(this.txt) == -1){//说明elem里没有加过这个话题				
					this._insertCon();
				}
			}
			this._select();//选中话题内容
		},
		_insertCon:function(){//插入话题内容到textarea中
			var elem=this.elem,
				val=elem.value,
				txt=this.txt;
			elem.focus();//如果不获取焦点，会加在文档开头而不是textarea
			if (elem.createTextRange){//ie
				var sel = document.selection.createRange();
				sel.text=txt;
			}else{
				var start=elem.selectionStart,
					end=elem.selectionEnd;
				elem.value = val.substring(0,start)+txt+val.substr(end);
			}
		},
		_select:function(){
			var elem=this.elem,
				val=elem.value,
				txt=this.txt,
				start=val.indexOf(txt)+1,
				end=txt.length + start -2;
			elem.focus();
			if (elem.createTextRange) {//ie
				var sel=elem.createTextRange();//textRange才有select
				sel.moveEnd('character', -val.length);//第二个参数只支持负值
				sel.moveEnd('character',end);
				sel.moveStart('character',start);
				sel.select();

				sel.move('character',3)
			}else{
				elem.setSelectionRange(start,end);//第二个参数只支持正值
				this.elem.focus();
			}
		}
	}
	return insetTopic;
});
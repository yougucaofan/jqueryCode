function getPos(elem) {
    if (document.selection) {
        var sel = document.selection.createRange();
        return {
            left: sel.boundingLeft+elem.scrollLeft,
            top: sel.boundingTop + elem.scrollTop,
            bottom: sel.boundingTop + sel.boundingHeight + (document.documentElement.scrollTop || document.body.scrollTop)
        }
    } else {
        var cloneDiv='cloneDiv',
	        cloneFocus='cloneFocus',
	        cloneTxt='cloneTxt',
        	div = elem[cloneDiv]||document.createElement('div'),
            txt = elem[cloneTxt] || document.createElement('span'),
            focus = elem[cloneFocus] || document.createElement('span'),
            rNone = '<span style="white-space:pre-wrap"> </span>',
            val, i = 0,
            char, len;
        if (!elem[cloneDiv]) {
            elem[cloneDiv] = div;
            elem[cloneTxt] = txt;
            elem[cloneFocus] = focus;
            focus.innerHTML = '|';
            div.appendChild(txt);
            div.appendChild(focus);
            document.body.appendChild(div);
            div.className = _cloneStyle(elem);
        };
        div.style.cssText = 'visibility:hidden;word-wrap:break-word;position:absolute;' + _getOffset(elem);
        val = elem.value.substring(0, elem.selectionStart);
        val = val.replace(/\n/g, '<br />').replace(/\s/g, rNone);
        txt.innerHTML = val;
        return _getOffset(focus);
    }
};

function _getOffset(elem) {
    var box = elem.getBoundingClientRect(),
        scrollTop = document.documentElement.scrollTop,
        scrollLeft = document.documentElement.scrollLeft,
        str = '';
    str += 'left:' + (box.left + scrollLeft + elem.scrollLeft) + 'px;';
    str += 'top:' + (box.top + scrollTop + elem.scrollTop) + 'px;';
    return str;
}

function _cloneStyle(elem) {
    var useName = ['font', 'padding', 'border', 'text-indent','width'],
        name, k, val, i = 0,
        len = useName,
        css = '',
        style = document.createElement('style');
    for (; k = useName[i]; i++) {
        val = _getStyle(elem, k);
        if (parseInt(val) !== 0) {
            css += k + ':' + val + ';';
        }
    };
    name = 'clone' + (new Date).getTime();
    style.innerHTML = '.' + name + '{' + css + '}'
    document.head.appendChild(style);
    return name;
}

function _getStyle(elem, k) {
    var val;
    if (window.getComputedStyle) {
        val = window.getComputedStyle(elem, null)[k];
    } else {
        val = elem.currentStyle[k];
    };
    return val;
}
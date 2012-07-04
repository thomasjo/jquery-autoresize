/*!
 * jQuery textarea autoResize plugin v0.2.1
 * http://github.com/thomasjo/jquery-autoresize
 *
 * Copyright (c) 2011 Thomas Johansen | https://raw.github.com/thomasjo/jquery-autoresize/master/LICENSE.txt
 */
(function(){var a=this,b=a.$,d={resize:b.noop};b.fn.autoResize=function(f){var g=b.extend({},d,f);this.filter("textarea").each(function(){var l=b(this).css({"overflow-y":"hidden",resize:"none"}),j=l.height(),i=j,k=(function(){var m=l.clone().attr("tab-index",-1).removeAttr("id").removeAttr("name").css({position:"absolute",top:0,left:-9999});return m.insertBefore(l)})(),h=function(){var n=l.val(),m;k.height(0).val(n).scrollTop(9999);m=Math.max(j,k.scrollTop());if(m===i){return}i=m;g.resize.call(this);l.height(m)};l.unbind(".resize");if(c()){l.bind("input.resize",h)}else{if(e()){l.bind("propertychanged.resize",h)}else{l.bind("keypress.resize",h)}}h()});return this};function c(){if("oninput" in document.body){return true}document.body.setAttribute("oninput","return");return typeof document.body.oninput==="function"}function e(){return"onpropertychanged" in document.body}}).call(this);
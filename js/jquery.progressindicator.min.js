/*
 * Progress Indicator
 * 
 * Copyright (c) 2010 Rob Garrison (aka Mottie)
 * Dual licensed under the MIT and GPL licenses.
 *
 * Plugin base: http://starter.pixelgraphics.us/
 */
(function(b){b.progressIndicator=function(f,c,h){var a=this;a.$el=b(f);a.el=f;a.$el.data("progressIndicator",a);a.init=function(){if(typeof c==="undefined"||c===null)c=0;a.options=b.extend({},b.progressIndicator.defaultOptions,h);a.options.val=c;a.options.points=2*Math.PI/a.$el.find("span").length;a.update(c)};a.update=function(g){a.options.val=g;var e=360*(g+a.options.max*a.options.startPosition)/a.options.max%360*Math.PI/180;a.options.showValue&&a.$el.find(".display").text(g);a.options.clockwise||
(e=2*Math.PI-e);a.$el.find("span").each(function(d){var i=a.options.radius*Math.cos(e)+a.options.centerX,j=a.options.radius*Math.sin(e)+a.options.centerY;d=a.options.sizeStart-d*a.options.sizeDec;e+=-a.options.points;b(this).css({fontSize:d+"px",left:i-d/4,top:j-d/2}).children().css({height:d+"px",width:d+"px"})})};a.getValue=function(){return a.options.val};a.start=function(){if(a.options.timerActive&&!a.options.timerObj)a.options.timerObj=setInterval(function(){a.update((a.options.val+a.options.timerIncrement)%
a.options.max)},a.options.timerSpeed)};a.stop=function(){if(a.options.timerActive){clearInterval(a.options.timerObj);a.options.timerObj=null}};a.reset=function(){a.update(0)};a.init()};b.progressIndicator.defaultOptions={max:100,radius:50,clockwise:true,centerX:100,centerY:100,sizeStart:80,sizeDec:4,showValue:true,timerActive:false,timerSpeed:20,timerIncrement:1,startPosition:0.75};b.fn.progressIndicator=function(f,c){return this.each(function(){new b.progressIndicator(this,f,c)})};b.fn.getprogressIndicator=
function(){this.data("progressIndicator")}})(jQuery);

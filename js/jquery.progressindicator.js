/*
 * Dynamic Progress Indicator
 * 
 * Copyright (c) 2010 Rob Garrison (aka Mottie & Fudgey)
 * Dual licensed under the MIT and GPL licenses.
 *
 * Plugin base: http://starter.pixelgraphics.us/
 */
(function($){
    $.progressIndicator = function(el, val, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("progressIndicator", base);
        
        base.init = function(){
            if( typeof( val ) === "undefined" || val === null ) { val = 0; }
            
            base.options = $.extend({},$.progressIndicator.defaultOptions, options);

            base.options.val = val;

            // get number of children in the indicator & space them equally around the circle
            base.options.points = 2 * Math.PI / base.$el.find('span').length;

            // Put your initialization code here
            base.update( val );
        };
        
        base.update = function(v){
            base.options.val = v;
            // convert val (percentage) to degrees then to radians
            var angle = ( ((360*(v + base.options.max * base.options.startPosition)/base.options.max)%360) * Math.PI / 180 );
            if (base.options.showValue) { base.$el.find('.display').text(v); }
            // change direction
            if (!base.options.clockwise) { angle = 2 * Math.PI - angle; }

            base.$el.find('span').each(function(i){
                var x = base.options.radius * Math.cos(angle) + base.options.centerX,
                    y = base.options.radius * Math.sin(angle) + base.options.centerY,
                    // each point in the circle is decreased in size
                    fSize = base.options.sizeStart - i * base.options.sizeDec;

                // adjust angle of each point in the circle
                angle += -(base.options.points);

                $(this)
                    .css({
                        fontSize : fSize + 'px',
                        left     : x - fSize/4, // divide by 4 to center element on radius
                        top      : y - fSize/2
                    })
                    // if using images, adjust size of children
                    .children().css({
                        height : fSize + 'px',
                        width  : fSize + 'px'
                    });
            });
        };
        
        base.getValue = function(){
            return base.options.val;
        };

        base.start = function(){
            // only works if timerActive is true and if the object doesn't already exist
            if (base.options.timerActive && !base.options.timerObj){
                base.options.timerObj = setInterval( function(){
                    // use value (percentage) to move indicator, using mod to keep the value between 0 and 99
                    base.update( (base.options.val + base.options.timerIncrement) % base.options.max ); 
                    }, base.options.timerSpeed
                );
            }
        };

        base.stop = function(){
            if (base.options.timerActive){
                clearInterval(base.options.timerObj);
                base.options.timerObj = null;
            }
        };

        base.reset = function(){
            base.update(0);
        };

        // Run initializer
        base.init();

    };
    
    $.progressIndicator.defaultOptions = {
         // default options
         max       : 100,  // split circle into this many increments (default to 100 to match percentages)
         radius    : 50,   // distance from center
         clockwise : true, // rotation direction
         centerX   : 100,  // default center for a 200px wide div
         centerY   : 100,  // default center for a 200px high div
         sizeStart : 80,   // font size/image size start (pixels)
         sizeDec   : 4,    // font size/image size reduction for each element (in pixels)
         showValue : true, // show value (should be inside of progress indicator container)
         
         // timer options
         timerActive    : false, // Initialize progression indicator start and stop functions
         timerSpeed     : 20,    // setInterval time in milliseconds
         timerIncrement : 1,     // value increment, increase for faster indicator rotation (but it gets jumpy)

         // Start position. Due to the quadrant system, set 0 for right, .25 (25%) for bottom, .5 (50%) for left and
         // .75 (75%) would be the top of the circle ( x = 0 & y = max )
         startPosition : 0.75
    };
    
    $.fn.progressIndicator = function(val, options){
        return this.each(function(){
            (new $.progressIndicator(this, val, options));
        });
    };
    
    // This function breaks the chain, but returns
    // the progressIndicator if it has been attached to the object.
    $.fn.getprogressIndicator = function(){
        this.data("progressIndicator");
    };
    
})(jQuery);
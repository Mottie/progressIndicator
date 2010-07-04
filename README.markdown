**Usage** (default settings shown)

    <script type="text/javascript"  src="jquery.progressindicator.min.js"></script>
    <script type="text/javascript">
    $(document).ready(function(){
     // initialize: initialValue is uaually zero, and a full list of "options" can be found below.
     // $(selector).progressIndicator( initialValue, options );
     $('#progress').progressIndicator(0, {
      max            : 100,  // Max number of circle increments (default set to 100 to match a percentage going from 0-99).
      radius         : 50,   //	Sets the radius of the circle in pixels measured from the centerX and centerY position (middle).
      centerX        : 100,  // Positions the center of the circle 100 pixels from the left edge of its container.
      centerY        : 100,  // Positions the center of the circle 100 pixels from the top edge of the container.
      clockwise      : true, // Sets the direction of the rotation. Clockwise if true.
      startPosition  : 0.75, // Coordinate system correction. (x=radius,y=0) is where "zero" percent is location, this shifts it to the top
      sizeStart      : 80,   // Starting size of element in pixels (image or text)
      sizeDec        : 4,    // Size decrement of each element
      showValue      : true, // Display progress value (can be placed anywhere)
      timerActive    : true, // Initialize timer start and stop funtions
      timerSpeed     : 20,   // setInterval time in milliseconds to animate the indicator
      timerIncrement : 1     // Amount the progress indicator is incremented at each setInterval call
     });
    })

**Methods**

Get & Set

     // Get current value (percentage)
     var value = $(selector).data('progressIndicator').getValue();
 
     // Set/Update current value
     $(selector).data('progressIndicator').update( value );

Animation functions

     // Start animation timer
     $(selector).data('progressIndicator').start();
 
     // Stop animation timer
     $(selector).data('progressIndicator').stop();
 
     // Reset animation timer (just resets position)
     $(selector).data('progressIndicator').reset();

For more details, see [my blog][1] entry and view [the demo][2] source.


  [1]: http://wowmotty.blogspot.com/2010/06/dynamic-progress-indicator.html
  [2]: http://www.myotherdrive.com/dyn/file/000.342823.19062010.10889.6a64fi/progress-indicator-demo-live.htm
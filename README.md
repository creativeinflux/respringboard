RespringBoard
=============
--------------------------

RespringBoard is a responsive jQuery plugin inspired by the Apple iOS SpringBoard folder reveal system and the layout used in Google images and itunes.  

RespringBoard allows you to create a layout with clickable items of any height and width, once as item is clicked RespringBoard will calculate how many items are in the row and reveal the additional information (could be a summary or a draw folder like on the iOS) directly under the row, if the browser window is resized RespringBoard will calculate the items again and move the reveal under the row correctly making the plugin prefect for responsive designs and mobile layouts where you don't know the width of the browser window.

Usage
=====
----------


Firstly you must include jQuery and the RespringBoard jQuery file.  Put this at the bottom of your HTML file for better performance.

	<script src="js/jquery-ck.js"></script>
	<script src="js/jquery-respringboard.js"></script>
	
Below shows the expected format of the item (two items are shown), each item is wrapped within a div with the same class name.  Within the item is another div with the reveal contents, this is hidden by default and displayed in the reveal when the item is clicked.

	<div class="item">
		<p>The clickable item you could add any HTML and images here</p>
		<div class="reveal">
			<p>This will be the content of the reveal</p>
		</div>
	</div>
	
	<div class="item">
		<p>The clickable item you could add any HTML and images here</p>
		<div class="reveal">
			<p>This will be the content of the reveal</p>
		</div>
	</div>
	
You can also load the reveal content via ajax by using the same class name on an anchor linked to the content.  Again the link is hidden by default but if javascript is disabled the link will be exposed.
	
	<div class="item">
		<p>The clickable item you could add any HTML and images here</p>
		<a class="reveal" href="the_content.html">anchor name</a>
	</div>
	
	<div class="item">
		<p>The clickable item you could add any HTML and images here</p>
		<a class="reveal" href="the_content.html">anchor name</a>
	</div>
	
All the items are then wrapped within another div with a class that is passed to the plugin.  The final layout might look like the below example, you can mixed inline reveal content with ajax content.

	<div class="wrapper">
		<div class="item">
			<p>The clickable item you could add any HTML and images here</p>
			<div class="reveal">
				<p>This will be the content of the reveal</p>
			</div>
		</div>
		<div class="item">
			<p>The clickable item you could add any HTML and images here</p>
			<a class="reveal" href="the_content.html">anchor name</a>
		</div>
	</div>
	
Then we just need to initialise the plugin, the example below shows the plugin initialise using script tags within the HTML file.

	<script type="text/javascript">

		$(document).ready(function(){  
			var RespringBoard = new $.RespringBoard(".wrapper");
		});

	</script>
	
The examples show the plugin initialised with the default options (class name etc.), check the options section to customise your own class name.

Make sure you also check the examples included in the repo.

### CSS ###

You will need to apply at least some basic CSS otherwise it will look a complete mess, check the examples for more advanced styles, below are the absolute bare essentials:

	.item {
		display: inline-block;
	    vertical-align: top;
	    cursor: pointer;
	}
	.reveal {
		display: inline-block;
		width: 100%;
		position: relative;
	}
	
Styling the arrow is optional, the best method is to use the CSS triangle approach below.

	.arrow {
		border-bottom: 8px solid #000;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		height: 0;
		position: absolute;
		width: 0;
		top: -8px;
	}

Options
=======
--------------

The plugin comes with the following options:

* __itemsSelector__ default '_item_' - the class name of the item.
* __revealSelector__ default '_reveal_' - The class name of the reveal content div within the item.
* __revealWrapperClass__ default '_summary_' - When the reveal is exposed the reveal contents will be wrapped within a div with this class name and an inner div below.
* __revealInnerClass__ default '_content_' - When the reveal is exposed the reveal will contain an inner div with this class name, within this div the reveal contents will be shown.
* __selectedClass__ default '_selected_' - This class will be applied to the item that has been clicked on.
* __arrowClass__ default '_arrow_' - A div will be added to the reveal which will align perfectly central to the selected item, this could be used to place an arrow pointing at the item which can be styled in css or for something else.  This option defines the class name.
* __closeClass__ default '_close_' - This is the class name of the element that will close the reveal, the RespringBoard will listen for clicks with this class and close the reveal.
* __animate__ default _true_ - RespringBoard comes with animation that can be switched off by passing false through to this option.
* __animateSpeed__ default _500_ - This is the animation speed, you can pass 'slow' or 'fast' or the speed in milliseconds.
* __addCloseButton__ default _true_ - RespringBoard can automatically add a close button into the reveal for you or you could add them somewhere else and switch this option to false.  RespringBoard will check if you have a close button already and will not add another one.

To default your options just pass them through as the second parameter when initialising the plugin as below:

	<script type="text/javascript">

		$(document).ready(function(){  
			var RespringBoard = new $.RespringBoard(".wrapper", {
				itemsSelector: 'the_item_class',
				summarySelector: 'the_summary_selector',
				revealWrapperClass: 'the_reveal_wrapper_class'
			});
		});

	</script>


Public Methods
==============
----------------------------

RespringBoard comes with public methods that you can access within your own javascript this allows you to close items if other events trigger or scroll next and prev with your own controls.

	<script type="text/javascript">

		$(document).ready(function(){  
			var RespringBoard = new $.RespringBoard(".wrapper");
		});

	</script>

When we initialise the plugin we can pass the object back into a variable, in the examples above we have assigned the object to the RespringBoard var and we can access the below methods within that var.  You can choose your own variable name but the following methods will use the RespringBoard var as example usage.

### __close_reveal(callback)__ ###

This method closes any open reveals.

	RespringBoard.close_reveal();
	
You can assign an element and click method like below:

	$('.close_all').on('click', function() {
		RespringBoard.close_reveal();
	});
	
You can pass a callback function into the first parameter which will trigger when the method completes.

	$('.close_all').on('click', function() {
		RespringBoard.close_reveal(function() {
			alert('close complete');
		});
	});

### __next_item(callback)__ ###

This method will open the next item, if no items are open it will open the first item.

	RespringBoard.next_item();
	
You can assign an element and click method like below:

	$('.next').on('click', function() {
		RespringBoard.next_item();
	});
	
You can pass a callback function into the first parameter which will trigger when the method completes.

	$('.next').on('click', function() {
		RespringBoard.next_item(function() {
			alert('Next item complete');
		});
	});
	
### __prev_item(callback)__ ###

This method will open the previous item, if no items are open it will open the last item.

	RespringBoard.prev_item();
	
You can assign an element and click method like below:

	$('.prev').on('click', function() {
		RespringBoard.prev_item();
	});
	
You can pass a callback function into the first parameter which will trigger when the method completes.

	$('.prev').on('click', function() {
		RespringBoard.prev_item(function() {
			alert('Prev item complete');
		});
	});


Acknowledgments
===============
--------------------------------

This was plugin was developed by [Justin Mitchell ](http://www.creativeinflux.co.uk) if you need support or want to show some love tweet me [@creativeinflux](https://twitter.com/creativeinflux)

* My website ([creativeinflux.co.uk](http://www.creativeinflux.co.uk))
* Github ([@creativeinflux](https://github.com/creativeinflux))
* Twitter ([@creativeinflux](https://twitter.com/creativeinflux))
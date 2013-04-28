/*
 * jQuery RespringBoard
 *
 * @author        Justin Mitchell (http://www.creativeinflux.co.uk)
 * @version 0.0.1
 * @requires jQuery
 */

(function($) {

	$.RespringBoard = function(el, options) {

		//Set the default options
		var defaults = {
			itemsSelector: 'item',
			revealSelector: 'reveal',

			revealWrapperClass: 'summary',
			revealInnerClass: 'content',
			selectedClass: 'selected',
			arrowClass: 'arrow',
			closeClass: 'close',

			animate: true,
			animateSpeed: 500,
			addCloseButton: true
		};

		var plugin = this;

		//Set the wrapper element
		var $wrapper = $(el);
		var wrapper = el;

		plugin.options = {};

		//----------------------------------------------------------------------------------->
		//Init function
		//----------------------------------------------------------------------------------->
		var init = function() {
			plugin.options = $.extend({}, defaults, options);

			//Hide all the summary handles, if js is off then the links will show
			$('.' + plugin.options.revealSelector).hide();

			var resizeTimer = null;
			//Detect any change to the window size and trigger the move_summary function
			$(window).bind('resize', function() {
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(function() {
					var $item = $wrapper.find('.' + plugin.options.itemsSelector + '.' + plugin.options.selectedClass);
					if($item.length > 0) {
						move_summary($item, function() {
							move_arrow($item);
						});
					}
				}, 150);
			});

			// load the summary based on the item click
			$($wrapper).children('.' + plugin.options.itemsSelector).on('click', function() {
				//close any items that are currently open
				var $item = $(this);
				loader($item);

			});

			//close the summary on close click
			$($wrapper).on('click', '.' + plugin.options.revealWrapperClass + ' .' + plugin.options.closeClass, function() {
				plugin.close_reveal();
			});

		};

		//----------------------------------------------------------------------------------->
		// Loader - this is the loading
		//----------------------------------------------------------------------------------->
		loader = function($item, callback) {

			load_summary($item, function() {
				move_summary($item, function() {
					open_summary($item, function() {
						move_arrow($item);
						if(plugin.options.addCloseButton === true) {
							add_close($item);
						}
						if(callback) callback();
					});
				});
			});

		};

		//----------------------------------------------------------------------------------->
		//close_reveal function - trigger when we need to close an items summary
		//----------------------------------------------------------------------------------->
		plugin.close_reveal = function(callback) {

			//we might have nothing so just return
			if($wrapper.find('.' + plugin.options.revealWrapperClass).length > 0 === false) {
				if(callback) callback();
				return;
			}

			var $item = $wrapper.find('.' + plugin.options.selectedClass).removeClass(plugin.options.selectedClass);
			//Check if the item is inline, if it is we need to move it to inside the item otherwise it will be lost forever
			if($item.data('inline') === true) {
				$clone = $($wrapper.find('.' + plugin.options.revealWrapperClass).find('.' + plugin.options.revealSelector)).clone();
				$item.append($clone.hide());
				$item.removeData('inline');
			}

			$wrapper.find('.' + plugin.options.revealWrapperClass).find('.' + plugin.options.revealInnerClass).css('visibility', 'hidden');

			//Remove the summary
			if(plugin.options.animate) {
					$wrapper.find('.' + plugin.options.revealWrapperClass).slideToggle(plugin.options.animateSpeed, function() {
						$wrapper.find('.' + plugin.options.revealWrapperClass).remove();
						if(callback) callback();
						return;
					});
			} else {
				$wrapper.find('.' + plugin.options.revealWrapperClass).remove();
				if(callback) callback();
				return;
			}
		};

		//----------------------------------------------------------------------------------->
		// Open the next item - get the next item and open the summary
		//----------------------------------------------------------------------------------->
		plugin.next_item = function(callback) {

			$item = $wrapper.find('.' + plugin.options.selectedClass).next();
			if($item.is('.' + plugin.options.revealWrapperClass)) {
				$item = $item.next();
			}
			if($item.length > 0 === false) {
				$item = $wrapper.find('.' + plugin.options.itemsSelector + ':first');
			}
			loader($item);

			if(callback) callback();
		};

		//----------------------------------------------------------------------------------->
		// Open the prev item - get the prev item and open the sumary
		//----------------------------------------------------------------------------------->
		plugin.prev_item = function(callback) {

			$item = $wrapper.find('.' + plugin.options.selectedClass).prev();
			if($item.length > 0 === false) {
				$item = $wrapper.find('.' + plugin.options.itemsSelector + ':last');
			}
			loader($item);

			if(callback) callback();
		};

		//----------------------------------------------------------------------------------->
		//open_summary function - Used to open content once it has been loaded.
		//----------------------------------------------------------------------------------->
		var open_summary = function($item, callback) {

			$item.addClass(plugin.options.selectedClass);
			$(el + ' .' + plugin.options.revealWrapperClass).prepend('<div class="' + plugin.options.arrowClass + '"></div>');

			if(plugin.options.animate) {
				$wrapper.find('.' + plugin.options.revealWrapperClass).slideToggle(plugin.options.animateSpeed, function() {
					$(el + ' .' + plugin.options.revealInnerClass).css('visibility', 'visible');
				});
			} else {
				$wrapper.find('.' + plugin.options.revealWrapperClass).show().children('.' + plugin.options.revealSelector).show();
				$(el + ' .' + plugin.options.revealInnerClass).css('visibility', 'visible');
			}

			if(callback) callback();

		};

		//----------------------------------------------------------------------------------->
		//Move_summary funciton - Used to move a summary into the correct position
		//----------------------------------------------------------------------------------->
		var move_summary = function($item, callback) {
			$wrapper.append($(el + ' .' + plugin.options.revealWrapperClass));
			//We need to count all the items to the right of our element and check if they are in the same row
			var next = $item.next();

			//Compare the elements by the top position, the one that is not equal will be on the next row
			while(next.length > 0 && $item.position().top == next.position().top) {
				$item = next;
				next = next.next();
			}

			//This the last element in our row
			var row_end = $item.index(el + ' ' + '.' + plugin.options.itemsSelector) + 1;
			//Insert the summary after the last element
			$(el + ' .' + plugin.options.revealWrapperClass).insertAfter($(el + ' ' + '.' + plugin.options.itemsSelector + ':nth-child(' +  row_end + ')'));

			if(callback) callback();
		};

		//----------------------------------------------------------------------------------->
		//Add arrows function - adds the arrows to the summary section based on the location of the item
		//----------------------------------------------------------------------------------->
		var move_arrow = function($item, callback) {
			var position = $item.position().left + $item.outerWidth(true) / 2;
			var arrow_width = $('.' + plugin.options.arrowClass).outerWidth(true) / 2;
			var actual_width = position - arrow_width;
			$(el + ' .' + plugin.options.revealWrapperClass + ' .' + plugin.options.arrowClass).css('left', actual_width + 'px');

			if(callback) callback();
		};

		//----------------------------------------------------------------------------------->
		//Add close function - adds the close button if user chooses
		//----------------------------------------------------------------------------------->
		var add_close = function($item, callback) {

			$summary = $wrapper.find('.' + plugin.options.revealWrapperClass + ' .' + plugin.options.revealInnerClass + ' .' + plugin.options.revealSelector);
			if($wrapper.find('.' + plugin.options.revealWrapperClass + ' .' + plugin.options.revealInnerClass + ' .' + plugin.options.revealSelector + ' .' + plugin.options.closeClass).length > 0 === false) {
				$summary.prepend('<span class="' + plugin.options.closeClass + '"></span>');
			}

		};

		//----------------------------------------------------------------------------------->
		//Load_summary - load the items summary
		//----------------------------------------------------------------------------------->
		var load_summary = function($item, callback) {

			plugin.close_reveal(function() {

			var $summary_content = $item.children('.' + plugin.options.revealSelector);

				//check if the summary is a link, if it is we need to load via ajax
				if($summary_content.is('a')) {
					$link = $summary_content.attr('href');
					$.ajax({
						type: "GET",
						url: $link,
						success: function(summary) {
							$wrapper.append('<div class="' + plugin.options.revealWrapperClass + '"></div>');
							$(el + ' .' + plugin.options.revealWrapperClass).html('<div class="' + plugin.options.revealInnerClass + '">' + summary + '</div>').hide();
							$(el + ' .' + plugin.options.revealInnerClass).css('visibility', 'hidden');
							if(callback) callback();
						}
					});
				} else {
					$item.data('inline', true);
					$wrapper.append('<div class="' + plugin.options.revealWrapperClass + '"><div class="' + plugin.options.revealInnerClass + '"></div></div>');
					var $content = $(el + ' .' + plugin.options.revealWrapperClass + ' .' + plugin.options.revealInnerClass);
					$content.html($summary_content).parent('.' + plugin.options.revealWrapperClass).hide();
					$content.children('.' + plugin.options.revealSelector).show();
					$content.css('visibility', 'hidden');
					if(callback) callback();
				}

			});

		};

		init();

	};

})(jQuery);
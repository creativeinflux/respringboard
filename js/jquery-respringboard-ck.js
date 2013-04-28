/*
 * jQuery RespringBoard
 *
 * Copyright (c) 2013 Justin Mitchell
 * http://creativeinflux.co.uk
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author Justin Mitchell (http://www.creativeinflux.co.uk)
 * @requires jQuery
 */(function(e){e.RespringBoard=function(t,n){var r={itemsSelector:"item",revealSelector:"reveal",revealWrapperClass:"summary",revealInnerClass:"content",selectedClass:"selected",arrowClass:"arrow",closeClass:"close",animate:!0,animateSpeed:500,addCloseButton:!0},i=this,s=e(t),o=t;i.options={};var u=function(){i.options=e.extend({},r,n);e("."+i.options.revealSelector).hide();var t=null;e(window).bind("resize",function(){clearTimeout(t);t=setTimeout(function(){var e=s.find("."+i.options.itemsSelector+"."+i.options.selectedClass);e.length>0&&f(e,function(){l(e)})},150)});e(s).children("."+i.options.itemsSelector).on("click",function(){var t=e(this);loader(t)});e(s).on("click","."+i.options.revealWrapperClass+" ."+i.options.closeClass,function(){i.close_reveal()})};loader=function(e,t){h(e,function(){f(e,function(){a(e,function(){l(e);i.options.addCloseButton===!0&&c(e);t&&t()})})})};i.close_reveal=function(t){if(s.find("."+i.options.revealWrapperClass).length>0==0){t&&t();return}var n=s.find("."+i.options.selectedClass).removeClass(i.options.selectedClass);if(n.data("inline")===!0){$clone=e(s.find("."+i.options.revealWrapperClass).find("."+i.options.revealSelector)).clone();n.append($clone.hide());n.removeData("inline")}s.find("."+i.options.revealWrapperClass).find("."+i.options.revealInnerClass).css("visibility","hidden");if(!i.options.animate){s.find("."+i.options.revealWrapperClass).remove();t&&t();return}s.find("."+i.options.revealWrapperClass).slideToggle(i.options.animateSpeed,function(){s.find("."+i.options.revealWrapperClass).remove();t&&t();return})};i.next_item=function(e){$item=s.find("."+i.options.selectedClass).next();$item.is("."+i.options.revealWrapperClass)&&($item=$item.next());$item.length>0==0&&($item=s.find("."+i.options.itemsSelector+":first"));loader($item);e&&e()};i.prev_item=function(e){$item=s.find("."+i.options.selectedClass).prev();$item.length>0==0&&($item=s.find("."+i.options.itemsSelector+":last"));loader($item);e&&e()};var a=function(n,r){n.addClass(i.options.selectedClass);e(t+" ."+i.options.revealWrapperClass).prepend('<div class="'+i.options.arrowClass+'"></div>');if(i.options.animate)s.find("."+i.options.revealWrapperClass).slideToggle(i.options.animateSpeed,function(){e(t+" ."+i.options.revealInnerClass).css("visibility","visible")});else{s.find("."+i.options.revealWrapperClass).show().children("."+i.options.revealSelector).show();e(t+" ."+i.options.revealInnerClass).css("visibility","visible")}r&&r()},f=function(n,r){s.append(e(t+" ."+i.options.revealWrapperClass));var o=n.next();while(o.length>0&&n.position().top==o.position().top){n=o;o=o.next()}var u=n.index(t+" "+"."+i.options.itemsSelector)+1;e(t+" ."+i.options.revealWrapperClass).insertAfter(e(t+" "+"."+i.options.itemsSelector+":nth-child("+u+")"));r&&r()},l=function(n,r){var s=n.position().left+n.outerWidth(!0)/2,o=e("."+i.options.arrowClass).outerWidth(!0)/2,u=s-o;e(t+" ."+i.options.revealWrapperClass+" ."+i.options.arrowClass).css("left",u+"px");r&&r()},c=function(e,t){$summary=s.find("."+i.options.revealWrapperClass+" ."+i.options.revealInnerClass+" ."+i.options.revealSelector);s.find("."+i.options.revealWrapperClass+" ."+i.options.revealInnerClass+" ."+i.options.revealSelector+" ."+i.options.closeClass).length>0==0&&$summary.prepend('<span class="'+i.options.closeClass+'"></span>')},h=function(n,r){i.close_reveal(function(){var o=n.children("."+i.options.revealSelector);if(o.is("a")){$link=o.attr("href");e.ajax({type:"GET",url:$link,success:function(n){s.append('<div class="'+i.options.revealWrapperClass+'"></div>');e(t+" ."+i.options.revealWrapperClass).html('<div class="'+i.options.revealInnerClass+'">'+n+"</div>").hide();e(t+" ."+i.options.revealInnerClass).css("visibility","hidden");r&&r()}})}else{n.data("inline",!0);s.append('<div class="'+i.options.revealWrapperClass+'"><div class="'+i.options.revealInnerClass+'"></div></div>');var u=e(t+" ."+i.options.revealWrapperClass+" ."+i.options.revealInnerClass);u.html(o).parent("."+i.options.revealWrapperClass).hide();u.children("."+i.options.revealSelector).show();u.css("visibility","hidden");r&&r()}})};u()}})(jQuery);
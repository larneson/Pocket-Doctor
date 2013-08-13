$(function(){
	$.fn.bootpanels = function(o){
		/* Side Panels JS */
		$('[data-toggle=slide]').click(function(){
			var self = $($(this).attr('data-target'));
			$('.slide-panel.center')
				.removeClass('toleft toright')
				.addClass((self.hasClass('left'))?'toleft':'toright');
			if( self.hasClass('in') ){
				self.removeClass('in');
				$(".slide-panel.center").removeClass('in');
			} else {
				self.addClass('in');
				$(".slide-panel.center").addClass('in');
			}
		});
		if( $(window).width() <= 767 ){
			$('.slide-panel:not(.center) > .contain').height($(window).height());
			$('#panel-center, .full-height').height($(window).height()-$('.navbar.slide-panel').height());
		}
		$(window).resize(function(){
			if( $(window).width() <= 767 ){
				$('.slide-panel:not(.center) > .contain').height($(window).height());
				$('#panel-center, .full-height').height($(window).height()-$('.navbar.slide-panel').height());
			} else {
				$('.slide-panel:not(.center) > .contain, #panel-center').height('auto');
			}
		});
		$('.slide-panel:not(.center) [data-toggle^="tab"]').click(function(){
			$('.slide-panel.in').removeClass('in');
			$('.slide-panel.center').scrollTop(0);
		});
		/*$('.slide-panel.center').live('tap', function(e){
			log('here');
			if( $(this).hasClass('in') ){
				$('.slide-panel.in').removeClass('in');
				e.preventDefault();
				e.stopPropagation();
			}
		});*/
	};
	$.fn.bootpanels.defaults = {};
	$.fn.bootpanels();
});

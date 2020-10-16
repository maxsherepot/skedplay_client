import $ from 'jquery';

export default () => {
	if (typeof document === 'undefined') {
		return;
	}

	$(document).ready(function() {
		var chartBlock = $(".js-animated-chart"),
			chartBlockTopPosition = chartBlock.offset().top,
			chartBlockIndent = 350,

			textBlock = $(".js-animated-text"),
			textBlockTopPosition = textBlock.offset().top,
			textBlockIndent = 300,

			video = $(".js-video-player"),
			videoPreview = "http://vlamisha.com/fl/2020/skedplay/img/video_preview.jpg",
			videoTopPosition = video.offset().top,
			videoBottomPosition = videoTopPosition + video.height();

		if($(window).width() < 767) {
			chartBlockIndent = 250
			textBlockIndent = 400
		}

		if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
			video.prop("controls", true);
			video.prop("poster", videoPreview);
		}

		$(window).scroll(function() {
			var	scrollPosition = $(this).scrollTop();

			if (!navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
				var player = $(".js-video-player")[0];
				if (player) {
					if((scrollPosition < videoTopPosition - $(window).height()) || (scrollPosition > videoBottomPosition)) {
						player.pause();
					} else {
						player.play();
					}
				}
			}

			if(scrollPosition > chartBlockTopPosition - chartBlockIndent ) {
				chartBlock.addClass("_animated-chart");
			}
			if(scrollPosition > textBlockTopPosition - textBlockIndent ) {
				textBlock.addClass("_animated-text");
			}

			onScroll();
		});

		$(".js-sections-panel-title").click(function (e) {
			e.preventDefault();
		})

		onScroll();
	});

	function onScroll(event){
		var scrollPos = $(document).scrollTop();
		$(".js-sections-panel-title").each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
				$('.js-sections-panel-title').removeClass("active");
				currLink.addClass("_active");
			}
			else{
				currLink.removeClass("_active");
			}
		});
	}
};
/*
	Fractal by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

(function($) {

	skel.breakpoints({
		xlarge:		'(max-width: 1680px)',
		large:		'(max-width: 1280px)',
		medium:		'(max-width: 980px)',
		small:		'(max-width: 736px)',
		xsmall:		'(max-width: 480px)',
		xxsmall:	'(max-width: 360px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Mobile?
			if (skel.vars.mobile)
				$body.addClass('is-mobile');
			else
				skel
					.on('-medium !medium', function() {
						$body.removeClass('is-mobile');
					})
					.on('+medium', function() {
						$body.addClass('is-mobile');
					});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly')
				.scrolly({
					speed: 1500
				});

	});

	// Banner.
	(function() {

		// Settings.
			var settings = {

				// Delay.
					delay: 9000

			};

		// Vars.
			var $banner = document.querySelector('#banner'),
				$images = document.querySelectorAll('#banner li'),
				pos = 0, lastPos = 0;

		// Main loop.
			$images[pos].classList.add('visible');
			$images[pos].classList.add('top');

			// Bail if we only have a single BG.
				if ($images.length == 1)
					return;

			window.setInterval(function() {

				lastPos = pos;
				pos++;

				// Wrap to beginning if necessary.
					if (pos >= $images.length)
						pos = 0;

				// Swap top images.
					$images[lastPos].classList.remove('top');
					$images[pos].classList.add('visible');
					$images[pos].classList.add('top');

				// Hide last image after a short delay.
					window.setTimeout(function() {
						$images[lastPos].classList.remove('visible');
					}, settings.delay / 2);

			}, settings.delay);

	})();

})(jQuery);
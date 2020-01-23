var layer1 = document.querySelector('.layer-1');
var layer2 = document.querySelector('.layer-2');
var layer3 = document.querySelector('.layer-3');
var layer0 = document.querySelector('.layer-0');

if (window.DeviceOrientationEvent) {
		
	// Includes accelerometer and rotationRate data	
	window.addEventListener('devicemotion', function(event) {

			var smoothRate = smooth(event.rotationRate);

			var isAndroid = /(android)/i.test(navigator.userAgent);

			// need to use this if running on android
			if (isAndroid) {
				smoothRate = {
					'alpha': smoothRate.alpha * 100,
					'beta': smoothRate.beta * 100,
					'gamma': smoothRate.gamma * 100
				};
			}
		
			var y_translation = 0;
			var x_translation = 0;
			if (window.orientation === 0) {
				y_translation = -1.25*smoothRate.alpha;
				x_translation = -smoothRate.beta;
			} else if (window.orientation === 90) {
				y_translation = smoothRate.beta;
				x_translation = -1.25*smoothRate.alpha;
			} else if (window.orientation === -90) {
				y_translation = -smoothRate.beta;
				x_translation = 1.25*smoothRate.alpha;
			} else {
				y_translation = 1.25*smoothRate.alpha;
				x_translation = smoothRate.beta;
			}
		
			layer0.style.transform =
					'translate3d(' + (0.15 * x_translation) + 'px, ' + (0.15 * y_translation) + 'px, 0)';
			layer0.style.webkitTransform =
					'translate3d(' + (0.15 * x_translation) + 'px, ' + (0.15 * y_translation) + 'px, 0)';
			layer1.style.transform =
					'translate3d(' + (0.25 * x_translation) + 'px, ' + (0.25 * y_translation) + 'px, 0)';
			layer1.style.webkitTransform =
					'translate3d(' + (0.25 * x_translation) + 'px, ' + (0.25 * y_translation) + 'px, 0)';
			layer2.style.transform =
					'translate3d(' + (0.35 * x_translation) + 'px, ' + (0.35 * y_translation) + 'px, 0)';
			layer2.style.webkitTransform =
					'translate3d(' + (0.35 * x_translation) + 'px, ' + (0.35 * y_translation) + 'px, 0)';
			layer3.style.transform =
					'translate3d(' + (0.45 * x_translation) + 'px, ' + (0.45 * y_translation) + 'px, 0)';
			layer3.style.webkitTransform =
					'translate3d(' + (0.45 * x_translation) + 'px, ' + (0.45 * y_translation) + 'px, 0)';

	});
	
	//// -+*/ MATHEMATICAL \*+- \\\\	
	
	// Smooth (optional: pass in a stream of data and return a smoother version of it)
	// Accepts values, and smoothing amount, returns average of most recent X values
	var valueArray = [
		{alpha:0,beta:0,gamma:0},
		{alpha:0,beta:0,gamma:0},
		{alpha:0,beta:0,gamma:0},
		{alpha:0,beta:0,gamma:0},
		{alpha:0,beta:0,gamma:0}
	];
	smooth = function (value) {
		valueArray.push(value);
		valueArray.shift();
		var avg =  {alpha: 0, beta: 0, gamma: 0};
		totals = {alpha: 0, beta: 0, gamma: 0};
		valueArray.forEach(function(item) {
			totals.alpha += item.alpha;
			totals.beta += item.beta;
			totals.gamma += item.gamma;
		});
		avg.alpha = totals.alpha / valueArray.length;
		avg.beta = totals.beta / valueArray.length;
		avg.gamma = totals.gamma / valueArray.length;
		return avg;
	}
}
import Utility from './_Utility';
import Wave from './_Wave';

document.addEventListener('DOMContentLoaded', () => {
	Array.prototype.forEach.call(document.images, (el: HTMLImageElement) => {
		el.addEventListener('contextmenu', (e) => e.preventDefault());
		el.addEventListener('dragstart', (e) => e.preventDefault());
	});

	const wave = new Wave();
	wave.execute(Utility.isPalmtop());
});

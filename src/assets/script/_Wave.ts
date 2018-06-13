export default class Wave {
	public interval: any;
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private height: number = window.innerHeight;
	private width: number = window.innerWidth;
	private fpms: number = Math.floor(1000 / 20);
	private ratio: number = 1.5;
	private time: number = 0;
	private level: number;
	private subsets: number[] = [];
	private onFocus: boolean = true;
	private savemode: boolean = false;

	constructor() {
		this.level = Math.floor(this.height / 2);
		for (let i = 0; i < 3; ++i) {
			this.subsets[i] = Math.random() * Math.PI;
		}
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d')!;

		document.querySelector('body')!.appendChild(this.canvas);
		this.canvas.className = 'js-no-print';
		this.canvas.height = this.height;
		this.canvas.width = this.width;
		this.canvas.setAttribute('style',
			'position:fixed;z-index:-10000;top:0;left:0;');
		this.ctx.lineJoin = 'round';
		this.ctx.lineWidth = 3;
		this.ctx.save();
	}

	public execute = (savemode: boolean) => {
		this.draw();
		this.eventSet();
		this.savemode = savemode;
		if (savemode) { return; }
		this.interval = setInterval(this.draw, this.fpms);
	}

	public resize = () => {
		this.height = window.innerHeight;
		this.canvas.height = this.height;
		this.width = window.innerWidth;
		this.canvas.width = this.width;
		if (this.savemode) { this.draw(true); }
	}

	public draw = (force = false) => {
		if (!force && !this.onFocus) { return; }

		const drawPath = (t: number, periodicity: number) => {
			const amplitude = 30 + 20 * Math.sin(t / 7);
			let i = 0;
			let y = Math.sin(t);
			this.ctx.moveTo(0, this.level + y * amplitude);
			for (; i <= this.width; i += 25) {
				y = Math.sin(t + i / periodicity);
				this.ctx.lineTo(i, this.level + y * amplitude);
			}
			y = this.level + Math.sin(t + i / periodicity) * amplitude;
			this.ctx.lineTo(i, y);
			this.ctx.lineTo(this.width, this.height);
			this.ctx.lineTo(0, this.height);
		};

		this.time += this.ratio;
		const rad = this.time * Math.PI / 90;

		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.save();
		this.ctx.strokeStyle = 'hsla(251,72.6%,24.3%,1)';
		this.ctx.fillStyle = 'hsla(251,72.6%,24.3%,0.4)';
		this.ctx.beginPath();
		drawPath(rad - this.subsets[0], 541);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.restore();
		this.ctx.save();
		this.ctx.strokeStyle = 'hsla(334,79.3%,37.8%,1)';
		this.ctx.fillStyle = 'hsla(334,79.3%,37.8%,0.3)';
		this.ctx.beginPath();
		drawPath(rad - this.subsets[1], 337);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.restore();
		this.ctx.save();
		this.ctx.strokeStyle = 'hsla(216,100%,50%,1)';
		this.ctx.fillStyle = 'hsla(216,100%,50%,0.3)';
		this.ctx.beginPath();
		drawPath(rad - this.subsets[2], 229);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.restore();
	}

	private eventSet = () => {
		window.addEventListener('blur', () => {
			this.onFocus = false;
		});
		window.addEventListener('focus', () => {
			this.onFocus = true;
		});
		window.addEventListener('resize', this.resize);
	}
}

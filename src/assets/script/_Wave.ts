export default class Wave {
	public interval: any;
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private height: number = window.innerHeight;
	private width: number = window.innerWidth;
	private fps: number = Math.floor(1000 / 25);
	private ms: number = 0;
	private originY: number;
	private originX: number = 0;
	private subsets: number[] = [];
	private onFocus: boolean = false;

	constructor() {
		this.originY = Math.floor(this.height / 2);
		for (let i = 0; i < 3; ++i) {
			this.subsets[i] = Math.random() * Math.PI;
		}
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d')!;
	}

	public execute = () => {
		document.querySelector('body')!.appendChild(this.canvas);
		this.canvas.className = 'js-no-print';
		this.canvas.height = this.height;
		this.canvas.width = this.width;
		this.canvas.setAttribute('style',
			'background-color:hsla(240,100%,12.5%,0.4);position:fixed;z-index:-10000;top:0;left:0;');
		this.ctx.lineJoin = 'round';
		this.ctx.lineWidth = 2;
		this.ctx.save();
		this.draw();
		this.interval = setInterval(this.draw, this.fps);
		this.onFocus = true;
		window.addEventListener('blur', () => {
			this.onFocus = false;
		});
		window.addEventListener('focus', () => {
			this.onFocus = true;
		});
	}

	public draw = () => {
		if (!this.onFocus) { return; }

		const drawPath = (t: number, periodicity = 200) => {
			const amplitude = 50 + 40 * Math.sin(t / 4);
			this.ctx.moveTo(this.originX, this.originY + Math.sin(t) * amplitude);
			let i = this.originX;
			let x: number;
			let y: number;
			for (; i <= this.width; i += 20) {
				x = t + (i - this.originX) / periodicity;
				y = Math.sin(x);
				this.ctx.lineTo(i, this.originY + y * amplitude);
			}
			this.ctx.lineTo(i, this.height);
			this.ctx.lineTo(this.originX, this.height);
		};

		this.ms += this.fps;
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.save();
		this.ctx.strokeStyle = 'hsla(251,72.6%,24.3%,1)';
		this.ctx.fillStyle = 'hsla(251,72.6%,24.3%,0.4)';
		this.ctx.beginPath();
		drawPath((this.ms / this.fps * Math.PI / 90 ) - this.subsets[0], 541);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.restore();
		this.ctx.save();
		this.ctx.strokeStyle = 'hsla(334,79.3%,37.8%,1)';
		this.ctx.fillStyle = 'hsla(334,79.3%,37.8%,0.3)';
		this.ctx.beginPath();
		drawPath((this.ms / this.fps * Math.PI / 90 ) - this.subsets[1], 300);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.restore();
		this.ctx.save();
		this.ctx.strokeStyle = 'rgba(0,100,255,1)';
		this.ctx.fillStyle = 'rgba(0,100,255,0.3)';
		this.ctx.beginPath();
		drawPath((this.ms / this.fps * Math.PI / 90 ) - this.subsets[2], 853);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.restore();
	}
}

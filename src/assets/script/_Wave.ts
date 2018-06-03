export default class Wave {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	height: number;
	width: number;
	fps: number;
	ms: number;
	originY: number;
	originX: number;
	interval: any;

	constructor() {
		this.fps = Math.floor(1000 / 25);
		this.ms = 0;
		this.height = window.innerHeight;
		this.width = window.innerWidth;
		this.canvas = document.createElement('canvas');
		document.querySelector('body')!.appendChild(this.canvas);
		this.canvas.height = this.height;
		this.canvas.width = this.width;
		this.canvas.setAttribute('style', 'position:fixed;z-index:-10000;top:0;left:0;');

		this.originY = Math.floor(this.height / 2);
		this.originX = 0;
		this.ctx = this.canvas.getContext('2d')!;
		this.ctx.lineJoin = 'round';
		this.ctx.lineWidth = 2;
		this.ctx.save();
		this.draw();
		this.interval = setInterval(this.draw, this.fps);
	}

	draw = () => {
		const drawPath = (t: number, periodicity = 200) => {
			const amplitude = 50 + 40 * Math.sin(t / 4);
			this.ctx.moveTo(this.originX, this.originY + Math.sin(t) * amplitude);
			let i = this.originX;
			let x: number;
			let y: number;
			for(; i <= this.width; i += 20) {
				x = t + (i - this.originX) / periodicity;
				y = Math.sin(x + periodicity % Math.PI);
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
		this.ctx.lineWidth = 2;
		this.ctx.beginPath();
		drawPath(this.ms / this.fps * Math.PI / 90, 541);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.restore();
		this.ctx.save();
		this.ctx.strokeStyle = 'hsla(334,79.3%,37.8%,1)';
		this.ctx.fillStyle = 'hsla(334,79.3%,37.8%,0.3)';
		this.ctx.lineWidth = 2;
		this.ctx.beginPath();
		drawPath(this.ms / this.fps * Math.PI / 90, 300);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.restore();
		this.ctx.save();
		this.ctx.strokeStyle = 'rgba(0,100,255,1)';
		this.ctx.fillStyle = 'rgba(0,100,255,0.3)';
		this.ctx.lineWidth = 2;
		this.ctx.beginPath();
		drawPath(this.ms / this.fps * Math.PI / 90, 853);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.restore();
	}
}

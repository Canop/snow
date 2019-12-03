// Make it snow in your site
// See https://github.com/Canop/snow
window.snow = (function(){

	var	ctx,
		canvas,
		W,
		H,
		heights = [],
		n = 0,
		timer,
		fall;

	function resetScreen(){
		if (!canvas) {
			window.addEventListener("resize", resetScreen);
			canvas = document.createElement("canvas");
			document.body.appendChild(canvas);
		}
		W = window.innerWidth;
		H = window.innerHeight;
		canvas.id = "snow-canvas";
		canvas.style.pointerEvents = "none";
		canvas.style.position = "fixed";
		canvas.style.zIndex = 5000; // todo make it modifiable
		canvas.style.left = 0;
		canvas.style.right = 0;
		canvas.style.top = 0;
		canvas.style.bottom = 0;
		canvas.width = W;
		canvas.height = H;
		ctx = canvas.getContext("2d");
		if (heights.length<W) {
			var	i = 0,
				nh = new Array(W);
			for (;i<heights.length; i++) nh[i] = heights[i];
			for (;i<W; i++) nh[i] = 0;
			heights = nh;
		}
	}

	function rnd(min, max){
		if (max === undefined) {
			max = min;
			min = 0;
		}
		return min + Math.random()*(max-min);
	}

	function Fall(options){
		this.flakes = new Array(Math.ceil(options.flakeCount) || 400);
		this.maxRadius = options.maxRadius || 1.7;
		this.wind = options.wind || 0;
		this.color = options.color || "#fff";
		this.minSpeed = options.minSpeed || 1;
		this.maxSpeed = options.maxSpeed || 4.2;
		this.stickingRatio = options.stickingRatio || .4;
		this.maxHeightRatio = options.maxHeightRatio || .25;
		this.dying = false;
		for (var i=0; i<this.flakes.length; i++) this.flakes[i] = new Flake(this);
	}
	Fall.prototype.draw = function(){
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;
		for (var i=0; i<this.flakes.length; i++) {
			this.flakes[i].draw();
		}
	}
	Fall.prototype.update = function(){
		for (var i=0; i<this.flakes.length; i++) {
			if (this.flakes[i].update(this)) {
				this.flakes[i] = null;
			}
		}
		if (this.dying) {
			this.flakes = this.flakes.filter(function(v){
				return v;
			});
			if (!this.flakes.length) fall = null;
		}
		if (n%2) {
			for (var i=1; i<W; i++) {
				var d = heights[i]-heights[i-1];
				if (d>1) {
					heights[i] -=.7*d;
					heights[i-1] +=.3*d;
					if (i>1) heights[i-2] +=.2*d;
					if (i>2) heights[i-3] +=.1*d;
				}
			}
		} else {
			for (var i=0; i<W-1; i++) {
				var d = heights[i]-heights[i+1];
				if (d>1) {
					heights[i] -=.7*d;
					heights[i+1] +=.3*d;
					if (i<W-2) heights[i+2] +=.2*d;
					if (i<W-3) heights[i+3] +=.1*d;
				}
			}
		}
		n++;
	}
	Fall.prototype.rndX = function(){
		var windRange = this.wind*H/this.minSpeed;
		return rnd(Math.min(0, -windRange)-10, Math.max(W, W-windRange)+10);
	}

	function Flake(fall){
		this.y = rnd(-H, 0);
		this.x = fall.rndX();
		this.radius = rnd(1, fall.maxRadius);
		if (fall.maxRadius>1) {
			this.speed = fall.minSpeed + (fall.maxSpeed-fall.minSpeed)*(this.radius-1)/(fall.maxRadius-1);
		} else {
			this.speed = rnd(fall.minSpeed, fall.maxSpeed);
		}
		this.omega = rnd(.02, .13);
	}
	Flake.prototype.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
		ctx.fill();
	}
	Flake.prototype.update = function(fall){
		this.y += this.speed;
		var	i = Math.round(this.x),
			h;
		if (i<0) h = heights[0];
		else if (i>=W) h = heights[W-1];
		else h = heights[i];
		if (this.y >= H-h) {
			if (i>=0 && i<W) {
				if (h<H*fall.maxHeightRatio) {
					heights[i] += this.radius * fall.stickingRatio;
				}
			}
			if (fall.dying && Math.random()<.7) {
				return true; // flake disapears
			}
			this.y = rnd(-30, 1);
			this.x = fall.rndX();
			return;
		}
		this.x += fall.wind;
		this.x += Math.cos(this.y*this.omega/this.speed);
	}

	function drawGround(){
		ctx.beginPath();
		ctx.moveTo(0, H);
		for (var i=0; i<heights.length; i++) {
			ctx.lineTo(i, H-heights[i]);
		}
		ctx.lineTo(W+1, H-heights[heights.length-1]);
		ctx.lineTo(W+1, H);
		ctx.lineTo(0, H);
		ctx.fill();
	}

	function draw(){
		ctx.clearRect(0, 0, W, H);
		drawGround();
		if (fall) {
			fall.draw();
			fall.update();
			clearTimeout(timer);
			timer = setTimeout(draw, 25);
		}
	}

	return {
		start: function(options){
			if (!ctx) resetScreen();
			fall = new Fall(options||{});
			running = true;
			draw();
		},
		stop: function(){
			if (fall) fall.dying = true;
		},
		ground: function(){
			return heights;
		}
	}

})();

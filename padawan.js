(function(Padawan) {
	if (window.Padawan) {
		console.error(new Error("Conflict! window.Padawan already exists!"));
	} else {
		Padawan();
	}
})(function() {
	function Padawan(target, message, options) {
		this.target = target;
		this.message = message;
		this.options = options;
		this.tooltip = null;
		this.arrow = null;
		this.width = null;
	};
	Padawan.api = Padawan.prototype = {
		_: {
			setup: function(Padawan) {
				if (Padawan.options) {
					for (var option in Padawan.options) {
						if (Padawan.hasOwnProperty(option)) {
							Padawan[option] = Padawan.options[option];
						} else if (window.Padawan.api.hasOwnProperty(option)) {
							window.Padawan.api[option].call(Padawan, Padawan.options[option]);
						};
					};
				};
			},
			make: {
				tooltip: function(Padawan) {
					Padawan.tooltip.classList.add("padawan-tip");
					Padawan.tooltip.appendChild(this.arrow(Padawan));
					Padawan.tooltip.appendChild(this.message(Padawan));
						// get tooltip width:
						Padawan.tooltip.style.visibility = "hidden";
						document.body.appendChild(Padawan.tooltip);
						Padawan.width = Padawan.tooltip.offsetWidth;
						document.body.removeChild(Padawan.tooltip);
						Padawan.tooltip.style.visibility = "visible";
					return Padawan.tooltip;
				},
				arrow: function(Padawan) {
					Padawan.arrow = document.createElement("div");
					Padawan.arrow.classList.add("padawan-arrow");
					return Padawan.arrow;
				},
				message: function(Padawan) {
					var message = document.createElement("div");
					message.classList.add("padawan-message");
					if (Padawan.message) message.textContent = Padawan.message;
					if (Padawan.options && Padawan.options.html) message.innerHTML = Padawan.options.html;
					return message;
				}
			}
		},
		observe: function() {
			var _this = this;
			if (!(_this.target instanceof HTMLElement) && typeof _this.target === "object") {
				_this.options = _this.target;
			} else if (typeof _this.message === "object") {
				_this.options = _this.message;
			};
			_this.tooltip = document.createElement("div");
			_this._.setup(_this);
			_this._.make.tooltip(_this);
			_this.target.addEventListener(_this.options && _this.options.event || "mouseenter", function(e) {
				var target = _this.target;
				if ((target.offsetLeft + target.offsetWidth/2) - (_this.width/2) < 0) {
					_this.tooltip.style.left = target.offsetLeft + "px";
				} else {
					_this.tooltip.style.left = target.offsetLeft + (target.offsetWidth/2) - (_this.width/2) + "px";
					_this.arrow.style.left = (_this.width/2) - 8 + "px";
				};
				_this.tooltip.style.top = _this.target.offsetTop + _this.target.offsetHeight + 8 + "px";
				document.body.appendChild(_this.tooltip);
			});
			_this.target.addEventListener("mouseleave", function() {
				if (_this.tooltip.parentNode) {
					_this.tooltip.parentNode.removeChild(_this.tooltip);
				};
			});
		}
	};
	window.Padawan = Padawan;
	window.addEventListener("load", function() {
		var tooltips = document.querySelectorAll("[data-padawan]");
		for (var i = 0, count = tooltips.length; i < count; i ++) {
			new Padawan(tooltips[i], tooltips[i].dataset.padawan).observe() || "missing message argument...";
		};
	});
});
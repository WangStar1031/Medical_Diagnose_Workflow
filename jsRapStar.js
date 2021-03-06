(function($){
	$.fn.jsRapStar = function(options){
		
		return this.each(function(){
			this.opt = $.extend({
				star:'&#9733',
				colorFront:'yellow',
				colorBack:'white',
				enabled:true,
				step:true,
				starHeight:32,
				length:5,
				onClick:null,
				onMousemove:null,
				onMouseleave:null
			},options);
			var base = this;
			var starH = Array(this.opt.length + 1).join('<span>' + this.opt.star + '</span>');
			this.StarB = $(this).addClass('rapStarBack').css({color:this.opt.colorBack,'font-size':this.opt.starHeight + 'px'}).html(starH);
			var start = parseFloat($(this).attr('start'));
			var sw = $(this.StarB).width() / this.opt.length;
			var aw = start * sw;
			this.StarF = $('<div>').addClass('rapStarFront').css({color:this.opt.colorFront,'font-size':this.opt.starHeight + 'px'}).html(starH).width(aw).appendTo(this);
			this.Input = $('<input type="text" hidden>').appendTo(this);
			this.Input.val("3");
			if(this.opt.enabled)
				$(this).bind({
					mousemove:function(e){
						e.preventDefault();
						var realOffsetLeft = findRealLeft(this);
						var relativeX = e.pageX - realOffsetLeft;
						var e = Math.floor(relativeX / sw) + 1;
						if(base.opt.step) newWidth = e * sw;
						else newWidth = relativeX;
						this.StarF.width(newWidth);
						if(base.opt.onMousemove)
							base.opt.onMousemove.call(base,newWidth / sw);
					},
					mouseleave:function(e){
						this.StarF.width(aw);
						if(base.opt.onMouseleave)
							base.opt.onMouseleave.call(base,start);
					},
					click:function(e){
						e.preventDefault();
						aw = newWidth;
						this.StarF.width(newWidth);
						start = newWidth / sw;
						this.Input.val(start);
						if(base.opt.onClick)
							base.opt.onClick.call(base,start);
					}
				});
			function findRealLeft(obj){
				if(!obj) return 0;
				return obj.offsetLeft + findRealLeft(obj.offsetParent);
			}
		})
	}
})(jQuery);
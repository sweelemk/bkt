$(document).ready(function() {

	// catalog
	function catalogToggle() {
		var nav = $(".nav"),
			trigger = nav.find(".nav-trigger"),
			container = nav.find(".nav-drop");
		
		trigger.on("mouseenter", function () {
			nav.addClass("open")
			container.fadeIn(150)
		});

		nav.on("mouseleave", function(){
			nav.removeClass("open");
			container.fadeOut(0);
		});
	} catalogToggle();

	// wrapper top
	function wrapperTop(){
		var header = $(".header").innerHeight(),
			wrapper = $(".wrapper");

		wrapper.css("padding-top", header);
	};

	$(window).on("load resize", function(){
		wrapperTop();
	});

	//intro
	function intro() {
		var intro = $("#intro"),
			header = $(".header"),
			wH = $(window).height();

		if(wH <= 568) {
			intro.height(568 - header.innerHeight());
		} else {
			intro.height(wH - header.innerHeight());
		}
	};

	$(window).on('load resize', function() {
		intro()
	});

	function bindIntro() {
		var $intro = $('#intro');

		if ($intro.length === 0) {
			return
		}

		var $win = $(window),
			$grid = $('.intro__hover'),
			$gridItem = $('.intro-hover-item'),
			$hoverItem = $('.intro__content-grid-item'),
			$overlay = $('.intro__overlay'),
			$gridCover = $('.intro-hover-item__cover'),
			idx = 0,
			idxColor = 0,
			arrOut = [],
			arrIn =[];

		function getIndex(target) {
			idx = $(target).index()
			return idx;
		}

		function getColor(target) {
			idxColor = $(target).data('color');
			return idxColor;
		}

		function getColorCoverOut(targetOut) {
			targetOut.each(function(){
				var color = $(this).data('color');
				arrOut.push(color);
			});
			return arrOut;
		}
		function getColorCoverIn(targetIn) {

			targetIn.each(function(){
				arrIn.push($(this));
			});
			return arrIn;
		}

		function setColorCover() {
			var arrColorOut = getColorCoverOut($hoverItem);
			var arrColorIn = getColorCoverIn($gridCover);

			console.log(arrColorOut,arrColorIn)

			for(var i = 0; i < arrColorIn.length; i++) {
				arrColorIn[i].attr('style', 'background-color:' + arrColorOut[i]);
			}


		}

		function setPositionLetter() {
			var pos = $hoverItem.offset().top,
			$block = $('.intro-hover-item__content');

			$block.css({
				top: pos - $('.header').innerHeight()
			});
		}

		$hoverItem.on('mouseenter', function(event) {
			event.preventDefault();
			var index = getIndex($(this));
			var indexColor = getColor($(this));

			// $overlay.addClass('visible').animate({
			// 	backgroundColor: indexColor
			// }, 150)//attr('style', 'background-color:' + indexColor);
			
			$overlay.addClass('visible').attr('style', 'background-color:' + indexColor);

			$gridItem.removeClass('hover');

			$gridItem
					.eq(index)
					.addClass("hover")
		});

		$gridItem.on('mouseleave', function(event){
			event.preventDefault();

			var $this = $(this);

			$this.removeClass("hover");
			$overlay.removeClass("visible").removeAttr('style');
		});

		$win.on('load resize', function () {

			if ($win.width() >= 992) {
				setPositionLetter();
				setColorCover();
			} else {
				return;
			}

		});

	} bindIntro();

	//scroll window
	function scrollWindow(){
		var trigger = $(".intro__scroll");

		trigger.on("click", function(){
			$('html, body').animate({
				scrollTop: $(window).height() - $(".header").innerHeight()
			}, 800)
		});
	} scrollWindow();

});
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

	$(window).on("load resize", function() {
		intro()
	});

	function bindIntro() {
		var $intro = $("#intro");

		if ($intro.length === 0) {
			return
		}

		var $win = $(window),
			$grid = $(".intro__hover"),
			$gridItem = $(".intro-hover-item"),
			$hoverItem = $(".intro__content-grid-item"),
			$overlay = $(".intro__overlay"),
			$gridCover = $(".intro-hover-item__cover"),
			idx = 0,
			idxColor = 0,
			arrOut = [],
			arrIn =[];

		function getIndex(target) {
			idx = $(target).index()
			return idx;
		}

		function getColor(target) {
			idxColor = $(target).data("color");
			return idxColor;
		}

		function getColorCoverOut(targetOut) {
			targetOut.each(function(){
				var color = $(this).data("color");
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

			for(var i = 0; i < arrColorIn.length; i++) {
				arrColorIn[i].attr("style", "background-color:" + arrColorOut[i]);
			}


		}

		function setPositionLetter() {
			var pos = $hoverItem.offset().top,
			$block = $(".intro-hover-item__content");

			$block.css({
				top: pos - $(".header").innerHeight() + $hoverItem.innerHeight()
			});
		}

		$hoverItem.on("mouseenter", function(event) {
			event.preventDefault();
			var index = getIndex($(this));
			var indexColor = getColor($(this));

			// $overlay.addClass("visible").animate({
			// 	backgroundColor: indexColor
			// }, 150)//attr("style", "background-color:" + indexColor);
			
			$overlay.addClass("visible").attr("style", "background-color:" + indexColor);

			$gridItem.removeClass("hover");
			$(this).addClass("active").siblings().removeClass("active");

			$gridItem
					.eq(index)
					.addClass("hover")
		});

		$gridItem.on("mouseleave", function(event){
			event.preventDefault();

			var $this = $(this);

			$hoverItem.removeClass("active");
			$this.removeClass("hover");
			$overlay.removeClass("visible").removeAttr("style");
		});

		$win.on("load resize", function () {

			if ($win.width() >= 1025) {
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
			$("html, body").animate({
				scrollTop: $(window).height() - $(".header").innerHeight()
			}, 800)
		});
	} scrollWindow();

	//popular product slider
	function sliderPopular() {
		var carousel = $(".products-gallery"),
			next = carousel.parent().find(".products-arrow__right"),
			prev = carousel.parent().find(".products-arrow__left"),
			current = carousel.parent().find(".products__counter-current"),
			all = carousel.parent().find(".products__counter-all");

		// carousel.on("init", function(){
		// 	var l = $(this).find('.slick-slide').length;
		// 	all.text(l);
		// 	if(l === $(this).find(".slick-active").length){
		// 		$(".products-navi").hide();
		// 	} else {
		// 		current.text(1);
		// 		prev.addClass("disabled")
		// 	}
			
		// });

		// carousel.on("afterChange", function(){
		// 	var curr = $(this).slick("slickCurrentSlide") + 1,
		// 		l = ($(this).find('.slick-slide').length / 2) + 1;
		// 	current.text(curr);

		// 	if(curr !== 1) {
		// 		prev.removeClass("disabled");
		// 	} else if(curr === 1) {
		// 		prev.addClass("disabled");
		// 	}

		// 	if(curr !== l) {
		// 		next.removeClass("disabled");
		// 	} else if(curr === l) {
		// 		next.addClass("disabled");
		// 	}

		// });

		carousel.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: false,
			infinite: false,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 640,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 481,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});

		next.on("click", function(){
			carousel.slick("slickNext");
		});

		prev.on("click", function(){
			carousel.slick("slickPrev");
		});

	} sliderPopular();

	//matchHeight product properties
	function matchProp() {
		var propItem = $(".products-properties__item"),
			propDescr = propItem.find(".products-properties__descr");

		propDescr.matchHeight();
		
	} matchProp();
});
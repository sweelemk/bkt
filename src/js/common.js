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
			next = carousel.parent().find(".rotator-arrow__right"),
			prev = carousel.parent().find(".rotator-arrow__left"),
			current = carousel.parent().find(".rotator__counter-current"),
			all = carousel.parent().find(".rotator__counter-all");

		carousel.on("init", function(){
			var l = $(this).find('.slick-slide').length;
			all.text(l);
			if(l === $(this).find(".slick-active").length){
				$(".products-navi").hide();
			} else {
				prev.addClass("disabled")
			}
			countSlides($(this))
		});

		carousel.on("afterChange", function(){
			var curr = $(this).slick("slickCurrentSlide") + 1,
				l = ($(this).find('.slick-slide').length - $(this).find('.slick-active').length) + 1;
			current.text(curr);

			if(curr !== 1) {
				prev.removeClass("disabled");
			} else if(curr === 1) {
				prev.addClass("disabled");
			}

			if(curr !== l) {
				next.removeClass("disabled");
			} else if(curr === l) {
				next.addClass("disabled");
			}

		});

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

	//reviews slider
	function sliderReviews() {
		var carousel = $(".reviews-carousel"),
			next = carousel.parent().find(".rotator-arrow__right"),
			prev = carousel.parent().find(".rotator-arrow__left"),
			current = carousel.parent().find(".rotator__counter-current"),
			all = carousel.parent().find(".rotator__counter-all");

		carousel.on("init", function(){
			var l = $(this).find('.slick-slide').length;
			all.text(l);
			if(l === $(this).find(".slick-active").length){
				$(".products-navi").hide();
			} else {
				prev.addClass("disabled")
			}
			countSlides($(this))
		});

		carousel.on("afterChange", function(){
			var curr = $(this).slick("slickCurrentSlide") + 1,
				l = ($(this).find('.slick-slide').length - $(this).find('.slick-active').length) + 1;
			current.text(curr);

			if(curr !== 1) {
				prev.removeClass("disabled");
			} else if(curr === 1) {
				prev.addClass("disabled");
			}

			if(curr !== l) {
				next.removeClass("disabled");
			} else if(curr === l) {
				next.addClass("disabled");
			}

		});

		carousel.slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			arrows: false,
			infinite: false,
			responsive: [
				{
					breakpoint: 992,
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

	} sliderReviews();

	function countSlides(slider) {
		var el = $(slider),
			all = el.parent().find(".rotator__counter-all");

		var l = el.find(".slick-slide").length - el.find('.slick-active').length;

		all.text(l+1)
	};

	$(window).on("resize", function(){
		countSlides($(".slick-slider"))
	});

	//matchHeight product properties
	function matchProp() {
		var propItem = $(".products-properties__item"),
			propDescr = propItem.find(".products-properties__descr");

		propDescr.matchHeight();
		
	} matchProp();

	//tooltipster
	function tips(id, tip) {

		tip.tooltipster({
			animation: 'fade',
			maxWidth: 330,
			speed: 500,
			contentAsHTML: true,
			functionInit: function(){
				return $('#' + id).html();
			},
			functionReady: function(){
				$('#' + id).attr('aria-hidden', false);
			},
			functionAfter: function(){
				$('#' + id).attr('aria-hidden', true);
			}
		});
	};

	function tipInit() {
		var tip = $('.tips');
			tip.each(function(){
					var aria = $(this).attr('aria-describedby')
					tips(aria, $(this));
			});
	} tipInit();

	//scrolling
	function scrolling() {
		var mainHeader = $('.header'),
			secondaryNavigation = $('.secondary-nav'),
			//this applies only if secondary nav is below intro section
			belowNavHeroContent = $('.container'),
			headerHeight = mainHeader.innerHeight();
		
		//set scrolling variables
		var scrolling = false,
			previousTop = 0,
			currentTop = 0,
			scrollDelta = 10,
			scrollOffset = 150;

		// mainHeader.on('click', '.nav-trigger', function(event){
		// 	// open primary navigation on mobile
		// 	event.preventDefault();
		// 	mainHeader.toggleClass('nav-open');
		// });

		$(window).on('scroll', function(){
			if($(window).width() < 992 || secondaryNavigation.length === 0) return;
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame)
					? setTimeout(autoHideHeader, 250)
					: requestAnimationFrame(autoHideHeader);
			}
		});

		$(window).on('resize', function(){
			headerHeight = mainHeader.innerHeight();
		});

		function autoHideHeader() {
			var currentTop = $(window).scrollTop();

			( belowNavHeroContent.length > 0 ) 
				? checkStickyNavigation(currentTop)
				: checkSimpleNavigation(currentTop);

		   	previousTop = currentTop;
			scrolling = false;
		}

		function checkSimpleNavigation(currentTop) {
		    if (previousTop - currentTop > scrollDelta) {
		    	//if scrolling up...
		    	mainHeader.removeClass('is-hidden');
		    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
		    	//if scrolling down...
		    	mainHeader.addClass('is-hidden');
		    }
		}

		function checkStickyNavigation(currentTop) {
			var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.innerHeight();
			
			if (previousTop >= currentTop ) {
		    	//if scrolling up... 
		    	if( currentTop < secondaryNavOffsetTop ) {
		    		//secondary nav is not fixed
		    		mainHeader.removeClass('is-hidden');
		    		secondaryNavigation.removeClass('fixed slide-up');
		    		belowNavHeroContent.removeClass('secondary-nav-fixed');
		    	} else if( previousTop - currentTop > scrollDelta ) {
		    		//secondary nav is fixed
		    		mainHeader.removeClass('is-hidden');
		    		secondaryNavigation.removeClass('slide-up').addClass('fixed'); 
		    		belowNavHeroContent.addClass('secondary-nav-fixed');
		    	}
		    	
		    } else {
		    	//if scrolling down...	
		 	  	if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
		    		mainHeader.addClass('is-hidden');
		    		secondaryNavigation.addClass('fixed slide-up');
		    		belowNavHeroContent.addClass('secondary-nav-fixed');

		    	} else if( currentTop > secondaryNavOffsetTop ) { 
		    		mainHeader.removeClass('is-hidden');
		    		secondaryNavigation.addClass('fixed').removeClass('slide-up');
		    		belowNavHeroContent.addClass('secondary-nav-fixed');
		    	}

		    }
		}
	} scrolling();

	//scroll section
	function scrollSection(){
		var scrolling = false;
		var contentSection = $(".sc-section"),
			navigation = $(".secondary-nav"),
			navA = navigation.find("ul a"),
			navigationItems = navigation.find("a");

		$(window).on("scroll", checkScroll);

		navA.on("click", "a", function(event){
			event.preventDefault();
			smoothScroll($(this.hash))
		});

		function checkScroll() {
			if(!scrolling) {
				scrolling = true;
				(!window.requestAnimationFrame) ? setTimeout(updateSections, 300) : window.requestAnimationFrame(updateSections);
			}
		}

		function updateSections() {
			var halfWindowHeight = $(window).height() / 2,
				scrollTop = $(window).scrollTop();

			contentSection.each(function(){
				var section = $(this),
					sectionId = section.attr("id"),
					navigationItem = navigationItems.filter('[href^="#'+ sectionId +'"]');

				((section.offset().top - halfWindowHeight < scrollTop) && (section.offset().top + section.height() - halfWindowHeight > scrollTop))
					? navigationItem.addClass("active")
					: navigationItem.removeClass("active");
			});
			scrolling = false;
		}

		function smoothScroll(target) {
			$("body, html").animate({
				"scrollTop": target.offset().top - $(".secondary-nav").innerHeight() - $(".header").innerHeight()
			}, 450);
		}

	} scrollSection();

	//yandex maps
	if ($('#map-contact').length) {
		ymaps.ready(initMapContact);
	};
	function initMapContact() {
		var yMap = new ymaps.Map("map-contact",{
			center: [55.649728, 37.55195],
			zoom: 15,
			controls: []
		});

		var placemark = new ymaps.Placemark([55.649728, 37.55195],{
				balloonContent: "1117342, г. Москва, РФ, ул. Введенского, д.1, стр.1"
			}, {
				preset: 'islands#icon',
				iconColor: "#e03732"
			});

		yMap.geoObjects.add(placemark);

		yMap.controls.add("zoomControl", {
			size: "small"
		});

		yMap.behaviors.disable('scrollZoom');
	};

	// validation
	var form_validate = $(".js-validate")
	if(form_validate.length) {
		form_validate.each(function(){
			var form_this = $(this);
			$.validate({
				form: form_this,
				borderColorOnError: true,
				scrollToTopOnError : false,
				onSuccess: function($form) {
					$($form).parents(".modal__wrap").find(".modal-front").removeClass("open");
					setTimeout(function(){
						$($form).parents(".modal__wrap").find(".modal-back").addClass("open");
						$($form).parents(".modal__wrap").find("form").trigger("reset");
					}, 500);

					return false;
				}
			})
		});
	};

	// popups
	$("[data-modal]").on("click", function(){
		var data = $(this).data("modal");
		modalWindow(data);
		return false;
	});

	function modalWindow(data) {
		var popupSelector = $("[data-modal-wrap='" + data + "']"),
			innerSelector = popupSelector.find(".modal"),
			duration = 350,
			close = popupSelector.find(".close"),
			btnClose = popupSelector.find(".btn-close"),
			html = $("html");

		html.addClass("modal-open");
		popupSelector
					.fadeIn({
						duration: duration,
						complete: function (){
							$(this).find(".modal-front").addClass("open");
						}
					});

		close.add(popupSelector).add(btnClose).on("click", function(){
			if(!popupSelector.find(".modal").hasClass("open")) return;

			popupSelector
				.fadeOut({
					duration: duration,
					complete: function () {
						$(this).find(".modal-back").removeClass("open");
						html.removeClass("modal-open");
					}
				})
		});

		innerSelector.on("click", function(event){
			event.stopPropagation();
		});
	}

	//error page
	function errorPage(){
		var er = $(".error-pages");

		er.height($(window).height() - $(".header").innerHeight());
	};

	$(window).on("load resize", function(){
		errorPage()
	});

	//footer animation
	function footerAnimating() {
		var wPos = $(window).scrollTop(),
			footer = $(".footer"),
			footerPos = footer.offset().top - (footer.innerHeight()/1.5);

		if(wPos >= footerPos) {
			footer.addClass("animating")
		}	else {
			footer.removeClass("animating")
		}
	};

	$(window).on("load scroll", function(){
		footerAnimating()
	});


	//slider products inner
	function productSlider() {
		var carousel = $(".produts-slider_main"),
			next = carousel.parent().find(".rotator-arrow__right"),
			prev = carousel.parent().find(".rotator-arrow__left"),
			current = carousel.parent().find(".rotator__counter-current"),
			all = carousel.parent().find(".rotator__counter-all");

		carousel.on("init", function(){
			var l = $(this).find('.slick-slide').length;
			all.text(l);
			if(l === $(this).find(".slick-active").length){
				$(".products-navi").hide();
			} else {
				prev.addClass("disabled")
			}
		});

		carousel.on("afterChange", function(){
			var curr = $(this).slick("slickCurrentSlide") + 1,
				l = ($(this).find('.slick-slide').length - $(this).find('.slick-active').length) + 1;
			current.text(curr);

			if(curr !== 1) {
				prev.removeClass("disabled");
			} else if(curr === 1) {
				prev.addClass("disabled");
			}

			if(curr !== l) {
				next.removeClass("disabled");
			} else if(curr === l) {
				next.addClass("disabled");
			}

		});

		carousel.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			infinite: false
		});

		next.on("click", function(){
			carousel.slick("slickNext");
		});

		prev.on("click", function(){
			carousel.slick("slickPrev");
		});
	} productSlider();

	function sliderFurn() {
		var carousel = $(".product-slider_main-fur");

		carousel.slick({
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1
		})
	} sliderFurn();
});
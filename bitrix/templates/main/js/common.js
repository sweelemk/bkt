$(document).ready(function() {

	//sticky
	function sticky() {
		var side = $(".sidebar-form");
		$(window).on("load resize", function(){
			if($(this).width() < 993) {
				side.trigger("sticky_kit:detach");;
			} else {
				side.stick_in_parent({
					parent: ".row-products",
					offset_top : 10
				}).on("sticky_kit:bottom", function(){
					$(this).addClass("bottom");
				}).on("sticky_kit:unbottom", function(){
					$(this).removeClass("bottom");
				});
			}
		});
	} sticky();

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
	if(!$(".out").hasClass("out-inner")){
		wrapperTop();
		$(window).on("resize", function(){
			wrapperTop();
		});
	}
	

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
	}; intro();

	$(window).on("resize", function() {
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

			if($(this).hasClass("active")) return false;

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

			console.log(true)

			var $this = $(this);

			$hoverItem.removeClass("active");
			$this.removeClass("hover");
			$overlay.removeClass("visible").removeAttr("style");
		});

		$win.on("scroll", function(){
			$gridItem.removeClass("hover");
			$hoverItem.removeClass("active");
			$overlay.removeClass("visible").removeAttr("style");
		});

		$win.on("load resize", function () {

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
				$(".rotator-navi").hide();
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

		carousel.on("breakpoint", function(event, slick, breakpoint){
			countSlides($(this))
		});

		next.on("click", function(){
			carousel.slick("slickNext");
		});

		prev.on("click", function(){
			carousel.slick("slickPrev");
		});

	} sliderPopular();


	//colors slider
	function sliderColors() {
		var carousels = $(".color-rotator");

		carousels.each(function(){
			var carousel = $(this),
				next = carousel.parent().find(".rotator-arrow__right"),
				prev = carousel.parent().find(".rotator-arrow__left"),
				current = carousel.parent().find(".rotator__counter-current"),
				all = carousel.parent().find(".rotator__counter-all");

			colorPopup = {
				rows: 5,
				slidesPerRow: 15,
				arrows: false,
				infinite: false,
				responsive: [
					{
						breakpoint: 569,
						settings: {
							slidesPerRow: 11,
						}
					},
					{
						breakpoint: 481,
						settings: {
							slidesPerRow: 6,
						}
					}
				]
			};

			colorCont = {
				rows: 3,
				slidesPerRow: 9,
				arrows: false,
				infinite: false,
				responsive: [
					{
						breakpoint: 640,
						settings: {
							slidesPerRow: 6
						}
					},
					{
						breakpoint: 481,
						settings: {
							rows: 6,
							slidesPerRow: 4
						}
					}
				]
			};

			carousel.on("init", function(){
				var l = $(this).find('.slick-slide').length;
				all.text(l);
				if(l === $(this).find(".slick-active").length){
					// $(this).parent().find(".rotator-navi").hide();
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

			if(carousel.parent().find(".color-rotator__popup").length){
				carousel.slick(colorPopup);
			}
			
			if(carousel.parent().find(".color-rotator__cont").length){
				carousel.slick(colorCont);
			}

			carousel.on("breakpoint", function(event, slick, breakpoint){
				countSlides($(this))
			});

			next.on("click", function(){
				carousel.slick("slickNext");
			});

			prev.on("click", function(){
				carousel.slick("slickPrev");
			});
		});

	} sliderColors();

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
				$(".rotator-navi").hide();
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

		carousel.on("breakpoint", function(event, slick, breakpoint){
			countSlides($(this))
		});

		next.on("click", function(){
			carousel.slick("slickNext");
		});

		prev.on("click", function(){
			carousel.slick("slickPrev");
		});

	} sliderReviews();

	//furniture slider
	function sliderFurniture() {
		var carousels = $(".furn-rotator");

		carousels.each(function(){
			var carousel = $(this),
				next = carousel.parent().find(".rotator-arrow__right"),
				prev = carousel.parent().find(".rotator-arrow__left"),
				current = carousel.parent().find(".rotator__counter-current"),
				all = carousel.parent().find(".rotator__counter-all");

			var popupRotator = {
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: false,
				infinite: false,
				responsive: [
					{
						breakpoint: 1170,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1
						}
					}
				]
			};

			var contRotator = {
				slidesToShow: 4,
				slidesToScroll: 1,
				arrows: false,
				infinite: false,
				slide: ".furn-rotator__item",
				responsive: [
					{
						breakpoint: 1170,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 993,
						settings: {
							slidesToShow: 4
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 4
						}
					},
					{
						breakpoint: 569,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1
						}
					}
				]
			};

			carousel.on("init", function(){
				var l = $(this).find('.slick-slide').length;
				all.text(l);
				if(l === $(this).find(".slick-active").length){
					carousel.find(".rotator-navi").hide();
				} else {
					prev.addClass("disabled")
				}
				countSlides(carousel)
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

			if(carousel.parent().find(".furn-popup").length){
				carousel.slick(popupRotator);
			};

			if(carousel.parent().find(".furn-content").length){
				carousel.slick(contRotator);
			};
			

			carousel.on("breakpoint", function(event, slick, breakpoint){
				countSlides($(this))
			});

			next.on("click", function(){
				carousel.slick("slickNext");
			});

			prev.on("click", function(){
				carousel.slick("slickPrev");
			});
		})

	} sliderFurniture();

	function countSlides(slider) {
		setTimeout(function(){
			var el = $(slider),
				 t = el.find('.slick-slide').length,
				all = el.parent().find(".rotator__counter-all");

			var l = el.find(".slick-slide").length - el.find('.slick-active').length;

			all.text(l+1);

			if(l < 1){
				el.parent().find(".rotator-navi").hide();
			} else {
				el.parent().find(".rotator-navi").show();
			}
		},200);
	};

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
			scrollOffset = 50;

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
		    	if( currentTop < secondaryNavOffsetTop) {
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
		 	  	if( currentTop > secondaryNavOffsetTop + scrollOffset) {
		 	  		
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
	} 
	if(!$(".out").hasClass("out-inner")) {
		scrolling();
	}

	//scroll section
	function scrollSection(){
		var scrolling = false;
		var contentSection = $(".sc-section"),
			navigation = $(".secondary-nav"),
			navA = navigation.find("ul"),
			navigationItems = navigation.find("a");

		$(window).on("scroll", checkScroll);

		navA.on("click", "a", function(event){

			var target = $(this).data("scroller"),
				rTarget = navA.find(".active").data("scroller") || navA.find("li").last().find("a").data("scroller");

			console.log(target, rTarget)
			smoothScroll(target, rTarget);
			// smoothScroll($(this.hash))
			event.preventDefault();
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
					navigationItem = navigationItems.filter('[data-scroller^="#'+ sectionId +'"]');

				((section.offset().top - halfWindowHeight < scrollTop) && (section.offset().top + section.height() - halfWindowHeight > scrollTop))
					? navigationItem.addClass("active")
					: navigationItem.removeClass("active");
			});
			scrolling = false;
		}

		function smoothScroll(target,rTarget) {
			var tTop = $(target).offset().top - $(window).scrollTop(),
				rtTop = $(rTarget).offset().top - $(window).scrollTop();

			if(!$(".out").hasClass("out-inner")) {
				setTimeout(function(){
					if(rtTop < tTop) {
						console.log(true)
						$("body, html").animate({
							"scrollTop": $(target).offset().top - $(".secondary-nav").innerHeight() - 30
						}, 450);
					} else {
						console.log(false)
						$("body, html").animate({
							"scrollTop": $(target).offset().top - $(".secondary-nav").innerHeight() - $(".header").innerHeight() - 30
						}, 450);
					}
				},100)
			} else {
				$("body, html").animate({
					"scrollTop": $(target).offset().top - 30
				}, 450);
			}


			

			// $("body, html").animate({
			// 	"scrollTop": $(target).offset().top - $(".secondary-nav").innerHeight() - $(".header").innerHeight()
			// }, 450);
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
		}),
		objectManager = new ymaps.ObjectManager({
			clusterize: true
		});

		var myObjects = {
			"type": "FeatureCollection",
			"features": [
				{
					"type": "Feature", 
					"id": 0, 
					"geometry": {
						"type": "Point", 
						"coordinates": [55.649728, 37.55195]
					}, 
					"properties": {
						"balloonContent": "1117342, г. Москва, РФ, ул. Введенского, д.1, стр.1"
					}
				},
				{
					"type": "Feature", 
					"id": 1, 
					"geometry": {
						"type": "Point", 
						"coordinates": [55.672021, 37.583895]
					}, 
					"properties": {
						"balloonContent": "Нахимовский пр-т, 24, пав. 3В, 443"
					}
				}
			]
		};


		objectManager.objects.options.set({
			preset: 'islands#icon',
			iconColor: "#e03732"
		});
		yMap.geoObjects.add(objectManager);
		objectManager.add(myObjects);
		yMap.setBounds(objectManager.getBounds());

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
			html = $("html"),
			btnSelect = popupSelector.find(".btn-select");

		html.addClass("modal-open");

		if(popupSelector.find(".slick-slider").length){
			setTimeout(function(){
				$(".slick-slider").slick("setPosition");
				// $(window).trigger("resize");
			},100);
		}

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
						popupSelector.find("input").prop("checked", false);
					}
				})
		});

		innerSelector.on("click", function(event){
			event.stopPropagation();
		});

		btnSelect.off('click').on("click", function(){
			selectedValue(data, $(this))

			popupSelector
				.fadeOut({
					duration: duration,
					complete: function () {
						$(this).find(".modal-back").removeClass("open");
						html.removeClass("modal-open");
						
					}
				})
		});
	};

	function selectedValue(modal, btn) {
		var itemDOM = $("[data-modal='" + modal + "']").find("span"),
			s = $("[data-modal-wrap='" + modal + "']"),
			inValHidden = $("[data-modal='" + modal + "']").find("input"),
			input = s.find("input:checked"),
			inVal = input.data('value'),
			val = input.val(),
			objVals = [];

		if(inVal === undefined) {
			return false;
		} else {
			if(!s.hasClass("modal__wrap-equipment")) {
				itemDOM.html(inVal);
				inValHidden.data('value', inVal);
				inValHidden.val(val).trigger('change');

				return true;
			} else {
				s.find("input:checked").each(function() {
					var _this = $(this),
						inpCheck = _this.data("value"),
						inpCategory = _this.data("category");
						
					objVals.push(inpCategory + ": " + inpCheck);
				});

				var post = objVals.join(", ");
				itemDOM.html(post);
				inValHidden.data('value', post);
				inValHidden.val(val).trigger('change');

			}
		}
	};

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
		var carousels = $(".single-image");
		carousels.each(function(){

		
			var carousel = $(this),
				next = carousel.parent().find(".rotator-arrow__right"),
				prev = carousel.parent().find(".rotator-arrow__left"),
				current = carousel.parent().find(".rotator__counter-current"),
				all = carousel.parent().find(".rotator__counter-all"),
				caption = carousel.parent().next(".rotator-caption");

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

			var single = {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				infinite: false
			}

			var double = {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				infinite: false,
				asNavFor: caption
			}

			var caption = {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				infinite: false,
				asNavFor: carousel,
				touchMove: false,
				swipe: false
			}

			if(carousel.parent().next(".rotator-caption").length) {
				carousel.slick(double);
				carousel.parent().next(".rotator-caption").slick(caption)
			} else {
				carousel.slick(single);
			}

				

			carousel.find("img").on("click", function(){
				$(this).slick("slickNext");
			})

			next.on("click", function(){
				$(this).slick("slickNext");
			});

			prev.on("click", function(){
				$(this).slick("slickPrev");
			});
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


	//tab
	function tab() {
		var tbCont = $(".tab-container");

		tbCont.each(function(){
			var $this = $(this),
				tbLink = $this.find("a"),
				tbItem = $this.find("li"),
				tbIndex = tbLink.data("tab"),
				tbContent = $this.find("[data-tab-cont]");
			tbItem.first().addClass("active");
			$this.find("[data-tab-cont='" + tbIndex + "']").show();
			setTimeout(function(){
				$this.find("[data-tab-cont='" + tbIndex + "']").addClass("visible");
			});

			tbLink.on("click", function(event){
				event.preventDefault();
				var _ = $(this),
					index = _.data("tab"),
					activeTab = _.parents(".tab-container").find("[data-tab-cont='" + index + "']");
				
				tbItem.removeClass("active");
				_.parent().addClass("active");

				tbContent.fadeOut(0).removeClass("visible");

				setTimeout(function(){
					$this.find("[data-tab-cont='" + index + "']").addClass("visible");
				},10);
				$this.find("[data-tab-cont='" + index + "']").show().find(".slick-slider").slick("setPosition");
				// $(window).trigger("resize");
			});
		});
	} tab();


	// mobile menu
	function mobi(){
		var trigger = $(".hamburger-inner"),
			cont = $(".mobile__navi"),
			close = cont.find(".close");

		trigger.on("click", function(){
			cont.fadeIn(150);
			$("html").css("overflow", "hidden");
		});

		close.on("click", function(){
			cont.fadeOut(150);
			$("html").removeAttr("style");
		});

	} mobi();

	//search focus
	function IFocus(){
		var sCont = $(".form-trigger");
		sCont.each(function(){
			var trigger = $(this).find(".btn-search"),
				i = $(this).find("input");

			trigger.on("click", function(){
				setTimeout(function(){
					i.focus();
				}, 10);
			});

			i.on("input", function(){
				var $this = $(this),
					iVal = $this.val().length;
				if(iVal !== 0) {
					trigger.attr("type", "submit");
				} else {
					trigger.attr("type", "button");
				}
			});

		});

	} IFocus();

	function chars() {
		$('.numeric').on('keypress', function(key){
			if((key.charCode < 40 || key.charCode > 41) && (key.charCode < 48 || key.charCode > 57) && (key.charCode != 45) && (key.charCode != 32) && (key.charCode != 43) && (key.charCode != 0))
				return false;
		});

	} chars();

	function bgColotInput() {
		var p = $(".modal__wrap"),
			i = p.find("input"),
			t = p.find("textarea");

		i.each(function(){
			var v = $(this).val().length;

			if(v !== 0) {
				$(this).css("background-color", "#ffffff")
			}

			$(this).on("input", function(){
				if($(this).val().length !== 0) {
					$(this).css("background-color", "#ffffff")
				}
			});
		});
		t.each(function(){
			var v = $(this).val().length;

			if(v !== 0) {
				$(this).css("background-color", "#ffffff")
			}

			$(this).on("change", function(){
				if($(this).val().length !== 0) {
					$(this).css("background-color", "#ffffff")
				}
			});
		});
	} bgColotInput();

	//fancybox
	function f_box(){
		$(".resize").fancybox({
			padding: 0,
			margin: [60, 20, 60, 20]
		});

		
	} f_box();

	function fancyGallery(){
		$(".complectation-body").on("click", function(){
			var _ = $(this),
				_length = _.next().children().length + 1;

			$(".complectation-body").fancybox({
				padding: 0,
				margin: [30, 30, 30, 30],
				tpl: {
					wrap: '<div class="fancybox-wrap" tabIndex="1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"><div class="counter"><div class="count_elem"><span class="current"></span><span class="separator">/</span><span class="all"></span></div></div></div></div></div></div>',
				},
				afterShow: function () {
					$('.all').text(_length);
					$('.current').text($.fancybox.current.index + 1);
				}
			});
		});
	} fancyGallery();

});
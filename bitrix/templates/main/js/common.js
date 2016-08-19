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

});
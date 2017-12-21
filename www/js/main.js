$(function(){
	'use-strict';

	// side nav left
	$(".side-nav-left").sideNav({

		edge: 'left',
		closeOnClick: false

	});

		// side nav right
	$(".side-nav-right").sideNav({

		edge: 'right',
		closeOnClick: false

	});


	// slider
	$(".slider").slider({full_width: true});

	// testimonial
	$("#popular-post-owl").owlCarousel({

		slideSpeed : 300,
		paginationSpeed : 400,
		items: 2,
		itemsMobile: 2,
		navigation: true,

	})

	// select
	$('select').material_select();

	// loader
    /*$("#fakeLoader").fakeLoader({
      
      zIndex: 999,
      spinner: 'spinner4',
      bgColor: '#ffffff'

    });*/

    $('.collapsible').collapsible({
		accordion: false
	});

});
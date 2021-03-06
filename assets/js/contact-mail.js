jQuery(function($){

var PASTA = window.PASTA || {};

/* ==================================================
	Reservation Form Validations
================================================== */
	PASTA.ReservationForm = function(){
		$('.reservation-form').each(function(){
			var formInstance = $(this);
			formInstance.submit(function(){

			var action = $(this).attr('action');

			$("#rv-message").slideUp(750,function() {
			$('#rv-message').hide();

			$('#rv-submit')
				.after('<img src="assets/images/ajax-loader-bg.gif" class="loader" />')
				.attr('disabled','disabled');

			$.post(action, {
				name: $('#rv-name').val(),
				email: $('#rv-email').val(),
				phone: $('#rv-phone').val(),
				location: $('#rv-location').val(),
				enquiry: $('#rv-enquiry').val()
			},
				function(data){
					document.getElementById('rv-message').innerHTML = data;
					$('#rv-message').slideDown('slow');
					$('.reservation-form img.loader').fadeOut('slow',function(){$(this).remove()});
					$('#rv-submit').removeAttr('disabled');
					if(data.match('success') != null) $('.reservation-form').slideUp('slow');

				}
			);
			});
			return false;
		});
		});
	}

/* ==================================================
	Contact Form Validations
================================================== */
	PASTA.ContactForm = function(){
		$('.contact-form').each(function(){
			var formInstance = $(this);
			formInstance.submit(function(){

			var action = $(this).attr('action');

			$("#message").slideUp(750,function() {
			$('#message').hide();

			$('#submit')
				.after('<img src="assets/images/ajax-loader-bg.gif" class="loader" />')
				.attr('disabled','disabled');

			$.post(action, {
				name: $('#name').val(),
				email: $('#email').val(),
				phone: $('#phone').val(),
				comments: $('#comments').val()
			},
				function(data){
					document.getElementById('message').innerHTML = data;
					$('#message').slideDown('slow');
					$('.contact-form img.loader').fadeOut('slow',function(){$(this).remove()});
					$('#submit').removeAttr('disabled');
					if(data.match('success') != null) $('.contact-form').slideUp('slow');

				}
			);
			});
			return false;
		});
		});
	}

  /* ==================================================
   Init Functions
================================================== */
$(document).ready(function(){
	PASTA.ReservationForm();
	PASTA.ContactForm();
});

	});

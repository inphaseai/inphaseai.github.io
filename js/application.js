$(document).ready(function() {
	"use strict";
    
    // Email address validation
    function validateEmail(email) {
        var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return regex.test(email);
    }

    /******************** CONTACT FORM ********************/
    $('#btnSend').button({ loadingText: '<i class="fa fa-circle-o-notch fa-spin"></i> Sending' });

    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        var success_msg = $(this).find('.success-msg');
        var error_msg = $(this).find('.error-msg');
        var error_validation_msg = $(this).find('.error-validation-msg');
        var error_validation_text = $(this).find('.error-validation-text');

        var captcha = $(this).find('input[name="captcha"]').val();
        var name = $(this).find('input[name="name"]').val();
        var email = $(this).find('input[name="email"]').val();
        var subject = $(this).find('input[name="subject"]').val();
        var message = $(this).find('textarea[name="message"]').val();
        
        if (!validateEmail( email )) {
            error_validation_text.text('Your email address is in an invalid format');
            error_validation_msg.fadeIn(200);
        }
        else if (name === "") {
            error_validation_text.text('Please enter a value for Name');
            error_validation_msg.fadeIn(200);
        }
        else if ( subject === "") {
            error_validation_text.text('Please enter a value for Subject');
            error_validation_msg.fadeIn(200);
        }
        else if ( message === "") {
            error_validation_text.text('Please enter a value for Message');
            error_validation_msg.fadeIn(200);
        }
        else {
            var btn = $('#btnSend');
            btn.button('loading');
            btn.prop('disabled', true);

            $.ajax({
                type: "POST",
                url: $(this).attr('action'),
                contentType: "application/json",
                data: JSON.stringify({ name: name, email: email, subject: subject, message: message, captcha: captcha }),
                success: function() {
                    error_msg.fadeOut(100);
                    error_validation_msg.fadeOut(100);
                    success_msg.fadeIn(500);
                    btn.button('reset');
                    btn.prop('disabled', false);
                },
                error: function() {
                    success_msg.fadeOut(100);
                    error_validation_msg.fadeOut(100);
                    error_msg.fadeIn(500);
                    btn.button('reset');
                    btn.prop('disabled', false);
                }
            });
        }
    
    return false;
    });
});
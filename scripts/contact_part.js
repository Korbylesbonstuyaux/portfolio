// CONTACT PART

function getXMLHttpRequest()
{
	var xhr = null;

	if (window.XMLHttpRequest || window.ActiveXObject)
	{
		if (window.ActiveXObject)
		{
			try
			{
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e)
				{
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}
		} else
			{
				xhr = new XMLHttpRequest();
			}
	} else
		{
			alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
			return null;
		}

	return xhr;
}

// Request AJAX
// Param: Page of the request, value of parameters and callback function
function request(page, param_value, callback)
{
    var xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0))
        {
            callback(xhr.responseText);
        }
    };

    xhr.open("POST", page, false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var param = "parameter="+param_value;
    xhr.send(param);
}

// Return if a name is valid
function isValidName(name)
{
  if(/^[a-zA-Z- ]{2,40}$/i.test(name) && (name.length >= 2) && (name.length <= 40))
  {
  	return true;
  }

  return false
}

// Return if a firstname is valid
function isValidFirstname(name)
{
  if(/^[a-zA-Z- ]{2,40}$/i.test(name) && (name.length >= 2) && (name.length <= 40))
  {
  	return true;
  }

  return false
}

// Return if a mail adress is valid
function isValidEmail(email)
{
  if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-zA-Z]{2,4}$/.test(email) && (email.length >= 6) && (email.length <= 60))
  {
    return true;
  }

  return false
}

// Return if a subject is valid
function isValidSubject(subject)
{
  var reg = new RegExp(".{6,60}");
	var reg2 = new RegExp("\\s{30,60}");
	var reg3 = new RegExp("^\\s{0,60}$");

	// reg.test(message) && !reg2.test(message) &&
  if(reg.test(subject) && !reg2.test(subject) && !reg3.test(subject) && (subject.length >= 6) && (subject.length <= 60))
  {
    return true;
  }

  return false;
}

// Return if a message is valid
function isValidMessage(message)
{
  var reg = new RegExp(".{20,360}");
	var reg2 = new RegExp("\\s{100,360}");
	var reg3 = new RegExp("^\\s{0,360}$");

	// reg.test(message) && !reg2.test(message) &&
  if(reg.test(message) && !reg2.test(message) && !reg3.test(message) && (message.length >= 20) && (message.length <= 360))
  {
    return true;
  }

  return false;
}

var valid_captcha = false;

function analyzeCaptcha(response)
{
	if (response == "Success")
	{
		valid_captcha = true;
	}
	else valid_captcha = false;
}

function isValidCaptcha(captcha)
{
	request("ajax/valid_captcha.php", captcha, analyzeCaptcha);

	if(valid_captcha)
	{
		 return true;
	}

	return false;
}

(function()
{
  // Document ready, reset form
  jQuery(document).ready(function()
  {
      // Reset form
      jQuery('.contact-form').each(function()
      {
        this.reset();
      });
  });

  // Array to know if possible to send a message
  var valids = {
    name: false,
    firstname: false,
    email: false,
    message: false,
		captcha: false
  };

  function resetValids()
  {
    for (var id in valids)
    {
      valids[id] = false;
    }
  }

  function addBlurListener(contact_bloc, field)
  {
    jQuery("#"+contact_bloc).on("blur", "#"+field, function()
    {
      var val = jQuery("#"+field).val();
      var func_name = "isValid"+field.charAt(0).toUpperCase()+field.slice(1);
      var func_params = [val];
      var func = window[func_name];

      if (typeof func === "function")
      {

        if (!func.apply(null, func_params))
        {
          // Form Control
          jQuery("."+field+"-form").removeClass("has-success");
          jQuery("."+field+"-form").addClass("has-error");
          // Change feedback
          jQuery("."+field+"-feedback").addClass("feedback");
          jQuery("."+field+"-feedback").removeClass("glyphicon-ok");
          jQuery("."+field+"-feedback").addClass("glyphicon-remove");
          // Add error message
          jQuery("."+field+"-error").addClass("error");

          // Non valid
          valids[field] = false;
        }
        else
            {
              // Form Control
              jQuery("."+field+"-form").removeClass("has-error");
              jQuery("."+field+"-form").addClass("has-success");
              // Change feedback
              jQuery("."+field+"-feedback").addClass("feedback");
              jQuery("."+field+"-feedback").removeClass("glyphicon-remove");
              jQuery("."+field+"-feedback").addClass("glyphicon-ok");
              // Remove error message
              jQuery("."+field+"-error").removeClass("error");

              // Valid
              valids[field] = true;
            }

        isValidForm();

      }

    });
  }

  function addListenerForm()
  {
    // Add blur on input
    jQuery("#contact-content input").each(function()
    {
      addBlurListener("contact-content", this.id);
    });

    // Add blur on textarea
    jQuery("#contact-content textarea").each(function()
    {
      addBlurListener("contact-content", this.id);
    });
  }

  addListenerForm();

  // Enable submit if the form is valid
  jQuery("#contact-content").on("click", '#submit', function()
  {
    return isValidForm();
  });

  // Return true if the form is valid, false else
  function isValidForm()
  {
    var error = false;

    for (var id in valids)
    {
      if(!valids[id])
      {
        error = true;
        break;
      }
    }

    if(error)
    {
      jQuery(".form-error").addClass("error");
    }
    else jQuery(".form-error").removeClass("error");

    return !error;
  }

	// Refresh captcha
	jQuery('#contact-content').on('click', '#refresh-captcha', function()
	{
			$('#image-captcha').attr('src','php/captcha.php?param='+new Date().getTime());
	});

  // CLick on reload form button, reload form
  jQuery('#contact-content').on('click', '#reload-form', function()
  {
      reloadForm();
  });

  // Submit send a ajax request to contact page
  jQuery('#contact-content').on('submit', '#contact-form', function(e)
  {
    e.preventDefault();
		// To prevent spam button
		resetValids();
    var $form = jQuery('#contact-form');
    $.post($form.attr("action"), $form.serialize())
    .done(function(data)
    {
			if(data.search('Error') == -1)
			{
				SuccessfulMessage();
			}
      else UnsuccessfulMessage();
    })
    .fail(function()
    {
      UnsuccessfulMessage();
    });
  });

  // Add to contact content html, the successful html
  function SuccessfulMessage()
  {
    var success = '<div class="row">'+
                    '<div class="col-xs-12">'+
                      '<img id="letter" src="images/icons/letter.png" alt="Message"/>'+
                      '<p class="green">'+
                        'Votre message a bien été envoyé'+
                      '</p>'+
                    '</div>'+
                    '<div class="col-xs-12">'+
                      '<button id="reload-form" type="submit" class="btn btn-lg" autocomplete="off">Recharger le Formulaire</button>'+
                    '</div>'+
                  '</div>';

    jQuery('#contact-content').html(success);
  }

  // Add to contact content html, the unsuccessful html
  function UnsuccessfulMessage()
  {
    var unsuccess = '<div class="row">'+
                    '<div class="col-xs-12">'+
                      '<img id="letter" src="images/icons/letter.png" alt="Message"/>'+
                      '<p class="red">'+
                        'Désolé, votre message n\'a pas pu être envoyé'+
                      '</p>'+
                    '</div>'+
                    '<div class="col-xs-12">'+
                      '<button id="reload-form" type="submit" class="btn btn-lg" autocomplete="off">Recharger le Formulaire</button>'+
                    '</div>'+
                  '</div>';

    jQuery('#contact-content').html(unsuccess);
  }

  // Add to contact content html, the form
  function reloadForm()
  {
			var time = new Date().getTime();
      var reload = '<form id="contact-form" class="contact" action="ajax/contact.php" method="post">'+
                    '<div class="row">'+
                      '<div class="col-xs-12">'+
                        '<div class="form-group has-feedback name-form">'+
                          '<label class="control-label" for="name">Nom <span class="required">*</span> : </label>'+
                          '<input id="name" name="name" type="text" class="form-control">'+
                          '<span class="glyphicon glyphicon-remove form-control-feedback name-feedback"></span>'+
                          '<p class="name-error">'+
                            'Votre nom ne correspond pas aux critères.<br>'+
                            'Entre 2 et 40 lettres.'+
                          '</p>'+
                        '</div>'+
                        '<div class="form-group has-feedback firstname-form">'+
                          '<label class="control-label" for="firstname">Prénom <span class="required">*</span> : </label>'+
                          '<input id="firstname" name="firstname" type="text" class="form-control">'+
                          '<span class="glyphicon glyphicon-remove form-control-feedback firstname-feedback"></span>'+
                          '<p class="firstname-error">'+
                            'Votre prénom ne correspond pas aux critères.<br>'+
                            'Entre 2 et 40 lettres.'+
                          '</p>'+
                        '</div>'+
                        '<div class="form-group has-feedback email-form">'+
                          '<label class="control-label" for="email">Email <span class="required">*</span> : </label>'+
                          '<input id="email" name="email" type="email" class="form-control">'+
                          '<span class="glyphicon glyphicon-remove form-control-feedback email-feedback"></span>'+
                          '<p class="email-error">'+
                            'L\'adresse email n\'est pas au bon format.'+
                          '</p>'+
                        '</div>'+
												'<div class="form-group has-feedback subject-form">'+
				                  '<label class="control-label" for="subject">Titre <span class="required">*</span> : </label>'+
				                  '<input id="subject" name="subject" type="text" class="form-control" maxlength="60">'+
				                  '<span class="glyphicon glyphicon-remove form-control-feedback subject-feedback"></span>'+
				                  '<p class="subject-error">'+
				                    'Le sujet ne correspond pas aux critères.'+
				                    '<br> Entre 6 et 60 lettres.'+
				                  '</p>'+
				                '</div>'+
                        '<div class="form-group has-feedback message-form">'+
                          '<label class="control-label" for="message">Message <span class="required">*</span> : </label>'+
                          '<textarea id="message" name="message" type="textarea" class="form-control"></textarea>'+
                          '<span class="glyphicon glyphicon-remove form-control-feedback message-feedback"></span>'+
                          '<p class="message-error">'+
                            'Votre message ne correspond pas aux critères.<br>'+
                            'Entre 20 et 360 caractères.'+
                          '</p>'+
                        '</div>'+
												'<div class="form-group has-feedback captcha-form">'+
				                  '<label class="control-label" for="captcha">Captcha <span class="required">*</span> : </label>'+
				                  '<img id="image-captcha" src="php/captcha.php?param='+time+'" alt="captcha" class="captcha"/>'+
				                  '<button id="refresh-captcha" type="button" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-refresh"></span></button>'+
				                  '<input id="captcha" name="captcha" type="text" class="form-control" maxlength="5">'+
				                  '<span class="glyphicon glyphicon-remove form-control-feedback captcha-feedback"></span>'+
				                  '<p class="captcha-error">'+
				                    'Votre réponse ne correspond pas au captcha affiché.'+
				                  '</p>'+
				                '</div>'+
                      '</div>'+
                      '<div class="col-xs-12">'+
                        '<div class="row">'+
                          '<div class="col-xs-12">'+
                            '<button id="submit" type="submit" class="btn btn-lg pull-right" autocomplete="off">Envoyer</button>'+
                          '</div>'+
                          '<div class="col-xs-12">'+
                            '<p class="form-error">'+
                              'Un champ (ou plusieurs) n\'est pas correct.'+
                            '</p>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                      '<div class="col-xs-12">'+
                        '<span class="pull-left required">* : Champ obligatoire</span>'+
                      '</div>'+
                    '</div>'+
                  '</form>';
      resetValids();
      jQuery('#contact-content').html(reload);
  }

}) ();

function doCrypt(isDecrypt, text, key_value)
{
	var result = "";

	if (!/^-?\d+$/.test(key_value))
	{
		return null;
	}

	var key = parseInt(key_value, 10);

	if (key < 0 || key >= 26)
	{
		return null;
	}

	if (isDecrypt)
	{
		key = (26 - key) % 26;
	}

	for (var i = 0; i < text.length; i++)
	{
		var c = text.charCodeAt(i);

		if(c >= 65 && c <= 90)
		{
			 result += String.fromCharCode((c - 65 + key) % 26 + 65);  // Uppercase
		}
		else {
					 if(c >= 97 && c <= 122)
					 {
						 result += String.fromCharCode((c - 97 + key) % 26 + 97);  // Lowercase
					 }
					 else result += text.charAt(i);  // Copy
				 }
	}

	return result;
}

var decrypted = false;

$("#contact #decrypt").click(function()
{
	if(!decrypted)
	{
			$("#contact .my-email").html(doCrypt(true, "wplyylhuaovuf.kyvzz@nthps.jvt", 7));
	}
});

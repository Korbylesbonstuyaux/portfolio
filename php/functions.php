<?php

define("CONTACT_MAIL", "nas.dross@gmail.com");

// Return if a name is valid
function isValidName($name)
{
	if( preg_match("#^[a-zA-Z- ]{2,40}$#i", $name) && (strlen($name) >= 2) && (strlen($name) <= 40) )
	{
		return true;
	}

	return false;
}

// Return if a firstname is valid
function isValidFirstname($name)
{
	if( preg_match("#^[a-zA-Z- ]{2,40}$#i", $name) && (strlen($name) >= 2) && (strlen($name) <= 40) )
	{
		return true;
	}

	return false;
}

// Return if a mail adress is valid
function isValidEmail($email)
{
	if( preg_match("#^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-zA-Z]{2,4}$#i", $email) && (strlen($email) >= 6) && (strlen($email) <= 60) )
	{
		return true;
	}

	return false;
}

// Return if a subject is valid
function isValidSubject($subject)
{
	if( preg_match("#.{6,60}#i", $subject) && !preg_match("#\\s{30,60}#i", $subject) && !preg_match("#^\\s{0,60}$#i", $subject) && (strlen($subject) >= 6) && (strlen($subject) <= 60) )
	{
		return true;
	}

	return false;
}

// Return if a message is valid
function isValidMessage($message)
{
	if( preg_match("#.{20,360}#i", $message) && !preg_match("#\\s{100,360}#i", $message) && !preg_match("#^\\s{0,360}$#i", $message) && (strlen($message) >= 20) && (strlen($message) <= 360) )
	{
		return true;
	}

	return false;
}

// Send a message to my mail address
function sendMessage($name, $firstname, $title, $email, $mess)
{
	// Multiple recipients
	$to  = CONTACT_MAIL;

	// Subject
	$subject = 'Site UPTO Numérique : nouveau message.';

	// Message
	$message = '
	<html>
	<head>
	  <title>Nouveau Message</title>
	</head>
	<body>
		<p>Vous avez reçu un nouveau message depuis le formulaire du site UP TO Numérique</p>
	  <p>
			<b>Nom</b> : '.$name.' <br>
			<b>Prénom</b> : '.$firstname.' <br>
			<b>Email</b> : '.$email.' <br>
			<b>Sujet</b> : '.$title.' <br>
			<b>Message</b> : '.$mess.' <br>
		</p>
		<footer>
				Ceci est un mail automatique. Merci de ne pas y répondre.
		</footer>
	</body>
	</html>
	';

	// To send HTML mail, the Content-type header must be set
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	// Additional headers
	$headers .= 'To: contact <'.CONTACT_MAIL.'>' . "\r\n";
	$headers .= 'From: Site UPTO Numérique <'.CONTACT_MAIL.'>' . "\r\n";

	// Send mail
	mail($to, $subject, $message, $headers);
}

// Send a message to confirmation mail
function sendConfirmationMail($name, $firstname, $email)
{
	// Multiple recipients
	$to  = $email;

	// Subject
	$subject = 'Site UPTO Numérique : confirmation de votre message.';

	// message
	$message = '
	<html>
	<head>
	  <title>Confirmation de la réception de votre message</title>
	</head>
	<body>
		<p>
			Bonjour '.$name.' '.$firstname.',<br><br>
			Votre message posté depuis le formulaire a bien été envoyé.<br>
		</p>
		<footer>
				Ceci est un mail automatique. Merci de ne pas y répondre.
		</footer>
	</body>
	</html>
	';

	// To send HTML mail, the Content-type header must be set
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	// Additional headers
	// $headers .= 'To: contact <'.$email.'>' . "\r\n";
	$headers .= 'From: Site UPTO Numérique <'.CONTACT_MAIL.'>' . "\r\n";

	// Send mail
	mail($to, $subject, $message, $headers);
}
?>

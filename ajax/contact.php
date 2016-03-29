<?php
	require_once('../php/functions.php');

	if(isset($_POST['name']) && isset($_POST['firstname']) && isset($_POST['email']) && isset($_POST['subject']) && isset($_POST['message']))
	{
		$name = htmlentities($_POST['name']);
		$firstname = htmlentities($_POST['firstname']);
		$email = htmlentities($_POST['email']);
    $subject = htmlentities($_POST['subject']);
		$message = htmlentities($_POST['message']);

		if(isValidName($name) && isValidFirstname($firstname) && isValidEmail($email) && isValidSubject($subject) && isValidMessage($message))
		{
			sendMessage($name, $firstname, $subject, $email, $message);
			sendConfirmationMail($name, $firstname, $email);
			echo 'Success : votre message a bien été envoyé.';
		}
		else echo 'Error : un ou des paramètres nécessaires ne correspondent pas aux critères.';
	}
	else echo 'Error : un ou des paramètres nécessaires n\'ont pas été initialisés.';
?>

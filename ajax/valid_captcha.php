<?php
session_start();

header("Content-Type: text/plain");

if( isset($_POST['parameter']) )
{
	if( isset($_SESSION['captcha']) )
	{
		$parameter = htmlspecialchars($_POST['parameter']);

		if ($parameter == $_SESSION['captcha'])
		{
			echo 'Success';
		}
		else echo 'Error : la valeur rentrée ne correspond pas';
	}
	else echo 'Error : la variable S_SESSION[\'captcha\'] n\'a pas été initialisée';
}
else echo 'Error : la variable $_POST[\'parameter\'] n\'a pas été initialisée';

?>

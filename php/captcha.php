<?php
session_start();

function image($word)
{
	$width = strlen($word) * 10;
	$height = 20;
	$img = imagecreate($width, $height);
	$white = imagecolorallocate($img, 255, 255, 255);
	$green = imagecolorallocate($img, 0, 169, 162);
	$middleHeight = ($height / 2) - 8;
	imagestring($img, 6, strlen($word) / 2 , $middleHeight, $word, $green);
	// imagerectangle($img, 1, 1, $width - 1, $height - 1, $green); // La bordure

	imagepng($img);
	imagedestroy($img);
}

function nombre($n)
{
	return str_pad(mt_rand(0,pow(10,$n)-1),$n,'0',STR_PAD_LEFT);
}

function captcha()
{
	$word = nombre(5);
	$_SESSION['captcha'] = $word;
	image($word);
}

header("Content-type: image/png");

captcha();
?>

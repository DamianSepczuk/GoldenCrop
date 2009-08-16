<?php
$dloadVer = '0.90 beta';
$location = 'https://sourceforge.net/projects/goldencrop/files/goldencrop/Golden%20Crop%20v0.90%20beta/Golden%20Crop_v090beta.zip/download';

// Simple download counter...
include('db_settings.inc.php');
$conn = new mysqli('mysql-g', $rwUser, $rwPass,'g270328_www');
if (!mysqli_connect_error()) {
	$conn->real_query('UPDATE `download_stats` SET `count`=`count`+1 WHERE `version`=\''.$dloadVer.'\'');
	$conn->close();
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Expires" content="0" />
	<meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate" />
	<meta http-equiv="Cache-Control" content="post-check=0, pre-check=0" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="refresh" content="1; URL=<?=$location?>" />
	<meta name="Robots" content="NOINDEX" />
	<style>
		img { border: none; }
		body { background-color: black; 
				color: white;
		}
		#gclogo { text-align: center; }
		#contents { 
			background-color: #111;
			border: 2px solid #333;
			padding: 1em;
			width: 1000px;
			margin-left: auto;
			margin-right: auto;

		}
		a { text-decoration: none; color: #ffc }
		a:hover {text-decoration: underline; color: #ff3 }
	</style>
</head>
<body>
<div id="gclogo"><img alt="Golden Crop logo" src="img/GoldenCrop_logo.png"/></div>
<div id="contents">
<p>Redirecting to download page... <a href="<?=$location?>">Click HERE</a> if not redirected.</p>
<p>Home Page: <a href="http://goldencrop.sourceforge.net/">http://goldencrop.sourceforge.net/</a></p>
<p style="font-size:80%">Download page URL: <a href="<?=$location?>"><?=$location?></a></p>
</div>
</body>
</html>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Expires" content="0" />
	<meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate" />
	<meta http-equiv="Cache-Control" content="post-check=0, pre-check=0" />
	<meta http-equiv="Pragma" content="no-cache" />
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
		.dwonloadStats { border: 1px solid white; margin: auto;}
		.dwonloadStats th { background-color: #111}
		.dwonloadStats td { background-color: #222}
	</style>
</head>
<body>
<div id="gclogo"><img alt="Golden Crop logo" src="img/GoldenCrop_logo.png"/></div>
<div id="contents">
<table class="dwonloadStats">
<tr>
   <th>Version</th>
   <th># of downloads</th>
</tr>
<?php
include('db_settings.inc.php');
$conn = new mysqli('mysql-g', $roUser, $roPass,'g270328_www');
if (!mysqli_connect_error()) {
	$res = $conn->query('SELECT `version`, `count`  FROM `download_stats` ORDER BY `version` DESC');
	if ($res) {
		while ($row = $res->fetch_assoc()) {
			print('<tr><td>'.$row['version'] . '</td><td align="right">' . $row['count'].'</td></tr>');
		}
	}
	$conn->close();
}
?>
</table>
</div>
</body>
</html>
<?php
include('lang.inc.php');

// Redirect to the correct location.
$availLangs = array('en','pl');
$goToLang = 'en'; // def.

if (isset($_GET['lang'])) {
   if ( in_array( $_GET['lang'], $availLangs ) ) {
	  $goToLang = $_GET['lang'];
	  setcookie('GC_LANG',$goToLang, time()+60*60*24*30*12);
   }
} else if ( isset($_COOKIE['GC_LANG'])) {
   if ( in_array( $_COOKIE['GC_LANG'], $availLangs ) ) {
	  $goToLang = $_COOKIE['GC_LANG'];
   }
} else {
	foreach ( get_languages() as $lang ) {
	   if ( in_array( $lang[1], $availLangs ) ) {
		  $goToLang = $lang[1];
		  break;
	   }
	}
}
include('lang_'.$goToLang.'.inc.php');
?>
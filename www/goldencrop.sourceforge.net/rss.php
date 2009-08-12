<?php
include('conf.inc.php');
include('lang.inc.php');

if ( in_array( $_GET['lang'], $availLangs )) {
   $goToL = $_GET['lang'];
} else {
   $goToL = $goToLang;
}
readfile('rss_'.$goToL.'.xml');
?>
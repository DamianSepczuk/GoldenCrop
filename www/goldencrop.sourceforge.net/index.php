<?php
require_once('conf.inc.php');
require_once('functions.inc.php');

// Use default if nothing entered
$module = (!isset($_GET['mod']) || $_GET['mod']=='')?$availModules[0]:$_GET['mod'];
$saveInCookie = false;
if ( !isset($_GET['lang']) || $_GET['lang']=='' ) {
	$language = getLang();
} else {
	$language = $_GET['lang'];
	$saveInCookie = true;
}

// ...if incorrect value entered -- redirect!
$redir = false;
if (!in_array($module, $availModules)) {
	$module = $availModules[0];
	$redir = true;
}

if (!in_array($language, $availLangs)) {
	$language = getLang();
	$redir = true;
}

if ($redir) {
	$loc = 'Location: '.$baseURL.$language.'/';
	if ( $module != $availModules[0] ) {
		$loc .= $module.'.html';
	}
	header( $loc );
	die();
}

if ( $saveInCookie ) {
	saveLanguageChoice($language);
}

require_once('ad.inc.php');
// Now we have correct data in $module and $language,
// and def lang is stored in cookie if needed
$title = '';
ob_start();
include('mod/'.$language.'/_header.inc.php');
include('mod/'.$language.'/'.$module.'.inc.php');
include('mod/'.$language.'/_footer.inc.php');
$pageSrc = ob_get_clean();
$pageSrc = str_replace('[--TITLE--]',$title,$pageSrc);
echo $pageSrc;
?>
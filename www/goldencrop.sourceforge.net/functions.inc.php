<?php
require_once('lang.inc.php');

$isLangInCookie = false;

function getLang() {
	global $availLangs, $isLangInCookie;
	$goToLang = $availLangs[0];
	if ( isset($_COOKIE['GC_LANG'])) {
	   if ( in_array( $_COOKIE['GC_LANG'], $availLangs ) ) {
		  $goToLang = $_COOKIE['GC_LANG'];
		  $isLangInCookie = true;
	   }
	} else {
		foreach ( get_languages() as $lang ) {
		   if ( in_array( $lang[1], $availLangs ) ) {
			  $goToLang = $lang[1];
			  break;
		   }
		}
	}
	return $goToLang;
}

function saveLanguageChoice($lang) {
	setcookie('GC_LANG',$lang, time()+60*60*24*30*12,'/');
}

function printMenuItem($_module, $txt) {
	global $module;
	echo '<a href="';
	printUrlToModule($_module);
    echo '"><img alt="*" src="img/goldenBullet';
	if ($_module == $module) {
		echo '_act';
	}
	echo '.png"/>' . $txt .'</a>';
}
function printUrlToModule($modName, $lang='') {
	echo getUrlToModule($modName, $lang);
}

function getUrlToModule($modName, $lang='') {
	global $saveInCookie, $availModules, $availLangs,$baseURL, $language, $module;
	$useLang = $language;
	if ($lang!='') {
		if (in_array($lang, $availLangs)) {
			$useLang = $lang;
		} else {
			$lang  = '';
			die('Nie ma takiego jêzyka!'); //debug
		} 
	}
	
	if ($modName == '') {
		$modName = $module;
	}
	
	if (!in_array($modName, $availModules)) {
		$modName = '';
		die('Nie ma takiego modulu!'); //debug
	}
	
	if ($modName == $availModules[0] ) {
		$modName = '';
	}
	
	$url = $baseURL;

	if ($saveInCookie || $lang!='' ) {
		$url .= $useLang.'/';
	}
	
	if ( $modName != '') {
		$url .= $modName.'.html';
	}
	
	return $url;
}

function printLanguageChangeBar() {
	global $availLangs;
	foreach ( $availLangs as $lang ) {
		echo '<a style="margin-right: 7px" href="';
		printUrlToModule('', $lang);
		echo '"><img height="12" src="img/flags/'.$lang.'.png" alt="Language '.$lang.'"/></a>';
	}
}
?>
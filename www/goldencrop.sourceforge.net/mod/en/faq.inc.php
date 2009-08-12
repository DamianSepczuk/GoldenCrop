<div class="modTitle"><b>F</b>requently <b>A</b>sked <b>Q</b>uestions</div>
<?php
$faqA = array();
$faqA[] = array('Why there is an advertisement?','ads',<<<ENDANSWER
In order to allow the developer to buy himself a beer after countless hours he spend coding. At least once a year ;) And maybe there will be enough to buy a domain for the project...
ENDANSWER
);
$faqA[] = array('What is the Golden Crop script?','aboutGC',<<<ENDANSWER
<p>Golden Crop script designed as an aid for cropping images according to the division rules. The script generates visual guidelines for the <strong>Rule of Thirds</strong>, <strong>Golden Rule</strong> both <strong>Diagonal Golden Rules</strong> and four <strong>Golden Spirals</strong>. Some people think, that aligning vital elements with this guidelines creates special visual impact, making the image more interesting. You can see this guidelines on a picture below:
<img style="margin: auto; display:block" alt="guidelines" src="img/guidelines.png"/><br />
<img style="margin: auto; display:block" alt="Golden Spirals" src="img/goldenSpirals.png" />
</p>
<p>If you know nothing about dividing rules, feel free to google for some info, or use the following links:</p>
<ul>
	<li><a target="_blank" href="http://www.colorpilot.com/comp_rules.html">Photography composition - Your photo as a story</a></li>
	<li><a target="_blank" href="http://en.wikipedia.org/wiki/Rule_of_thirds">Rule of thirds (Wikipedia)</a></li>
	<li><a target="_blank" href="http://www.davebritzius.com/?p=115">What a Difference a Crop Makes - the Rule of Thirds</a></li>
	<li><a target="_blank" href="http://www.photoshopessentials.com/photo-editing/rule-of-thirds.php">Add Visual Interest To Your Photos With The Rule Of Thirds</a></li>
	<li><a target="_blank" href="http://www.sciencebuddies.org/science-fair-projects/project_ideas/Photo_p012.shtml">The Golden Rules of Photography</a></li>
	<li>Find more: <form action="http://www.google.com/cse" id="cse-search-box" target="_blank">  <div>    <input type="hidden" name="cx" value="partner-pub-4337717722148975:i51cih-eyiw" />    <input type="hidden" name="ie" value="UTF-8" />    <input type="text" name="q" size="31" />    <input type="submit" name="sa" value="Szukaj" />  </div></form><script type="text/javascript" src="http://www.google.com/coop/cse/brand?form=cse-search-box&amp;lang=en"></script> </li>
</ul>
ENDANSWER
);
// =======================================================
$faqA[] = array('Who can use it?','whoCanUse',<<<ENDANSWER
<p>Anyone who wants... and have Adobe® Photoshop® CS2, CS3 or CS4 installed. This script should work both on Windows and Mac version of the software. Adobe® Photoshop® versions earlier than CS2 will not be supported due to lack of scripting possibilities.</p>
ENDANSWER
);
// =======================================================
$faqA[] = array('Is it free?','isItFree',<<<ENDANSWER
<p>Yes, it is! Free as in beer and free as in speech :) This software uses GNU General Public License. But if you run a business or just like the script consider <a href="http://sourceforge.net/project/project_donations.php?group_id=270328">making a donation</a>.</p>
ENDANSWER
);
// =======================================================
$faqA[] = array('How to run/install/uninstall the Golden Crop script?','install',<<<ENDANSWER
<p>
<object type="application/x-shockwave-flash" style="width:425px; height:344px;" data="http://www.youtube.com/v/2-L_NgZtmg4">
<param name="movie" value="http://www.youtube.com/v/2-L_NgZtmg4" />
</object><br />
Installing the Golden Crop script is really simple. In fact, if you only want to give it a try, you do not have to install the script at all!</p>
<h3>Running without installation</h3>
<ol>
	<li><a href="http://sourceforge.net/projects/goldencrop/files/">Download</a> the latest version of the script. Choose your favorite archive format. After downloading, unpack to some location, for example to Desktop. You can also simply "enter" into the archive and drag 'Golden Crop.jsx' file to desired location.</li>
	<li>In Photoshop® open the file you want to crop.</li>
	<li>Double click on the script file. If you see a massage similar to the one presented on the image below, click Yes.<img src="img/runScriptAlert.png" alt="Script Alert - confirm run" />
	</li>
	<li>Now the script is running in Photoshop®. See next question for instruction how to use it. ...or just play with it!</li>
</ol>
<h3>Installation</h3>
<ol>
<li>
<a href="http://sourceforge.net/projects/goldencrop/files/">Download</a> the latest version of the script. Choose your favorite archive format. After downloading, unpack the file 'Golden Crop.jsx' to your local Photoshop® script folder. If you installed Photoshop® with default settings try one of this folders:
<ul>
	<li>On 32-bit systems (most common): <pre>C:\Program Files\Adobe\Adobe Photoshop CS4\Presets\Scripts\</pre></li>
	<li>64-bit version of Photoshop® on 64-bit system: <pre>C:\Program Files\Adobe\Adobe Photoshop CS4 (64 Bit)\Presets\Scripts\</pre></li>
	<li>32-bit version of Photoshop® on 64-bit system: <pre>C:\Program Files (x86)\Adobe\Adobe Photoshop CS4\Presets\Scripts\</pre></li>
</ul>
<p><strong>Caution</strong>: if there is a file named ‘goldenCrop’ (or ‘goldenCrop.jsx’) in the folder, where the ‘Golden Crop.jsx’ file was copied, you should delete the file ‘goldenCrop’ (or ‘goldenCrop.jsx’) because it is an older version of the Golden Crop script.</p>
You can also simply "enter" into the archive and drag the file to desired location.
</li>
<li>If Photoshop is running, restart it. Otherwise simply run it.</li>
<li>In Photoshop® open the file you want to crop.</li>
<li>Run the script choosing <strong>File>Scripts>Golden Crop</strong> from Photoshop® menu. Feel free to assign a keyboard shortcut through 'Edit>Keyboard Shortcuts' [Alt+Shift+Ctrl+K]! My preferred one is [Ctrl+Shift+Q].</li>
<li>Now the script is running in Photoshop®. See next question for instruction how to use it. ...or just play with it!</li>
</ol>
<h3>Uninstallation </h3>
<p>
To uninstall the script, simply delete 'Golden Crop.jsx' file, from Photoshop® scripts folder. See previous point for location of the script folder on your system.
</p>
ENDANSWER
);
// =======================================================

$faqA[] = array('What the Golden Crop script can do?','whatCanDo',<<<ENDANSWER
<p>
<object type="application/x-shockwave-flash" style="width:425px; height:344px;" data="http://www.youtube.com/v/IkocL33FT_M">
<param name="movie" value="http://www.youtube.com/v/IkocL33FT_M" />
</object><br />
It can crop photo and reveal additional canvas. Interactive part of the script is based on 'Free Transform' mode. It works exactly the same, as free-transforming a layer. Position cropping frame according to guidelines and your taste and pres Enter. If you want to cancel -- press Esc.
</p>
<img alt="Positioning cropping frame" src="img/screenShot001.jpg" />
<p>
After accepting cropping frame you some dialog may pop up, according to your selection. There are several situations.</p>
<h3>Reveal only</h3>
<p>
If there is no cropping (only extending canvas), no dialog would be displayed and the script would automatically:</p>
<ol>
 <li>Convert the Background layer (if any) to normal layer</li>
 <li>Extend canvas to match crop mask. Note, that since the original background layer has been popped up, no actual pixels are added and you still have fine defined background edges.</li>
 <li>A solid fill adjustment layer is added at the bottom, acting as new background. The color of that layer is equal to actually selected 'foreground color' and can be easily changed after cropping by double-clicking on the fill layer icon.</li>
</ol>
<h3>Crop and reveal</h3>
<p>
If it is necessary to both crop and reveal image in order to match selected crop, the following actions occurs:</p>
<ol>
 <li>The 'confirm reveal' dialog box is displayed to ensure, you want to extend canvas. For example you could mistakenly make the crop mast 1 pixel exceeding image border. If you choose 'No', no revealing will occur. Otherwise, script would queue extend canvas as described in the section above. Note: no actual extending is done at this point, because you can cancel the action in the next step.</li>
 <li>Cropping faze is initialized (described below). Note that if you cancel cropping dialog, no reveal will occur.</li>
</ol>
<p>
Sample image after 'crop and reveal': <br />
<img alt="Sample image after 'crop and reveal'" src="img/screenShot002.jpg" />
</p>
<h3>Crop only</h3>
<p>
The 'select cropping method' dialog is displayed. You can now select cropping method or cancel cropping leaving repositioned cropping mask layers.</p>
<p><strong>Method 1: 'simple crop'</strong> Simply crops the image according to cropping mask and deletes all guidelines. You can use <em>Undo</em> [Ctrl+Z] to retrieve this guidelines.</p>
<p><strong>Method 2: 'cropping mask'</strong> The image is not cropped. The opacity of cropping mask is raised to 100% and guidelines group is render invisible.</p>
<p><strong>Method 3: 'cancel cropping'</strong> The image is not cropped. Neither opacity nor visibility of layers created by Golden Crop is changed. If you want to delete all layers created by the script, just hit [Del].</p>
<p>After selecting one of above options, script performs its operations and the control returns to the user.
</p>
ENDANSWER
);
// =======================================================
$faqA[] = array('What\'s new?','whatsNew','Every new version brings something new! For details see the <a href="'.getUrlToModule('changelog').'">changelog</a>');
// =======================================================

$faqA[] = array('How can I configure the Golden Crop script?','configure',<<<ENDANSWER
<p>The Golden Crop script is currently in beta stage. There is no easy way to configure the script. If you are a power user, try editing the script file with notepad and changing configuration values placed at the beginning of the file.</p>
ENDANSWER
);
// =======================================================
$faqA[] = array('Acknowledgements','acknowledgements',<<<ENDANSWER
<p>On behalf of me and all users, I would like to deeply thank all people who contributed to the development of the Golden Crop script. Without their care and consideration, this script would likely not have matured. Especially big thanks goes to:
</p>
<ul>
 <li><strong>Krystian Paździor</strong> for intense testing and brilliant ideas</li>
 <li><strong>Arkadius Bazior</strong> for preparing German translation of the script</li>
</ul>
ENDANSWER
);
// =======================================================
$faqA[] = array('How can I contact the author?','author',<<<ENDANSWER
<p>Damian Sepczuk is the founder and the main developer of the Golden Crop project. If you want to contact the author, drop him a line at goldencrop[at]o2[D()t]deleteme[d0t]pl</p>
ENDANSWER
);
// =======================================================
?>
<h1>Contents:</h1>
<div style="float: right; margin-left: 1em; text-align: center; width: 336px; height: 280px; " class="bigRectRekl"><?=$AD_intextBigRect?></div>
<ol>
<?php
	foreach ( $faqA as $item ) {
		echo '<li><a href="';
		printUrlToModule('faq');
		echo '#'.$item[1].'">'.$item[0].'</a></li>';
	}
?>
</ol>
<div id="faq">

<?php
	foreach ( $faqA as $item ) {
		if ($item[1]=='install') { 
			echo '<div class="dlugRekl" style="text-align: center">'.$AD_bigBanner.'</div>';
		};
		echo '<h1><a name="'.$item[1].'"></a>'.$item[0].'</h1>';
		echo '<div>'.$item[2].'</div>';
	}
?>

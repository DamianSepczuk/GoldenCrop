<?php $title = 'Changelog'?>
<div class="modTitle">Changelog</div>
<h1>Version 0.91 beta</h1>
<ul>
	<li>New translation: <strong style="font-size:150%; color: #ffd635">Spanish</strong></li>
</ul>
<div style="margin: auto; text-align: center; width: 728px; height: 90px;" class="dlugRekl"><?=$AD_bigBanner?></div>
<h1>Version 0.90 beta</h1>
<ul>
	<li><img src="img/features/diagonalRule.png" alt="Diagonal Rule" /><br />
	New composition method: <strong style="font-size:150%; color: red">Diagonal Rule</strong></li>
	<li><img src="img/features/thicknessControl.png" alt="Thickness control" /><br />
	User customizable line thickness</li>
	<li>New translation: <strong style="font-size:150%; color: #ffd635">German</strong></li>
	<li>Faster layers creation</li>
	<li>Lines are more visible on a dark background (white stroke added)</li>
	<li>User-friendly error information is shown when there is no open document</li>
</ul>
<div style="margin: auto; text-align: center; width: 336px; height: 280px;" class="bigRectRekl"><?=$AD_intextBigRect?></div>
<h1>Version 0.85 beta</h1>
<ul>
  <li>It is now <strong style="font-size:150%; color: red">CS2 compatible</strong>!</li>
  <li>Ability to <strong style="font-size:150%; color: #ffd635">continue interrupted crop</strong> added. The script finds the 'Golden
    Crop by SzopeN'  group and resumes crop in interactive mode
	To force adding new 'Golden Crop by SzopeN' group, select the bottommost
	layer (for example: Background)</li>

  <li>Golden spirals added<br />
      <img alt="Golden Spirals" src="img/goldenSpirals.png" />
      </li>
  <li>"Choose guidelines" dialog added. Now you can choose which guidelines
    would be drawn. Last choice is remembered.<br />
      <img alt="Composition guidelines" src="img/chooseGuidelines.png" />
	</li>
  <li>The script behaves like a plugin, now resides in File>Automate>Golden Crop (note: in CS2 it is still in File>Scripts menu)<br />
      <img alt="New menu position" src="img/newMenuPos.png" /></li>
  <li>It can be recorded in action (though it is still user-interactive,
    only guidelines choice is saved)<br />
      <img alt="Golden Crop registered in action" src="img/GCaction.png" /></li>
  <li>[Alt],[key] problem fixed in dialog boxes</li>
  <li>Minor fix in rotation, detecting portrait/landscape crop</li>
  <li>Code cleanup and optimization</li>
</ul>
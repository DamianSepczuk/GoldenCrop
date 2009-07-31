<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Golden Crop - prawdopodobnie najlepsze narzędzie do kadrowania w programie Adobe® Photoshop®</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style type="text/css">
<!--
img { border: none; }
body { background-color: black; 
		color: white;
}
a { text-decoration: none; color: #ffc }
a:hover {text-decoration: underline; color: #ff3 }
#gclogo { text-align: center; }
#contents { 
	background-color: #111;
	border: 2px solid #333;
	padding: 1em;
	width: 1000px;
	margin-left: auto;
	margin-right: auto;

}
#contents #txttitle {
	font-size: 350%;
	text-align: center;
}

#contents #txttitle .smaller {
	font-size: 50%;
}

#goldenButtons {
	background-color: #000;
	text-align: center;
}

#goldenButtons #downloadBtn {
	display: inline;
	padding-right: 100px;
}

#goldenButtons #donateBtn {
	display: inline;
}

#goldenButtons * .btnNormal {
	display: inline;
}

#goldenButtons * .btnHover {
	display: none;
}

#goldenButtons *:hover .btnNormal {
	display: none;
}

#goldenButtons *:hover .btnHover {
	display: inline;
}

#footNote {
	font-size: 50%;
	color: #666;
}

div#faq h2 {
	background-color: #333;
	padding: 2px;
	border: 1px solid #555;
}
-->
</style>
</head>
<body>
<div id="gclogo"><img alt="Golden Crop logo" src="img/GoldenCrop_logo.png"/></div>
<div id="contents">
<div id="langs"><?php printLanguageChangeBar(); ?></div>
<div id="txttitle">
Golden Crop<br /><span class="smaller">prawdopodobnie najlepsze narzędzie do kadrowania w programie Adobe<sup>®</sup> Photoshop<sup>®</sup></span>
</div>
<p>
Witaj na oficjalnej stronie skryptu Golden Crop. Kliknij jeden ze złotych przycisków albo wybierz interesujący Cię temat z listy poniżej.</p>
<div id="goldenButtons">
	<div id="downloadBtn"><a href="http://sourceforge.net/projects/goldencrop/files/"><img class="btnNormal" alt="Download button" src="img/download_btn.png" width="273" height="146" /><img class="btnHover" alt="Download button" src="img/download_btn_hover.png" width="273" height="146" /></a>
	</div>
	<div id="donateBtn">
		<a href="http://sourceforge.net/project/project_donations.php?group_id=270328"><img class="btnNormal" alt="Download button" src="img/donate_btn.png" width="274" height="146" /><img class="btnHover" alt="Download button" src="img/donate_btn_hover.png" width="274" height="146" /></a>
	</div>
</div>
<p>Możesz też przejść bezpośrednio na <a href="http://sourceforge.net/projects/goldencrop">stronę projektu Golden Crop w serwisie Sourceforge: <img style="vertical-align:middle;" src="http://sflogo.sourceforge.net/sflogo.php?group_id=270328&amp;type=11" width="120" height="30" alt="Get Golden Crop at SourceForge.net. Fast, secure and Free Open Source software downloads" /></a> albo pobrać absolutnie najnowszą ale praktycznie NIEPRZETESTOWANĄ wersję skryptu bezpośrednio z <a href="http://goldencrop.svn.sourceforge.net/viewvc/goldencrop/trunk/code/goldenCrop.jsx?view=log">repozytorium SVN</a>.
</p>
<p style="text-align: center;">
<img alt="Positioning cropping frame" src="img/screenShot001.jpg" />
</p>
<h1>Spis treści:</h1>
<ol>
	<li>Czym jest skrypt Golden Crop?</li>
	<li>Kto może go używać?</li>
	<li>Czy to wolne oprogramowanie? Czy jest za darmo?</li>
	<li>Jak uruchomić/zainstalować/odinstalować skrypt Golden Crop?</li>
	<li>Co potrafi skrypt Golden Crop?</li>
	<li>Jak mogę skonfigurować skrypt Golden Crop?</li>
	<li>W jaki sposób mogę skontaktować się z autorem?</li>
</ol>
<div id="faq">
<h2>Reklama</h2>
Dlaczego wyśwtetlana jest reklama? Żeby autor skryptu, po wyczerpujących godzinach spędzonych na kodowani, miał na piwo... raz na pół roku ;)

<script type="text/javascript"><!--
google_ad_client = "pub-4337717722148975";
/* 728x90_goldencrop */
google_ad_slot = "7670161217";
google_ad_width = 728;
google_ad_height = 90;
//-->
</script>
<script type="text/javascript"
src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>

<h2>Czym jest skrypt Golden Crop?</h2>
<p>Skrypt Golden Crop został zaprojektowany w celu ułatwienia kadrowania zdjęć zgodnie z regułami podziału. Generuje on wizualne prowadnice dla <b>Reguły Trzech</b>, <b>Złotej Reguły</b> i <b>Trójkątnej Złotej Reguły</b> w obu kierunkach. W czasach przed fotografią, w malarstwie utrwalił się kanon podziału płótna, dotyczący ważnych elementów obrazu przedstawionego. Pionierzy fotografii przenieśli te reguły do nowo powstającej sztuki. Umiejscowienie ważnych elementów zdjęcia zgodnie z regułami podziału może sprawić, że praca stanie się bardziej interesująca i przyciągająca uwagę. Na poniższym obrazku możesz zobaczyć jak wyglądają prowadnice generowane przez skrypt:
<img alt="guidelines" src="img/guidelines.png"/>
</p>
<p>Jeśli koncepcje reguł podziału są Ci obce, skorzystaj z wyszukiwarki internetowej albo zajrzyj pod jeden z linków:</p>
<ul>
	<li><a target="_blank" href="http://www.colorpilot.com/comp_rules.html">Photography composition - Your photo as a story</a></li>
	<li><a target="_blank" href="http://en.wikipedia.org/wiki/Rule_of_thirds">Rule of thirds (Wikipedia)</a></li>
	<li><a target="_blank" href="http://www.davebritzius.com/?p=115">What a Difference a Crop Makes - the Rule of Thirds</a></li>
	<li><a target="_blank" href="http://www.photoshopessentials.com/photo-editing/rule-of-thirds.php">Add Visual Interest To Your Photos With The Rule Of Thirds</a></li>
	<li><a target="_blank" href="http://www.sciencebuddies.org/science-fair-projects/project_ideas/Photo_p012.shtml">The Golden Rules of Photography</a></li>
	<li>Znajdź więcej informacji o regułach podziału: <form action="http://www.google.com/cse" id="cse-search-box" target="_blank">  <div>    <input type="hidden" name="cx" value="partner-pub-4337717722148975:i51cih-eyiw" />    <input type="hidden" name="ie" value="UTF-8" />    <input type="text" name="q" size="31" />    <input type="submit" name="sa" value="Szukaj" />  </div></form><script type="text/javascript" src="http://www.google.com/coop/cse/brand?form=cse-search-box&amp;lang=pl"></script>  </li>
</ul>

<h2>Kto może go używać?</h2>
<p>Każdy kto chce... i ma zainstalowany program Adobe® Photoshop® CS3 lub Adobe® Photoshop® CS4. Skrypt powinien działać w systemie operacyjnym Microsoft Windows oraz Mac OS.</p>
<h2>Czy to wolne oprogramowanie? Czy jest za darmo?</h2>
<p>
Tak, jak najbardziej! Skrypt jest zarówno wolnym oprogramowaniem jak i darmowym dzięki zastosowaniu licencji GNU General Public License. Ale jeśli czerpiesz dochody korzystając z tego skryptu albo po prostu chcesz podziękować autorowi, rozważ proszę <a href="http://sourceforge.net/project/project_donations.php?group_id=270328">złożenie dotacji</a>.
</p>
<h2>Jak uruchomić/zainstalować/odinstalować skrypt Golden Crop?</h2>
<p>
<object type="application/x-shockwave-flash" style="width:425px; height:344px;" data="http://www.youtube.com/v/2-L_NgZtmg4">
<param name="movie" value="http://www.youtube.com/v/2-L_NgZtmg4" />
</object><br />
Instalacja skryptu Golden Crop jest naprawdę prosta. Powiem więcej, jeśli chcesz tylko wypróbować działanie skryptu, nie jest wymagana jakakolwiek instalacja!</p>
<h3>Uruchamianie bez instalacji</h3>
<ol>
	<li><a href="http://sourceforge.net/projects/goldencrop/files/">Ściągnij</a> najnowszą wersję skryptu. Wybierz swój ulubiony format archiwum (ZIP jest najbardziej popularne). Po ściągnięciu, rozpakuj archiwum do dowolnego katalogu, na przykład na Pulpit. Możesz też zwyczajnie "wejść" do archiwum i przeciągnąć jego zawartość w wybrane miejsce.</li>
	<li>W programie Photoshop® otwórz plik, który chcesz wykadrować.</li>
	<li>Kliknij dwa razy na ikonę pliku skryptu. Jeśli zobaczysz okienko podobne do przedstawionego poniżej, kliknij "Yes"/"Tak".<img src="img/runScriptAlert.png" alt="Script Alert - confirm run" />
	</li>
	<li>Gratulacje, właśnie uruchomiłeś skrypt! Już teraz możesz zacząć poznawać możliwości skryptu samodzielnie albo skorzystać z dalszej części dokumentacji, gdzie zawarty jest opis działania skryptu.</li>
</ol>
<h3>Instalacja</h3>
<ol>
<li><a href="http://sourceforge.net/projects/goldencrop/files/">Ściągnij</a> najnowszą wersję skryptu. Wybierz swój ulubiony format archiwum (ZIP jest najbardziej popularne). Po ściągnięciu, rozpakuj archiwum (a dokładnie plik 'goldenCrop.jsx') do katalogu skryptów programu Photoshop®. Jeśli zainstalowałeś program Photoshop® z domyślnymi ustawieniami folder skryptów powinien znajdować się w jednym z wymienionych miejsc:
<ul>
	<li>W systemie 32-bitowym (najbardziej popularne): <pre>C:\Program Files\Adobe\Adobe Photoshop CS4\Presets\Scripts\</pre></li>
	<li>64-bitowa wersja programu Photoshop® na 64-bitowym systemie: <pre>C:\Program Files\Adobe\Adobe Photoshop CS4 (64 Bit)\Presets\Scripts\</pre></li>
	<li>32-bitowa wersja programu Photoshop® na 64-bitowym systemie: <pre>C:\Program Files (x86)\Adobe\Adobe Photoshop CS4\Presets\Scripts\</pre></li>
</ul><p> Jeśli posiadasz polską wersję programu Photoshop®, zmień końcówki ścieżek z '\Presets\Scripts\' na 'Ustawienia\Skrypty\'. Możesz też po prostu "wejść" do archiwum i przeciągnąć plik 'goldenCrop.jsx' do jednego z powyższych folderów. Ta metoda została używa w filmiku pokazującym proces instalacji.</p>
</li>
<li>Jeśli program Photoshop® jest uruchomiony, zamknij i uruchom go ponownie. W przeciwnym wypadku uruchom program Photoshop®.</li>
<li>W programie Photoshop® otwórz plik, który chcesz wykadrować.</li>
<li>Uruchom skrypt wybierając z menu pozycję <strong>File>Scripts>goldenCrop</strong> lub w polskiej wersji <strong>Plik>Skypty>goldenCrop</strong>. Możesz przypisać skrót klawiszowy do skryptu korzystając z 'Edit>Keyboard Shortcuts' (Edycja>Skróty Klawiaturowe) [Alt+Shift+Ctrl+K]! Mój ulubiony skrót to [Ctrl+Shift+Q]. UWAGA! Jeśli w skład skrótu wchodzi klawisz [Alt] mogą pojawić się problemy z działaniem skryptu, objawiające się samoczynnym otwieraniem edytora.</li>
<li>Gratulacje, właśnie uruchomiłeś skrypt! Już teraz możesz zacząć poznawać jego możliwości samodzielnie albo skorzystać z dalszej części dokumentacji, gdzie zawarty jest opis działania skryptu.</li>
</ol>
<h3>Odinstalowanie / usuwanie z systemu</h3>
<p>
Aby odinstalować skrypt, zwyczajnie usuń plik 'goldenCrop.jsx', z folderu skryptów programu Photoshop®. W poprzednim punkcie znajdziesz wskazówki, jak odnaleźć lokalizacje folderu skryptów w Twoim systemie.
</p>
<h2>Co potrafi skrypt Golden Crop?</h2>
<p>
<object type="application/x-shockwave-flash" style="width:425px; height:344px;" data="http://www.youtube.com/v/IkocL33FT_M">
<param name="movie" value="http://www.youtube.com/v/IkocL33FT_M" />
</object><br />
Może przycinać obrazek i odkrywać dodatkowe płótno. Interaktywna część skryptu oparta jest na trybie 'Free Transform' ('Przekształcanie swobodne'). Działa dokładnie tak samo jak w przypadku zwykłej warstwy. Ustaw ramkę przycinania w wybranej przez siebie pozycji i naciśnij Enter aby zatwierdzić kadrowanie. Jeśli chcesz anulować kadrowanie, naciśnij Escape.</p>
<img alt="Positioning cropping frame" src="img/screenShot001.jpg" />
<p>
Po zaakceptowaniu, może pojawić się okno dialogowe, umożliwiające wybór metody przycinania lub rozszerzania. Istnieje kilka przypadków:</p>
<h3>Tylko rozszerzanie płótna</h3>
<p>
Jeśli obrazek nie będzie przycinany (tylko płótno będzie rozszerzane), nie pojawi się żadne okno dialogowe i skrypt automatycznie przeprowadzi następujące czynności:</p>
<ol>
 <li>Jeśli istnieje warstwa tła (Background) zostanie przekształcona na normalną warstwę</li>
 <li>Płótno zostanie rozszerzone tak, aby pasowało do ramki przycinania. Zauważ, że oryginalna warstwa tła jest teraz zwykłą warstwą, w związku z czym nie zostały do niej dodane żadne piksele, dzięki czemu oryginalne krawędzie tła zostały zachowane.</li>
 <li>Pod warstwą tła, dodana zostaje warstwa wypełnienia kolorem, zalewając kolorem poszerzone płótno. Kolor warstwy odpowiada aktualnie wybranemu kolorowi narzędzia. Może być zmieniony w każdej chwili, poprzez dwukrotne kliknięcie na ikonę warstwy wypełnienia (tak jak kolor każdej warstwy wypełnienia).</li>
</ol>
<h3>Przytnij obrazek i rozszerz płótno</h3>
<p>
Jeśli konieczne jest zarówno przycięcie obrazka jak i rozszerzenie płótna, podejmowane są następujące akcje:</p>
<ol>
 <li>Zostaje wyświetlony dialog wyboru metody rozszerzania płótna. Możesz wybrać opcje 'rozszerz płótno', 'przytnij bez rozszerzania' i 'powróć do kadrowania'. Uwaga: na tym etapie nie są podejmowane żadne akcje, gdyż kadrowanie może zostać anulowane w następnym kroku.</li>
 <li>Wyświetlane jest okno wyboru trybu przycinania (opisane poniżej).</li>
</ol>
<p>
Przykładowy obrazek po wykonaniu akcji z kategorii 'przytnij obrazek i rozszerz płótno': <br />
<img alt="Sample image after 'crop and reveal'" src="img/screenShot002.jpg" />
</p>
<h3>Tylko przycinanie</h3>
<p>
Wyświetlane jest okno wyboru trybu przycinania. Możesz w nim wybrać metodę przycinania lub powrócić do kadrowania.</p>
<p><strong>Opcja 1: 'Przytnij płótno'</strong> Przycina płótno do zadanego rozmiaru i usuwa wszystkie prowadnice. Możesz je odzyskać korzystając z opcji <em>Cofnij</em> (<em>Undo</em>) [Ctrl+Z].</p>
<p><strong>Opcja 2: 'Stwórz maskę kadrującą'</strong> Obrazek nie jest przycinany -- żadne piksele nie są tracone. Krycie (nieprzezroczystość) maski ustawiana jest na 100% oraz widoczność warstwy z prowadnicami jest wyłączana.</p>
<p><strong>Opcja 3: 'Wróć do przycinania'</strong> Wybranie tej opcji powoduje powrót do trybu kadrowania.</p>
<p>Po wybraniu opcji 1 lub 2 wykonywane są odpowiednie akcje, po czym skrypt kończy swe działanie i zwraca pełną kontrolę użytkownikowi.
</p>
<h2>Jak mogę skonfigurować skrypt Golden Crop?</h2>
<p>Skrypt Golden Crop jest aktualnie w fazie rozwoju <em>beta</em>. Dlatego nie istnieje jeszcze łatwa i wygodna metoda konfiguracji skryptu. Jeśli jesteś zaawansowanym użytkownikiem, możesz spróbować bezpośredniej edycji pliku skryptu za pomocą np. Notatnika. Najważniejsze zmienne konfiguracyjne (w tym sposób wyboru języka) znajdują się na początku pliku skryptu.</p>

<h2>W jaki sposób mogę skontaktować się z autorem?</h2>
<p>Autorem i założycielem projektu jest Damian Sepczuk. Skrobnij maila na adres goldencrop[maŁpa]o2[kr0pka]USUŃ_TO_I_NASTĘPNĄ_KROPKĘ[kropka]pl</p>

</div>

<p>
<a href="http://sourceforge.net/projects/goldencrop/" >
Ta strona jest w trakcie tworzenia. Jeśli coś nie działa, przejdź bezpośrednio na stronę projektu aby pobrać skrypt
</a>
</p>
<div id="footNote">
 <p>
    <a href="http://validator.w3.org/check?uri=referer"><img
        src="http://www.w3.org/Icons/valid-xhtml10"
        alt="Valid XHTML 1.0 Transitional" height="31" width="88" /></a>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img style="border:0;width:88px;height:31px"
            src="http://jigsaw.w3.org/css-validator/images/vcss"
            alt="Poprawny CSS!" />
    </a>
</p>
<!-- Piwik -->
<script type="text/javascript">
var pkBaseURL = (("https:" == document.location.protocol) ? "https://sourceforge.net/apps/piwik/goldencrop/" : "http://sourceforge.net/apps/piwik/goldencrop/");
document.write(unescape("%3Cscript src='" + pkBaseURL + "piwik.js' type='text/javascript'%3E%3C/script%3E"));
</script><script type="text/javascript">
piwik_action_name = '';
piwik_idsite = 1;
piwik_url = pkBaseURL + "piwik.php";
piwik_log(piwik_action_name, piwik_idsite, piwik_url);
</script>
<object><noscript><p><img src="http://sourceforge.net/apps/piwik/goldencrop/piwik.php?idsite=1" alt="piwik"/></p></noscript></object>
<!-- End Piwik Tag -->
<p>
All trademarks used are properties of their respective owners. Please visit the sites of the respective owners. NO warranty as to 100% accuracy is intended or implied. Any omissions are without intent to infringe. We cannot guarantee 100% accuracy of the contact information presented here. Products or trademarks named are used for reference, without any implied endorsement by their holders and without intent to infringe. This site does not condone activities and actions that breach the rights of copyright owners. As a site visitor it is your responsibility to obey all laws governing copyright in each country. This site respects copyright and other laws. This site requires all site visitors users to comply with copyright and other laws. This site does not by the supply of the information on this site authorize you to infringe the copyright or other rights of third parties. 
</p>
</div>
</div>
<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try {
var pageTracker = _gat._getTracker("UA-10000102-1");
pageTracker._trackPageview();
} catch(err) {}</script>
</body>
</html>
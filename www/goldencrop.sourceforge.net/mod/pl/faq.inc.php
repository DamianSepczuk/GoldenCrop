<?php $title = 'FAQ, Często Zadawane Pytania'?>
<div class="modTitle"><b>F</b>requently <b>A</b>sked <b>Q</b>uestions, <br />czyli<br />
<b>C</b>zęsto <b>Z</b>adawane <b>P</b>ytania
</div>
<?php
$faqA = array();
$faqA[] = array('Dlaczego wyświetlane są reklamy?','ads',<<<ENDANSWER
Żeby autor skryptu, po wyczerpujących godzinach spędzonych na kodowaniu, miał na piwo... raz na pół roku ;) Może też kiedyś uzbiera na własną domenę...
ENDANSWER
);
$faqA[] = array('Co to za wynalazek ten Golden Crop?','aboutGC',<<<ENDANSWER
<p>Skrypt Golden Crop został zaprojektowany w celu ułatwienia kadrowania zdjęć zgodnie z regułami podziału. Generuje on wizualne prowadnice dla <strong>Reguły Trzech</strong>, <strong>Złotej Reguły</strong>, <strong>Trójkątnej Złotej Reguły</strong> w obu kierunkach oraz czterech <strong>Złotych Spiral</strong>. W czasach przed fotografią, w malarstwie utrwalił się kanon podziału płótna, dotyczący ważnych elementów obrazu przedstawionego. Pionierzy fotografii przenieśli te reguły do nowo powstającej sztuki. Umiejscowienie ważnych elementów zdjęcia zgodnie z regułami podziału może sprawić, że praca stanie się bardziej interesująca i przyciągająca uwagę. Na poniższym obrazku możesz zobaczyć jak wyglądają prowadnice generowane przez skrypt:
<img style="margin: auto; display:block" alt="Prowadnice" src="img/guidelines.png"/><br />
<img style="margin: auto; display:block" alt="Złote spirale" src="img/goldenSpirals.png" />
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
ENDANSWER
);
// =======================================================
$faqA[] = array('Kto może go używać?','whoCanUse',<<<ENDANSWER
<p>Każdy kto chce... i ma zainstalowany program Adobe® Photoshop® w wersji CS2, CS3, CS4 lub CS5. Skrypt powinien działać w systemie operacyjnym Microsoft Windows oraz Mac OS. Wsparcie dla wersji poniżej CS2 nie jest przewidziane z powodu zaawansowanych możliwości obsługi skryptów.</p>
ENDANSWER
);
// =======================================================
$faqA[] = array('Czy to jest wolne oprogramowanie? Czy jest darmowe?','isItFree',<<<ENDANSWER
<p>Tak, jak najbardziej! Skrypt jest zarówno wolnym oprogramowaniem jak i darmowym dzięki zastosowaniu licencji GNU General Public License. Ale jeśli czerpiesz dochody korzystając z tego skryptu albo po prostu chcesz podziękować autorowi, rozważ proszę <a href="http://sourceforge.net/project/project_donations.php?group_id=270328">złożenie dotacji</a>.</p>
ENDANSWER
);
// =======================================================
$faqA[] = array('Jak uruchomić/zainstalować/odinstalować skrypt Golden Crop?','install',<<<ENDANSWER
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
<li><a href="http://sourceforge.net/projects/goldencrop/files/">Ściągnij</a> najnowszą wersję skryptu. Wybierz swój ulubiony format archiwum (ZIP jest najbardziej popularne). Po ściągnięciu, rozpakuj archiwum (a dokładnie plik 'Golden Crop.jsx') do katalogu skryptów programu Photoshop®. Jeśli zainstalowałeś program Photoshop® z domyślnymi ustawieniami folder skryptów powinien znajdować się w jednym z wymienionych miejsc:
<ul>
	<li>W systemie 32-bitowym (najbardziej popularne): <pre>C:\Program Files\Adobe\Adobe Photoshop CS4\Presets\Scripts\</pre></li>
	<li>64-bitowa wersja programu Photoshop® na 64-bitowym systemie: <pre>C:\Program Files\Adobe\Adobe Photoshop CS4 (64 Bit)\Presets\Scripts\</pre></li>
	<li>32-bitowa wersja programu Photoshop® na 64-bitowym systemie: <pre>C:\Program Files (x86)\Adobe\Adobe Photoshop CS4\Presets\Scripts\</pre></li>
	<li>W systemie Mac OS: <pre>/Applications/Adobe Photoshop CS4/Presets/Scripts/</pre></li>
</ul><p> Jeśli posiadasz polską wersję programu Photoshop®, zmień końcówki ścieżek z '\Presets\Scripts\' na 'Ustawienia\Skrypty\'. Możesz też po prostu "wejść" do archiwum i przeciągnąć plik 'Golden Crop.jsx' do jednego z powyższych folderów. Ta metoda została używa w filmiku pokazującym proces instalacji.</p>
<p><strong>UWAGA: Jeśli w katalogu, do którego przekopiowano skrypt, znajduje się plik 'goldenCrop' ('goldenCrop.jsx') należy go usunąć, gdyż zawiera starą wersję skryptu.</strong></p>
</li>
<li>Jeśli program Photoshop® jest uruchomiony, zamknij i uruchom go ponownie. W przeciwnym wypadku uruchom program Photoshop®.</li>
<li>W programie Photoshop® otwórz plik, który chcesz wykadrować.</li>
<li>Uruchom skrypt wybierając z menu pozycję <strong>File>Automate>Golden Crop</strong> lub w polskiej wersji <strong>Plik>Automatyzuj>Golden Crop</strong> (UWAGA: W wersji CS2 odpowiedno: <strong>File>Scripts>Golden Crop</strong> i <strong>Plik>Skypty>Golden Crop</strong>). Możesz przypisać skrót klawiszowy do skryptu korzystając z 'Edit>Keyboard Shortcuts' (Edycja>Skróty Klawiaturowe) [Alt+Shift+Ctrl+K]! Mój ulubiony skrót to [Ctrl+Shift+Q]. UWAGA! Jeśli w skład skrótu wchodzi klawisz [Alt] mogą pojawić się problemy z działaniem skryptu, objawiające się samoczynnym otwieraniem edytora.</li>
<li>Gratulacje, właśnie uruchomiłeś skrypt! Już teraz możesz zacząć poznawać jego możliwości samodzielnie albo skorzystać z dalszej części dokumentacji, gdzie zawarty jest opis działania skryptu.</li>
</ol>
<h3>Odinstalowanie / usuwanie z systemu</h3>
<p>
Aby odinstalować skrypt, zwyczajnie usuń plik 'Golden Crop.jsx', z folderu skryptów programu Photoshop®. W poprzednim punkcie znajdziesz wskazówki, jak odnaleźć lokalizacje folderu skryptów w Twoim systemie.
</p>
ENDANSWER
);
// =======================================================

$faqA[] = array('Co potrafi skrypt Golden Crop?','whatCanDo',<<<ENDANSWER
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
ENDANSWER
);
// =======================================================
$faqA[] = array('Co nowego? (Dziennik Zmian)','whatsNew','Każda kolejna wersja niesie ze sobą wiele nowości! Szczegóły (z dołączonymi obrazkami!) opisane są w <a href="'.getUrlToModule('changelog').'">Dzienniku Zmian</a>');
// =======================================================

$faqA[] = array('Jak mogę skonfigurować skrypt Golden Crop?','configure',<<<ENDANSWER
<p>Skrypt Golden Crop jest aktualnie w fazie rozwoju <em>beta</em>. Dlatego nie istnieje jeszcze łatwa i wygodna metoda konfiguracji skryptu. Jeśli jesteś zaawansowanym użytkownikiem, możesz spróbować bezpośredniej edycji pliku skryptu za pomocą np. Notatnika. Najważniejsze zmienne konfiguracyjne (w tym sposób wyboru języka) znajdują się na początku pliku skryptu.</p>
ENDANSWER
);
// =======================================================
$faqA[] = array('Podziękowania','acknowledgements',<<<ENDANSWER
<p>Pomocną dłoń wyciągnęli:
</p>
<ul>
 <li><strong>Krystian Paździor</strong> -- intensywne testowanie po nocach i błyskotliwe pomysły</li>
 <li><strong>Arkadius Bazior</strong> -- opracowanie niemieckiej wersji językowej skryptu</li>
 <li><strong>Cristiano007</strong> -- opracowanie hiszpańskiej wersji językowej skryptu</li>
 <li><strong>Vlad Kovnerov</strong> -- opracowanie rosyjskiej wersji językowej skryptu</li>
 <li><strong>Mantra Giovanni</strong> -- opracowanie włoskiej wersji językowej skryptu</li>
</ul>
<p>W imieniu swoim oraz wszystkich użytkowników skryptu <strong>dziękuję Wam za włożoną pracę i poświęcony czas</strong>! </p>
ENDANSWER
);
// =======================================================
$faqA[] = array('W jaki sposób mogę skontaktować się z autorem?','author',<<<ENDANSWER
<p>Autorem i założycielem projektu jest Damian Sepczuk. Skrobnij maila na adres goldencrop[maŁpa]o2[kr0pka]USUŃ_TO_I_NASTĘPNĄ_KROPKĘ[kropka]pl</p>
ENDANSWER
);
// =======================================================
?>
<h1>Spis treści:</h1>
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
</div>
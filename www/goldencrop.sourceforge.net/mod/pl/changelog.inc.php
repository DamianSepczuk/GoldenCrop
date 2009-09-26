<?php $title = 'Dziennik zmian'?>
<div class="modTitle">Dziennik zmian</div>
<h1>Wersja 0.91 beta</h1>
<ul>
	<li>Nowy język: <strong style="font-size:150%; color: #ffd635">hiszpański</strong></li>
</ul>
<div style="margin: auto; text-align: center; width: 728px; height: 90px;" class="dlugRekl"><?=$AD_bigBanner?></div>
<h1>Wersja 0.90 beta</h1>
<ul>
	<li><img src="img/features/diagonalRule.png" alt="Metoda Przekątnych" /><br />
	Nowa podpowiedź kompozycji: <strong style="font-size:150%; color: red">Metoda Przekątnych</strong></li>
	<li><img src="img/features/thicknessControl.png" alt="Kontrola grubości linii" /><br />
	Kontrola grubości linii</li>
	<li>Nowy język: <strong style="font-size:150%; color: #ffd635">niemiecki</strong></li>
	<li>Szybsze tworzenie warstw</li>
	<li>Linie lepiej widoczne na ciemnym tle (dodany biały obrys)</li>
	<li>Lepsza reakcja na próbę uruchomienia skryptu bez otwartego dokumentu</li>
</ul>
<div style="margin: auto; text-align: center; width: 336px; height: 280px;" class="bigRectRekl"><?=$AD_intextBigRect?></div>
<h3>Wersja 0.85 beta</h3>
<ul>
  <li>Działa w wersji <strong style="font-size:150%; color: red">CS2</strong>!</li>
  <li>Możliwe jest <strong style="font-size:150%; color: #ffd635">kontynuowanie przerwanego kadrowania</strong>. Skrypt odnajduje grupę 'Golden
    Crop by SzopeN' i wznawia kadrowanie w trybie interaktywnym.
	Aby wymusić dodanie nowej grupy 'Golden Crop by SzopeN', przed uruchomieniem skryptu należy zaznaczyć warstwę znajdującą się na samym dole (na przykład warstwę Tła)</li>
  <li>Dodano złote spirale<br />
      <img alt="Golden Spirals" src="img/goldenSpirals.png" />
      </li>
  <li>Dodano dialog "Wybierz metodę kompozycji". Za jego pomocą można wybrać, które linie pomocnicze będą wyświetlane. Wybór jest zapamiętywany.<br />
      <img alt="Composition guidelines" src="img/chooseGuidelines.png" />
	</li>
  <li>Skrypt zachowuje się jak plug-in. Dostępny jest z menu Plik>Automatyzuj>Golden Crop (uwaga: w wersji CS2 skrypt wciąż znajduje się w menu Plik>Skrypty)<br />
      <img alt="New menu position" src="img/newMenuPos.png" /></li>
  <li>Można nagrać wywołanie skryptu jako część akcji. Przy odtwarzaniu, skrypt dalej będzie działał w trybie interaktywnym. Jedynie wybór linii pomocniczych zostanie zapamiętany (nie pojawi się okno "Wybierz metodę kompozycji")<br />
      <img alt="Golden Crop registered in action" src="img/GCaction.png" /></li>
  <li>Rozwiązano problem z sekwencją klawiszy [Alt],[klawisz] w oknach dialogowych</li>
  <li>Mała poprawka w sposobie obracania i wykrywania czy kadr jest pionowy czy poziomy</li>
  <li>Zoptymalizowano i wyczyszczono kod</li>
</ul>
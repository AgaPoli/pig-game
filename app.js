/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var scores, roundScore, activePlayer, gamePlaying;
init();

dice = Math.floor(Math.random() * 6) + 1;  /*rzut kostka*/


//document.querySelector('#current-' + activePlayer).textContent = dice;
document.querySelector('.dice').style.display = 'none'; // na poczatku zdjecie kostki niewidoczne



document.querySelector('.btn-roll').addEventListener('click', function () {//funkcja to callback na event-bedzie wynik
   if (gamePlaying) {
      var dice = Math.floor(Math.random() * 6) + 1; //losowanie wyniku
      var diceDOM = document.querySelector('.dice'); /**zdjecie kostki */
      diceDOM.style.display = 'block'; // odblokowanie zdjecia kostki po kliku
      diceDOM.src = 'dice-' + dice + '.jpg'; // z jpg  variable(zmienna)

      if (dice !== 1) {
         //Add score
         roundScore += dice; //update
         //displaY in HTML
         document.querySelector('#current-' + activePlayer).textContent = roundScore; //display

      } else {
         nextPlayer();
      }
   }
});


document.querySelector('.btn-hold').addEventListener('click', function () {
   if (gamePlaying) {
      //pkty maja bprzejsc z player-current-score do player score 
      scores[activePlayer] += roundScore; //sumowanie pktow(nie ma 0 bo jest hold)
      //ui update spr gdzie sie zapisuja pkty sumy
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; // na poczatku zdjecie kostki niewidoczne


      // spr czy gracz wygral gre czy ma 100 pkt
      if (scores[activePlayer] >= 10) {
         document.querySelector('#name-' + activePlayer).textContent = 'Winner!';//tekst winner zamioanst pktopw u gory
         document.querySelector('.dice').style.display = 'none';//znika kostka
         document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');//usowa kropke i pogrubuienie z css
         document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); //zmiana koloru z css
         gamePlaying = false;
      } else {
         //Next player
         nextPlayer();
      }

   }

});


function nextPlayer() {
   activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // przejscie na drugiegoo gracza
   roundScore = 0; // reset do 0
   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';
   document.querySelector('.player-0-panel').classList.toggle('active'); //manipulacja klasami w HTML, zmiana podswietlenia katywnego gracza
   document.querySelector('.player-1-panel').classList.toggle('active'); //manipulacja klasami w HTML
   document.querySelector('.dice').style.display = 'none'; // znika kostka
   //document.querySelector('.player-0-panel ').classList.remove= 'active'; //manipulacja klasami w HTML

}

document.querySelector('.btn-new').addEventListener('click', init);


function init() {
   scores = [0, 0]; //glowna pktacja
   roundScore = 0;
   activePlayer = 0;
   gamePlaying = true;

   document.querySelector('.dice').style.display = 'none'; // na poczatku zdjecie kostki niewidoczne
   document.getElementById('score-0').textContent = '0';
   document.getElementById('current-0').textContent = '0'; //activePlayer
   document.getElementById('score-1').textContent = '0';
   document.getElementById('current-1').textContent = '0';
   document.getElementById('name-0').textContent = 'Player 1';
   document.getElementById('name-1').textContent = 'Player 2';
   document.querySelector('.player-0-panel').classList.remove('winner');
   document.querySelector('.player-1-panel').classList.remove('winner');
   document.querySelector('.player-0-panel').classList.remove('active'); //manipulacja klasami w HTML, zmiana podswietlenia katywnego gracza
   document.querySelector('.player-1-panel').classList.remove('active');
   document.querySelector('.player-0-panel').classList.add('active');



}



var scores, roundScore, activePlayer, gamePlaying;

var lastDice;
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

      if (dice ===6 && lastDice ===6){
        score[activePlayer]= 0;
        document.querySelector('#score-' + activePlayer).textContent ='0';
        nextPlayer() ;   
      }else if  (dice !== 1) {
         //Add score
         roundScore += dice; //update
         //displaY in HTML
         document.querySelector('#current-' + activePlayer).textContent = roundScore; //display

      } else {
         nextPlayer();
      }

      lastDice= dice;
   }
});


document.querySelector('.btn-hold').addEventListener('click', function () {
   if (gamePlaying) {
      //pkty maja bprzejsc z player-current-score do player score 
      scores[activePlayer] += roundScore; //sumowanie pktow(nie ma 0 bo jest hold)
      //ui update spr gdzie sie zapisuja pkty sumy
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; 


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
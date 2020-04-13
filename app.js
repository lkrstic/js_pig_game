/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

init();

var scores, roundScore, activePlayer, gamePlaying;

function init() {
    scores=[0,0];
    roundScore=0;
    activePlayer=0;

    //state function -- prevents roll and hold when game is complete
    gamePlaying=true;

    //edit CSS -- style.<<selector>>
    document.querySelector('.dice').style.display = 'none';

    //make all scores 0 to start
    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';

    //reset names, remove winner, reset player 1 to active
    document.getElementById('name-0').textContent='Player 1';
    document.getElementById('name-1').textContent='Player 2';

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.add('active');
}

//Event listener added for clicking the roll dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
    //don't allow roll if gamePlaying=false
    if(gamePlaying) {
        //1. random number needs to be generated
        var dice = Math.floor(Math.random() * 6) + 1;
        
        //2. result needs to be displayed
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+dice+'.png'; 

        //3. Update round score IF rolled number was NOT 1
        if(dice !== 1) {
            //add score
            roundScore+=dice;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        } else {
            //clear round score and change to next player
            changePlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    //don't add current when gamePlaying=false
    if(gamePlaying) {
        //1. add current score to global score and update UI
        scores[activePlayer] += roundScore;
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        //2. check if player has won the game
        if(scores[activePlayer] >= 100) {
            document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            gamePlaying=false;
        } else {
            //3. clear round score and change to next player
            changePlayer();
        }
    }
});

function changePlayer() {
    //clear round score
    roundScore = 0;
    document.querySelector('#current-'+activePlayer).textContent = 0;
    //change to next player
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', init);







//NOTES

//edit text -- textContent
//document.querySelector('#current-'+activePlayer).textContent = dice;

//edit HTML -- innerHTML
//document.querySelector('#current-'+activePlayer).innerHTML = '<em>'+dice+'</em>';

//get value -- nothing assigned to textContent
//var x = document.querySelector('#score-0').textContent;
//console.log(x);
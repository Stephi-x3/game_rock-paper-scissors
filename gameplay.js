function playRound(playerSelection, computerSelection, possibleShapes) {
    if (playerSelection == computerSelection) {
        document.getElementsByClassName('feedbackRound')[0].textContent = "It's a tie!";
        return "noWin";
    } else {
        if (playerSelection == possibleShapes[0]) {
            if (computerSelection == possibleShapes[1]) {
                document.getElementsByClassName('feedbackRound')[0].textContent = 'No win...';
                return "compWins";
            } else {
                document.getElementsByClassName('feedbackRound')[0].textContent = 'You won!';
                return "playerWins";
            }
        } else if (playerSelection == possibleShapes[1]){
            if (computerSelection == possibleShapes[2]) {
                document.getElementsByClassName('feedbackRound')[0].textContent = 'No win...';
                return "compWins";
            } else {
                document.getElementsByClassName('feedbackRound')[0].textContent = 'You won!';
                return "playerWins";
            }
        } else {
            if (computerSelection == possibleShapes[0]) {
                document.getElementsByClassName('feedbackRound')[0].textContent = 'No win...';
                return "compWins";
            } else {
                document.getElementsByClassName('feedbackRound')[0].textContent = 'You won!';
                return "playerWins";
            }
        }                     
    }
}

function fireworks(){
    //https://confetti.js.org/more.html
    const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
        return clearInterval(interval);
        }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
        Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
    );
    confetti(
        Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
    );
    }, 250);
}

async function getPlayerChoice(cards, choice){
    //controller instead of removeEventListener
    const controller = new AbortController(); 
    return new Promise((resolve) => {
        cards.forEach(card => card.addEventListener('click', (event) => {
            controller.abort();
            if (cards[0] == event.target.parentNode) {
                resolve(choice[0]); 
            } else if (cards[1] == event.target.parentNode) {
                resolve(choice[1]);
            } else if (cards[2] == event.target.parentNode) {
                resolve(choice[2]);
            } 
        },
            { signal: controller.signal }
        ));
    });
}

async function startGame(clickedButton){
    roundsToPlay = parseInt(clickedButton.innerHTML);
    const possibleShapes = ["Rock", "Paper", "Scissors"];
    let score_Player = 0;
    let score_Computer = 0;
    let winner = "";
    const getComputerChoice = () => possibleShapes[Math.floor(Math.random() * 3)];
    let computerSelection = '';
    let playerSelection = '';
    const cards = document.querySelectorAll('.card');

    for (let currentRound = 1; currentRound <= roundsToPlay; currentRound++) {
        document.getElementById('nbrOfRound').textContent = currentRound;

        computerSelection = getComputerChoice();
        
        //wait for players choice
        playerSelection = await getPlayerChoice(cards, possibleShapes);
        
        document.getElementsByClassName('choiceComputer')[0].textContent = `${computerSelection}`;
        document.getElementsByClassName('choicePlayer')[0].textContent = `${playerSelection}`;
        
        winner = playRound(playerSelection, computerSelection, possibleShapes);
        if (winner == "playerWins") {
            score_Player++;
        } else if(winner == "compWins") {
            score_Computer++;
        }
    }
    
    setTimeout(() => {
        document.getElementById('mainGameplay').style.display = 'none';
        document.getElementById('backgroundOfGame').style.backgroundImage = 'url(Pictures/neverGiveUp.png)';
        document.getElementsByClassName('finalFeedback')[0].textContent = `Final Game Score:
        Computer: ${score_Computer} | You: ${score_Player}`;
    }, 1000);

    setTimeout(() => {
        
        if(score_Player>score_Computer){
            document.getElementById('backgroundOfGame').style.backgroundImage = 'url(Pictures/congrats.png)';
            document.getElementsByClassName('congrats')[0].textContent = `Congratulations!`;
            fireworks();
        }
    }, 1000);
}


const nbrRoundButton = document.querySelectorAll('.nbrOfRounds');
nbrRoundButton.forEach(button => button.addEventListener('click', () => {
    document.getElementById('start-chooseNbrRound').style = 'display: none;';
    startGame(button);
}));
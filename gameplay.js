function playRound(playerSelection, computerSelection, possibleShapes) {
    if (playerSelection == computerSelection) {
        console.log("It's a tie!");
        return "noWin";
    } else {
        if (playerSelection == possibleShapes[0]) {
            if (computerSelection == possibleShapes[1]) {
                console.log("Computer wins...");
                return "compWins";
            } else {
                console.log("You win!");
                return "playerWins";
            }
        } else if (playerSelection == possibleShapes[1]){
            if (computerSelection == possibleShapes[2]) {
                console.log("Computer wins...");
                return "compWins";
            } else {
                console.log("You win!");
                return "playerWins";
            }
        } else {
            if (computerSelection == possibleShapes[0]) {
                console.log("Computer wins...");
                return "compWins";
            } else {
                console.log("You win!");
                return "playerWins";
            }
        }                     
    }
}

async function playerMakesChoice(cards){
    const controller = new AbortController(); 
    return new Promise((resolve) => {
        cards.forEach(card => card.addEventListener('click', (event) => {
            console.log(event.target.parentNode.parentNode);
            controller.abort();
            resolve();
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
    let computerSelection = "";
    let playerSelection = "";
    const cards = document.querySelectorAll('.card');
    console.log(cards);
    //const cards = document.getElementsByClassName('card');

    for (let currentRound = 1; currentRound <= roundsToPlay; currentRound++) {
        document.getElementById('nbrOfRound').textContent = currentRound;

        computerSelection = getComputerChoice();
        
        //playerSelection: Player clicks on picture
        await playerMakesChoice(cards);
        //cards.forEach(card => card.addEventListener('click', (event) => { playerSelection = event.id }));
        //playerSelection = possibleShapes[prompt("Write a number: 1 = Rock, 2 = Paper, 3 = Scissors")-1];
        
        document.getElementsByClassName('choiceComputer')[0].textContent = `${computerSelection}`;
        document.getElementsByClassName('choicePlayer')[0].textContent = `${playerSelection}`;
        
        winner = playRound(playerSelection, computerSelection, possibleShapes);
        if (winner == "playerWins") {
            score_Player++;
        } else if(winner == "compWins") {
            score_Computer++;
        }
    }
    document.getElementById('mainGameplay').style.display = 'none';
    document.getElementsByClassName('feedbackWinLoose')[0].textContent = `Final Game Score:
        Computer: ${score_Computer} | You: ${score_Player}`;
    if(score_Player>score_Computer){
        document.getElementById('backgroundOfGame').style.backgroundImage = 'url(Pictures/congrats.png)';
    }
}


const nbrRoundButton = document.querySelectorAll('.nbrOfRounds');
nbrRoundButton.forEach(button => button.addEventListener('click', () => {
    document.getElementById('start-chooseNbrRound').style = 'display: none;';
    startGame(button);
}));
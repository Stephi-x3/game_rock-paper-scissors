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

function startGame(clickedButton){
    roundsToPlay = parseInt(clickedButton.innerHTML);
    const possibleShapes = ["Rock", "Paper", "Scissors"];
    let score_Player = 0;
    let score_Computer = 0;
    const getComputerChoice = () => possibleShapes[Math.floor(Math.random() * 3)];
    let computerSelection = "";
    let playerSelection = "";

    for (let currentRound = 1; currentRound <= roundsToPlay; currentRound++) {
        document.getElementById('nbrOfRound').textContent = currentRound;

        computerSelection = getComputerChoice(); 
        playerSelection = possibleShapes[prompt("Write a number: 1 = Rock, 2 = Paper, 3 = Scissors")-1];
        
        document.getElementsByClassName('choiceComputer')[0].textContent = `${computerSelection}`;
        document.getElementsByClassName('choicePlayer')[0].textContent = `${playerSelection}`;
        
        let winner = playRound(playerSelection, computerSelection, possibleShapes);
        if (winner == "playerWins") {
            score_Player++;
        } else if(winner == "compWins") {
            score_Computer++;
        }
    }
    document.getElementsByClassName('feedbackWinLoose')[0].textContent = `Final Game Score:
        Computer: ${score_Computer} | You: ${score_Player}`;
    if(score_Player>score_Computer){
        console.log("Congratulations!")
    }
}


const nbrRoundButton = document.querySelectorAll('.nbrOfRounds');
nbrRoundButton.forEach(button => button.addEventListener('click', () => {
    nbrRoundButton.forEach(button => button.removeEventListener('click', () => {}));
    document.getElementById('start-chooseNbrRound').style = 'display: none;';
    startGame(button);
}));
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

function game(){
    const possibleShapes = ["Rock", "Paper", "Scissors"];
    let score_Player = 0;
    let score_Computer = 0;
    const roundsToPlay = 0;
    const nbrRoundButton = document.getElementsByClassName('nbrOfRounds');
    nbrRoundButton.forEach(button => {
        
    });

    document.getElementById('start-chooseNbrRound').style = 'display: none;';

    for (let currentRound = 1; currentRound <= roundsToPlay; currentRound++) {
        
        const getComputerChoice = () => possibleShapes[Math.floor(Math.random() * 3)];
        let computerSelection = getComputerChoice();
        
        let playerSelection = possibleShapes[prompt("Write a number: 1 = Rock, 2 = Paper, 3 = Scissors")-1];
        
        console.log("Your choice: "+playerSelection+" | Opponent's choice: "+computerSelection);
        console.log("--- Ergebnis von Runde "+currentRound+" ---");
        
        let winner = playRound(playerSelection, computerSelection, possibleShapes);
        if (winner == "playerWins") {
            score_Player++;
        } else if(winner == "compWins") {
            score_Computer++;
        }
    }
    console.log("*******************************");
    console.log("Final Game Score:\nYou: "+score_Player+" | Computer: "+score_Computer);
    if(score_Player>score_Computer){
        console.log("Congratulations!")
    }
    console.log("*******************************");
}


game();
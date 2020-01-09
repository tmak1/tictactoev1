
var board = ['','','',
             '','','',
             '','',''];

var magicSquare = [2,9,4,7,5,3,6,1,8];
console.log(board);

var squares = [];

for (var i = 0; i < 9; i++) {
    squares[i] = document.querySelector(`#_${i}`);
}

var p1Btn = document.querySelector('#player1-btn');
var p2Btn = document.querySelector('#player2-btn');

var resetBoardBtn = document.querySelector('#reset-board-btn');


var p1ScoreDisplay = document.querySelector('.p1score');
var p2ScoreDisplay = document.querySelector('.p2score');

var winnerRoundDisplay = document.querySelector('.winner-round');

var player1 = {
    title: 'player1',
    name: 'David',
    score: 0,
    token: 'X'
};

var player2 = {
    title: 'player2',
    name: 'Brian',
    score: 0,
    token: 'O'
};

var computerEasy = {
    title: 'computerEasy',
    name: 'pc',
    score: 0,
    token: 'O'
};

var computerHard = {
    title: 'computerHard',
    name: 'pc+',
    score: 0,
    token: 'O'
};

var currentPlayer = player1;
var previousTurnPlayer = null;
var winner = null;
var isBoardFrozen = true;



var playTurn = evt => {
    console.log(previousTurnPlayer);
    if (currentPlayer === player1) { 
        evt.target.classList.add('p1');
        evt.target.setAttribute('player-token', currentPlayer.token);
        previousTurnPlayer = currentPlayer;
        currentPlayer = player2;
     } else if (currentPlayer === player2) { 
         evt.target.classList.add('p2');
         evt.target.setAttribute('player-token', currentPlayer.token);
         previousTurnPlayer = currentPlayer;
         currentPlayer = player1;
     }  
     evt.target.style.pointerEvents = 'none';
 
     console.log(currentPlayer);
};

var winCheck = playerToken => {
    console.log(playerToken);
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            for (var k = 0; k < 9; k++) {
                if (i != j && i != k && j != k) {
                    if (board[i] === playerToken  && board[j] === playerToken && board[k] === playerToken) {
                        if ((magicSquare[i] + magicSquare[j] + magicSquare[k]) === 15) {
                           return true;
                        }
                    }
                }
            }
        }
    }
    return false;    
}

var checkWinner = () => {
    if (currentPlayer === player1) {
        if (winCheck('p2')) { //need to check for the last player win condition not the new current
            player2.score++;
            winner = player2;
            console.log('P>');
            console.log(player1);
            console.log(player2);
        }
    } else if (currentPlayer === player2) {
        if (winCheck('p1')) {
            player1.score++;
            winner = player1;
            console.log('P>');
            console.log(player1);
            console.log(player2);
        }
    }
}


var boardFullCheck = () => (board.indexOf(undefined) === -1) ? true : false;

var updateScoreGraphics = () => {
    p1ScoreDisplay.textContent = player1.score;
    p2ScoreDisplay.textContent = player2.score;
}

var declareWinner = () => {
    winnerRoundDisplay.textContent = winner.name;
    console.log('W>');
    console.log(winner);
    console.log(player1);
    console.log(player2);
    winner = null;
}

var declareDraw = () => {
    console.log('draw');
    winnerRoundDisplay.textContent = 'DRAW';
}

var boardResetGraphics = () => {
    document.querySelectorAll('.square').forEach(square => {
        square.classList.value = 'square';
        square.removeAttribute('style');
        square.removeAttribute('player-token');
    });
}

var boardUnFreeze = () => {
    document.querySelectorAll('.square').forEach(square => {
        square.removeAttribute('style');
    })
    isBoardFrozen = false;   
}

var boardFreeze = () => { 
    document.querySelectorAll('.square').forEach(square => {
        square.style.pointerEvents = 'none';      
    })
    isBoardFrozen = true;   
}

var playerReset = () => {
    currentPlayer = player1;
    previousTurnPlayer = null;
    p1Btn.removeAttribute('disabled');
    p2Btn.removeAttribute('disabled');
}


var boardReset = () => {
    board.forEach((val, index) => board[index] = '');
    boardResetGraphics();
    playerReset();
    console.log(board);
}


var gameRoundEnded = result => {
    console.log('S>');
    console.log(player1);
    console.log(player2);
    if (result === 'win') {
        declareWinner();
    } else if (result === 'draw') {
        declareDraw();
    }
    updateScoreGraphics();
    console.log('U>');
    console.log(player1);
    console.log(player2);
    boardFreeze();
    boardReset();
    console.log(board);
}

var boardUpdate= () => {    
    board.forEach((val, index) =>  board[index] = (val === '' || val === 'e' || val === undefined) ? (squares[index].classList.value.split(' ')[1]) : val)
    console.log(board);
}

var processTurn = evt => {
    playTurn(evt); 
    boardUpdate();
    checkWinner();
    if (winner !== null) {
        gameRoundEnded('win');
    } else {
        if (boardFullCheck()) {
            gameRoundEnded('draw');
        }
    }
}

boardFreeze();

document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('click', evt => {
        p1Btn.setAttribute('disabled', true);    
        p2Btn.setAttribute('disabled', true);
        if (currentPlayer !== previousTurnPlayer) {
            processTurn(evt);
        }    
    });
});

p1Btn.addEventListener('click', evt => {
    currentPlayer = player1;
    p1Btn.setAttribute('disabled', true);
    p2Btn.setAttribute('disabled', true);
    boardUnFreeze();
});

p2Btn.addEventListener('click', evt => {
    currentPlayer = player2;
    p1Btn.setAttribute('disabled', true);    
    p2Btn.setAttribute('disabled', true);  
    boardUnFreeze();
});

resetBoardBtn.addEventListener('click', evt => boardReset());





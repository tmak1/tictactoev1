

var board = ['','','',
             '','','',
             '','',''];

var magicSquare = [2,9,4,7,5,3,6,1,8];

//console.log(board);

// [
//     o, x, o,
//     o, x, x,
//     , x, o,
// ]

var squares = [];


for (var i = 0; i < 9; i++) {
    squares[i] = document.querySelector(`#_${i}`);
}

var p1Btn = document.querySelector('#player1-btn');
var p2Btn = document.querySelector('#player2-btn');

var resetBoardBtn = document.querySelector('#reset-board-btn');
var select = document.querySelector('#gameMode');


var p1ScoreDisplay = document.querySelector('.p1score');
var p2ScoreDisplay = document.querySelector('.p2score');

var winnerRoundDisplay = document.querySelector('.winner-round');

var player1 = {
    title: 'player1',
    name: 'david',
    score: 0,
    token: 'X',
    isComputer: false
};

var player2 = {
    title: 'player2',
    name: 'brian',
    score: 0,
    token: 'O',
    isComputer: false
};



var computer = {
    title: 'computer',
    name: 'pc',
    score: 0,
    token: 'O',
    isComputer: true
};

var currentPlayer = null;
var previousTurnPlayer = null;
var winner = null;
var isBoardFrozen = true;
var gameMode = '';

var resetAnimationClasses = () => {
    document.querySelector('.container').classList.remove('shake-bottom');
}

var winAnimation = (i, j, k, playerToken) => {
    var arr = [i,j,k];
    var countSec = 0;
    arr.sort(function(a, b){return a-b});
    console.log('HHHH' + playerToken);
    var colorDis = (playerToken === 'p1') ? 'lightsalmon' : 'skyblue';
    console.log('GGGGG' + colorDis);
    arr.forEach((item) => {
        countSec += 200;
        document.querySelector(`#_${item}`).style.backgroundColor = colorDis;
        document.querySelector(`#_${item}`).classList.add('scale-up-center');
        setTimeout(() => {
            document.querySelector(`#_${item}`).classList.remove('scale-up-center');
            document.querySelector(`#_${item}`).classList.add('heartbeat');
            setTimeout(() => {
                    document.querySelector(`#_${item}`).classList.remove('heartbeat');
                    document.querySelector(`#_${item}`).classList.add('flicker-1');
                    
                }, (500 + countSec));
            }, (300 + countSec));
        })
    
    }

    var drawnAnimation = () => {
        document.querySelector('.container').classList.add('shake-bottom');
       
    }

var winCheck = playerToken => {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            for (var k = 0; k < 9; k++) {
                if (i != j && i != k && j != k) {
                    if (board[i] === playerToken  && board[j] === playerToken && board[k] === playerToken) {
                        if ((magicSquare[i] + magicSquare[j] + magicSquare[k]) === 15) {
                            winAnimation(i, j, k, playerToken);
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
    if (previousTurnPlayer === player1) {
        if (winCheck('p1')) {
            player1.score++;
            winner = player1;
        }
    } else if (previousTurnPlayer === player2) {
        if (winCheck('p2')) {
            player2.score++;
            winner = player2;
        }
    }
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
    currentPlayer = null;
    previousTurnPlayer = null;
    p1Btn.removeAttribute('disabled');
    p2Btn.removeAttribute('disabled');
    document.querySelector('#player1-btn').classList.remove('highlight-btn');
    document.querySelector('#player2-btn').classList.remove('highlight-btn');
    if (gameMode === 'mode3') {
        p1Btn.click();
    }
}

var boardResetGraphics = () => {
    document.querySelectorAll('.square').forEach(square => {
        square.classList.value = 'square';
        square.removeAttribute('style');
        square.removeAttribute('player-token');
    });
}

var boardReset = () => {
    board.forEach((val, index) => board[index] = '');
    boardResetGraphics();
    //console.log(board);
}

var boardFullCheck = () => {
    if (board.indexOf(undefined) === -1) {
        drawnAnimation();
        return true;
    } else {
        return false;
    }
};

var updateScoreGraphics = () => {
    p1ScoreDisplay.textContent = player1.score;
    p2ScoreDisplay.textContent = player2.score;
}

var declareWinner = () => {
    winnerRoundDisplay.style.textTransform  = 'capitalize';
    winnerRoundDisplay.textContent = winner.name;
    winner = null;
}

var declareDraw = () => {
    //console.log('draw');
    winnerRoundDisplay.textContent = 'DRAW';
}

var gameRoundEnded = result => {

    if (result === 'win') {
        declareWinner();
    } else if (result === 'draw') {
        declareDraw();
    }
    resetAnimationClasses();
    updateScoreGraphics();

    boardFreeze();
    boardReset();
    playerReset();
    gameModeCheck();
    //console.log(board);
}



var boardUpdate= () => {    
    board.forEach((val, index) =>  board[index] = (val === '' || val === 'e' || val === undefined) ? (squares[index].classList.value.split(' ')[1]) : val)
    console.log(board);
}

var computerMove = () => {
    console.log(board);
    boardFreeze();
    setTimeout(() => {
        while ((board.indexOf(undefined) !== -1) || (board.indexOf("") !== -1)) {
            var move = Math.round(Math.random() * 8);  
            console.log('Computer moving');        
            if (board[move] === '' || board[move] === 'e' || board[move] === undefined) {
                document.querySelector(`#_${move}`).click();
                console.log('M ' + board[move]);
                break;
            }
        }
        boardUnFreeze(); 
    }, 1500);
    
    
}

var playTurn = evt => {
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
};

var gameModeCheck = () => {
    switch (select.value) {
        case 'computer easy':
            gameMode = 'mode1';
            break;
        case 'play against a friend':   
            gameMode = 'mode3';
            p1Btn.click();
            break;
    }
}

var highlighter = () => {
    document.querySelector('#player1-btn').classList.remove('highlight-btn');
    document.querySelector('#player2-btn').classList.remove('highlight-btn');
    if (currentPlayer !== null) {
        document.querySelector(`#${currentPlayer.title}-btn`).classList.add('highlight-btn');
    }
}

var processTurn = evt => {
    playTurn(evt);
    boardUpdate();
    highlighter();
    checkWinner();
    if (winner !== null) {
        setTimeout(() => gameRoundEnded('win'), 3500);     
    } else {
        if (boardFullCheck()) {
            setTimeout(() => gameRoundEnded('draw'), 1000);   
        } else {
            if (previousTurnPlayer !== null &&  !previousTurnPlayer.isComputer) {
                if (gameMode === 'mode1' || gameMode === 'mode2') {
                    computerMove();
                }
            }
        }
    }
}


document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('click', evt => {
        if (gameMode === 'mode1') {
            processTurn(evt);
        } else {
            processTurn(evt);
        }   
    });
});

var init = () => {

    player1 = {
        title: 'player1',
        name: 'David',
        score: 0,
        token: 'X',
        isComputer: false
    };
    
    player2 = {
        title: 'player2',
        name: 'brian',
        score: 0,
        token: 'O',
        isComputer: false
    };
    

    
    computer = {
        title: 'computer',
        name: 'computer',
        score: 0,
        token: 'O',
        isComputer: true
    };
    gameModeCheck();
    p1Btn.textContent = 'player1';
    p2Btn.textContent = 'player2';
}

p1Btn.addEventListener('click', evt => {
    gameModeCheck();
    if (gameMode === 'mode1') {
        //init();
        player2 = computer;
        p2Btn.textContent = 'computer';
        computer.title = 'player2';
        computer.token = 'O';  
    }
    p1Btn.setAttribute('disabled', true);    
    p2Btn.setAttribute('disabled', true);
    currentPlayer = player1;
    previousTurnPlayer = player2; 
    highlighter();
    boardUnFreeze();
});

p2Btn.addEventListener('click', evt => {
    gameModeCheck();
    if (gameMode === 'mode1') {     
        //init();
        player1 = computer;
        p1Btn.textContent = 'computer';
        computer.title = 'player1';
        computer.token = 'X';     
        computerMove();
    }
    p1Btn.setAttribute('disabled', true);    
    p2Btn.setAttribute('disabled', true);
    currentPlayer = player1;
    previousTurnPlayer = player2; 
    boardUnFreeze();
});

resetBoardBtn.addEventListener('click', evt => {
    boardReset();
    playerReset();
});

select.addEventListener('change', () => {
    init();
    gameRoundEnded();
});

init();



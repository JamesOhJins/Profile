const connect4 = document.querySelector(".connect4 > ul");
const pickline = document.querySelector(".pick_line");
const playerName = document.querySelector("#player");
const restartButton = document.querySelector(".game-button");
const gameText = document.querySelector(".game-text");
const buttons = document.getElementById("buttons");

const CONNECT4_COLS = 7;
const CONNECT4_ROWS = 6;
var first = true;
var verticalThree = false;
var verticalIndex = 0;
var verticalThreeAi = false;
var verticalIndexAi = 0;
var diagonalThree = false;
var diagonalIndex = 0;
var doNotPut = 0;
var exception = false;
var diagonalThreeAi = false;
var diagonalIndexAi = 0;
var horizontalTwo = false;
var horizontalTwoIndex = 0;
var horizontalTwoAi = false;
var horizontalTwoIndexAi = 0;
var horizontalThree = false;
var horizontalIndex = 0;
var horizontalThreeAi = false;
var horizontalIndexAi = 0;
var playerIndex = 0;
var end = false;

var yindex = [0, 0, 0, 0, 0, 0, 0]; //for each column, counts how many holes are already filled
let play = false;
count = 0;
var player1Turn = true;

var pvp = false;

function init() {

    if(!play) {
        restartButton.innerText = "Play";
        restartButton.style.display = "flex";
        gameText.innerText = "\n Select one column from the top row you want to put a disk. \n Disks will be stacked from the bottom. \n If you link 4 disks horizontally, verticall, or diagonally, \n Congratulations, you win!! \n Try defeating AI";
        gameText.style.fontSize = "large";
        gameText.style.display = "flex";
    }
    prependPickLine();
    for (let j = 0; j < CONNECT4_ROWS; j++) {
        prependNewLine();
    }
    addpicker();
    // if(!pvp){
    //     player1Turn = false;
    // think();
    // }
}
init();

function prependNewLine() {
    const li = document.createElement("li");
    const ul = document.createElement("ul");

    for (let j = 0; j < CONNECT4_COLS; j++) {
        const matrix = document.createElement("li");
        ul.prepend(matrix);
        xindex = ("x" + j);
        matrix.classList.add(xindex);
    }
    li.prepend(ul)
    connect4.prepend(li)
    var yindex = ("y" + count);
    li.classList.add(yindex);
    count++;
}

function prependPickLine() {
    const li = document.createElement("li");
    const ul = document.createElement("ul");

    for (let j = 0; j < CONNECT4_COLS; j++) {
        const matrix = document.createElement("li");
        ul.prepend(matrix);
        matrix.classList.add("x" + j);
        xindex = ("picker");
        matrix.classList.add(xindex);
        pickline.prepend(ul);
    }
}

function single_player() {
    pvp = false;
    buttons.style.display = "none";
}
function two_player() {
    pvp = true;
    buttons.style.display = "none";
}

function addpicker() {
    for (let j = 0; j < CONNECT4_COLS; j++) {
        let pickerIndex = document.querySelector('.x' + j + '.picker');

        pickerIndex.addEventListener("mouseover", function () {
            pickerIndex.style.background = changeColor();
        });

        pickerIndex.addEventListener("mouseout", function () {
            pickerIndex.style.background = "rgba(187, 187, 187, 0.1)";
        });
        pickerIndex.addEventListener("click", function () {
            buttons.style.display = "none";
            if (!pvp) {
                if (player1Turn) {
                    disk(j);
                    playerIndex = j;
                    pickerIndex.style.background = "rgba(187, 187, 187, 0.1)";
                    think();
                }
                else {

                }
            }
            else {
                disk(j);
                pickerIndex.style.background = changeColor();
            }
        });
    }
}

function think() {
    if (!player1Turn) {
        if (verticalThreeAi) {
            console.log("verticalthreeai");
            end = true;
            setTimeout(function () {
                aiDisk(verticalIndexAi);
                verticalThreeAi = false;
            }, 500)
            return;
        }
        else if (diagonalThreeAi) {
            console.log("diagonalthreeAi");
            end = true;
            setTimeout(function () {
                aiDisk(diagonalIndexAi);
            }, 500)
            diagonalThreeAi = false;
            return;
        }
        else if (horizontalThreeAi) {
            console.log("horizontalthreeAi");
            end = true;
            setTimeout(function () {
                aiDisk(horizontalIndexAi);
            }, 500)
            horizontalThreeAi = false;
            return;
        }
        else if (verticalThree) {
            end = true;
            console.log("verticalthree");
            setTimeout(function () {
                aiDisk(verticalIndex);
                end = false;
            }, 500)
            verticalThree = false;
            return;
        }
        else if (diagonalThree) {
            end = true;
            console.log("diagonalthree");
            setTimeout(function () {
                aiDisk(diagonalIndex);
                end = false;
            }, 500)
            diagonalThree = false;
            return;
        }
        else if (horizontalThree) {
            end = true;
            console.log("horizontalthree");
            setTimeout(function () {
                aiDisk(horizontalIndex);
                end = false;
            }, 500)
            horizontalThree = false;
            return;
        }
        else if (horizontalTwoAi){
            console.log("horizontalTwoAi");
            setTimeout(function () {
                aiDisk(horizontalTwoIndexAi);
            }, 500)
            horizontalTwoAi = false;
            return;
        }
        else if (horizontalTwo) {
            console.log("horizontalTwo");
            setTimeout(function () {
                aiDisk(horizontalTwoIndex);
            }, 500)
            horizontalTwo = false;
            return;
        }
        else if (first) {
            console.log("first Time");
            setTimeout(function () {
                aiDisk(3);
            }, 500)
            first = false;
            return;
        }

        else {
            //defaunlt;
            console.log("default");
            if(playerIndex != doNotPut){
            console.log("playerIndex is not equal to donoput");
            setTimeout(function () {
                aiDisk(playerIndex);
            }, 500)
            }
            else{
                setTimeout(function () {
                    // aiDisk(playerIndex);
                    let newX = Math.floor(Math.random() * 7);
                    console.log("trying with new index x: "+newX);
                    aiDisk(newX);
                }, 500)
            }            return;
        }
    }

}


function aiDisk(x) {
    if (play && !player1Turn) {
        let sum = 0;
        for (let i = 0; i < yindex.length; i++) {
            sum += yindex[i];
        }

        if (x == doNotPut && exception == true && sum < 36 && !end) {
            console.log("trying to seize at do not put");
            newX = Math.floor(Math.random() * 7);
            think(newX);
            return;
        }
        console.log("seizing at x: " + x + " y: " + yindex[x]);
        if (yindex[x] <= CONNECT4_ROWS - 1) {
            if (yindex[x] <= CONNECT4_ROWS - 1) {
                disk(x);
                return;
            }
            else if (yindex[x] <= CONNECT4_ROWS - 1) {
                disk(x);
                return;
            }
            else {
                console.log("aiDisk(x)");
                aiDisk(x);
                return;
            }
        }
        else {
            console.log("default, seizing at random index");
            newX = Math.floor(Math.random() * 7);
            aiDisk(newX);
            return;
        }
    }
}
function changeColor() {
    
    var playerColor = "";
    
    if (pvp) {
        if (player1Turn) {
            playerColor = "radial-gradient(circle at 30px 30px, rgb(202, 44, 44), rgb(151, 8, 8))";
        }
        else {
            playerColor = "radial-gradient(circle at 30px 30px, rgb(255,251,0), rgb(153, 140, 19))";
        }
    }
    else {
        playerColor = "radial-gradient(circle at 30px 30px, rgb(202, 44, 44), rgb(151, 8, 8))";
    }
    return playerColor;
}
document.addEventListener("keydown", e => {
    switch (e.keyCode) {
        case 82:
            console.log("restarting");
            playerName.innerHTML = "Player1's turn";
            restart();
            break;
        default:
            console.log("out of index");
            break;
    }

})

// function timeoutForDrop (index){
//     setTimeout(function () {
//         let color = document.querySelector(index);
//         color.style.background = changeColor();
//         console.log("color has changed");
//     }, 1000)
// }
function disk(x) {
    if (player1Turn && yindex[x] < CONNECT4_ROWS) {
        index = (".y" + yindex[x] + " > ul > .x" + x)
        target = document.querySelector(index);
        
        target.classList.add("player1");
        // console.log("diskclass is added for p1 at (" + (CONNECT4_COLS - x - 1) + ", " + yindex[x] + ")");
        player1Turn = false;
        yindex[x] += 1;
        console.log("p2");
        // playerName.innerHTML = "Player2's turn";
        if (!pvp) {
            playerName.innerHTML = "Computer's turn";
        }
        else {
            playerName.innerHTML = "Player2's turn";
        }
    }
    else if (!player1Turn && yindex[x] < CONNECT4_ROWS) {
        console.log("p1");
        index = (".y" + yindex[x] + " > ul > .x" + x)
        target = document.querySelector(index);
        // const preview = document.querySelector(".preview > ul");
        target.classList.add("player2");
        // console.log("diskclass is added for p2 at (" + (CONNECT4_COLS - x - 1) + ", " + yindex[x] + ")");
        player1Turn = true;
        yindex[x] += 1;
        if(pvp){
            playerName.innerHTML = "Player1's turn";
        }
        else {
            playerName.innerHTML = "Your turn";

        }
    }
    else {
        console.log("Line is already full");
        if (!(player1Turn || pvp)) {
            console.log("tryng new line");
            let randomNumb = Math.floor(Math.random() * 6)
            disk(randomNumb);
            player1Turn = true;
        }
    }
    checkFour();
    // console.log("checking four");
}

function checkFour() {
    checkX();
    checkY();
    checkZAsc();
    checkZDsc();
    if (play) {
        checkTie();
    }
}

function checkX() {
    var p1Count = p2Count = 0;
    for (let i = 0; i < CONNECT4_ROWS; i++) {
        // console.log("y increase");
        for (let j = 0; j < CONNECT4_COLS; j++) {
            index = (".y" + i + " > ul > .x" + j)
            // console.log("checking (" + (CONNECT4_COLS-j-1) + ", " + i + ")");
            target = document.querySelector(index);
            if (target.classList.contains("player1")) {
                p1Count++;
                p2Count = 0;
                if (p1Count == 2) {
                    if (j > 2 && j < 6) {
                        console.log("height:" + i);
                        checkC1 = (".y" + i + " > ul > .x" + (j -3));
                        checkC2 = (".y" + i + " > ul > .x" + (j -2));

                        console.log("c1:" + checkC1);
                        if (i == yindex[j + 1] && i == yindex[j - 2]) {
                            horizontalTwo = true;
                            horizontalTwoIndex = j + 1;
                            console.log("need to block horizontally");
                        }
                        else if (i == yindex[j + 2] && document.querySelector(checkC1).classList.contains("player1") && !document.querySelector(checkC2).classList.contains("player2")) {
                            horizontalThree = true;
                            horizontalIndex = j - 2;
                            console.log("2 + 1");
                        }
                        // }
                    }
                }
                if (p1Count == 3 && !pvp) {
                    if (j < 6 && j > 2) {
                        if (i == yindex[j - 3] + 1) {
                            console.log("donotPut" + (j -3));
                            donotput = j - 3;
                            exception = true;
                        }
                        else if(i == yindex[j - 3]) {
                            console.log("block at " + (j-3));
                            horizontalThree = true;
                            horizontalIndex = (j - 3);
                        }                         
                        // else if (i == yindex[j + 1]) {
                        // else if (i == yindex[j + 1]) {
                        //     console.log("xVal" + j);
                        //     horizontalThree = true;
                        //     horizontalIndex = (j + 1);
                        // }
                        // else if (j > 2) {
                        //     if (yindex[j - 2] - 1 == yindex[j - 3]) {
                        //         console.log(j + " is greater than 2");
                        //         horizontalThree = true;
                        //         horizontalIndex = j - 3;
                        //     }
                        // }
                        

                    }
                }
                // console.log("p1Count increased: (" + (CONNECT4_COLS-j-1) + ", " + i + ") " + p1Count);
                if (p1Count == 4) {
                    target.classList.add("last_move");
                    playerWin(1);
                    return;
                }
            }
            else if (target.classList.contains("player2")) {
                p2Count++;
                p1Count = 0;
                if (p2Count == 2) {
                    if (j > 2 && j < 6) {
                        checkC1 = (".y" + i + " > ul > .x" + (j -3));
                        checkC2 = (".y" + i + " > ul > .x" + (j -2));
                        if (i == yindex[j + 1] && i == yindex[j - 2]) {
                            horizontalTwoAi = true;
                            horizontalTwoIndexAi = j + 1;
                            console.log("need to end horizontally");
                        }
                        else if (i == yindex[j + 2] && document.querySelector(checkC1).classList.contains("player2") && !document.querySelector(checkC2).classList.contains("player1")) {
                            horizontalThreeAi = true;
                            horizontalIndexAi = j - 2;
                            console.log("end with 2 + 1");
                        }
                    }
                }
                if (p2Count == 3 && !pvp) {
                    if (j < 6) {
                        if (i == yindex[j + 1]) {
                            console.log("xVal" + j);
                            horizontalThreeAi = true;
                            horizontalIndexAi = (j + 1);
                        }
                        else if (j > 2) {
                            if (yindex[j - 2] - 1 == yindex[j - 3]) {
                                horizontalThreeAi = true;
                                horizontalIndexAi = j - 3;
                            }
                        }

                    }
                }
                // console.log("p2Count increased: (" + (CONNECT4_COLS-j-1) + ", " + i + ") " + p2Count);
                if (p2Count == 4) {
                    target.classList.add("last_move");
                    playerWin(2);
                    return;
                }
            }
            else {
                // console.log("reset");
                p1Count = p2Count = 0;
            }

        }
        p1Count = p2Count = 0;
    }
}

function checkY() {
    var p1Count = p2Count = 0;
    for (let i = 0; i < CONNECT4_COLS; i++) {
        for (let j = 0; j < CONNECT4_ROWS; j++) {
            index = (".y" + j + " > ul > .x" + i)
            target = document.querySelector(index);
            if (target.classList.contains("player1")) {
                p1Count++;
                p2Count = 0;
                if (p1Count == 3 && yindex[i] != CONNECT4_ROWS && j < 5) { //&& !pvp) {
                    if (!document.querySelector(".y" + (j + 1) + " >ul > .x" + i).classList.contains("player2")) {
                        verticalThree = true;
                        console.log("vertical Three at :" + i + " y: " + yindex[i]);
                        
                        verticalIndex = i;
                    }
                }
                // console.log("p1Count increased: (" + (CONNECT4_COLS-i-1) + ", " + j + ") " + p1Count);
                if (p1Count == 4) {
                    target.classList.add("last_move");
                    playerWin(1);
                    return;
                }
            }
            else if (target.classList.contains("player2")) {

                p2Count++;
                p1Count = 0;
                // console.log("p2Count increased: (" + (CONNECT4_COLS-i-1) + ", " + j + ") " + p2Count);
                if (p2Count == 3 && yindex[i] != CONNECT4_ROWS && (pvp || player1Turn) && j < 5) {
                    // console.log("end game");
                    verticalThreeAi = true;
                    verticalIndexAi = i;
                }
                if (p2Count == 4) {
                    target.classList.add("last_move");
                    playerWin(2);
                    return;
                }
            }
            else {
                // console.log("reset");
                p1Count = p2Count = 0;
            }

        }
        p1Count = p2Count = 0;
    }
}

function checkZDsc() {
    var p1Count = p2Count = addOnY = 0;
    var start = 4;
    var yStart = 0;
    var numloops = 0;
    for (let i = yStart; i < CONNECT4_COLS; i++) {
        if (start > 0) {
            start -= 1;
            addOnY = 0;
        }
        if (start == 0 && numloops < 3) {
            addOnY = numloops;
            numloops += 1;
        }
        for (let j = start; j < CONNECT4_COLS && addOnY < CONNECT4_ROWS; j++) {
            let yVal = addOnY;
            let xVal = j
            if (yVal < CONNECT4_ROWS) {
                addOnY++;
            }
            else {
            }
            index = (".y" + yVal + " > ul > .x" + xVal)
            target = document.querySelector(index);
            if (target.classList.contains("player1")) {
                p1Count++;
                p2Count = 0;
                if (p1Count == 3) {
                    if (xVal < 6) {
                        if (yVal == yindex[xVal + 1]) {
                            doNotPut = xVal + 1;
                            // console.log("do not put at: " + (xVal + 1));
                            exception = true;
                        }
                        else if (yVal + 1 == yindex[xVal + 1]) {
                            diagonalThree = true;
                            // console.log("y: " + yVal);
                            diagonalIndex = xVal + 1;
                            // console.log("block at case1: " + diagonalIndex);
                        }
                        else if ((yVal - 4) == yindex[xVal - 3]) {
                            doNotPut = xVal - 3;
                            // console.log("do not put at: " + (xVal - 3));
                            exception = true;
                        }
                        else if ((yVal - 3) == yindex[xVal - 3]) {
                            diagonalThree = true;
                            diagonalIndex = xVal - 3;
                            // console.log("block at case2:" + diagonalIndex);
                        }
                        // console.log("count3 at " + xVal + "\n yindex: " + yindex[xVal]);
                        // console.log("player check diagonal");
                    }
                }
                if (p1Count == 4) {
                    target.classList.add("last_move");
                    playerWin(1);
                    return;
                }
            }
            else if (target.classList.contains("player2")) {
                p2Count++;
                p1Count = 0;
                if (p2Count == 3) {
                    if (xVal < 6) {
                        if (yVal + 1 == yindex[xVal + 1]) {
                            diagonalThreeAi = true;
                            // console.log("y: " + yVal);
                            diagonalIndexAi = xVal + 1;
                            // console.log("end with case1: " + diagonalIndex);
                        }
                        else if ((yVal - 3) == yindex[xVal - 3]) {
                            diagonalThreeAi = true;
                            diagonalIndexAi = xVal - 3;
                            // console.log("end with case2:" + diagonalIndex);
                        }
                        // console.log("count3 at " + xVal + "\n yindex: " + yindex[xVal]);
                        // console.log("cpu check diagonal");
                    }
                }
                if (p2Count == 4) {
                    target.classList.add("last_move");
                    playerWin(2);
                    return;
                }
            }
            else {
                p1Count = p2Count = 0;
            }

        }
        p1Count = p2Count = 0;
    }
}

function checkZAsc() {
    var p1Count = p2Count = addOnY = 0;
    var start = 2;
    var yStart = 0;
    var numloops = 0;
    for (let i = yStart; i < CONNECT4_COLS; i++) {
        if (numloops == 2) {
            return;
        }
        if (start < CONNECT4_COLS) {
            start += 1;
            addOnY = 0;
        }
        if (start == CONNECT4_COLS && numloops < 2) {
            numloops += 1;
            start = 6;
            addOnY = numloops;
        }

        for (let j = start; j >= 0 && addOnY < CONNECT4_ROWS; j--) {
            let yVal = addOnY;
            let xVal = j;
            if (yVal < CONNECT4_ROWS) {
                addOnY++;
            }

            // console.log("check y: " + yVal + ", x: " + xVal)
            index = (".y" + yVal + " > ul > .x" + xVal)
            target = document.querySelector(index);
            if (target.classList.contains("player1")) {
                p1Count++;
                p2Count = 0;

                if (p1Count == 3) {
                    if (xVal > 0 && xVal < 6) {
                        if (yVal == yindex[xVal - 1]) {
                            doNotPut = (xVal - 1);
                            exception = true;
                        }
                        else if (yVal == yindex[xVal - 1] - 1) {
                            diagonalThree = true;
                            diagonalIndex = (xVal - 1);
                            // console.log(yVal + yindex[xVal - 1]);
                            // console.log("case1 1: block with " + (xVal - 1));
                        }
                        else if ((yVal - 4) == yindex[xVal + 3]) {
                            doNotPut = (xVal + 3);
                            exception = true;
                        }
                        else if ((yVal - 3) == yindex[xVal + 3]) {
                            diagonalThree = true;
                            diagonalIndex = (xVal + 3);
                            console.log("block");
                            // console.log("case 2: block with " + (xVal + 3));
                        }
                    }
                }

                if (p1Count == 4) {
                    target.classList.add("last_move");
                    playerWin(1);
                    return;
                }
            }
            else if (target.classList.contains("player2")) {
                p2Count++;
                p1Count = 0;
                // console.log("p2Count increased: (" + (CONNECT4_COLS-j-1) + ", " + i + ") " + p2Count);
                if (p2Count == 3) {
                    if (xVal > 0 && xVal < 6) {
                        if (yVal == yindex[xVal - 1] - 1) {
                            diagonalThreeAi = true;
                            diagonalIndexAi = (xVal - 1);
                            console.log(yVal + yindex[xVal - 1]);
                            // console.log("case1 1: end with " + (xVal - 1));
                        }
                        else if ((yVal - 3) == yindex[xVal + 3]) {
                            diagonalThreeAi = true;
                            diagonalIndexAi = (xVal + 3);
                            // console.log("case 2: end with " + (xVal + 3));
                        }
                    }
                }
                if (p2Count == 4) {
                    target.classList.add("last_move");
                    playerWin(2);
                    return;
                }
            }
            else {
                // console.log("reset");
                p1Count = p2Count = 0;
            }

        }
        p1Count = p2Count = 0;
    }
}

function checkTie() {
    const childNodes = connect4.childNodes;
    var tieCount = 0;
    var size = CONNECT4_COLS * CONNECT4_ROWS;
    childNodes.forEach(child => {
        child.childNodes.forEach(ul => {
            ul.childNodes.forEach(li => {
                if (li.classList.contains("player1") || li.classList.contains("player2")) {
                    tieCount++;
                }
                if (tieCount == size) {
                    playerWin("tie");
                }
            })
        })
    })
}
function playerWin(x) {
    var pName = "";
    if (x == "tie") {
        // alert("Tie!!");
        playerName.innerHTML = "Tie!!" + "<br> Press 'r' to restart";
    }
    else {
        if (!pvp && x == 2) {
            pName = "computer";
        }
        else if(!pvp && x == 1) {
            pName = "You";
        }
        else {
            pName = "Player " + x;
        }
        // alert(pName + " win!!");
        playerName.innerHTML = "Winner: " + pName;
    }
    play = false;
    pickline.style.display = 'none';
    restartButton.innerHTML = "Re-start";
    restartButton.style.display = 'flex';
    return;
    // removeListener();
}

function removeLastMove() {
    childNodes.forEach(child => {
        child.childNodes.forEach(ul => {
            ul.childNodes.forEach(li => {
                if (li.classList.contains("player1")) {
                    if(li.classList.contains("last_move")) {
                        li.classList.remove("last_move");
                        console.log("p1remove");
                    }
                }
                else if (li.classList.contains("player2")) {

                    if(li.classList.contains("last_move")) {
                        li.classList.remove("last_move");
                        console.log("p2remove");
                    }
                }
            })
        })
    })
}
function restart() {
    const childNodes = connect4.childNodes;
    childNodes.forEach(child => {
        child.childNodes.forEach(ul => {
            ul.childNodes.forEach(li => {
                if (li.classList.contains("player1")) {
                    li.classList.remove("player1");
                    console.log("player1 disks are removed");
                    if(li.classList.contains("last_move")) {
                        li.classList.remove("last_move");
                    }
                }
                else if (li.classList.contains("player2")) {
                    li.classList.remove("player2");
                    console.log("player2 disks are removed");
                    if(li.classList.contains("last_move")) {
                        li.classList.remove("last_move");
                    }
                }
            })
        })
    })
    pickline.style.display = "initial";
    playerName.innerHTML = "Player1's turn";
    yindex = [0, 0, 0, 0, 0, 0, 0];
    play = true;
    player1Turn = true;
    verticalThree = false;
    verticalThreeAi = false;
    first = true;
    diagonalThree = false;
    diagonalIndex = 0;
    diagonalThreeAi = false;
    horizontalThree = false;
    horizontalIndex = 0;
    doNotPut = 0;
    exception = false;
    verticalIndex = 0;
    verticalIndexAi = 0;
    playerIndex = 0;
    end = false;
    horizontalTwo = false;
    horizontalTwoIndex = 0;
    horizontalTwoAi = false;
    horizontalTwoIndexAi = 0;
    buttons.style.display = "flex";

}
restartButton.addEventListener("click", () => {
    restart();
    restartButton.style.display = "none";
    gameText.style.display = "none";
    // theme.play();
})
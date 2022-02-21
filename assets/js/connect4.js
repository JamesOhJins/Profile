connect4 = document.querySelector(".connect4 > ul");
pickline = document.querySelector(".pick_line");

player = document.querySelector("#player");
var CONNECT4_COLS = 7;
var CONNECT4_ROWS = 6;
var yindex = [0, 0, 0, 0, 0, 0, 0];
var play = true;
count = 0;
var player1Turn = true;
function init() {
    prependPickLine();
    for (let j = 0; j < CONNECT4_ROWS; j++) {
        prependNewLine();
    }
    addpicker();
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
function addpicker() {
    for (let j = 0; j < CONNECT4_COLS; j++) {
        let pickerIndex = document.querySelector('.x' + j + '.picker');

        pickerIndex.addEventListener("mouseover", function () {
            pickerIndex.style.backgroundColor = changeColor();
            // console.log("hovering on picker" + '.x' + j + '.picker');
        });

        pickerIndex.addEventListener("mouseout", function () {
            pickerIndex.style.backgroundColor = "rgba(187, 187, 187, 0.1)";
            // console.log("back to original styler" + '.x' + j + '.picker');
        });
        pickerIndex.addEventListener("click", function () {
            disk(j);
            pickerIndex.style.backgroundColor = changeColor();
        });
    }
}
function removeListener() {
    for (let j = 0; j < CONNECT4_COLS; j++) {
        let pickerIndex = document.querySelector('.x' + j + '.picker');

        pickerIndex.removeEventListener("mouseover", function () {
            pickerIndex.style.backgroundColor = changeColor();
            // console.log("hovering on picker" + '.x' + j + '.picker');
        });

        pickerIndex.removeEventListener("mouseout", function () {
            pickerIndex.style.backgroundColor = "rgba(187, 187, 187, 0.1)";
        });
        pickerIndex.removeEventListener("click", function () {
            disk(j);
            pickerIndex.style.backgroundColor = changeColor();
        });
    }
}
function changeColor() {
    var playerColor = "red";
    if (player1Turn) {
        playerColor = "red";
    }
    else {
        playerColor = "yellow";
    }
    return playerColor;
}
document.addEventListener("keydown", e => {
    switch (e.keyCode) {
        case 82:
            console.log("restarting");
            restart();
            break;
        // case 50:
        //     disk(5);
        //     break;
        // case 51:
        //     disk(4);
        //     break;
        // case 52:
        //     disk(3);
        //     break;
        // case 53:
        //     disk(2);
        //     break;
        // case 54:
        //     disk(1);
        //     break;
        // case 55:
        //     disk(0);
        //     break;
        default:
            console.log("out of index");
            break;
    }

})

function disk(x) {
    // console.log(yindex[x]);
    if (player1Turn && yindex[x] < CONNECT4_ROWS) {
        index = (".y" + yindex[x] + " > ul > .x" + x)
        target = document.querySelector(index);
        // const preview = document.querySelector(".preview > ul");
        target.classList.add("player1");
        console.log("diskclass is added for p1 at (" + (CONNECT4_COLS - x - 1) + ", " + yindex[x] + ")");
        player1Turn = false;
        yindex[x] += 1;
        player.innerHTML = "Player2's turn";
    }
    else if (!player1Turn && yindex[x] < CONNECT4_ROWS) {
        index = (".y" + yindex[x] + " > ul > .x" + x)
        target = document.querySelector(index);
        // const preview = document.querySelector(".preview > ul");
        target.classList.add("player2");
        console.log("diskclass is added for p2 at (" + (CONNECT4_COLS - x - 1) + ", " + yindex[x] + ")");
        player1Turn = true;
        yindex[x] += 1;
        player.innerHTML = "Player1's turn";
    }
    else {
        console.log("Line is already full");
    }
    checkFour();
}

function checkFour() {
    checkX();
    checkY();
    checkZAsc();
    checkZDsc();
    checkTie()
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
                // console.log("p1Count increased: (" + (CONNECT4_COLS-j-1) + ", " + i + ") " + p1Count);
                if (p1Count == 4) {
                    playerWin(1);
                    return;
                }
            }
            else if (target.classList.contains("player2")) {
                p2Count++;
                p1Count = 0;
                // console.log("p2Count increased: (" + (CONNECT4_COLS-j-1) + ", " + i + ") " + p2Count);
                if (p2Count == 4) {
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
        // console.log("y increase");
        for (let j = 0; j < CONNECT4_ROWS; j++) {
            index = (".y" + j + " > ul > .x" + i)
            // console.log("checking (" + (CONNECT4_COLS-i-1) + ", " + j + ")");
            target = document.querySelector(index);
            if (target.classList.contains("player1")) {
                p1Count++;
                p2Count = 0;
                // console.log("p1Count increased: (" + (CONNECT4_COLS-i-1) + ", " + j + ") " + p1Count);
                if (p1Count == 4) {
                    playerWin(1);
                    return;
                }
            }
            else if (target.classList.contains("player2")) {
                p2Count++;
                p1Count = 0;
                // console.log("p2Count increased: (" + (CONNECT4_COLS-i-1) + ", " + j + ") " + p2Count);
                if (p2Count == 4) {
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
    var p1Count = p2Count = addOnY = addOnX = 0;
    var start = 4;
    var yStart = 0;
    var numloops = 0;
    for (let i = yStart; i < CONNECT4_COLS; i++) {
        if (start > 0) {
            start -= 1;
            addOnY = 0;
        }
        if (start == 0 && numloops < 2) {
            numloops += 1;
            addOnY = numloops;
        }
        for (let j = start; j < CONNECT4_COLS && addOnY < CONNECT4_ROWS; j++) {
            let yVal = addOnY;
            let xVal = j + addOnX
            if (yVal < CONNECT4_ROWS) {
                addOnY++;
            }
            else {
                addOnX++;
            }
            index = (".y" + yVal + " > ul > .x" + xVal)
            target = document.querySelector(index);
            if (target.classList.contains("player1")) {
                p1Count++;
                p2Count = 0;
                if (p1Count == 4) {
                    playerWin(1);
                    return;
                }
            }
            else if (target.classList.contains("player2")) {
                p2Count++;
                p1Count = 0;
                if (p2Count == 4) {
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
                console.log("p1:" + p1Count);
                if (p1Count == 4) {
                    playerWin(1);
                    return;
                }
            }
            else if (target.classList.contains("player2")) {
                p2Count++;
                p1Count = 0;
                console.log("p2:" + p2Count);
                // console.log("p2Count increased: (" + (CONNECT4_COLS-j-1) + ", " + i + ") " + p2Count);
                if (p2Count == 4) {
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
                    tieCount ++;
                }
                if (tieCount == size) {
                    playerWin("tie");
                }
            })
        })
    })
}
function playerWin(x) {
    if (x == "tie"){
        alert("Tie!!");
        player.innerHTML = "Tie!!" + "<br> Press 'r' to restart";
    }
    else {
    var pName = "Player " + x;
    alert(pName + " win!!");
    player.innerHTML = "Winner: " + pName + "<br> Press 'r' to restart";
    }
    play = false;
    pickline.style.display = 'none';
    // removeListener();
}


function restart() {
    const childNodes = connect4.childNodes;
    childNodes.forEach(child => {
        child.childNodes.forEach(ul => {
            ul.childNodes.forEach(li => {
                if (li.classList.contains("player1")) {
                    li.classList.remove("player1");
                    console.log("player1 disks are removed");
                }
                else if (li.classList.contains("player2")) {
                    li.classList.remove("player2");
                    console.log("player2 disks are removed");
                }
            })
        })
    })
    pickline.style.display = "initial";
    player.innerHtml = "Player1's turn";
    yindex = [0, 0, 0, 0, 0, 0, 0];
    play = true;
}
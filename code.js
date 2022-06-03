let x = document.querySelector(".xPlayer");
let o = document.querySelector(".oPlayer");

x.classList.add("circle");

let boxs = Array.from(document.querySelectorAll(".board div"));

let xScore = document.querySelector(".xPlayer span");
let oScore = document.querySelector(".oPlayer span");

let winning = document.querySelector(".winner");
let winningSent = document.querySelector(".winner p");

let replay = document.querySelector(".winner button");

// variable to count if we clicked all the boxs and nothing, means a drow
let count = 0;
boxs.forEach((b) => {
    b.onclick = function (e) {
        count++;
        // when you click on target, stop it from getting clicked again
        e.currentTarget.style.cssText = "pointer-events: none";
        // if the circle player got his TransformStreamDefaultController, do:
        if (x.classList.contains("circle")) {
            let span = document.createElement("span");
            span.innerHTML = '<i class="fas fa-times"></i>';
            e.currentTarget.append(span);
            // change the turn to next player
            x.classList.remove("circle");
            o.classList.add("circle");

            e.currentTarget.classList.add("x");
            // check all the winning possiblities
            if (
                checkWinX(boxs[0], boxs[1], boxs[2]) ||
                checkWinX(boxs[3], boxs[4], boxs[5]) ||
                checkWinX(boxs[6], boxs[7], boxs[8]) ||
                checkWinX(boxs[0], boxs[3], boxs[6]) ||
                checkWinX(boxs[1], boxs[4], boxs[7]) ||
                checkWinX(boxs[2], boxs[5], boxs[8]) ||
                checkWinX(boxs[0], boxs[4], boxs[8]) ||
                checkWinX(boxs[2], boxs[4], boxs[6])
            ) {
                // add point to the score
                xScore.textContent = +xScore.textContent + 1;
                // clean everything and start again (recovering hahaha)
                boxs.forEach((box) => {
                    box.style.cssText = "pointer-events: none";
                    setTimeout(() => {
                        box.textContent = "";
                        box.classList.remove("x", "o");
                        box.style.cssText = "pointer-events: auto";
                    }, 1000);
                });
                count = 0;
            }
        } else if (o.classList.contains("circle")) {
            let span = document.createElement("span");
            span.innerHTML = '<i class="far fa-circle"></i>';
            e.currentTarget.append(span);
            o.classList.remove("circle");
            x.classList.add("circle");

            e.currentTarget.classList.add("o");

            if (
                checkWinO(boxs[0], boxs[1], boxs[2]) ||
                checkWinO(boxs[3], boxs[4], boxs[5]) ||
                checkWinO(boxs[6], boxs[7], boxs[8]) ||
                checkWinO(boxs[0], boxs[3], boxs[6]) ||
                checkWinO(boxs[1], boxs[4], boxs[7]) ||
                checkWinO(boxs[2], boxs[5], boxs[8]) ||
                checkWinO(boxs[0], boxs[4], boxs[8]) ||
                checkWinO(boxs[2], boxs[4], boxs[6])
            ) {
                oScore.textContent = +oScore.textContent + 1;
                boxs.forEach((box) => {
                    box.style.cssText = "pointer-events: none";
                    setTimeout(() => {
                        box.textContent = "";
                        box.classList.remove("x", "o");
                        box.style.cssText = "pointer-events: auto";
                    }, 1000);
                });
                count = 0;
            }
        }
        // if the player x won do:
        if (xScore.textContent === "3") {
            // display the winning div with the same bg as the winner
            winning.style.cssText = "display: block; background-color: red";
            replay.onclick = () => {
                window.location.reload();
            };
        } else if (oScore.textContent === "3") {
            // here we change the default sentence
            winningSent.textContent = "blue player won 🎉";
            winning.style.cssText = "display: block; background-color: blue";
            replay.onclick = () => {
                window.location.reload();
            };
        }
        if (count === 9) {
            boxs.forEach((box) => {
                box.style.cssText = "pointer-events: none";
                setTimeout(() => {
                    box.textContent = "";
                    box.classList.remove("x", "o");
                    box.style.cssText = "pointer-events: auto";
                }, 1000);
            });
            count = 0;
        }
    };
});
// check winning functions
function checkWinX(div1, div2, div3) {
    let divs = [div1, div2, div3];
    return divs.every((div) => div.classList.contains("x")) ? true : false;
}
function checkWinO(div1, div2, div3) {
    let divs = [div1, div2, div3];
    return divs.every((div) => div.classList.contains("o")) ? true : false;
}

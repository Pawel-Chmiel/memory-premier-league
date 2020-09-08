const clubLogos = ["ars", "ars", "che", "che",
    "eve", "eve", "lei", "lei", "liv", "liv", "mci", "mci", "mun", "mun",
    "shu", "shu", "sou", "sou", "wol", "wol"];
const startGameButton = document.querySelector(".game__start");

let tiles = [...document.querySelectorAll(".game__tile-item")];

const startTime = new Date().getTime();

let activeTile = null;
const activeTilesPair = [];
const gamePairs = tiles.length / 2;
let gameResult = 0;


const clickSingleTile = function () {
    activeTile = this;
    activeTile.classList.remove("game__tile-item--hidden");
    if (activeTilesPair.length === 0) {
        activeTilesPair[0] = this;
        return;
    } else {
        tiles.forEach(tile => {
            tile.removeEventListener("click", clickSingleTile);
        })
        activeTilesPair[1] = this;
        setTimeout(() => {
            if (activeTilesPair[0].className === activeTilesPair[1].className) {
                activeTilesPair.forEach(active => {
                    active.classList.add("game__tile-item--off");
                });
                gameResult++;
                if (gameResult === gamePairs) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000;
                    alert(`Wygrałeś! Twój czas to ${gameTime} sekund`);
                    location.reload();
                };
            } else {
                activeTilesPair.forEach(active => {
                    active.classList.add("game__tile-item--hidden");
                })
            }
            activeTile = null;
            activeTilesPair.length = 0;
            tiles.forEach(tile => {
                tile.addEventListener("click", clickSingleTile);
            })
        }, 500);
    }
};

const checkGameResult = () => {

};


const init = () => {
    tiles.forEach(tile => {
        const position = Math.floor(Math.random() * clubLogos.length);
        console.log(position);
        tile.classList.add(clubLogos[position]);
        clubLogos.splice(position, 1);
    })
    setTimeout(() => {
        tiles.forEach(tile => {
            tile.classList.add("game__tile-item--hidden");
            tile.addEventListener("click", clickSingleTile);
        });
    }, 2000);
};

const startGame = () => {
    init();
};

startGameButton.addEventListener("click", () => startGame());



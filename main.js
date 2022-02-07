
// Tableau initial représentant les lignes et colones du jeu
const grid = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

// Tableau avec des valeurs aléatoires
const gridResult = generateGrid();

// Représente les carte retournées
let oldSelection = [];

// Variable pour compter le nombre de carte retourné
let nbCard = 0;

// Variable pour compter le nombre de paire trouvé
let nbPair = 0;

// Booléen qui permet un nouveau clic ou non
let readyToClick = false;

// Timer
let second = 0;
let minute = 0;
const timer = document.querySelector(".timer");
let interval;

// Bouton Start
const buttonStart = document.querySelector(".buttonStart");
buttonStart.addEventListener("click", startGame)


// ------------------
// Fonction qui lance la partie
// ------------------

function startGame() {
  readyToClick = true;
  startTimer();
  progressBar();
}


// ------------------
// Fonction permettant d'afficher la grille du jeu
// ------------------

function boardGame() {
  // Cible l'id présents dans le html
  const divResult = document.querySelector("#result");

  // Je crée une variable représentant la grille de jeu
  let txt = "";

  // Je parcours chaque elements du tableau (ici 4)
  for (var i = 0; i < grid.length; i++) {
    // Pour chaque ligne j'ajoute une div
    txt += "<div>";
    // Je parcours chaque colones de chaque lignes (ici 8)
    for (var j = 0; j < grid[i].length; j++) {
      // Si la valeur est autre que 0 alors j'affiche l'image correspondante
      if (grid[i][j] != 0) {
        txt += "<img src='" + getImage(grid[i][j]) + "'class='image'>";
        // Sinon j'affiche un bouton, avec la fonction check qui permet de vérifier les cartes
      } else {
        txt += "<button class='card' onClick='check(\"" + i + "-" + j + "\")'></button>";
      }
    }
    txt += "</div>";
  }
  divResult.innerHTML = txt;
}
boardGame();


// ------------------
// Fonction permettant d'afficher les images en fonction du numero
// ------------------

function getImage(valeur) {
  let imgSrc = "img/";

  switch (valeur) {
    case 1: imgSrc += "apricot.png";
      break;
    case 2: imgSrc += "banana.png";
      break;
    case 3: imgSrc += "cherry.png";
      break;
    case 4: imgSrc += "grape.png";
      break;
    case 5: imgSrc += "greenapple.png";
      break;
    case 6: imgSrc += "greenlemon.png";
      break;
    case 7: imgSrc += "grenade.png";
      break;
    case 8: imgSrc += "lemon.png";
      break;
    case 9: imgSrc += "mango.png";
      break;
    case 10: imgSrc += "orange.png";
      break;
    case 11: imgSrc += "peach.png";
      break;
    case 12: imgSrc += "plum.png";
      break;
    case 13: imgSrc += "raspberry.png";
      break;
    case 14: imgSrc += "redapple.png";
      break;
    case 15: imgSrc += "strawberry.png";
      break;
    case 16: imgSrc += "watermelon.png";
      break;
    default: console.log("cas non pris en compte")
  }
  return imgSrc;
}


// ------------------
// Vérification des cartes retournées
// ------------------

function check(button) {

  // Si le booléen est vrai le joueur peut cliquer à nouveau
  if (readyToClick) {
    nbCard++;

    // Grace à substr je récupère 1 caractère à partir de l'index 0
    let line = button.substr(0, 1);
    let colomun = button.substr(2, 1);

    // Sur le clique j'affiche l'image du tableau généré
    grid[line][colomun] = gridResult[line][colomun];
    boardGame();

    // Si le joueur à cliqué sur 2 cartes
    if (nbCard > 1) {
      // Il ne peut plus cliquer sur d'autres cartes
      readyToClick = false;
      // Le timeout affiche les cartes non identique pendant 750ms.
      setTimeout(() => {
        // Vérification des deux cartes, si elle ne sont pas identiques on les retournent
        if (grid[line][colomun] !== gridResult[oldSelection[0]][oldSelection[1]]) {
          grid[line][colomun] = 0;
          grid[oldSelection[0]][oldSelection[1]] = 0;
        }
        boardGame();
        readyToClick = true;
        nbCard = 0;
        oldSelection = [line, colomun];
      }, 750)
      // Si les deux cartes sont identique ont incrémente le compteur des pairs
      if (grid[line][colomun] === gridResult[oldSelection[0]][oldSelection[1]]) {
        nbPair++;
        // Si toutes les pairs sont trouvées on affiche le message
        if (nbPair === 16) {
          sendChrono(minute, second);
          alert("Bravo! Tu a fini la partie en " + minute + "minute et " + second + " secondes");
          window.location.reload();
        }
      }
    } else {
      oldSelection = [line, colomun];
    }
  }
}


// ------------------
// Génération aléatoire des images 
// ------------------

function generateGrid() {
  let tab = [];
  let nbImagePosition = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (var i = 0; i < 4; i++) {
    let line = [];
    for (var j = 0; j < 8; j++) {
      let endGenerate = false;
      while (!endGenerate) {
        let randomImage = Math.floor(Math.random() * 16);
        if (nbImagePosition[randomImage] < 2) {
          line.push(randomImage + 1);
          nbImagePosition[randomImage]++;
          endGenerate = true;
        }
      }
    }
    tab.push(line);
  }
  return tab;
}


// ------------------
// Barre de progression et message si partie perdue
// ------------------

function progressBar() {
  // Cible l'id présents dans le html
  const progress = document.querySelector('#progress');

  for (var i = 0; i <= 100; i++) {
    setTimeout((function (arg) {
      return function () {
        progress.value = arg;
        if (nbPair < 16 && progress.value === 100) {
          alert("Dommage, tu n'a pas été assez rapide. Essaie encore!")
          window.location.reload();
        }
      }
    })(i), i * 1200);
  }
}


// ------------------
// Timer
// ------------------

function startTimer() {
  interval = setInterval(() => {
    timer.innerHTML = minute + " min " + second + " s";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}


// --------------------------------
// REQUETE RECUPERATION DES SCORES
// --------------------------------

const ul = document.querySelector("#score");

let fetchOptions = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  headers: { 'Content-Type': 'application/json' }
};

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

fetch('http://localhost:8080/score', fetchOptions)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw Error(`Request rejected with status ${response.status}`);
    }
  })
  .then(function (responseJson) {
    console.log(responseJson);

    let scores = responseJson;
    return scores.map(function (score) {
      console.log(score);

      let li = createNode('li');
      li.innerHTML = `${score.chrono} s`;
      append(ul, li);
    })
  })
  .catch(function (error) {
    console.log(error);
  });



// --------------------------------
// REQUETE ENVOI DU SCORE
// --------------------------------
// WIP

function sendChrono() {
  let data = {
    chrono: minute + '.' + second
  }

  let fetchOptions = {
    method: 'POST',
    mode: 'cors',
    body: data,
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' }
  };

  fetch('http://localhost:8080/score/add', fetchOptions)
    .then(function () {
      console.log("OK")
    })
    .then(function () {
    })
    .catch(function (error) {
      console.log(error);
    });
}
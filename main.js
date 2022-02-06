// Cible les id présents dans le html
const divResult = document.querySelector("#result");
const progress = document.querySelector('#progress');

// Tableau initial représentant les lignes et colones du jeu
var grid = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

// Tableau avec des valeurs aléatoires
var gridResult = generateGrid();

// Tableau vide pour représenter la première carte retournée
var oldSelection = [];

// Variable pour compter le nombre de carte retourné
var nbCard = 0;

// Variable pour compter le nombre de paire trouvé
var nbPair = 0;

// Booléen qui permet un nouveau clic ou non
var readyToClick = false;

// Timer
var second = 0;
var minute = 0;
var hour = 0;
var timer = document.querySelector(".timer");
var interval;

// Bouton Start
var buttonStart = document.querySelector(".buttonStart");
buttonStart.addEventListener("click", startGame)


// ------------------
// Fonction Lance la partie
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
  // Je crée une variable représentant la grille de jeu
  var txt = "";

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
  var imgSrc = "img/";

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
    var line = button.substr(0, 1);
    var colomun = button.substr(2, 1);

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
  var tab = [];
  var nbImagePosition = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (var i = 0; i < 4; i++) {
    var line = [];
    for (var j = 0; j < 8; j++) {
      var endGenerate = false;
      while (!endGenerate) {
        var randomImage = Math.floor(Math.random() * 16);
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
// TODO DOING 

// Option de la requete HTTP
function getScore() {

  let fetchOptions = {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache'
  };

  fetch('http://localhost:8080/score', fetchOptions)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then(function (responseJson) {
      console.log(responseJson);
    })
    .catch(function (error) {
      console.log(error);

    });

}
getScore();


// --------------------------------
// REQUETE ENVOI DU SCORE
// --------------------------------
// TODO
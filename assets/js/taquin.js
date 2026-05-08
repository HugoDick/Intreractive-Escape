// On crée le tableau qui contient l'ordre des cases
// null représente la case vide
var cases = [1, 2, 3, 4, 5, 6, 7, 8, null];

// Cette fonction affiche le plateau dans le HTML
function dessinerJeu() {
    var plateau = document.getElementById('board');
    plateau.innerHTML = ""; // On vide le plateau avant de le redessiner (car la fonction serra appelée à chaque coup)

    for (var i = 0; i < cases.length; i++) {
        var div = document.createElement('div');
        div.className = 'tile';
        
        if (cases[i] === null) {
            // Si la case est vide, on lui met la classe empty
            div.className = 'tile empty';
        } else {
            // Calcul pour afficher le bon morceau de l'image (taquin.png)
            var valeur = cases[i] - 1; // On décale de 1 pour commencer à 0
            var x = (valeur % 3) * 100; // Trouve la colonne 
            var y = Math.floor(valeur / 3) * 100; // Trouve la ligne 
            
            // On applique le décalage de l'image de fond afin d'afficher qu'une partie de l'image dans la case
            div.style.backgroundPosition = "-" + x + "px -" + y + "px";

            // On affiche la position de la case dans le plateau pour aider 
            div.innerHTML = cases[i]; 
            
            // On rend la case cliquable
            div.setAttribute('onclick', 'deplacer(' + i + ')');
        }
        plateau.appendChild(div);
    }
}

// Fonction pour déplacer une case
function deplacer(index) {
    var indexVide = -1;
    // On cherche où se trouve le vide dans le tableau
    for (var i = 0; i < cases.length; i++) {
        if (cases[i] === null) {
            indexVide = i; 
        }
    }

    // On transforme l'index en coordonnées (ligne colonne)
    var ligneClic = Math.floor(index / 3);
    var colClic = index % 3;
    var ligneVide = Math.floor(indexVide / 3);
    var colVide = indexVide % 3;

    // On calcule la distance entre les deux cases
    var diffLigne = Math.abs(ligneClic - ligneVide);
    var diffCol = Math.abs(colClic - colVide);

    // Si elles sont collées on les échange
    if ((diffLigne === 1 && diffCol === 0) || (diffLigne === 0 && diffCol === 1)) {
        var temp = cases[index]; // Variable temporaire pour l'échange 
        cases[index] = cases[indexVide];
        cases[indexVide] = temp;
        
        dessinerJeu(); // On met à jour l'affichage
        verifierVictoire(); // On vérifie si le joueur a gagné
    }
}

// Mélange le jeu 
function melanger() {
    var nbMouvements = 0;
    while (nbMouvements < 50) {
        var indexVide = -1;
        for (var i = 0; i < cases.length; i++) {
            if (cases[i] === null) { indexVide = i; }
        }

        var voisins = [];
        var directions = [indexVide - 3, indexVide + 3, indexVide - 1, indexVide + 1];
        
        for (var j = 0; j < directions.length; j++) {
            var cible = directions[j];
            if (cible >= 0 && cible < 9) {
                // On vérifie que le voisin est bien adjacent 
                var lV = Math.floor(indexVide / 3);
                var lC = Math.floor(cible / 3);
                var cV = indexVide % 3;
                var cC = cible % 3;
                if (Math.abs(lV - lC) + Math.abs(cV - cC) === 1) {
                    voisins.push(cible);
                }
            }
        }
        // On choisit un voisin au hasard et on simule un déplacement afin de garantir que chaque partie est résolvable
        var hasard = Math.floor(Math.random() * voisins.length);
        var indexChoisi = voisins[hasard];
        var temp = cases[indexChoisi];
        cases[indexChoisi] = cases[indexVide];
        cases[indexVide] = temp;
        nbMouvements++;
    }
}

// Vérifie si la partie est gagnée
function verifierVictoire() {
    var gagne = true;
    var solution = [1, 2, 3, 4, 5, 6, 7, 8, null];
    
    for (var i = 0; i < cases.length; i++) {
        if (cases[i] !== solution[i]) { gagne = false; }
    }

    if (gagne === true) {
        var plateau = document.getElementById('board');
        var ecranVictoire = document.getElementById('victory-screen');
        
        // Réduction et déplacement du plateau
        plateau.classList.add('mini');
        
        // On fait apparaître le texte progressivement
        ecranVictoire.style.opacity = "0";
        ecranVictoire.style.display = "block";
        ecranVictoire.style.transition = "opacity 1s ease-in";
        
        setTimeout(function() {ecranVictoire.style.opacity = "1";}, 100);

        // On remplit la case vide pour afficher l'image en entière
        const emptyTile = document.querySelector('.empty');
        if(emptyTile) {
            emptyTile.style.backgroundImage = "url('assets/img/taquin.png')";
            emptyTile.style.backgroundPosition = "-200px -200px";
            emptyTile.style.backgroundSize = "300px 300px";
        }
    }
}

// Lancement du jeu
melanger();
dessinerJeu();
const codeBon = "1320";

function zoomCadenas() {
    const container = document.getElementById('metro-container');
    const uiCode = document.getElementById('ui-code');
    const btnRetour = document.getElementById('bouton-retour');
    const zone = document.getElementById('cadenas-zone');

    container.classList.add('zoomed');
    zone.style.display = "none";

    setTimeout(() => {uiCode.style.display = "block"; btnRetour.style.display = "flex"; }, 1500);
}

function dezoom() {
    const container = document.getElementById('metro-container');
    const uiCode = document.getElementById('ui-code');
    const btnRetour = document.getElementById('bouton-retour');
    const zone = document.getElementById('cadenas-zone');

    container.classList.remove('zoomed');
    uiCode.style.display = "none";
    btnRetour.style.display = "none";
    
    setTimeout(() => {zone.style.display = "block";}, 1500);
}

function verifierCode() {
    const input = document.getElementById('code-input');
    const victoryScreen = document.getElementById('victory-screen');
    const uiCode = document.getElementById('ui-code');
    const container = document.getElementById('metro-container');
    const btnRetour = document.getElementById('bouton-retour');
    const btnSuivant = document.getElementById('btn-suivant');

    if (input.value === codeBon) {
        uiCode.style.display = "none";
        btnRetour.style.display = "none";
        container.classList.remove('zoomed');
        
        setTimeout(() => {victoryScreen.style.display = "block"; btnSuivant.style.display = "flex";}, 1000);
        document.querySelector('.btn-fixe-haut-droite').style.display = 'none';
        document.querySelector('.btn-fixe-gauche').style.display = 'none';
    } else {
        alert("Code incorrect !"); // Pop up
        input.value = "";
    }
}

function afficherIndice() {
    alert("Cliquez sur le cadenas pour entrer le code. Regardez attentivement chaque fenêtre, le trajet semble plus chargé dans certaines voitures que dans d'autres");
}
function verifierReponse() {
    const input = document.getElementById('reponse-input');
    const reponse = input.value.toLowerCase().trim();
    const victoryScreen = document.getElementById('victory-screen');
    const inputZone = document.getElementById('input-zone-container');
    const btnSuivant = document.getElementById('btn-suivant');

    if (reponse === "entretient") {
        inputZone.style.display = "none";
        victoryScreen.style.display = "block";
        btnSuivant.style.display = "flex";

        setTimeout(function() {
            victoryScreen.style.opacity = "1";
            btnSuivant.style.opacity = "1";
        }, 100);
    } else {
        alert("Ce n'est pas la bonne réponse...");
        input.value = "";
    }
}
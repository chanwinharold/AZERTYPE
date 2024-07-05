function afficheurListeTexte(elementToDisplay) {
    let zoneAffichage = document.getElementById("zoneAffichage")
    return zoneAffichage.innerHTML = `${elementToDisplay}`
}

function afficheurScore(score, total) {
    let zoneScore = document.querySelector("#zoneScore span")
    return zoneScore.innerHTML = `${score} / ${total}`
}

function lancerJeu() {
    let i = 0, compteur = 0
    let btnValider = document.getElementById("btnValider")

    afficheurListeTexte(mesMots[i])
    afficheurScore(compteur, i)
    btnValider.addEventListener("click", () => {
        let entrerTexte = document.getElementById("entrerTexte")
        if(entrerTexte.value === mesMots[i]) {
            compteur++;
        }
        entrerTexte.value = ""
        i++
        afficheurScore(compteur, i)
        if(mesMots[i]) {
            afficheurListeTexte(mesMots[i])
        } else {
            afficheurListeTexte("Fin du Jeu!")
            btnValider.disabled = true
        }
    })
}
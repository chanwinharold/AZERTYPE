function afficheurListeTexte(elementToDisplay) {
    let zoneAffichage = document.getElementById("zoneAffichage")
    return zoneAffichage.innerHTML = `${elementToDisplay}`
}

function afficheurScore(score, total) {
    let zoneScore = document.querySelector("#zoneScore span")
    return zoneScore.innerHTML = `${score} / ${total}`
}

function afficherEmail(nom, email, score) {
    location.href = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
}

function lancerJeu() {
    let i = 0, compteur = 0, ListeProposition
    let btnValider = document.getElementById("btnValider")
    let btnRadio = document.querySelectorAll('input[name="choixMotsOuPhrases"]')

    btnRadio[0].addEventListener("click", () => {
        if(btnRadio[0].checked) {
            ListeProposition = mesMots
            afficheurListeTexte(ListeProposition[i])
        }
    })
    btnRadio[1].addEventListener("click", () => {
        if(btnRadio[1].checked) {
            ListeProposition = mesPhrases
            afficheurListeTexte(ListeProposition[i])
        }
    })

    afficheurScore(compteur, i)
    btnValider.addEventListener("click", () => {
        let entrerTexte = document.getElementById("entrerTexte")
        if(entrerTexte.value === ListeProposition[i]) {
            compteur++;
        }
        entrerTexte.value = ""
        i++
        afficheurScore(compteur, i)
        if(ListeProposition[i]) {
            afficheurListeTexte(ListeProposition[i])
        } else {
            afficheurListeTexte("Fin du Jeu!")
            btnValider.disabled = true
        }
    })

    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let nom = document.getElementById("nom")
        let email = document.getElementById("email")
        let scorePartager = afficheurScore(compteur, i)
        afficherEmail(nom, email, scorePartager)
    })
}
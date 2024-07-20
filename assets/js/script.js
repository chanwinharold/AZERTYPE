function recupererNomJoueur() {
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        try {
            let btnValiderPlayerName = document.getElementById("btnValiderPlayerName")
            btnValiderPlayerName.addEventListener("click", () => {
                let nomJoueur = document.getElementById("nomJoueur").value
                localStorage.setItem("nomJoueur", nomJoueur)
            })
        } catch {}
    })
}

function pageSuivante() {
    let btnVersMain = document.getElementById("btnVersMain")
    btnVersMain.addEventListener("click", () => {
        window.location.href = "main.html";
    })
}

function afficherNomJoueur() {
    document.addEventListener("DOMContentLoaded", () => {
        let nomDuJoueur = localStorage.getItem('nomJoueur');
        let zoneAffichageNomJoueur = document.querySelector("p span")
        if (nomDuJoueur) {
            zoneAffichageNomJoueur.textContent = nomDuJoueur
        } else {
            zoneAffichageNomJoueur.innerHTML = `(pseudo)`;
        }
    })
}

function afficheurListeTexte(elementToDisplay) {
    let zoneAffichage = document.getElementById("zoneAffichage")
    return zoneAffichage.innerHTML = `${elementToDisplay}`
}

function afficheurScore(score, total) {
    let zoneScore = document.querySelector("#zoneScore span")
    return zoneScore.innerHTML = `${score} / ${total}`
}

function verifierNom(nom) {
    let regex = new RegExp("^([A-Za-z0-9]{2,})$");
    let testNom = regex.test(nom)
    if(testNom === false) {
        try {
            alert("Veuillez bien renseigner ce champ")
        } catch {}
    } else
        return true
}

function verifierEmail(email) {
    let regex = new RegExp("^[A-Za-z0-9]+@[a-z]+[0-9]*\.+[a-z]+$");
    let testEmail = regex.test(email)
    if(testEmail === false) {
        try {
            alert("Veuillez bien renseigner ce champ")
        } catch {}
    } else
        return true
}

function envoyerEmail(score) {
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let nom = document.getElementById("nom")
        let email = document.getElementById("email")

        let valeurNom =nom.value
        let valeurEmail = email.value

        verifierNom(valeurNom)
        verifierEmail(valeurEmail)

        if (verifierNom(valeurNom) && verifierEmail(valeurEmail)) {
            location.href = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${valeurNom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
        }
    })
}

function lancerJeu() {
    recupererNomJoueur()
    afficherNomJoueur()

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
    let scorePartager = afficheurScore(compteur, i)

    //Puis, on procède à l'envoi
    envoyerEmail(scorePartager)
}
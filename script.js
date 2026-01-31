console.log("Hello world");

let blocimg ="";
let numCase = 0;
console.log(numCase)

//METHODE 1

//imgs.forEach(function (img){
   // console.log("image : ",img)
   // blocimg= document.querySelector('.liste-images').innerHTML= blocimg+'<section><h2><em>' + img +'</em></h2></section>' + '<div>' + descriptionsImages[numCase] + '</div>'
   // numCase = numCase + 1
   // console.log(numCase)
//})

//data.forEach(function (card){
    //console.log("image : ",card)
    //blocimg= document.querySelector('.liste-images').innerHTML= blocimg+ "<section class='background'><h2>"+ data//[numCase]["titre"] + "</h2>" + "" + "<img src='" + data[numCase]["photo"] +"' class = 'image-cliquable'>" + "<p>" + data[numCase]["description"] + "</p>"
    //numCase = numCase + 1
    //console.log(numCase)
//})


//methode finale

// On attend que le document HTML soit chargé 
document.addEventListener("DOMContentLoaded", function () {

    // On lance une requête pour récupérer le fichier JSON
    fetch("images.json")
        .then(function (response) {
            // On transforme la réponse brute du serveur en objet JSON utilisable
            return response.json();
        })
        .then(function (data) {
            // On affiche les données reçues dans la console (pour vérifier le contenu)
            console.log(data);

            // On appelle les deux fonctions principales une fois les données reçues
            creerGalerie(data); // Génère les éléments HTML
            activerPopup();     // Prépare les clics sur les images
        });
});

// Fonction qui construit la structure HTML de chaque image
function creerGalerie(data) {
    // On sélectionne le parent ou on va injecter le contenu
    let container = document.querySelector(".liste-images");

    // On parcourt chaque objet présent dans le tableau "data"
    data.forEach(function (element) {

        // 1. Création de l'enveloppe <section>
        let section = document.createElement("section");
        section.classList.add("background");

        // 2. Création de l'image avec sa source et son texte alternatif
        let img = document.createElement("img");
        img.src = element.photo; 
        img.alt = "popup de " + element.titre1;
        img.classList.add("image-cliquable");

        // 3. Création du titre principal
        let titre = document.createElement("h3");
        titre.textContent = element.titre1;

        // 4. Création du paragraphe de description
        let description = document.createElement("p");
        description.textContent = element.description;

        // on met les éléments créés dans la section
        section.appendChild(img);
        section.appendChild(titre);
        section.appendChild(description);

        // On injecte la section terminée dans le conteneur principal du site
        container.appendChild(section);
    });
}

// Fonction qui gère l'ouverture et la fermeture du popup
function activerPopup() {
    // On sélectionne tous les éléments nécessaires au fonctionnement du popup
    let imagesCliquables = document.querySelectorAll(".image-cliquable");
    let popup = document.querySelector(".popup");
    let fermerFenetre = popup.querySelector(".cache-fenetre");
    let imagePopup = popup.querySelector("img");

    // On ajoute un écouteur de clic sur chaque image de la lite-image
    imagesCliquables.forEach(function (image) {
        image.addEventListener("click", function () {
            // On change l'URL de l'image de la popup par celle de la petite cliquée
            imagePopup.src = image.src;

            // On modifie les classes CSS pour rendre le popup visible
            popup.classList.add("popup-visible");
            popup.classList.remove("popup-invisible");
        });
    });

    // On écoute le clic sur le bouton de fermeture 
    fermerFenetre.addEventListener("click", function () {
        // On remet le popup en mode invisible
        popup.classList.add("popup-invisible");
        popup.classList.remove("popup-visible");
    });
}


// Séance 5 Dév’ web - Données d’un formulaire


// Sélection éléments du formulaire
let inputTitre = document.getElementById("titre"); // L'id créé à la Q1
let inputImage = document.getElementById("image-label");
let textareaDescription = document.getElementById("description-label");

// Sélection zones de l'aperçu (affichage)
let apercuImage = document.getElementById("apercu-image");
let apercuDescription = document.getElementById("apercu-description");
let apercuTitre = document.getElementById("apercu-titre");

inputTitre.addEventListener("keyup", function () {
    // On récupère la valeur saisie
    let valeurSaisie = inputTitre.value;
    
    // On l'affiche dans la console 
    console.log("Titre saisi : " + valeurSaisie);
    
    // On remplit l'élément h3 de l'aperçu 
    apercuTitre.textContent = valeurSaisie;
});

// Aperçu de la description 
textareaDescription.addEventListener("keyup", function () {
    apercuDescription.textContent = textareaDescription.value;
});

// Aperçu de l'image 
inputImage.addEventListener("keyup", function () {
    apercuImage.src = inputImage.value;
});

// --- SECTION ENVOI FORMULAIRE ---

// 1. SÉLECTION D'ÉLÉMENT ET ÉCOUTEUR D'ÉVÉNEMENT
// Cible le nœud du DOM correspondant au bouton
let boutonEnvoi = document.getElementById("bouton-envoi");

// Attache un gestionnaire d'événement pour intercepter le clic
boutonEnvoi.addEventListener("click", function (event) {
    
    // 2. INTERRUPTION DU COMPORTEMENT PAR DÉFAUT
    // Neutralise la soumission native du formulaire (évite le rechargement de page)
    event.preventDefault();

    // 3. EXTRACTION DES DONNÉES (ACCÈS AU DOM)
    // Récupération des références vers les objets HTMLInput et HTMLLabel
    let champTitre = document.getElementById("titre");
    let champDescription = document.getElementById("description-label");
    let champURL = document.getElementById("image-label");

    // Identifiant d'authentification pour l'API
    let monLogin = "skirlocatanzar"; 
    
    // 4. SÉRIALISATION DES DONNÉES
    // Concaténation des valeurs pour former une chaîne de caractères unique
    let messageComplet = "Titre: " + champTitre.value + 
                         " | Desc: " + champDescription.value + 
                         " | URL: " + champURL.value;

    // 5. CONSTRUCTION DE L'URL ET ENCODAGE
    // Forgeage de l'URL avec "Query String" (paramètres de requête)
    // encodeURIComponent garantit la conformité de la chaîne aux normes RFC (échappement des caractères spéciaux)
    let urlVisitee = "https://gambette.butmmi.o2switch.site/api.php" + 
                     "?format=json" + 
                     "&login=" + monLogin + 
                     "&message=" + encodeURIComponent(messageComplet) +
                     "&email=eulalie.skirlocatanzaro@gmail.com";

    console.log("Tentative d'envoi vers : " + urlVisitee);

    // 6. REQUÊTE HTTP ASYNCHRONE (FETCH)
    // Initialise une requête GET. Fetch renvoie une Promesse (Promise)
    fetch(urlVisitee).then(function(response) {
        
        // 7. DÉSÉRIALISATION DE LA RÉPONSE
        // Parse le corps de la réponse HTTP pour le convertir en objet JavaScript (JSON)
        response.json().then(function(data){
            console.log("Réponse reçue de l'API : ", data);

            // 8. LOGIQUE CONDITIONNELLE SELON L'ÉTAT DU SERVEUR
            // Vérification des propriétés de l'objet de réponse
            if(data.etat === "succes" || data.status === "success") {
                alert("Message envoyé avec succès !");
                
                // 9. RÉINITIALISATION DE L'INTERFACE UTILISATEUR (UI)
                // Nettoyage des champs de saisie (inputs)
                champTitre.value = "";
                champDescription.value = "";
                champURL.value = "";
                
                // Mise à jour du contenu textuel et des attributs du DOM pour l'aperçu
                document.getElementById("apercu-titre").textContent = "";
                document.getElementById("apercu-description").textContent = "";
                document.getElementById("apercu-image").src = "";
            } else {
                // Gestion de l'erreur métier renvoyée par l'API
                alert("Erreur serveur : " + data.message);
            }
        });
    }).catch(function(error) {
        // 10. GESTION DES ERREURS RÉSEAU
        // Intercepte les échecs critiques (DNS, connexion interrompue, etc.)
        alert("Erreur de connexion : vérifiez que vous êtes bien sur le serveur MMI.");
    });
});
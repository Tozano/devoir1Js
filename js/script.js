var indice = 0;
var ecrans = document.getElementsByClassName("ecran");
var annonces = document.getElementsByClassName("annonce");
var options = document.getElementsByClassName("option");
var recapOptions = document.getElementsByClassName("recapOption");
var annonceSelect = null
var optionSelect = null
var nbAnnonce = 0;
var prixAnnonce = 0;
var prixOption = 0;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

// Chargement

function onLoad() {
    for (let i = 0; i < annonces.length; i++) {
        annonces[i].setAttribute('data-selected', false);
        annonces[i].addEventListener("click", selectAnnonce, false);
        annonces[i].setAttribute('data-prix', 0);
        if (i == 0) {
            annonces[i].setAttribute('data-prix', 1.90);
        } else if (i == 1) {
            annonces[i].setAttribute('data-prix', 1.80);
        } else if (i == 2) {
            annonces[i].setAttribute('data-prix', 1.70);
        } else if (i == 3) {
            annonces[i].setAttribute('data-prix', 1.60);
        } else if (i == 4) {
            annonces[i].setAttribute('data-prix', 1.50);
        }
    }
    for (let j = 0; j < options.length; j++) {
        options[j].setAttribute('data-selected', false);
        options[j].addEventListener("click", selectOption, false);
        options[j].setAttribute('data-prix', 9.90);
        options[j].setAttribute('data-nom', options[j].getElementsByTagName("h3")[0].innerText);
        if (j == 2) {
            options[j].setAttribute('data-prix', 15.90);
            options[j].setAttribute('data-nom', 'Duplique, Auto 72H');
        }
    }
    hideAllRecapOption();
}

function hideAllRecapOption() {
    for (let recapOption of recapOptions) {
        recapOption.style.display = "none";
    }
}

function hideAllButOne() {
    for (let ecran of ecrans) {
        ecran.style.display = "none";
    }
    ecrans[indice].style.display = "block";
}

// Navigation

function suivant() {
    ecrans[indice].style.display = "none";
    indice++;
    ecrans[indice].style.display = "block";
}

function precedent() {
    ecrans[indice].style.display = "none";
    indice--;
    ecrans[indice].style.display = "block";
}

// Ecran 1

function selectAnnonce() {
    if (annonceSelect != this.id && annonceSelect != null) {
        let annonceDeselect = document.getElementById(annonceSelect);
        annonceDeselect.classList.remove('text-bg-danger');
        annonceSelect = null;
        annonceDeselect.setAttribute('data-selected', false);
    }
    if (this.getAttribute('data-selected') == 'false') {
        this.classList.add('text-bg-danger');
        annonceSelect = this.id;
        this.setAttribute('data-selected', true);
        btEcran1.removeAttribute('disabled');
        prixAnnonce = this.getAttribute('data-prix');
    } else {
        this.classList.remove('text-bg-danger');
        annonceSelect = null;
        this.setAttribute('data-selected', false);
        btEcran1.setAttribute('disabled', '')
        prixAnnonce = 0;
    }

}

// Ecran 2

function countAnnonce() {
    if (this.value > 0) {
        btEcran2.removeAttribute('disabled');
        nbAnnonce = this.value;
    } else {
        btEcran2.setAttribute('disabled', '')
        nbAnnonce = 0;
    }
}

// Ecran 3

function selectOption() {
    if (this.id == "option3") {
        options[0].setAttribute('data-selected', false);
        options[0].classList.remove('text-bg-danger');
        options[1].setAttribute('data-selected', false);
        options[1].classList.remove('text-bg-danger');
    } else {
        options[2].setAttribute('data-selected', false);
        options[2].classList.remove('text-bg-danger');
    }
    if (this.getAttribute('data-selected') == 'false') {
        this.classList.add('text-bg-danger');
        optionSelect = this.id;
        this.setAttribute('data-selected', true);
        prixOption = this.getAttribute('data-prix');
    } else {
        this.classList.remove('text-bg-danger');
        optionSelect = null;
        this.setAttribute('data-selected', false);
        prixOption = 0;
    }
    if (options[0].getAttribute('data-selected') == 'true' && options[1].getAttribute('data-selected') == 'true') {
        for (let option of options) {
            option.setAttribute('data-selected', false);
            option.classList.remove('text-bg-danger');
        }
        options[2].classList.add('text-bg-danger');
        optionSelect = options[2].id;
        options[2].setAttribute('data-selected', true);
        prixOption = this.getAttribute('data-prix');
    }
}

// Ecran 4

function suivantEcran3() {
    let annonceRecap = document.getElementById("annonceRecap");
    let annonceFinal = document.getElementById(annonceSelect);
    annonceRecap.innerHTML = annonceFinal.innerHTML;

    recapQuantite.innerText = nbAnnonce;

    hideAllRecapOption();
    finalOptions.innerText = "";
    if (optionSelect == 'option1') {
        recapOptions[0].style.display = "block";
        finalOptions.innerText = options[0].getAttribute('data-nom');
    } else if (optionSelect == 'option2') {
        recapOptions[1].style.display = "block";
        finalOptions.innerText = options[1].getAttribute('data-nom');
    } else if (optionSelect == 'option3') {
        recapOptions[2].style.display = "block";
        finalOptions.innerText = options[2].getAttribute('data-nom');
    }

    prixSansOption = nbAnnonce * prixAnnonce;
    prixTotal.innerText = parseFloat(prixSansOption) + parseFloat(prixOption);
    finalQuantite.innerText = nbAnnonce;
    todayDate.innerText = today;
    if ((annonceFinal.getElementsByTagName("h3")[0].innerText) == '1 An') {
        end = 31 + '/' + mm + '/' + (yyyy + 1);
    } else {
        let mmEnd = String(parseInt(mm) + parseInt((annonceFinal.getElementsByTagName("h3")[0].innerText)[0]));
        let yyyyEnd = yyyy;
        if (mmEnd >= 12) {
            mmEnd = mmEnd % 12;
            yyyyEnd++;
        }
        end = 31 + '/' + mmEnd + '/' + yyyyEnd;
    }
    endDate.innerText = end;
    finalDuree.innerText = annonceFinal.getElementsByTagName("h3")[0].innerText;

    suivant();
}

btEcran1.setAttribute('disabled', '')
btEcran2.setAttribute('disabled', '')
hideAllButOne();

btEcran1.addEventListener("click", suivant, false);
btEcran2.addEventListener("click", suivant, false);
btEcran3.addEventListener("click", suivantEcran3, false);
btRetour2.addEventListener("click", precedent, false);
btRetour3.addEventListener("click", precedent, false);
btRetour4.addEventListener("click", precedent, false);

inputNb.addEventListener("click", countAnnonce, false);

window.addEventListener("load", onLoad);
window.addEventListener("load", onLoad);
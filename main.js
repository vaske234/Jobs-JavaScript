window.addEventListener('beforeunload',sacuvajSveIzmene);

let posloviTabela = document.querySelector('#posloviTabela');


function napraviTabelu () {
let podaci = ``;
for( let i = 0;i < baza.length; i++) {
const posao = baza[i];
 podaci +=`
<tr>
<td>${posao.id}</td>
<td>${posao.name}</td>
<td>${posao.position}</td>
<td>${posao.email}</td>
<td>${posao.number}</td>
<td><button data-id="${i}" class="btn izmeniBtn btn-success">change</button></td>
<td><button  data-id="${i}"  class="btn obrisiBtn btn-danger">delete</button></td>

</tr>



`;
}
posloviTabela.innerHTML = podaci;
//// selekcija dugmica
let sviDugmiciBrisanje = document.querySelectorAll('.obrisiBtn');
let svaIzmjenaDugmica = document.querySelectorAll('.izmeniBtn');
for(   let i = 0; i < sviDugmiciBrisanje.length;  i++) {
    sviDugmiciBrisanje[i].addEventListener('click', brisanjePosla);
    svaIzmjenaDugmica[i].addEventListener('click', izmeniPosao);

 
}

}
napraviTabelu();

let posloviPrikaz = document.querySelector('#posloviPrikaz');
let dodajPosaoPrikaz = document.querySelector('#dodajPosaoPrikaz');

let sviLinkovi = document.querySelectorAll('.nav-link');
for(let i = 0; i < sviLinkovi.length; i++) {
sviLinkovi[i].addEventListener('click', prikazi);
}
let prikaz = document.querySelectorAll('.prikaz');
function prikazi(e) {
    e.preventDefault();
    for(let i = 0; i < prikaz.length; i++) {
        prikaz[i].style.display = 'none';

    }
  let id = `#${this.getAttribute("href")}`;
  document.querySelector(id).style.display = 'block';
}
function prikazi(e){
    for(let i = 0; i < prikaz.length; i++) {
        prikaz[i].style.display = 'none';

    }
    if(e instanceof Event) {
        e.preventDefault();
        let id = `#${this.getAttribute("href")}`;
  document.querySelector(id).style.display = 'block';
    }else {
        document.querySelector(e).style.display = 'block';
    }
    }


// dodavanje
let idInput = document.querySelector('[placeholder="id"]');
let nameInput = document.querySelector('[placeholder="name"]');
let positionInput = document.querySelector('[placeholder="position"]');
let emailInput = document.querySelector('[placeholder="email"]');
let numberInput = document.querySelector('[placeholder="number"]');
let dodajDugme = document.querySelector('#dodaj');

dodajDugme.addEventListener('click',sacuvajPosao);
// uzimamo vrednost iz input polja
function sacuvajPosao() {
    const noviPosao = {
        id: idInput.value,
        ime: nameInput.value,
        position: positionInput.value,
        email: emailInput.value,
        number: numberInput.value
    }
    console.log(noviPosao);
    idInput.value = "";
    nameInput.value = "";
    positionInput.value = "";
    emailInput.value = "";
    numberInput.value = "";
    baza.push(noviPosao);
    napraviTabelu();
    prikazi('#posloviPrikaz');

}

//brisanje
function brisanjePosla() {
    let id = this.getAttribute('data-id');
    baza.splice(id, 1);
    napraviTabelu();
    prikazi('#posloviPrikaz');


    
}
// //izmena

let izmeniId = document.querySelector('.izmeniId');
let izmeniName = document.querySelector('.izmeniName');
let izmeniPosition = document.querySelector('.izmeniPosition');
let izmeniEmail = document.querySelector('.izmeniEmail');
let izmeniNumber = document.querySelector('.izmeniNumber');
let izmeniDugme = document.querySelector('#izmeni');
let id;

function izmeniPosao() {
    id = this.getAttribute('data-id');
    let selektovaniPosao = baza[id];
    izmeniId.value = selektovaniPosao.id;
    izmeniName.value = selektovaniPosao.name;
    izmeniPosition.value = selektovaniPosao.position;
    izmeniEmail.value = selektovaniPosao.email;
    izmeniNumber.value = selektovaniPosao.number;
    prikazi('#izmeniPosaoPrikaz');

}
izmeniDugme.addEventListener('click',sacuvajIzmene);
function sacuvajIzmene() {
    const izmenjenPosao = {
        id: izmeniId.value,
        name: izmeniName.value,
        position: izmeniPosition.value,
        email: izmeniEmail.value,
        number: izmeniNumber.value
    }
    // console.log(izmenjenPosao);
    baza[id] =  izmenjenPosao;
    napraviTabelu();
    prikazi('#posloviPrikaz');
}

function sacuvajSveIzmene() {
    localStorage.baza = JSON.stringify(baza);
    
}
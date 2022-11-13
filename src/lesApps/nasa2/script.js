let theLoading = document.getElementById('theLoading');
let theContainer = document.getElementById('theContainer');
let contenue = document.getElementById('contenue');

function getLaPage() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let thePage = urlParams.get('page');
  return thePage;
}

function createPage() {
  getNbPageMax();
  const api_key = "MTtJVbl50YZf6YJdFMmpyMR50MhnwOa675Cc1mWd";
  let api = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${api_key}&page=1`;

  if (getLaPage()) {
    api = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${api_key}&page=${getLaPage()}`;
    console.log(api)
  }


  fetch(api)
    .then(res => res.json())
    .then(data => getDatas(data))

}

function removeLoading() {
  theLoading.innerHTML = "";
  theContainer.style.visibility = "visible";
}


function getDatas(laDatas) {
  removeLoading();
  for (i = 0; i < laDatas.photos.length; i++) {
    contenue.insertAdjacentHTML("beforebegin", (newDiv(laDatas.photos[i])));
  }
}


function newDiv(infos) {
  return (`
    <div class="shadow-none p-3 mb-5 bg-light rounded">
      <h4 class="text-center">Rover name ${infos.rover.name}</h4>
      <p class="text-center">Date de lancement : ${infos.rover.launch_date} | Date d'atterissage : ${infos.rover.landing_date}</p>
      <img loading="lazy" class="theImg" src="${infos.img_src}">
      <p class="text-center">Date de prise : ${infos.earth_date}</p>
    </div>
  `)
}

function getNbPageMax() {
  const api_key = "MTtJVbl50YZf6YJdFMmpyMR50MhnwOa675Cc1mWd";
  let api2 = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${api_key}`;

  fetch(api2)
    .then(res => res.json())
    .then(data => createPageBtn(data.photos.length))
}


function createPageBtn(nbPage) {
  nbPage = nbPage / 25;
  for (numero = 1; numero < nbPage + 1; numero++) {
    document.getElementById('pageBtn').innerHTML += `<a href="?page=${numero}" type="button" class="btn btn-outline-secondary">${numero}</a>`;
  }
}
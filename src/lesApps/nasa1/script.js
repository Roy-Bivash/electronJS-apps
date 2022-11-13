let theLoading = document.getElementById('theLoading');
let theContainer = document.getElementById('theContainer');


function getUneDate() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let theDate = urlParams.get('date');
  return theDate;
}

function createPage() {
  let api = `https://api.nasa.gov/planetary/apod?&api_key=`;
  const api_key = "MTtJVbl50YZf6YJdFMmpyMR50MhnwOa675Cc1mWd";
  if (getUneDate()) {
    api = `https://api.nasa.gov/planetary/apod?date=${getUneDate()}&api_key=`;
  }

  fetch(api + api_key)
    .then(res => res.json())
    .then(data => getDatas(data))


  document.getElementById("datePickerId").setAttribute("max", getCurentDate());
}

function removeLoading() {
  theLoading.innerHTML = "";
  theContainer.style.visibility = "visible";
}



function getDatas(laDatas) {
  removeLoading();
  //console.log(laDatas);
  document.getElementById('titrePrincipal').innerHTML = laDatas.media_type + " astronomique de la journnée";
  if(laDatas.copyright){
    document.getElementById('copyright').innerHTML = "Copyright : " + laDatas.copyright;
  }else{
    document.getElementById('copyright').innerHTML = "Copyright : aucun";
  }
  document.getElementById('titre').innerHTML = laDatas.title;
  if (laDatas.media_type == "video") {
    document.getElementById('contenue').innerHTML = `<video class="laVideo" controls><source src="${laDatas.url}" type="video / mp4"><p>Votre navigateur ne prend pas en charge les vidéos HTML5.     Voici <a href="${laDatas.url}">un lien pour télécharger la vidéo</a>.</p></video>`;
  } else {
    document.getElementById('contenue').innerHTML = `<div class="img text-center "><a href="${laDatas.url}" target="_blank"><img loading="lazy" class="img-fluid" src="${laDatas.url}" ></a></div>`;
  }
  document.getElementById('date').innerHTML = `<u>${laDatas.date}</u>`;
  document.getElementById('description').innerHTML = laDatas.explanation;

}


function getCurentDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  today = yyyy + '-' + mm + '-' + dd;
  return today;
}

class Song {
  name;
  duration;
  listeners;
  mbid;
  url;
  artist;
  attr;
  genre;

  constructor(name, duration, listeners, artist, mbid, url, attr, genre) {
    this.name = name;
    this.duration = duration;
    this.listeners = listeners;
    this.artist = artist;
    this.mbid = mbid;
    this.url = url;
    this.attr = attr;
    this.genre = genre;
  }

  setItemLi() {}
  setItemGroupName(group, url) {}
  setItemSongTitle(title) {}
  setListeners(listeners) {}
  getNewElement(group, url, title, listeners) {}

  getNewElement() {
    const listElement = document.createElement("li");
    
    listElement.classList.add("far");
    listElement.classList.add("fa-play-circle");

    const anchorGroupName = document.createElement("a");
    anchorGroupName.classList.add("group-name");
    anchorGroupName.setAttribute("title", "Ir al grupo");
    anchorGroupName.href = this.url;
    anchorGroupName.innerHTML = this.artist + " ";

    const anchorBandName = document.createElement("a");
    anchorBandName.classList.add("song-title");
    anchorBandName.innerHTML = this.name;

    const divListeners = document.createElement("div");
    divListeners.classList.add("listeners");
    divListeners.innerHTML = `${this.listeners} listeners`;

    listElement.appendChild(anchorGroupName);
    listElement.appendChild(anchorBandName);
    listElement.appendChild(divListeners);

    return listElement;
  }
}

let arraySongs = [];
let firstTen = [];
let firstRun = true;

const lista = document.getElementsByClassName("lista")[0];

const loadSongs = (songs) => {
  while (lista.firstChild) {
    lista.firstChild.remove();
  }

  for (let s of JSON.parse(songs)) {
    let song = new Song(
      s.name,
      s.duration,
      s.listeners,
      s.artist.name,
      s.mbid,
      s.url,
      s.attr,
      s.genre
    );

    lista.appendChild(song.getNewElement());
    
    if(firstRun) {
      arraySongs.push(s);
    }
    
  }

  firstRun = false;

};

const loadOverview = () => {
  document.getElementById("overview").classList.add("clickedOption");
  document.getElementById("tenListened").classList.remove("clickedOption");
  document.getElementById("biggest").classList.remove("clickedOption");

  init();

  titulo.innerHTML = "Overview";
};

let topTen = [];

const loadTenListened = () => {
  document.getElementById("overview").classList.remove("clickedOption");
  document.getElementById("tenListened").classList.add("clickedOption");
  document.getElementById("biggest").classList.remove("clickedOption");

  while (lista.firstChild) {
    lista.firstChild.remove();
  }

  if (topTen.length === 0) {
    for (let a = 0; a < arraySongs.length; a++) {
      topTen.push(arraySongs[a]);
    }
    topTen = topTen.sort((a, b) => b.listeners - a.listeners);
  }

  firstTen = topTen.slice(0, 10);

  for (t in firstTen) {
    let tt = new Song(
      topTen[t].name,
      topTen[t].duration,
      topTen[t].listeners,
      topTen[t].artist.name,
      topTen[t].mbid,
      topTen[t].url,
      topTen[t].attr,
      topTen[t].genre
    );
    lista.appendChild(tt.getNewElement());
  }

  titulo.innerHTML = "Top 10 listened";
};

const artists = [];
let biggestArtist;
const arrayArtists = [];
let biggestList = false;

let biggestArtistShown = false;

const loadBiggest = () => {
  while (artists.length > 0) {
    artists.pop();
  }

  let newArtist = true;

  for (s in arraySongs) {
    for (a in artists) {
      if (arraySongs[s].artist.name === artists[a].name) {
        artists[a].listeners += Number(arraySongs[s].listeners);
        newArtist = false;
      }
    }

    if (newArtist) {
      let art = {
        name: arraySongs[s].artist.name,
        listeners: Number(arraySongs[s].listeners),
      };

      artists.push(art);
    }
  }

  biggestArtists = artists.slice();
  biggestArtists = biggestArtists.sort((a, b) => b.listeners - a.listeners);

  biggestArtist = biggestArtists[0];

  biggestList = true;

  showTheBiggest();
};

const biggestsSongs = [];

const showTheBiggest = () => {
  document.getElementById("overview").classList.remove("clickedOption");
  document.getElementById("tenListened").classList.remove("clickedOption");
  document.getElementById("biggest").classList.add("clickedOption");

  titulo.innerHTML = "The Biggest";

  while (lista.firstChild) {
    lista.firstChild.remove();
  }

  if (biggestsSongs.length === 0) {
    for (let b = 0; b < arraySongs.length; b++) {
      biggestsSongs.push(arraySongs[b]);
    }
  }

  for (let s in biggestsSongs) {
    let so = new Song(
      biggestsSongs[s].name,
      biggestsSongs[s].duration,
      biggestsSongs[s].listeners,
      biggestsSongs[s].artist.name,
      biggestsSongs[s].mbid,
      biggestsSongs[s].url,
      biggestsSongs[s].attr,
      biggestsSongs[s].genre
    );

    if (biggestsSongs[s].artist.name === biggestArtist.name) {
      lista.appendChild(so.getNewElement());
    }
  }

  biggestArtistShown = true;
};

const init = () => {
  document.getElementById("overview").classList.add("clickedOption");
  document.getElementById("tenListened").classList.remove("clickedOption");
  document.getElementById("biggest").classList.remove("clickedOption");

  fetch("music.json")
    .then((response) => response.json())
    .then((data) => loadSongs(JSON.stringify(data)));

  titulo.innerHTML = "Overview";

  arrayPush = false;
};


const aviso = () => {
    alert(`click en el div de rock`);
}


const filterGenre = (event) => {
 
  
  let genre; 

  if(event.target.id != ""){
    console.log('click en la foto');
    console.log(event);
    genre = event.target.id;
  }
  else{
    console.log('click en el titulo');
    console.log(event.target.innerHTML);
    genre = event.target.innerHTML;
  }

    titulo.innerHTML = genre;

  while (lista.firstChild) {
    lista.firstChild.remove();
  }

  for(song in arraySongs){
    if(arraySongs[song].genre === genre) {
      let s = new Song(
        arraySongs[song].name,
        arraySongs[song].duration,
        arraySongs[song].listeners,
        arraySongs[song].artist.name,
        arraySongs[song].mbid,
        arraySongs[song].url,
        arraySongs[song].attr,
        arraySongs[song].genre
      );
      lista.appendChild(s.getNewElement());
    }
  }

  
}

let arrayPush = true;

const rock = document.getElementById('rock');
rock.addEventListener('click', filterGenre);

const hipHop = document.getElementById('hip-hop');
hipHop.addEventListener('click', filterGenre);

const indie = document.getElementById('indie');
indie.addEventListener('click', filterGenre);

const jazz = document.getElementById('jazz');
jazz.addEventListener('click', filterGenre);

const reggae = document.getElementById('reggae');
reggae.addEventListener('click', filterGenre);




document.getElementById("overview").addEventListener("click", loadOverview);
document
  .getElementById("tenListened")
  .addEventListener("click", loadTenListened);
document.getElementById("biggest").addEventListener("click", loadBiggest);
const titulo = document.getElementById("titulo");

window.onload = init;
class Song {
    name;
    duration;
    listeners;
    mbid;
    url;
    artist;
    attr;
    genre;

    constructor(name, duration, listeners, artist, mbid, url, attr, genre){
    // constructor(name, duration, listeners, artist){
        this.name = name;
        this.duration = duration;
        this.listeners = listeners;
        this.artist = artist;
        this.mbid = mbid;
        this.url = url;
        this.attr = attr;
        this.genre = genre;
    }

    setItemLi(){
    }
    setItemGroupName(group,url){
    }
    setItemSongTitle(title){
    }
    setListeners(listeners){
    }
    getNewElement(group,url,title,listeners){
    }


    getNewElement () {

        const listElement = document.createElement('li');
        listElement.classList.add('far');
        listElement.classList.add('fa-play-circle');
        
        const anchorGroupName = document.createElement('a');
        anchorGroupName.classList.add('group-name');
        anchorGroupName.setAttribute('title', 'Ir al grupo');
        anchorGroupName.href = this.url;
        anchorGroupName.innerHTML = this.artist;
        
        const anchorBandName = document.createElement('a');
        anchorBandName.classList.add('song-title');
        anchorBandName.innerHTML = this.name;

        const divListeners = document.createElement('div');
        divListeners.classList.add('listeners');
        divListeners.innerHTML = `${this.listeners} listeners`;

        listElement.appendChild(anchorGroupName);
        listElement.appendChild(anchorBandName);
        listElement.appendChild(divListeners);

        return listElement;

    }

}

let arraySongs = [];
let firstTen = [];

const lista = document.getElementsByClassName('lista')[0];

const loadSongs = (songs)=> {

    while(lista.firstChild){
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
        
        arraySongs.push(s);

    }


}

const loadOverview = () =>{

    document.getElementById('overview').classList.add('clickedOption');
    document.getElementById('tenListened').classList.remove('clickedOption');
    document.getElementById('biggest').classList.remove('clickedOption')
    
    init();
    console.log('Overview');
    
    titulo.innerHTML = 'Overview';
}

const loadTenListened = ()=>{

    document.getElementById('overview').classList.remove('clickedOption');
    document.getElementById('tenListened').classList.add('clickedOption');
    document.getElementById('biggest').classList.remove('clickedOption')

    if (firstTen.length === 0) {
        const topTen = arraySongs.slice();

        let sortedTopTen = topTen.sort((a, b) => b.listeners - a.listeners);

        firstTen = sortedTopTen.slice(0, 10);

        loadSongs(JSON.stringify(firstTen));
    }
    else {
        loadSongs(JSON.stringify(firstTen));
    }

    titulo.innerHTML = 'Top 10 listened'
}


// const loadBiggest = () => {

//     let songsArtist = {};

//     for(s in arraySongs){
//         let a = {};
//             a.artist = arraySongs[s].artist.name;
//             a.listeners = arraySongs[s].listeners;
//         songsArtist.push(a);
//     }

//     console.log(songsArtist);

// }

// Esta es la buena
const testBigges = () => {

    titulo.innerHTML = 'The Biggest';

    document.getElementById('overview').classList.remove('clickedOption');
    document.getElementById('tenListened').classList.remove('clickedOption');
    document.getElementById('biggest').classList.add('clickedOption')

    const artists = {};
    for (const song of arraySongs) {
        if (artists[song.artist.name]) {
        artists[song.artist.name].listeners += parseInt(song.listeners, 10);
        artists[song.artist.name].songs.push(song.name);
    } else {
        artists[song.artist.name] = {
        listeners: parseInt(song.listeners, 10),
        songs: [song.name],
        };
    }
    }
    console.log(artists);

}

const testing = () => {

    const byArtist = arraySongs.reduce((acc, song) => {
        const artistName = song.artist.name;
        const match = acc.get(artistName)
        if (match) {
          match.arraySongs.push({...song});
          match.listeners += parseInt(song.listeners);
        } else {
          acc.set(artistName, {arraySongs: [{...song}], listeners: +song.listeners});
        }
        return acc;
      }, new Map);
      
    //   console.log(Object.fromEntries(byArtist));

    console.log(Object.fromEntries(byArtist));
    loadSongs(Object.fromEntries(byArtist));

    //   loadSongs(JSON.stringify(byArtist.arraySongs));

}

const init = ()=>{

    fetch('music.json')
        .then(response => response.json())
        .then(data => loadSongs(JSON.stringify(data)));
        
    titulo.innerHTML = 'Overview';
 
}

document.getElementById('overview').addEventListener('click', loadOverview);
document.getElementById('tenListened').addEventListener('click', loadTenListened);
// document.getElementById('biggest').addEventListener('click', testBigges);
const titulo = document.getElementById('titulo');
window.onload = init;


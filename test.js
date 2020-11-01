const loadBiggest = (e) => {
    m_titleContainer.innerHTML = "The Biggest";

    let l_dictionary = [];

    for (let song of m_songsList) {
        let l_index = -1;
        // Bucle que repasa todas las canciones y llena el diccionario de artistas
        for (let i = 0; i < l_dictionary.length; i++) {
            if (l_dictionary[i].artist == song.artist.name) {
                l_index = i;
                break;
            }
        }

        // si el index es mayor o igual a 0 al artista que hay en el diccionario le sum las canciones 
        if (l_index >= 0) {
            l_dictionary[l_index].listeners += song.listeners;
        }
        // si no existe el artista en el diccionario lo crea y de paso le apunta las escuchas
        else {
            let l_object =
            {
                artist: song.artist.name,
                listeners: song.listeners,
            };
            l_dictionary.push(l_object);
        }
    }

    
    l_dictionary.sort(function (a, b) {
        return (b.listeners - a.listeners)
    });

    let l_result = [];
    for (let song of m_songsList) {
        if (song.artist.name == l_dictionary[0].artist)
            l_result.push(song);
    }

    loadSongs(l_result);
}
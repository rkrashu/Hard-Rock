const searchSong = () =>{
    const input = document.getElementById("searchInput").value;
    const url = `https://api.lyrics.ovh/suggest/${input}`
    fetch(url)
    .then(res => res.json())
    .then(data=> {console.log(data.data)
                displayResult(data.data)
    }
    )
    .catch(error=> error)
}

const displayResult = songs=>{
    const searchResult = document.getElementById("searchResult");
    searchResult.innerHTML = '';
    songs.map(song=>{
    const ResultDiv = document.createElement("div");
    ResultDiv.className = "single-result row align-items-center my-3 p-3"
    const songDetails = ` <div class="col-md-9">
    <h3 class="lyrics-name">${song.title}</h3>
    <p class="author lead">Album by <span>'${song.artist.name}'</span></p>
    <audio controls>
    <source src="${song.preview}" type="audio/mpeg">
    </audio>
</div>
<div class="col-md-3 text-md-right text-center">
    <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Get Lyrics</button>
</div>`
ResultDiv.innerHTML= songDetails;
searchResult.appendChild(ResultDiv)
})
document.getElementById("searchInput").value = ''
}

const getLyrics = (artist, song)=>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${song}`
    console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then(data=> 
        {console.log(data.lyrics)
            displayLyrics(data.lyrics)})
}

const displayLyrics = song=> {
const lyrics= document.getElementById("songLyrics")
lyrics.innerHTML = `<div>
<h4 style="color:black;">${song}</h4>
</div>`
}
const searchSong = async() =>{
    const input = document.getElementById("searchInput").value;
    const url = `https://api.lyrics.ovh/suggest/${input}`
    try{
        const res = await fetch(url);
    const data= await res.json();
    displayResult(data.data);
    }
    catch(error){displayError(`<h1 class="text-danger">Sorry we are currently unavailable. Please try again later.</h1>`)}
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

const getLyrics = async(artist, song)=>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${song}`
        try{const res=await fetch(url)
            const data=await res.json()
            displayLyrics(data.lyrics)}
            catch(error){displayError2(`<h3 class="text-danger">Sorry We can't provide the lyrics right now. Please try again later.</h3>`)}
}   

const displayLyrics = song=> {
const lyrics= document.getElementById("songLyrics")
lyrics.innerHTML = `<div>
<h4 style="color:black;"><pre>${song}</pre></h4>
</div>`
}

const displayError = error=>{
    const errorMassage = document.getElementById("error")
    errorMassage.innerHTML = error;
}

const displayError2 = error=>{
    const lyrics1= document.getElementById("songLyrics");
lyrics1.innerHTML = error;
}

console.log("let's do it!");

async function getSongs(){
    let a = await fetch("images/songs/");
    let response = await a.text();
    // console.log(response);

    let div = document.createElement("div")
    div.innerHTML = response;

    let as= div.getElementsByTagName("a");
    let songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }  
    }
    return songs
}

async function main(){
    let songs = await getSongs();
    console.log(songs); //list of songs

    let songOL = document.querySelector(".songList").getElementsByTagName("ol")[0];

    for (const song of songs) {
        songOL.innerHTML = songOL.innerHTML + `<li>
                                <div class="left">
                                    <i class="bi bi-music-note-beamed"></i>
                                    <div class="info">
                                        <div>${song.replaceAll("%20"," ")}</div>
                                        <div>Artist</div>
                                    </div>
                                </div>
                                <i class="bi bi-play-circle"></i>
                            </li>`;
    }

    //play first song
    var audio = new Audio(songs[0]);

    document.addEventListener("click",() => {
        audio.play();
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
    });

    // audio.play();


} 

main()

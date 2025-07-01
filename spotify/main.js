console.log("let's do it!");
let currentSong = new Audio();

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

const playMusic = (track) =>{
    // let audio = new Audio("images/songs/" + track);
    currentSong.src = "images/songs/" + track;
    currentSong.play();
}

async function main(){
    let songs = await getSongs();
    // console.log(songs); //list of songs

    let songOL = document.querySelector(".songList").getElementsByTagName("ol")[0];

    for (const song of songs) {
        songOL.innerHTML = songOL.innerHTML + `<li>
                                <div class="left d-flex justify-content-center">
                                    <i class="bi bi-music-note-beamed"></i>
                                    <div class="info">
                                        <div>${song.replaceAll("%20"," ")}</div>
                                        <div>Artist</div>
                                    </div>
                                </div>
                                <i class="bi bi-play-circle me-2"></i>
                            </li>`;
    }

    // Attach a eventlistener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element =>{
             console.log(e.querySelector(".info").firstElementChild.innerHTML);
             playMusic(e.querySelector(".info").firstElementChild.innerHTML)
        })
    });

    //play first song
    // var audio = new Audio(songs[0]);

    /* document.addEventListener("click",() => {
        audio.play();
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
    }); */

    // audio.play();
} 

main()

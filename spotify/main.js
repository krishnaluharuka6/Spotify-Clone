console.log("let's do it!");
let currentSong = new Audio();
let songs;
// playy=document.getElementById("playy");


// convert the second to minutes seconds of the song
function secToMinsec(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;

}

async function getSongs() {
    let a = await fetch("images/songs/");
    let response = await a.text();
    // console.log(response);

    let div = document.createElement("div")
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");
    let songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}

const playMusic = (track, pause = false) => {
    // let audio = new Audio("images/songs/" + track);
    currentSong.src = "images/songs/" + track;
    if (!pause) {
        currentSong.play();
        playy.classList.remove("bi-play-circle-fill");
        playy.classList.add("bi-pause-circle-fill");
    }
    document.querySelector(".song-info").innerHTML = decodeURI(track);
    // document.querySelector(".song-time").innerHTML = "00:00 / 00:00";
    document.querySelector(".song-start").innerHTML ="00:00";
    document.querySelector(".song-end").innerHTML = "00:00";

}

async function main() {
    songs = await getSongs();
    // console.log(songs); //list of songs
    playMusic(songs[0], true)

    // let songOL = document.querySelector(".songList").getElementsByTagName("ol")[0];

    let allSongLists = document.querySelectorAll(".songList");

    allSongLists.forEach(songList => {
        let songOL = songList.getElementsByTagName("ol")[0];

        for (const song of songs) {
            songOL.innerHTML = songOL.innerHTML + `<li>
                                <div class="left d-flex justify-content-center">
                                    <i class="bi bi-music-note-beamed"></i>
                                    <div class="info">
                                        <div>${song.replaceAll("%20", " ")}</div>
                                        <div>Artist</div>
                                    </div>
                                </div>
                                <i class="bi bi-play-circle me-2"></i>
                            </li>`;
        }
    });

    // Attach an eventlistener to each song
    document.querySelectorAll(".songList").forEach(songList => { Array.from(songList.getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML);
        })
    })
    });

    // Attach an event listener to play, next and previous
    playy.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            playy.classList.remove("bi-play-circle-fill");
            playy.classList.add("bi-pause-circle-fill");
        } else {
            currentSong.pause();
            playy.classList.add("bi-play-circle-fill");
            playy.classList.remove("bi-pause-circle-fill");
        }
    })


    //Listen for time update event
    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, 
            
        );

        // document.querySelector(".song-time").innerHTML = `${secToMinsec(currentSong.currentTime)}  /  ${secToMinsec(currentSong.duration)}`;
        document.querySelector(".song-start").innerHTML = `${secToMinsec(currentSong.currentTime)}`;
        document.querySelector(".song-end").innerHTML = `${secToMinsec(currentSong.duration)}`;

        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    //Add an eventListener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    //play first song
    // var audio = new Audio(songs[0]);

    /* document.addEventListener("click",() => {
        audio.play();
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
    }); */

    // audio.play();


    // Add an event listener to prev and next
    const prev = document.querySelector(".bi-skip-backward-fill");
    const next= document.querySelector(".bi-skip-forward-fill");

    prev.addEventListener("click",()=>{
        console.log("Previous clicked");
        let index=songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if((index-1) >= 0){
        playMusic(songs[index-1]);
        }
    })

    next.addEventListener("click",()=>{
        console.log("Next clicked")
        let index=songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if((index+1) < songs.length){
        playMusic(songs[index+1]);
        }
    });

    // Add an event to volume
    document.querySelector(".song-volume").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
        console.log("Setting volume to",e.target.value, "/100");
        currentSong.volume = parseInt(e.target.value)/100;
    })

}


 const container = document.getElementById('cardContainer');
  const scrollAmount = 300; // Adjust as needed

  document.getElementById('scrollLeftBtn').addEventListener('click', () => {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  document.getElementById('scrollRightBtn').addEventListener('click', () => {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

main()

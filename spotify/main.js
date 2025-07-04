console.log("let's do it!");
let currentSong = new Audio();
// playy=document.getElementById("playy");


// convert the second to minutes seconds of the song
function secToMinsec(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "Invalid input";
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
        playy.classList.remove("bi-play-circle");
        playy.classList.add("bi-pause-circle");
    }
    document.querySelector(".song-info").innerHTML = decodeURI(track)
    document.querySelector(".song-time").innerHTML = "00:00 / 00:00"

}

async function main() {
    let songs = await getSongs();
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
            playy.classList.remove("bi-play-circle");
            playy.classList.add("bi-pause-circle");
        } else {
            currentSong.pause();
            playy.classList.add("bi-play-circle");
            playy.classList.remove("bi-pause-circle");
        }
    })


    //Listen for time update event
    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".song-time").innerHTML = `${secToMinsec(currentSong.currentTime)}  /  ${secToMinsec(currentSong.duration)}`
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

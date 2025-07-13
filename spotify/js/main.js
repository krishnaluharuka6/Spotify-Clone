console.log("let's do it!");
let currentSong = new Audio();
let songs;
let currFolder;
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

async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(currFolder);
    let response = await a.text();
    // console.log(response);


    let div = document.createElement("div")
    div.innerHTML = response;
    // console.log(as);

    let as = div.getElementsByTagName("a");
    //  console.log(as);
    songs = [];
    // console.log(songs);

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`${currFolder}`)[1]);
        }
    }

    let allSongLists = document.querySelectorAll(".songList");

    allSongLists.forEach(songList => {
        let songOL = songList.getElementsByTagName("ol")[0];
        songOL.innerHTML = " ";
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
    document.querySelectorAll(".songList").forEach(songList => {
        Array.from(songList.getElementsByTagName("li")).forEach(e => {
            e.addEventListener("click", element => {
                playMusic(e.querySelector(".info").firstElementChild.innerHTML);
            })
        })
    });

    return songs
}

const playMusic = (track, pause = false) => {
    // let audio = new Audio("images/songs/" + track);

    currentSong.src = `${currFolder}` + track;
    // console.log(currentSong);
    if (!pause) {
        currentSong.play();
        playy.classList.remove("bi-play-circle-fill");
        playy.classList.add("bi-pause-circle-fill");
    }
    document.querySelector(".song-info").innerHTML = decodeURI(track);
    // document.querySelector(".song-time").innerHTML = "00:00 / 00:00";
    document.querySelector(".song-start").innerHTML = "00:00";
    document.querySelector(".song-end").innerHTML = "00:00";

}

// async function displayAlbums() {
//     let a = await fetch("/spotify/songs/");
//     let response = await a.text();
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let anchors = div.getElementsByTagName("a");
//     let cardContainer = document.querySelector(".card-container");
//     let array = Array.from(anchors);
//     for (let index = 0; index < array.length; index++) {
//         const e = array[index];

//         if (e.href.includes("/spotify/songs/")) {
//             console.log(e.href);
//             let folder = e.href.split("/").slice(-1)[0];
//             // get metadata of the folder
//             let a = await fetch(`/spotify/songs/${folder}/info.json`);
//             let response = await a.json();
//             console.log(response);
//             cardContainer.innerHTML = cardContainer.innerHTML + `<div class="spotify-card card col-lg-2 col-md-3 col-sm-3 col-4 me-1 p-2" data-folder="${folder}">
//             <div class="play p-0 m-0 d-flex align-items-center justify-content-center">
//                 <i class="bi bi-play-fill p-0 m-0"></i>
//             </div>
//             <div class="image rounded overflow-hidden">
//                 <img src="/spotify/songs/${folder}/cover.jpeg" alt="${folder}" class="w-100 h-100">
//             </div>
//             <div class="card-body p-0">
//                 <h6 class="card-title p-1 mb-0">${response.title}</h6>
//                 <p class="card-text text-secondary pb-1">${response.description}</p>
//             </div>
//             </div>`;
//         }
//     }

//     // load the playlist whenever card is clicked;
//     Array.from(document.getElementsByClassName("card")).forEach(e => {
//         e.addEventListener("click", async item => {
//             songs = await getSongs(`/spotify/songs/${item.currentTarget.dataset.folder}/`);
//             playMusic(songs[0]);
//         })
//     })

//     const scrollAmount = 300; // Adjust as needed
//     cardContainer = Array.from(document.querySelectorAll(".card-container"));

//     const left = document.querySelectorAll('.scrollLeftBtn');

//     Array.from(left).forEach(element => {
//         console.log(element);
//         element.addEventListener('click', () => {       
//         // cardContainer.forEach(e =>{
//         //     e.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//         // })

//         const container = element.closest('.cards-here').querySelector('.card-container');
//         container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//     });
//     });


//     const right = document.querySelectorAll('.scrollRightBtn');

//     Array.from(right).forEach(element => {
//         console.log(element);
//         element.addEventListener('click', () => {
//         //     cardContainer.forEach(e =>{
//         //     e.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//         // })

//         const container = element.closest('.cards-here').querySelector('.card-container');
//         container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     });
//     });
// }


async function displayAlbums(folder) {
    currFolder = folder;
    let currFolderName = currFolder.split("/").slice(-2)[0];
    console.log(currFolderName);

    let spotifyList = document.createElement("div");
    spotifyList.className = "spotify-playlists";
    let mainBox = document.querySelector('.main-box');
    mainBox.appendChild(spotifyList);
    console.log(spotifyList);

    let a1 = await fetch(currFolder);
    let response1 = await a1.text();
    // console.log(response);

    let div1 = document.createElement("div");
    div1.innerHTML = response1;
    console.log(div1);

    let anchors1 = div1.getElementsByTagName("a");
    let array1 = Array.from(anchors1);
    console.log(array1);

    for (let i = 0; i < array1.length; i++) {
        const e1 = array1[i];
        // console.log(e.href.includes(currFolder));

        if (e1.href.includes(currFolder)) {
            let folder = e1.href.split("/").slice(-1)[0];

            // STEP 1: Create a fresh playlist section for this category
            let spotifyList = document.createElement("div");
            spotifyList.className = "spotify-playlists";
            spotifyList.innerHTML = `
        <h4 class="p-2 fw-bold m-2">${folder.charAt(0).toUpperCase()+ folder.slice(1).replaceAll("%20", " ")}</h4>
        <div class="cards-here">
            <div class="scrollLeftBtn d-flex justify-content-center align-items-center p-0 m-0"
                type="button">
                <i class="bi bi-chevron-left fw-bold fs-4"></i>
            </div>

            <div class="card-container d-flex g-3 align-items-center ps-3"></div>

            <div class="scrollRightBtn d-flex justify-content-center align-items-center p-0 m-0"
                type="button">
                <i class="bi bi-chevron-right fw-bold fs-4"></i>
            </div>
        </div>
    `;
            document.querySelector(".main-box").appendChild(spotifyList);

            // STEP 2: Get subfolders (each song folder inside this category)
            let a = await fetch(`/spotify/songs/${folder}/`);
            let response = await a.text();
            let div = document.createElement("div");
            div.innerHTML = response;
            let anchors = div.getElementsByTagName("a");

            for (let index = 0; index < anchors.length; index++) {
                const e = anchors[index];

                if (e.href.includes(`/spotify/songs/${folder}/`)) {
                    let subfolder = e.href.split("/").slice(-1)[0];

                    // STEP 3: Fetch song metadata
                    try {
                        let res = await fetch(`/spotify/songs/${folder}/${subfolder}/info.json`);
                        let meta = await res.json();

                        // STEP 4: Add this song card to THIS folder's card-container
                        let cardContainer = spotifyList.querySelector(".card-container");

                        let card = document.createElement("div");
                        card.className = "spotify-card card col-lg-2 col-md-3 col-sm-3 col-4 me-1 p-2";
                        card.dataset.folder = `${folder}/${subfolder}`;
                        card.innerHTML = `
                    <div class="play p-0 m-0 d-flex align-items-center justify-content-center">
                        <i class="bi bi-play-fill p-0 m-0"></i>
                    </div>
                    <div class="image rounded overflow-hidden">
                        <img src="/spotify/songs/${folder}/${subfolder}/cover.jpeg" alt="${subfolder}" class="w-100 h-100">
                    </div>
                    <div class="card-body p-0">
                        <h6 class="card-title p-1 mb-0">${meta.title}</h6>
                        <p class="card-text text-secondary pb-1">${meta.description}</p>
                    </div>
                `;
                        card.addEventListener("click", async () => {
                            let songs = await getSongs(`/spotify/songs/${folder}/${subfolder}/`);
                            playMusic(songs[0]);
                        });

                        cardContainer.appendChild(card);
                    } catch (err) {
                        console.warn("Missing or broken info.json in:", subfolder);
                    }
                }
            }
        }
    }


    // load the playlist whenever card is clicked;
    // Array.from(document.getElementsByClassName("card")).forEach(e => {
    //     e.addEventListener("click", async item => {
    //         songs = await getSongs(`/spotify/songs/${item.currentTarget.dataset.folder}/`);
    //         playMusic(songs[0]);
    //     })
    // })

    const scrollAmount = 300; // Adjust as needed
    let cardContainer = Array.from(document.querySelectorAll(".card-container"));

    const left = document.querySelectorAll('.scrollLeftBtn');

    Array.from(left).forEach(element => {
        console.log(element);
        element.addEventListener('click', () => {
            // cardContainer.forEach(e =>{
            //     e.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            // })

            const container = element.closest('.cards-here').querySelector('.card-container');
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    });


    const right = document.querySelectorAll('.scrollRightBtn');

    Array.from(right).forEach(element => {
        // console.log(element);
        element.addEventListener('click', () => {
            //     cardContainer.forEach(e =>{
            //     e.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            // })

            const container = element.closest('.cards-here').querySelector('.card-container');
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    });
}


async function main() {
    await getSongs("/spotify/songs/bhajan/Sunderkand/");
    // console.log(songs); //list of songs
    playMusic(songs[0], true);

    // Display all the albums on the page
    displayAlbums("/spotify/songs/");

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
    const next = document.querySelector(".bi-skip-forward-fill");

    prev.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1]);
        }
    })

    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1]);
        }
    });

    // Add an event to volume
    document.querySelector(".song-volume").getElementsByTagName("input")[0].addEventListener("input", (e) => {
        console.log("Setting volume to", ((e.target.value) / 100), "/100");
        currentSong.volume = parseInt(e.target.value) / 100;
    })



    // Add eventlistener to mute the track
    const vol = document.querySelector(".song-volume i");
    vol.addEventListener("click", function (e) {
        vol.classList.toggle("bi-volume-mute");
        if (vol.classList.contains("bi-volume-mute")) {
            currentSong.volume = 0;
            document.querySelector(".song-volume").getElementsByTagName("input")[0].value = 0;
        }
        vol.classList.toggle("bi-volume-up")
        if (vol.classList.contains("bi-volume-up")) {
            currentSong.volume = 0.50;
            document.querySelector(".song-volume").getElementsByTagName("input")[0].value = 50;
        }
    })

}

main()

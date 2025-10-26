const songs = [
    { title: "Rolling", artist: "alsander", length: "1:13", src: "assets/songs/alsander - rolling.mp3", cover_art: "assets/cover1.jpeg", liked: 1 },
    { title: "Make Me Sad", artist: "Ketsa", length: "3:13", src: "assets/songs/Ketsa - Make Me Sad.mp3", cover_art: "assets/cover2.jpeg", liked: 1 },
    { title: "Kura", artist: "Maarten Schellekens", length: "3:29", src: "assets/songs/Maarten Schellekens - Kura.mp3", cover_art: "assets/cover3.jpg", liked: 1 },
    { title: "Mutant Club", artist: "HoliznaCC0", length: "2:10", src: "assets/songs/HoliznaCC0 - Mutant Club.mp3", cover_art: "assets/cover4.jpeg", liked: 1 }
];

songs.forEach(item => {
    if(item.liked == 1){
        const all_songs = document.getElementById("songs_list");
        const li = document.createElement("li");  //this will be each <li> element from my <ul> songs_list from HTML
        li.classList.add("mini_song");
        li.dataset.src = item.src;

        const cover_art = document.createElement("img");
        cover_art.classList.add("mini_cover");
        cover_art.src = item.cover_art;

        const title = document.createElement("p");
        title.classList.add("mini_title");
        title.textContent = item.title;

        const artist = document.createElement("p");
        artist.classList.add("mini_artist");
        artist.textContent = item.artist;

        const length = document.createElement("p");
        length.classList.add("mini_duration");
        length.textContent = item.length;

        const play_button = document.createElement("button");
        play_button.classList.add("playBtn");
        const button_image = document.createElement("img");
        button_image.src = "/assets/miniPlayButton.png";
        button_image.classList.add("mini_play_buttons");
        play_button.append(button_image);

        const heart_image = document.createElement("img");
        heart_image.classList.add("mini_full_hearts");
        heart_image.src = "/assets/fullHeart.png";
        

        li.append(cover_art, title, artist, length, play_button, heart_image);
        all_songs.append(li);
    }
})


const buttons = document.querySelectorAll(".playBtn"); // gets all the elements having the class(our case) or identifier "playBtn"
const audioPlayer = document.getElementById("audioPlayer"); // gets the elements having the class or identifier(our case) "audioPlayer"
//------!!! IMPORTANT !!!--------   audioPlayer.src will contain the song currently playing
let currentSong = ""; // keeps track of the loaded song (the song currently playing)

const universal_title = document.getElementById("song_title") //getting the element with the ID = song_title
const universal_artist = document.getElementById("artist")
const universal_picture = document.getElementById("picture_frame");


/* for main button section */
mainButton = document.querySelector(".play_button");
image_on_mainButton = document.getElementById("play_triangle");
const progressBar = document.getElementById("progressBar");
let current_mini_button = null;


let previousSongLi = null; //will use this to restore the old color of the details of the song; I will save the previous li


buttons.forEach(button => {
    button.addEventListener("click", () => { // For this specific button (the one I’m currently looping over), whenever it’s clicked
        const clickedSong = button.closest("li").dataset.src; // gets the song the user clicked on
        const li = button.closest("li"); // We use li as a shortcut to refer to the whole song item that the button belongs to.
                                        // Once we have it, we can easily get all the details of that song.
        const current_title = li.querySelector(".mini_title").textContent; //getting the value (with .textContent) of the element with the class "mini_title"
        const current_artist = li.querySelector(".mini_artist").textContent; //we use .querySelector() here because we only need the element having the class "mini_artist" from our current <li>; 
                                                                            // we don't need all the elements having the class "mini_artist"

        const current_title_to_color = li.querySelector(".mini_title"); //getting the value (with .textContent) of the element with the class "mini_title"
        const current_artist_to_color = li.querySelector(".mini_artist");
        const current_time_to_color = li.querySelector(".mini_duration");

        const current_picture = li.querySelector(".mini_cover").src; // if we were to use .getElementById(), it would have returned all the elements from the class (we use it only for IDs)
        const play_image = li.querySelector(".mini_play_buttons");

        if (clickedSong === currentSong) {
            // Same song → toggle play/pause
            if (audioPlayer.paused) { //the .paused property tells us if a song is playing (then .paused == true) or if it is on pause (then .paused == false)
                audioPlayer.play();
                play_image.src="/assets/miniPauseButton.png";
                image_on_mainButton.src = "assets/pauseButton.png";
                current_mini_button = li.querySelector(".mini_play_buttons"); //selecting the mini button corresponding to the current playing song so I can change the icon when the main button gets clicked
            } 
            else {
                audioPlayer.pause();
                play_image.src="/assets/miniPlayButton.png";
                image_on_mainButton.src = "assets/playButton.png";
            }
        } 
        else {
            // Different song → load and play
            audioPlayer.src = clickedSong; 
            universal_title.textContent = current_title; //need to update the details of the current playing song
            universal_artist.textContent = current_artist;
            universal_picture.style.backgroundImage = `url(${current_picture})`;
            universal_picture.style.backgroundSize = "cover"; //the image covers the entire div
            universal_picture.style.backgroundPosition = "center"; //the image is centered in the div
            universal_picture.style.backgroundRepeat = "no-repeat"; //the image doesn't tile
            
            if(previousSongLi) {
                previousSongLi.querySelector(".mini_title").style.color = "#FEF2E3"; //changing back to old color once a new song gets selected
                previousSongLi.querySelector(".mini_artist").style.color = "#FEF2E3";
                previousSongLi.querySelector(".mini_duration").style.color = "#FEF2E3";
                //li.style.backgroundColor = "#100320";
                previousSongLi.style.backgroundColor = "";
            }     
            current_title_to_color.style.color = "#FF175D";
            current_artist_to_color.style.color = "#FF175D";
            current_time_to_color.style.color = "#FF175D";
            li.style.backgroundColor = "#36062F";

            previousSongLi = li; //updating the previous li, now it holds the current li, once this one is also replaced, the colors go back to white

            play_image.src="/assets/miniPauseButton.png"; //changing images related to play/pause buttons
            image_on_mainButton.src = "assets/pauseButton.png";
            current_mini_button = li.querySelector(".mini_play_buttons");

            audioPlayer.play();
            currentSong = clickedSong; // remember the new song
        }
    });
});


/* for main button section */
mainButton.addEventListener("click", () => {
    if(audioPlayer.paused) {
        audioPlayer.play();
        image_on_mainButton.src = "assets/pauseButton.png";
        if(current_mini_button) { //changing images related to play/pause buttons
            current_mini_button.src = "/assets/miniPauseButton.png";
        }
    }
    else {
        audioPlayer.pause();
        image_on_mainButton.src = "assets/playButton.png";
        if(current_mini_button){ //changing images related to play/pause buttons
            current_mini_button.src = "/assets/miniPlayButton.png";
        }
    }
});


/* Controling the progress bar */
audioPlayer.addEventListener("timeupdate", () => {
    const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100; //audioPlayer.currentTime -> current position in seconds; audioPlayer.duration -> total length (in seconds)
    progressBar.value = percentage;
});

/* When the user grabs the bar */
progressBar.addEventListener("input", () => {
    const newTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = newTime;
});


//searching for a song 
const search_button = document.getElementById('search_button');
const input = document.getElementById('user_input');
const modal = document.getElementById('results_square');
const close_button = document.querySelector('.close');
const modal_body = document.getElementById('modal_body');

search_button.addEventListener("click", () => {
    
    modal.style.display = 'block';
    const results = document.querySelector(".modal_content");
    results.innerHTML = "";

    const user_input = input.value.trim();  //we use trim() to remove any extra spaces
    results.innerHTML =  `<p style="color: #FEF2E3">What we found for "<span style="color: #FEF2E3">${user_input}</span>"...</p>`;


    // add delegated click handler once (idempotent guard)
    if (!results._hasDelegatedClick) {
        results.addEventListener('click', (e) => {
            const li = e.target.closest('.matching_title');
            if (!li) return;
            console.log('You clicked:', li.textContent);
            // optional: find song object and play it
            // const song = songs.find(s => s.title === li.textContent);
            // if (song) { audioPlayer.src = song.src; audioPlayer.play(); }
        });
        results._hasDelegatedClick = true;
    }

    
    songs.forEach(item => {
        if(item.title.toLowerCase().includes(user_input.toLowerCase())){
            const matching_title = document.createElement("li");
            matching_title.classList.add("matching_title");
            matching_title.textContent = item.title;
            matching_title.style.marginBottom = "10px";
            matching_title.style.cursor = "pointer";

            matching_title.addEventListener("click", () => {
                console.log("You clicked:", item.title);
            });

            results.append(matching_title);
        }   
    });
});

close_button.addEventListener("click", () => {
    modal.style.display = 'none';
});

//this funcion closes the modal wherever we click on the dark background
window.addEventListener('click', (event) => { 
    if (event.target === modal) modal.style.display = 'none';
});








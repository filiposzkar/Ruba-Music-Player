const songs = [
    { title: "Rolling", artist: "alsander", length: "1:13", src: "assets/songs/alsander - rolling.mp3", cover_art: "assets/cover1.jpeg", liked: 1 },
    { title: "Make Me Sad", artist: "Ketsa", length: "3:13", src: "assets/songs/Ketsa - Make Me Sad.mp3", cover_art: "assets/cover2.jpeg", liked: 1 },
    { title: "Kura", artist: "Maarten Schellekens", length: "3:29", src: "assets/songs/Maarten Schellekens - Kura.mp3", cover_art: "assets/cover3.jpg", liked: 1 },
    { title: "Mutant Club", artist: "HoliznaCC0", length: "2:10", src: "assets/songs/HoliznaCC0 - Mutant Club.mp3", cover_art: "assets/cover4.jpeg", liked: 1 },
    { title: "We Have All We've Ever Wanted", artist: "YACHT", length: "4:22", src:"assets/songs/YACHT - We Have All We've Ever Wanted.mp3", cover_art: "assets/cover5.jpg", liked: 0}
];


songs.forEach(item => {
    if(item.liked == 1){
        const all_songs = document.getElementById("songs_list");
        const li = document.createElement("li");  //this will be each <li> element from my <ul> songs_list from HTML
        li.classList.add("mini_song");
        li.dataset.src = item.src;
        // <li class="mini_song" data-src="item.src">
        // </li>
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
const heart = document.getElementById("biggest_heart");
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
                songs.forEach(song => {
                    const full_path = new URL(song.src, window.location.origin).href;
                    if(audioPlayer.src == full_path && song.liked == 1){
                        heart.src = "/assets/fullHeart.png";
                    }
                    else if(audioPlayer.src == full_path && song.liked == 0){
                        heart.src = "/assets/emptyHeart.png";
                    }
                })
            } 
            else {
                audioPlayer.pause();
                play_image.src="/assets/miniPlayButton.png";
                image_on_mainButton.src = "assets/playButton.png";
                songs.forEach(song => {
                    const full_path = new URL(song.src, window.location.origin).href;
                    if(audioPlayer.src == full_path && song.liked == 1){
                        heart.src = "/assets/fullHeart.png";
                    }
                    else if(audioPlayer.src == full_path && song.liked == 0){
                        heart.src = "/assets/emptyHeart.png";
                    }
                })
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
            //item.title.toLowerCase().includes(user_input.toLowerCase()))
            
            songs.forEach(song => {
                const full_path = new URL(song.src, window.location.origin).href;
                if(audioPlayer.src == full_path && song.liked == 1){
                    heart.src = "/assets/fullHeart.png";
                }
                else if(audioPlayer.src == full_path && song.liked == 0){
                    heart.src = "/assets/emptyHeart.png";
                }
            })
            
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

// adding the song the "liked songs" category if the heart image is clicked 
heart.addEventListener("click", () => {
    songs.forEach(song => {
        const full_path = new URL(song.src, window.location.origin).href;
        if(audioPlayer.src == full_path){
            currentSong = song;
        }
    })

    const all_songs = document.getElementById("songs_list");
    const li = document.createElement("li"); 
    if(currentSong.liked == 0){
        
        li.classList.add("mini_song");
        li.dataset.src = currentSong.src;
        // <li class="mini_song" data-src="item.src">
        // </li>
        const cover_art = document.createElement("img");
        cover_art.classList.add("mini_cover");
        cover_art.src = currentSong.cover_art;

        const title = document.createElement("p");
        title.classList.add("mini_title");
        title.textContent = currentSong.title;

        const artist = document.createElement("p");
        artist.classList.add("mini_artist");
        artist.textContent = currentSong.artist;

        const length = document.createElement("p");
        length.classList.add("mini_duration");
        length.textContent = currentSong.length;

        const play_button = document.createElement("button");
        play_button.classList.add("playBtn");
        const button_image = document.createElement("img");
        button_image.src = "/assets/miniPlayButton.png";
        button_image.classList.add("mini_play_buttons");
        play_button.append(button_image);

        const heart_image = document.createElement("img");
        heart_image.classList.add("mini_full_hearts");
        heart_image.src = "/assets/fullHeart.png";

        currentSong.liked = 1;
        heart.src = "assets/fullHeart.png";

        li.append(cover_art, title, artist, length, play_button, heart_image);
        all_songs.append(li);
    }
    else if(currentSong.liked == 1){
        const li_to_remove = all_songs.querySelector(`li[data-src="${currentSong.src}"]`);
        if(li_to_remove){
            li_to_remove.remove();
            currentSong.liked = 0;
            heart.src = "/assets/emptyHeart.png";
        }
    }
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

    songs.forEach(item => {
        if(item.title.toLowerCase().includes(user_input.toLowerCase())){
            const matching_title = document.createElement("li");
            matching_title.classList.add("matching_title");
            matching_title.textContent = item.title;
            matching_title.style.marginBottom = "10px";
            matching_title.style.cursor = "pointer";

            
            matching_title.addEventListener("click", () => {
                
                const displaying_title = document.getElementById("song_title");
                displaying_title.textContent = item.title;

                const displaying_artist = document.getElementById("artist");
                displaying_artist.textContent = item.artist;

                const displaying_square = document.getElementById("picture_frame");
                displaying_square.style.backgroundImage = `url(${item.cover_art})`;
                displaying_square.style.backgroundSize = "cover"; //the image covers the entire div
                displaying_square.style.backgroundPosition = "center"; //the image is centered in the div
                displaying_square.style.backgroundRepeat = "no-repeat"; //the image doesn't tile

                currentSong = item;
                audioPlayer.src = currentSong.src;
                audioPlayer.play();
                const playing_triangle = document.getElementById("play_triangle");
                playing_triangle.src = "assets/pauseButton.png";

                songs.forEach(song => {
                    const full_path = new URL(song.src, window.location.origin).href;
                    if(audioPlayer.src == full_path && song.liked == 1){
                        heart.src = "/assets/fullHeart.png";
                    }
                    else if(audioPlayer.src == full_path && song.liked == 0){
                        heart.src = "/assets/emptyHeart.png";
                    }
                })
            });

            results.append(matching_title);
        }   
    });
});


close_button.addEventListener("click", () => {
    modal.style.display = 'none';
});


//this addEventListener closes the modal wherever we click on the dark background
window.addEventListener('click', (event) => { 
    if (event.target === modal) modal.style.display = 'none';
});


function find_cover_art_of_song() {
    const path = decodeURIComponent(new URL(audioPlayer.src).pathname).replace(/^\/+/, ""); //the src attribute of a song
    // decodeURIComponent converts URL-encoded characters back to normal text; URL uses different notations for different things; ex: space in URL is %20
    // so it will return the path of the song, but wherever there is space, it will add %20, and we don't want that, cause that is not how we have the path of the song stored
    // .replace() replaces all slashes with "", to make sure that the number of slashes is not different (it removes the slashes from the beginning)
    for(const song of songs){
        if(song.src === path){
            return song.cover_art;
        }
    }
    return null;
}


//k-means clustering algorithm
const extend_button = document.getElementById("extend_icon");

// Step 1 -> transforming our image into a dataset   

const dataSet = []; //this will be a list of sublists, where a sublist is [R, G, B] of a single pixel
const img = new Image(); // the selected image will be loaded into img
img.onload = function() { //when the image finally loaded into img
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d"); //Gets the 2D drawing context — the API that lets you draw pixels.

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0); //draws the loaded image onto the canvas

    const imageData = ctx.getImageData(0, 0, img.width, img.height).data; //reads all the pixels from the canvas, and returns an object of type .data
    // .data is a huge array, that can look like this: [R, B, G, A, R, G, B, A, R, G, B, A, ...] 4 numbers per pixel
    
    // we do this in order to "get rid" of the A of each pixel
    for(let i = 0; i < imageData.length; i+=4){
        const r = imageData[i];
        const g = imageData[i+1];
        const b = imageData[i+2];

        dataSet.push([r, g, b]);
    }

    // Step 2 -> choosing k random cluster points from dataset
    const k = 5;
    const centroids = []; //here we will store our cluster points (the k representitive colors)
    const used_indices = new Set(); //we want to keep track of the used indices for cluster points, because we dont want the same pixel being the cluster point for multiple groups at once
    while(centroids.length < k) {
        const random_index = Math.floor(Math.random() * (dataSet.length - 1));
        if(!used_indices.has(random_index)){
            const random_pixel = dataSet[random_index];
            centroids.push(random_pixel);
            used_indices.add(random_index);
        }
    }    

    
    let converged = false;
    let iterations = 0;
    const max_iterations = 15;

    const clusters = []; //this will be an array of k subarrays, each subarray representing a cluster/group of pixels (arrays of pixels assigned to each centroid)
    for(let i = 0; i < k; i++){
        clusters.push([]);
    }

    while(converged == false && iterations < max_iterations){
        iterations++;

        const old_centroids = []; // here we will keep a deep copy of our centroids, because they will change throughout the execution
        // and we will need to check the old and new values later on
        for(let i = 0; i < centroids.length; i++){
            const copy = [ centroids[i][0], centroids[i][1], centroids[i][2] ];
            old_centroids.push(copy);
        }


        // Step 3 -> Assign every pixel from the dataset to its closest cluster point
        dataSet.forEach(pixel => {
            let min_distance = Infinity;
            let cluster_index = 0;

            centroids.forEach((centroid, centroid_index) => { //the second parameter of forEach is always the centroid_index
                const red = pixel[0] - centroid[0];
                const green = pixel[1] - centroid[1];
                const blue = pixel[2] - centroid[2];
                const distance = Math.sqrt(red*red + green*green + blue*blue); //computing the distance between the current pixel and current centroid
                //we use the Euclidian formula for this

                if(distance < min_distance) {
                    min_distance = distance;
                    cluster_index = centroid_index;
                }
            });

            clusters[cluster_index].push(pixel); //we will add the pixel into the subarray in the coresponding array of the centroid (on position cluster_index)
        });




        // Step 4 -> Computing the mean RGB of each cluster
        // we do this, because we no longer want the centroid of this cluster to be a random pixel, but to be in the middle of its cluster
        // this makes sure that the algorithm improves -> will talk about it later
        for(let i = 0; i < k; i++){
            let mean_red = 0;
            let mean_green = 0;
            let mean_blue = 0;

            for (let j = 0; j < clusters[i].length; j++) {
                mean_red += clusters[i][j][0];
                mean_green += clusters[i][j][1];
                mean_blue += clusters[i][j][2];
            }

            mean_red /= clusters[i].length;
            mean_green /= clusters[i].length;
            mean_blue /= clusters[i].length;

            const new_centroid = [mean_red, mean_green, mean_blue];
            centroids[i] = new_centroid;
        }


        // Step 5 -> Check if the centroids changed
        // This step is important, because, in the case that the centroids have not changed, that means that the algorithm is over.
        // If the centroids have not changed, then it means that they have reached their final possible positions, so it is useless to continue
        // the algorithm, cause the effect will be the same.
        let count = 0;
        for(let i = 0; i < centroids.length; i++){
            const current = centroids[i];
            const previous = old_centroids[i];
            if(current[0] == previous[0] && current[1] == previous[1] && current[2] == previous[2]) {
                count++;
            }
            else{
                break;
            }
        }
        if(count == centroids.length){
            converged = true;
            break;
        }

        // The k-means cluster algorithm has finished here, next up I will set some squares' colors to the colors "computed" above

        // Step 6 -> Receiving the colors
        // const collorPallete = document.getElementById("color_pallete");

        // for(let i = 0; i < centroids.length; i++){
        //     const [r, g, b] = centroids[i];
        //     const colorful_square = document.createElement("div");

        //     colorful_square.style.backgroundColor = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
        //     colorful_square.style.height = "50px";
        //     colorful_square.style.width = "50px";

        //     collorPallete.appendChild(colorful_square);
        // }
        
        debugger
        centroids.forEach((centroid, index) => {
            const [r, g, b] = centroid.map(Math.round); // rounding the values to integers
            const RGBstring = `rgb(${r}, ${g}, ${b})`; // create a valid CSS colour
            document.documentElement.style.setProperty(`--centroid-${index}`, RGBstring);

            //document.documentElement -> modifying styles globally, for the whole document
            //.style.setProperty(`--centroid-${index}`, centroid); -> creates a CSS variable on the <html> element
        })
    }
};

//img.onerror = () => { alert("img error") }

extend_button.addEventListener('click', function() { 
    // need to set the img.src to the path of the corresponding image
    const image_path = find_cover_art_of_song();
    img.src = image_path;
})


// animation on cover_art

current_cover_art = document.getElementById("picture_frame")
rectangle_section = document.getElementById("rectangle")
catalogue_section = document.querySelector(".catalogue")
artist_label = document.getElementById("artist")
title_label = document.getElementById("song_title")
control_buttons = document.querySelector(".controls")
let moved = false;

current_cover_art.addEventListener('click', () => {
    debugger
    
    // const image_path = find_cover_art_of_song();
    // img.src = image_path;

    rectangle_section.style.animation = "none"; 
    void rectangle_section.offsetWidth;   

    if(!moved) {
        rectangle_section.style.animation = "expand_rectangle 1s forwards";  
        catalogue_section.style.animation = "hide_catalogue 0.85s forwards";
        title_label.style.backgroundColor = "transparent";
        artist_label.style.backgroundColor = "transparent";
        control_buttons.style.backgroundColor = "transparent"
    }
    else {
        rectangle_section.style.animation = "shrink_rectangle 1s forwards";
        catalogue_section.style.animation = "show_catalogue 0.85s forwards"; 
        title_label.style.backgroundColor = "#251737";
        artist_label.style.backgroundColor = "#251737";
        control_buttons.style.backgroundColor = "#251737";
    }
    moved = !moved;
})
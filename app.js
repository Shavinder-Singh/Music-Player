let currentMusic = 0;
const music = document.querySelector("#audio");
const seekBar = document.querySelector(".seek-bar");
const songName = document.querySelector(".music_name");
const artistName = document.querySelector(".artist_name");
const disk = document.querySelector(".disk");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".song-duration");
const playBtn = document.querySelector(".play-btn");
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");

playBtn.addEventListener("click", () => {
    if (playBtn.className.includes('pause')) {
        music.play();
    }
    else {
        music.pause();
    }
    playBtn.classList.toggle("pause");
    disk.classList.toggle("play")
});
//setup Music
const setMusic = (i) => {
    seekBar.value = 0;//set range Slide value to 0
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;
    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;
    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = music.duration;
        console.log(music.duration);
        musicDuration.innerHTML = formatTime(music.duration);

    }, 300);
}
//formatting time in min and seconds format
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`
}
setMusic(0);

//Seek Bar
setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
}, 500);
seekBar.addEventListener("change", () => {
    music.currentTime = seekBar.value;
});

const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
}


//forward backward Buttons
forwardBtn.addEventListener("click", () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    }
    else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
});


backwardBtn.addEventListener("click", () => {
    if (currentMusic <= songs.length - 1) {
        console.log(currentMusic)
        currentMusic = 0;
    }
    else {
        currentMusic--;
    }   
    setMusic(currentMusic);
    playMusic();
});

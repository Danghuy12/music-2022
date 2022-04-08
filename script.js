const music = document.querySelector('audio');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const image = document.querySelector('img');
const songName = document.querySelector('h2')
const artist = document.querySelector('h3');
const body = document.querySelector('body');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
// data
const songs = [
    {
        name: 'monster',
        displayName: 'Monster',
        artist: 'Dang Huy',
        bg: 'https://dlcdnrog.asus.com/rog/media/1620398675998.jpg'
    },
    {
        name: 'reality',
        displayName: 'Reality',
        artist: 'Lost Freq',
        bg: 'https://i.pinimg.com/originals/e5/61/c3/e561c3dcef1268ddb63f5e306377487a.jpg'
    },
    {
        name: 'jacinto-3',
        displayName: 'Jacinto',
        artist: 'Jacin',
        bg: 'https://dlcdnrog.asus.com/rog/media/1620398675998.jpg'
    },

];

// is pplaying boolean
let isPlaying = false

// play music function
const playSong = () => {
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause')
    music.play();
}

// pause song function
const pauseSong = () => {
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play')
    music.pause()
}

// next and back
let songIndex = 0;

const prevSong = () => {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
}

const nextSong = () => {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
}

// load song follow data
function loadSong(song) {
    music.src = `./music/${song.name}.mp3`;
    image.src = `./img/${song.name}.jpeg`;
    songName.textContent = `${song.displayName}`;
    artist.textContent = `${song.artist}`;
    body.style.backgroundImage = `url(${song.bg})`
    playSong()
}

loadSong(songs[0])

// progress bar
const updateProgressBar = (event) => {
    const { currentTime, duration } = event.srcElement;
    // percent progress bar
    progress.style.width = `${(currentTime / duration) * 100}%`
    // duration
    let durationMin = Math.floor(duration / 60);
    let durationSecond = Math.floor(duration % 60);
    if (durationSecond < 10) {
        durationSecond = `0${durationSecond}`
    }
    if (durationSecond) {
        durationEl.textContent = `${durationMin}:${durationSecond}`
    }
    //current time
    let currentTimeMin = Math.floor(currentTime / 60);
    let currentTimeSecond = Math.floor(currentTime % 60);
    if (currentTimeSecond < 10) {
        currentTimeSecond = `0${currentTimeSecond}`
    }
    currentTimeEl.textContent = `${currentTimeMin}:${currentTimeSecond}`
}

//set progress bar
const setProgressBar = (e) => {
    let clickX = e.offsetX;
    let width = e.srcElement.clientWidth;
    let { duration } = music;
    music.currentTime = (clickX / width) * duration;

}



// play or pause music eventlistener
playButton.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// next and back
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

// time 
music.addEventListener('timeupdate', updateProgressBar)

//set progress bar
progressContainer.addEventListener('click', setProgressBar)

// end song
music.addEventListener('ended', nextSong)

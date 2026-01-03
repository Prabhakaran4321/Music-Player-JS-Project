
const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: './Music/Lukas Graham - 7 Years [Official Music Video].mp3',
        displayName: '7 Years',
        cover: './images/7 years.jpeg',
        artist: 'Lukas Graham',
    },
      {
        path: './Music/Justin Bieber - Baby ft. Ludacris.mp3',
        displayName: 'Baby',
        cover: './images/baby.jpeg',
        artist: 'Justin Biber',
    },
      {
        path: './Music/Ed Sheeran - Perfect (Lyrics).mp3',
        displayName: 'Perfect',
        cover: './images/perfect.jpeg',
        artist: 'Ed Sheeran',
    },
     {
        path: './Music/I wanna be yours - arctic monkeys.mp3',
        displayName: 'I Wanna Be Yours',
        cover: './images/I wanna be yours.jpeg',
        artist: 'Arctic Monkeys',
    },
    {
        path: './Music/Wiz Khalifa - See You Again ft. Charlie Puth [Official Video] Furious 7 Soundtrack.mp3',
        displayName: 'See You Again',
        cover: './images/see you again.jpeg',
        artist: 'Wiz Khalifa',
    }
   
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);

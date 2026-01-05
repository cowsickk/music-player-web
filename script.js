const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const songListUI = document.getElementById('song-list');
const volumeSlider = document.getElementById('volume');

const songs = [
    { 
        name: 'Smooth Flow', 
        artist: 'Relaxation King', 
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        cover: 'https://cdn.pixabay.com/audio/2025/03/19/08-31-17-905_200x200.png' // Smooth/Concert vibe
    },
    { 
        name: 'Evening Vibes', 
        artist: 'Lofi Beats', 
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        cover: 'https://images.pexels.com/photos/18624571/pexels-photo-18624571/free-photo-of-brunette-woman-in-coat-looking-up-in-evening.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' // Lofi/Coffee vibe
    },
    { 
        name: 'Deep Focus', 
        artist: 'Ambient Echoes', 
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        cover: 'https://flypaper.soundfly.com/wp-content/uploads/2022/05/nature-recordings-header.jpg' 
    },
    { 
        name: 'Urban Night', 
        artist: 'Cityscape', 
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500' 
    },
    { 
        name: 'Piano Dreams', 
        artist: 'Melodic Soul', 
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        cover: 'https://cdn.merriammusic.com/2018/08/piano-vs-keyboard-800x533.jpeg'
    },
    {
        name: 'Electric City', 
        artist: 'Neon Pulse', 
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        cover: 'https://m.media-amazon.com/images/I/81Qh4ZP9k8L.jpg' 
    },
    { name: 'Summer Drive',
        artist: 'The Runners',
         url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
        cover: 'https://i.scdn.co/image/ab67616d0000b27327fdc748d357dba629b49dfe'
    },
    { name: 'Digital Sky',
         artist: 'Techno Wave',
          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
         cover: 'https://yt3.googleusercontent.com/ytc/AIdro_kpudvtzlcLZ2o33XYlIH4_lEV7bfpoZTaoo7_nk8CYTp4=s900-c-k-c0x00ffffff-no-rj'
    }
];
let songIndex = 0;
let isPlaying = false;

function loadPlaylist() {
    songListUI.innerHTML = ''; // Clear current UI
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerText = song.name;
        li.setAttribute('data-index', index);
        if (index === songIndex) li.classList.add('active');
        
        li.onclick = () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
        };
        songListUI.appendChild(li);
    });
}
const cover = document.getElementById('cover');
function loadSong(song) {
    title.innerText = song.name;
    artist.innerText = song.artist;
    audio.src = song.url;
    cover.src = song.cover;
    document.querySelectorAll('#song-list li').forEach((li, idx) => {
        li.classList.toggle('active', idx === songIndex);
    });
}

function playSong() {
    isPlaying = true;
    playBtn.innerText = 'Pause';
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.innerText = 'Play';
    audio.pause();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const format = (s) => Math.floor(s / 60) + ":" + ("0" + Math.floor(s % 60)).slice(-2);
    document.getElementById('current-time').innerText = format(currentTime);
    if(duration) document.getElementById('duration').innerText = format(duration);
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
}

playBtn.onclick = () => (isPlaying ? pauseSong() : playSong());

nextBtn.onclick = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
};

prevBtn.onclick = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
};

audio.ontimeupdate = updateProgress;
progressContainer.onclick = setProgress;
volumeSlider.oninput = (e) => audio.volume = e.target.value;

audio.onended = () => nextBtn.click();

loadPlaylist();
loadSong(songs[songIndex]);
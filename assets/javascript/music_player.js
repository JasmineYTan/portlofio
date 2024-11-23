document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const seekBar = document.getElementById('seekBar');
    const currentTime = document.getElementById('currentTime');
    const duration = document.getElementById('duration');
    const volumeBar = document.getElementById('volumeBar');
    const songTitle = document.getElementById('songTitle');
    const toggleMusicPlayerBtn = document.getElementById('toggleMusicPlayerBtn');
    const musicPlayer = document.getElementById('musicPlayer');

    const songs = [
        { title: 'Song Title: 2am', src: 'assets/jukebox/2am.mp3' },
        { title: 'Song Title: Dreamland', src: 'assets/jukebox/dreamland.mp3' },
        { title: 'Song Title: Gameplay', src: 'assets/jukebox/gameplay.mp3' },
        { title: 'Song Title: Purple', src: 'assets/jukebox/purple.mp3' },
        { title: 'Song Title: Taiyaki', src: 'assets/jukebox/taiyaki.mp3' },
    ];
    let currentSongIndex = 0;

    function loadSong(index) {
        audioPlayer.src = songs[index].src;
        songTitle.textContent = songs[index].title;
        audioPlayer.load();
    }

    function playPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = 'Play';
        }
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    }

    function updateSeekBar() {
        seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        currentTime.textContent = formatTime(audioPlayer.currentTime);
        duration.textContent = formatTime(audioPlayer.duration);
    }

    function seek(event) {
        const percent = event.offsetX / seekBar.offsetWidth;
        audioPlayer.currentTime = percent * audioPlayer.duration;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateVolume() {
        audioPlayer.volume = volumeBar.value;
    }

    function toggleMusicPlayer() {
        if (musicPlayer.style.display === 'none') {
            musicPlayer.style.display = 'block';
            toggleMusicPlayerBtn.textContent = 'Hide';
        } else {
            musicPlayer.style.display = 'none';
            toggleMusicPlayerBtn.textContent = 'Show';
        }
    }

    playPauseBtn.addEventListener('click', playPause);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audioPlayer.addEventListener('timeupdate', updateSeekBar);
    seekBar.addEventListener('click', seek);
    volumeBar.addEventListener('input', updateVolume);
    toggleMusicPlayerBtn.addEventListener('click', toggleMusicPlayer);

    let isDragging = false;
    let offsetX, offsetY;

    musicPlayer.addEventListener('mousedown', function (event) {
        isDragging = true;
        offsetX = event.clientX - musicPlayer.offsetLeft;
        offsetY = event.clientY - musicPlayer.offsetTop;
    });

    document.addEventListener('mousemove', function (event) {
        if (isDragging) {
            musicPlayer.style.left = `${event.clientX - offsetX}px`;
            musicPlayer.style.top = `${event.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
    });

    loadSong(currentSongIndex);

    audioPlayer.volume = 0.33;
    volumeBar.value = 0.33;
});
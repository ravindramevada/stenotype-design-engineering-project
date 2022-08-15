const playerHover = document.querySelector('.player-hover');
const informationContainer = document.querySelector('.information-container');
const video = document.querySelector('.video');
const videoProgress = document.querySelector('.video-progress');
const videoProgressBar = document.querySelector('.video-progress-bar');
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const backward = document.querySelector('.backward');
const forward = document.querySelector('.forward');
const volume = document.querySelector('.volume');
const mute = document.querySelector('.mute');
const volumeProgress = document.querySelector('.volume-progress');
const volumeProgressBar = document.querySelector('.volume-progress-bar');
const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration');
const fullScreen = document.querySelector('.full-screen');
const exitFullScreen = document.querySelector('.exit-full-screen');
function playVideo() {
    video.play();
    play.hidden = true;
    pause.hidden = false;
}
function pauseVideo() {
    video.pause();
    pause.hidden = true;
    play.hidden = false;
}
function backwardVideo() {
    video.currentTime -= 5;
}
function forwardVideo() {
    video.currentTime += 5;
}
function showVolumeIcon() {
    volume.hidden = false;
    mute.hidden = true;
}
function showMuteIcon() {
    volume.hidden = true;
    mute.hidden = false;
}
function videoTime() {
    let currentMinutes = Math.floor(video.currentTime / 60);
    let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(video.duration / 60);
    let durationSeconds = Math.floor(video.duration - durationMinutes * 60);
    currentTime.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}`;
    duration.innerHTML = `${durationMinutes}:${durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds}`;
}
function fullScreenMode() {
    if (document.body.webkitRequestFullscreen) {
        document.body.webkitRequestFullscreen();
        fullScreen.hidden = true;
        exitFullScreen.hidden = false;
    } else {
        document.body.requestFullscreen();
        fullScreen.hidden = true;
        exitFullScreen.hidden = false;
    }
}
function exitFullScreenMode() {
    if (document.body.webkitRequestFullscreen) {
        document.webkitExitFullscreen();
        fullScreen.hidden = false;
        exitFullScreen.hidden = true;
    } else {
        document.mozCancelFullScreen();
        fullScreen.hidden = false;
        exitFullScreen.hidden = true;
    }
}
// show or hide controls
let timeout = 0;
playerHover.addEventListener('mousemove', () => {
    clearTimeout(timeout);
    playerHover.style.opacity = 1;
    timeout = setTimeout(function () {
        playerHover.style.opacity = 0;
    }, 1000);
});
informationContainer.addEventListener('click', () => {
    if (video.paused) {
        playVideo();
    } else {
        pauseVideo();
    }
});
videoProgress.addEventListener('click', (event) => {
    const progressTime = (event.offsetX / videoProgress.offsetWidth) * video.duration;
    video.currentTime = progressTime;
});
video.addEventListener('loadedmetadata', () => {
    video.volume = 0.5;
    volumeProgressBar.style.width = '50%';
});
video.addEventListener('timeupdate', () => {
    // video current time and duration time
    videoTime();
    // video progress bar
    const percentage = (video.currentTime / video.duration) * 100;
    videoProgressBar.style.width = `${percentage}%`; // template literals
    if (video.currentTime === video.duration) {
        pause.hidden = true;
        play.hidden = false;
    }
});
video.addEventListener('volumechange', () => {
    if (video.volume > 0) {
        showVolumeIcon();
    } else {
        showMuteIcon();
    }
});
// play functionality
play.addEventListener('click', playVideo);
// pause functionality
pause.addEventListener('click', pauseVideo);
// backward functionality
backward.addEventListener('click', () => {
    backwardVideo();
});
// forward functionality
forward.addEventListener('click', () => {
    forwardVideo();
});
volumeProgress.addEventListener('click', (event) => {
    // volume progress bar
    const progressVolume = (event.offsetX / volumeProgress.offsetWidth) * 1;
    const percentage = progressVolume * 100;
    volumeProgressBar.style.width = `${percentage}%`; // template literals
    video.volume = progressVolume;
});
// mute functionality
volume.addEventListener('click', () => {
    showVolumeIcon();
    video.volume = 0;
    volumeProgressBar.style.width = '0';
});
// unmute functionality
mute.addEventListener('click', () => {
    showMuteIcon();
    video.volume = 0.5;
    volumeProgressBar.style.width = '50%';
});
// full-Screen mode functionality
fullScreen.addEventListener('click', fullScreenMode);
// exit full-screen mode functionality
exitFullScreen.addEventListener('click', exitFullScreenMode);
// keyboard functionalities
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case ' ':
            // space key: play/pause
            if (video.paused) {
                playVideo();
            } else {
                pauseVideo();
            }
            break;
        case 'm':
            // letter 'M' key: mute/unmute
            if (volume.hidden == true) {
                showVolumeIcon();
                video.volume = 0.5;
                volumeProgressBar.style.width = '50%';
            } else if (mute.hidden == true) {
                showMuteIcon();
                video.volume = 0;
                volumeProgressBar.style.width = '0';
            }
            break;
        case 'f':
            // letter 'F' key: full-screen mode
            fullScreenMode();
            break;
        case 'Escape':
            // escape key: exit full-screen mode
            exitFullScreenMode();
            break;
    }
});
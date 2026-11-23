const theatre = document.querySelector('.theatre');
const gift = document.querySelector('.gift');
const screening = document.querySelector('#screening');
const video = screening.querySelector('video');
const startPlayback = screening.querySelector('.start-playback');
const videoError = screening.querySelector('.video-error');

function startVideo() {
  startPlayback.hidden = true;
  video.play().catch(error => {
    if (!screening.open || error.name === 'AbortError') return;
    if (error.name === 'NotSupportedError' || video.error) {
      videoError.hidden = false;
    } else {
      startPlayback.hidden = false;
      startPlayback.focus();
    }
  });
}

gift.addEventListener('click', () => {
  if (screening.open) return;
  theatre.classList.add('revealing');
  screening.showModal();
  startVideo();
});

screening.querySelector('.close').addEventListener('click', () => screening.close());
startPlayback.addEventListener('click', startVideo);

screening.addEventListener('click', event => {
  if (event.target === screening) screening.close();
});

screening.addEventListener('close', () => {
  video.pause();
  if (video.readyState >= 1) video.currentTime = 0;
  startPlayback.hidden = true;
  theatre.classList.remove('revealing');
  gift.focus({preventScroll: true});
});

video.addEventListener('error', () => {
  startPlayback.hidden = true;
  videoError.hidden = false;
});
video.querySelector('source').addEventListener('error', () => {
  startPlayback.hidden = true;
  videoError.hidden = false;
});

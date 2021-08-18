const container = document.getElementById("container");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const img = document.getElementById("img");
const start = document.getElementById("start");
const end = document.getElementById("end");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const range = document.getElementById("range");

// music names
const songs = [
  "JONY - Пустота",
  "Mohamed Tarek - Aisyah Istri Rasulullah",
  "Ummon - Olislardan",
  "Hadicha - Ketsam"
];

//song index
let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.textContent = song;
  audio.src = `songs/${song}.mp3`;
  img.src = `images/${song}.jpg`;
}

//playSong function
function playSong() {
  container.classList.add("play");
  playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  audio.play();
}

//pauseSong function
function pauseSong() {
  container.classList.remove("play");
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  audio.pause();
}

// nextMusic function
function nextMusic() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  audio.play();
}

// prevMusic function
function prevMusic() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  audio.play();
}

function progres(e) {
  const duration = e.srcElement.duration;
  const curTime = e.srcElement.currentTime;
  let presentage = (curTime / duration) * 100;
  progress.style.width = `${presentage}%`;

  //end time
  audio.addEventListener("loadeddata", () => {
    let d = audio.duration;
    let endMin = Math.floor((d) / 60);
    let endSec = Math.floor((d) % 60);
    end.textContent = `${(endMin =
      endMin < 10 ? "0" + endMin : endMin)}:${(endMin =
      endSec < 10 ? "0" + endSec : endSec)}`;
  });
  //start time
  let startMin = Math.floor(curTime / 60);
  let startSec = Math.floor(curTime % 60);
  start.textContent = `${(startMin =
    startMin < 10 ? "0" + startMin : startMin)}:${(startSec =
    startSec < 10 ? "0" + startSec : startSec)}`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const widthX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (widthX / width) * duration;
  console.log(currentTime);
}

//Range input function
function rangeVolume(e) {
  const volumeMusic = +range.value / range.max
  audio.volume = volumeMusic
}


//events

playBtn.addEventListener("click", function () {
  const isPlaying = container.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

nextBtn.addEventListener("click", nextMusic);

prevBtn.addEventListener("click", prevMusic);

audio.addEventListener("timeupdate", progres);

audio.addEventListener("ended", nextMusic);

progressContainer.addEventListener("click", setProgress);

range.addEventListener('input', rangeVolume)

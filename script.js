let media = document.querySelector("video");
let controll = document.querySelector(".videoPlayer-controller");
let play = controll.querySelector(".pause");
let for_w = controll.querySelector(".forward");
let back_w = controll.querySelector(".backward");
let volume = controll.querySelector(".volume");
let expand = controll.querySelector(".expand");
let vidTime = controll.querySelector(".cornet-time");
let volTime = controll.querySelector(".video-time");
let coBar = controll.querySelector(".coBar-rang");
let videoPlayer = document.querySelector(".videoPlayer");
let rgVolume = controll.querySelector(".volume-range");
let iconVolume = controll.querySelector("#volume");

/* Play and Pause */
let play_media = function () {
  if (media.paused) {
    media.play();
  } else {
    media.pause();
  }
  play.classList.toggle("fa-play");
  play.classList.toggle("fa-pause");
  vidTim();
};

/* Video Forward 10s*/
let fwr_media = function () {
  media.currentTime = media.currentTime + 10;
};

/* Video Backward 10s*/
let bak_media = function () {
  media.currentTime = media.currentTime - 10;
};

/* Progress Bar */
function bar(time) {
  let percent = (time / media.duration) * 100;
  coBar.style = `background:linear-gradient(to right, rgb(245, 98, 25) ${percent}%, #fff 0%)`;
  coBar.value = percent;
}

/* Show Current Video Time */
let curTime = function () {
  let min = Math.trunc(media.currentTime / 60);
  let sec = Math.trunc(media.currentTime - min * 60);
  if (sec < 10) sec = "0" + sec;
  if (min < 10) min = "0" + min;
  vidTime.textContent = min + ":" + sec;
  bar(media.currentTime);
};

/* Show Video Time */
let vidTim = function () {
  let min = Math.trunc(media.duration / 60);
  let sec = Math.trunc(media.duration - min * 60);
  if (sec < 10) sec = "0" + sec;
  if (min < 10) min = "0" + min;
  volTime.textContent = min + ":" + sec;
};

/* Volume Progress Bar */
function volume_bar() {
  let vl = (media.volume = this.value / 100);
  iconVolume.className = "";
  iconVolume.classList.add("fa");
  if (vl <= 0.6 && vl >= 0.3) {
    iconVolume.classList.add("fa-volume-low");
  } else if (vl <= 0.3 && vl > 0) {
    iconVolume.classList.add("fa-volume-off");
  } else if (vl == 0) {
    iconVolume.classList.add("fa-volume-mute");
  } else if (vl >= 0.6) {
    iconVolume.classList.add("fa-volume-high");
  }
  rgVolume.style.background = `linear-gradient(to right, rgb(245, 98, 25) ${this.value}%, #fff 0%)`;
}

// let Timer = function (time, place) {
//   let min = Math.trunc(time / 60);
//   let sec = Math.trunc(time - min * 60);
//   console.log(time);
//   if (sec < 10) sec = "0" + sec;
//   if (min < 10) min = "0" + min;
//   place.textContent = min + ":" + sec;
//   bar(media.currentTime);
// };

media.addEventListener("timeupdate", curTime);
play.addEventListener("click", play_media);
media.addEventListener("click", play_media);
for_w.addEventListener("click", fwr_media);
back_w.addEventListener("click", bak_media);
coBar.addEventListener("input", function () {
  media.currentTime = (this.value / 100) * media.duration;
});
rgVolume.addEventListener("input", volume_bar);

/* NO webkit , moz , ms ! if u wanna use this code u have to add them for Fullscreen method*/
expand.addEventListener("click", function () {
  if (!document.fullscreenElement) videoPlayer.requestFullscreen();
  else document.exitFullscreen();
});

//#region  FETCH JSON FILES WITH NEWS DATA
fetch("arte.json")
  .then(response => response.json())
  .then(data => {
    let news = Object.values(data);
    addNews(news);
  });
//#endregion

//#region  AUDIO STREAMER CONFIGURATION
const audioPlayer = document.createElement("audio");
audioPlayer.src = "https://ipanel.instream.audio:7012/stream";
let audioDiv = document.querySelector(".radio");

function playAudio() {
  if (audioPlayer.paused) {
    let playPromise = audioPlayer.play();
    if (playPromise !== undefined) {
      playPromise
        .then(x => {
          audioDiv.innerHTML = "<b>II</b> EN VIVO";
        })
        .catch(error => {
          console.log("audio not loaded");
        });
    }
  } else {
    audioPlayer.pause();
    audioDiv.innerHTML = "&#9654; EN VIVO";
  }
}

//#endregion

function addNews(news) {
  const newsHolder = document.querySelector(".news");
  for (n of news) {
    let anchor = document.createElement("a");
    newsHolder.appendChild(anchor);
    let image = document.createElement("img");
    anchor.appendChild(image);
    image.src = `articles/${n.coverPic}.jpg`;
    anchor.href = `articles/${n.link}`;
    image.alt = `n.title`;
  }
}

//#region  SCROLL FUNCTIONALITY
// Get references to the carousel navigation buttons
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Get reference to the carousel container
const carousel = document.querySelector(".carousel");

// Event listener for previous button
prevBtn.addEventListener("click", () => {
  carousel.scrollBy({
    left: -carousel.offsetWidth,
    behavior: "smooth",
  });
});

// Event listener for next button
nextBtn.addEventListener("click", () => {
  carousel.scrollBy({
    left: carousel.offsetWidth,
    behavior: "smooth",
  });
});
//#endregion

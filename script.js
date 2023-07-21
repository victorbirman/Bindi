const parentContainer = "destacadas";
const categories = ["lifestyle", "arte", "conciencia", "holistik", "bio"];
function fillModules(target) {
  async function fetchDataAndAddNews() {
    try {
      const response = await fetch(`${target}.json`);
      const data = await response.json();
      const news = Object.values(data);
      addNews(`.${target}`, news);
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  }
  fetchDataAndAddNews();
}

fillModules(parentContainer);
categories.forEach(category => {
  console.log(category);
  fillModules(category);
});
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
function addNews(parent, json) {
  const parentElement = document.querySelector(parent);
  const carousel = parentElement.querySelector(".carousel");

  for (const news of json) {
    const { link: href, cover: src, title, subtitle } = news;

    const item = document.createElement("a");
    item.classList.add("item");
    item.href = `articles/${href}`;

    const img = document.createElement("img");
    img.src = `articles/${src}`;

    const itemText = document.createElement("div");
    itemText.classList.add("item-text");

    const itemTitle = document.createElement("h2");
    itemTitle.classList.add("item-title");
    itemTitle.textContent = title;

    const itemSubtitle = document.createElement("p");
    itemSubtitle.classList.add("item-subtitle");
    itemSubtitle.textContent = subtitle;

    itemText.appendChild(itemTitle);
    itemText.appendChild(itemSubtitle);
    item.appendChild(img);
    item.appendChild(itemText);
    carousel.appendChild(item);
  }
}

function scrollCarousel(carousel, direction) {
  carousel.scrollBy({
    left: direction * carousel.offsetWidth,
    behavior: "smooth",
  });
}

document.addEventListener("click", event => {
  const target = event.target;

  if (
    target.classList.contains("prevBtn") ||
    target.classList.contains("nextBtn")
  ) {
    // Find the closest "modulo-noticias" parent element
    const moduloNoticias = target.closest(".modulo-noticias");

    if (moduloNoticias) {
      const carousel = moduloNoticias.querySelector(".carousel");

      if (carousel) {
        // Determine the scrolling direction based on the clicked button
        const direction = target.classList.contains("prevBtn") ? -1 : 1;
        scrollCarousel(carousel, direction);
      }
    }
  }
});

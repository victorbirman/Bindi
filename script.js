const mainCategory = "destacadas";
const categories = [
  "columnistas",
  "lifestyle",
  "arte",
  "conciencia",
  "holistik",
  "bio",
];

async function fetchDataAndAddNews(target, shuffleNews = false) {
  try {
    const response = await fetch(`${target}.json`);
    const data = await response.json();
    const news = shuffleNews
      ? shuffle(Object.values(data))
      : Object.values(data);
    addNews(`.${target}`, news);
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}

fetchDataAndAddNews(mainCategory);
categories.forEach(category => {
  fetchDataAndAddNews(category, true);
});

const hamburgerMenu = document.querySelector(".hamburger-menu");

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
    item.href = `contenido/${href}`;

    const img = document.createElement("img");
    img.src = `contenido/${src}`;

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
  console.log(carousel.scrollLeft);
  carousel.scrollBy({
    left: direction * carousel.offsetWidth,
    behavior: "smooth",
  });
  // setTimeout(function () {
  //   switchButtons(carousel);
  //   console.log(carousel.scrollLeft);
  // }, 700);
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

function switchButtons(targetCarousel) {
  const nextBtn = targetCarousel.nextElementSibling.querySelector(".nextBtn");
  const prevBtn = targetCarousel.nextElementSibling.querySelector(".prevBtn");
  if (targetCarousel.scrollLeft > 0) {
    prevBtn.style.visibility = "visible";
  } else {
    prevBtn.style.visibility = "hidden";
  }

  console.log("esto", targetCarousel.offsetWidth - targetCarousel.scrollLeft);
  if (targetCarousel.scrollLeft - targetCarousel.offsetWidth <= 20) {
    console.log("cierto");
    nextBtn.style.visibility = "hidden";
  } else {
    nextBtn.style.visibility = "visible";
  }
}

function toggleHamburgerMenu() {
  if (hamburgerMenu.style.display === "block") {
    hamburgerMenu.style.display = "none";
  } else {
    hamburgerMenu.style.display = "block";
  }
}

function shuffle(target, length = target.length) {
  const shuffled = target.slice(0, length);

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return [...shuffled, ...target.slice(length)];
}

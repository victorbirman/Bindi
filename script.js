const mainCategory = "destacadas";
const categories = [
  "columnistas",
  "lifestyle",
  "arte",
  "conciencia",
  "holistik",
  "bio",
  "ladob",
];
const categoriesVideo = [
  "recetas",
  "noticias",
  "entrevistas",
  "entrevistasDestacadas",
];

async function fetchDataAndAddNews(
  category,
  shuffleNews = false,
  type = "news"
) {
  try {
    const response = await fetch("articles.json");
    const data = await response.json();

    let news = data.filter(item => item.category === category);
    if (shuffleNews) {
      news = shuffle(news);
    }

    addItemToCarousel(`.${category}`, news, type);
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}
async function fetchDestacadas(category, shuffleNews = false, type = "news") {
  try {
    const response = await fetch("destacadas.json");
    const data = await response.json();

    const news = data;
    if (shuffleNews) {
      shuffle(news);
    }

    addNews(`.${category}`, news, type);
  } catch (error) {}
}

fetchDestacadas(mainCategory);

// Fetch and add news for each category
categories.forEach(category => {
  fetchDataAndAddNews(category, true);
});

categoriesVideo.forEach(category => {
  fetchDataAndAddNews(category, true, "videos");
});

function addItemToCarousel(parent, data, type) {
  const parentElement = document.querySelector(parent);
  const carousel = parentElement.querySelector(".carousel");

  for (const itemData of data) {
    const { href, cover: src, title, subtitle } = itemData;

    const carouselNavigation = document.createElement("div");
    carouselNavigation.classList.add("carousel-navigation");

    const prevBtn = document.createElement("button");
    prevBtn.classList.add("prevBtn");
    prevBtn.innerHTML = "&lt;";
    const nextBtn = document.createElement("button");
    nextBtn.classList.add("nextBtn");
    nextBtn.innerHTML = "&gt;";

    carouselNavigation.appendChild(prevBtn);
    carouselNavigation.appendChild(nextBtn);

    const item = document.createElement("a");
    item.classList.add("item");
    item.href = `contenido/${href}`;
    if (type == "videos") {
      item.href = `videoplayer.html?video=${href}`;
    } else {
    }

    const img = document.createElement("img");
    img.src = `contenido/${src}`;

    const itemText = document.createElement("div");
    itemText.classList.add("item-text");

    const itemTitle = document.createElement("h2");
    itemTitle.classList.add("item-title");
    itemTitle.textContent = title;
    itemText.appendChild(itemTitle);

    if (type === "news") {
      const itemSubtitle = document.createElement("p");
      itemSubtitle.classList.add("item-subtitle");
      itemSubtitle.textContent = subtitle;
      itemText.appendChild(itemSubtitle);
    }

    item.appendChild(img);
    item.appendChild(itemText);
    carousel.appendChild(item);
    carousel.appendChild(carouselNavigation);
  }
}

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
    const { cover: src, href, title, subtitle } = news;

    const carouselNavigation = document.createElement("div");
    carouselNavigation.classList.add("carousel-navigation");

    const prevBtn = document.createElement("button");
    prevBtn.classList.add("prevBtn");
    prevBtn.innerHTML = "&lt;";
    const nextBtn = document.createElement("button");
    nextBtn.classList.add("nextBtn");
    nextBtn.innerHTML = "&gt;";

    carouselNavigation.appendChild(prevBtn);
    carouselNavigation.appendChild(nextBtn);

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
    carousel.appendChild(carouselNavigation);
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

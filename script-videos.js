const categories = ["noticias", "recetas"];

categories.forEach(x => fetchVideosJson(x));
async function fetchVideosJson(category) {
  try {
    const response = await fetch("videos.json");
    const data = await response.json();
    const filteredData = data.filter(
      item => item.hasOwnProperty("category") && item.category === category
    );
    addVideosToCarousel(category, filteredData);
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}

async function fetchDataAndAddVideos(target, shuffleNews = false) {
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

function addVideosToCarousel(parent, data) {
  const parentElement = document.querySelector(`.${parent}`);
  const carousel = parentElement.querySelector(".carousel");

  for (const video of data) {
    const href = `videoplayer.html?video=${video.file}`;
    const { cover: src, title } = video;

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
    item.href = `${href}`;

    const img = document.createElement("img");
    img.src = `contenido/${src}`;

    const itemText = document.createElement("div");
    itemText.classList.add("item-text");

    const itemTitle = document.createElement("h2");
    itemTitle.classList.add("item-title");
    itemTitle.textContent = title;

    // const itemSubtitle = document.createElement("p");
    // itemSubtitle.classList.add("item-subtitle");
    // itemSubtitle.textContent = subtitle;

    itemText.appendChild(itemTitle);
    // itemText.appendChild(itemSubtitle);
    item.appendChild(img);
    item.appendChild(itemText);
    carousel.appendChild(item);
    carousel.appendChild(carouselNavigation);
  }
}

function scrollCarousel(carousel, direction) {
  console.log(carousel.scrollLeft);
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
    const moduloNoticias = target.closest(".modulo-videos");

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

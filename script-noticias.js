const categoriesToExclude = [
  "columnistas",
  "recetas",
  "noticias",
  "entrevistas",
]; // Fetch the JSON data

fetch("articles.json")
  .then(response => response.json())
  .then(data => {
    const newsContainer = document.querySelector(".news-container");
    const dataFiltered = data.filter(item => {
      return !categoriesToExclude.includes(item.category);
    });

    // Loop through the JSON data
    dataFiltered.forEach(item => {
      // Create elements for the card
      const card = document.createElement("div");
      card.classList.add("card");

      // Create image element
      const image = document.createElement("img");
      image.src = "contenido/" + item.cover;
      image.alt = "Bindi";
      image.loading = "lazy";

      // Create title element
      const title = document.createElement("h2");
      title.textContent = item.title;

      // Create subtitle element
      const subtitle = document.createElement("h3");
      subtitle.textContent = item.subtitle;

      // Create link element
      const link = document.createElement("a");
      link.href = "contenido/" + item.href;
      link.appendChild(card);

      // Append elements to the card
      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(subtitle);

      // Append card to the news container
      newsContainer.appendChild(link);
    });
  })
  .catch(error => {
    console.error("Error:", error);
  });

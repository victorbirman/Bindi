```js
fetch("links.json")
  .then(response => response.json())
  .then(data => {
    let links = data.links;
    let list = document.getElementById("page-list");
    for (let i = 0; i < links.length; i++) {
      let link = document.createElement("a");
      link.href = links[i].url;
      link.textContent = links[i].title;
      let listItem = document.createElement("li");
      listItem.appendChild(link);
      list.appendChild(listItem);
    }
  });
```

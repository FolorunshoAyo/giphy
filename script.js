// LAZY LOADING
document.addEventListener("DOMContentLoaded", function () {
  // RANDOMIZE GIPHY BAND

  // GENERATE RANDOM NUMBER FROM 0 to 255
  function generateRGB() {
    const rgbValues = [];

    for (let i = 0; i <= 2; i++) {
      rgbValues.push(Math.floor(Math.random() * 255));
    }

    return rgbValues;
  }

  function rainbowColorBand() {
    const bandBoxes = document.querySelectorAll(".box");

    Array.from(bandBoxes).forEach((bandBox) => {
      const rgbValues = generateRGB();
      bandBox.style.backgroundColor = `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
    });
  }

  function rainbowSpinner() {
    const spinner = document.querySelector(".spinner");

    const rgbValues = generateRGB();
    spinner.style.borderTop = `3px solid rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
  }

  setInterval(() => {
    rainbowColorBand();
    rainbowSpinner();
  }, 500);

  function randomStr(len, arr) {
    var ans = "";
    for (var i = len; i > 0; i--) {
      ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }

  // TRIGGER SEARCH
  const searchBtn = document.getElementById("search-btn");
  const resultsContainer = document.querySelector(".grid.results");
  const preloader = document.querySelector(".grid.preloader");

  let searchResults = [];
  let count = 0;
  let target = 1;

  searchBtn.addEventListener("click", handleQuery);
  // HANDLE QUERY
  function handleQuery() {
    const searchInput = document.getElementById("query-input");
    const query = searchInput.value;

    resultsContainer.innerHTML = "";
    let html = "";
    if (!query) {
      alert("Enter a query!");
    } else {
      preloader.classList.add("active");
      (async () => {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=OfMePKlvNJfEDJsVX2dD7zsRXQMkMjQZ&q=${query}&rating=g&lang=en&random_id=${randomStr(
            32,
            "abcde0123456789"
          )}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );

        const data = await response.json();

        searchResults = data.data;

        preloader.classList.remove("active");

        console.log(searchResults);
        count = 0;

        while (count < 10) {
          html += `<div class="card">
                    <div class="image-container">
                        <img src="${
                          searchResults[count].images.preview_gif.url
                        }" alt="${searchResults[count].title}" loading="lazy"/>
                    </div>
                    <h2 class="display-name">${
                      searchResults[count].user
                        ? searchResults[count].user.display_name
                        : ""
                    }</h2>
                    <p class="caption">${
                      searchResults[count].user
                        ? searchResults[count].user.description
                        : ""
                    }</p>
                </div>`;
          count++;
        }
        // Append the first ten GIFs
        resultsContainer.innerHTML += html;

        window.addEventListener("scroll", () => {
          if (
            window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight
          ) {
            target++;
            loadGIFs();
          }
        });
      })();
    }
  }

  function loadGIFs() {
    let html = "";
    if (count >= 49) {
      // DO not display anthing
      document.querySelector(".spinner").classList.remove("active");
    } else {
      document.querySelector(".spinner").classList.add("active");
      setTimeout(() => {
        document.querySelector(".spinner").classList.remove("active");

        console.log(`Current count: ${count}, \n Target value is : ${target}`);
        while (count < target * 10) {
          html += `<div class="card">
                    <div class="image-container">
                        <img src="${
                          searchResults[count].images.preview_gif.url
                        }" loading="lazy" alt="${searchResults[count].title}" />
                    </div>
                    <h2 class="display-name">${
                      searchResults[count].user
                        ? searchResults[count].user.display_name
                        : ""
                    }</h2>
                    <p class="caption">${
                      searchResults[count].user
                        ? searchResults[count].user.description
                        : ""
                    }</p>
                </div>`;
          count++;
        }
        resultsContainer.innerHTML += html;

        // SCAN FOR NEW IMAGES
        const lzy_images = document.querySelectorAll("img.lzy_img");
        lzy_images.forEach((lzy_image) => {
          // OBSERVE EACH NEWLY RENDERED IMAGE
          imageObserver.observe(lzy_image);
        });
      }, 1500);
    }
  }
});

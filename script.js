const moviePage = document.querySelector(".movies");

//Get Movie Name
let searchBox = document.querySelector(".searchBox__form");
searchBox.addEventListener("submit", (event) => {
  //  dont reload the page
  event.preventDefault();
  const movieInfo = event.target.name.value;
  let movieName = movieInfo.split(" ").join("");
  getMovie(movieName);
});
//get random movies
const textArray = [
  "ocean",
  "godfather",
  "king kong",
  "snatch",
  "avatar",
  "panda",
  "transformer",
  "jaw",
  "Lion King",
  "home",
  "Titanic",
  "Brave",
  "spider",
  "Trainspotting",
  "gladiator",
];
const button = document.createElement("button");
button.textContent = "random";
const inputBox = document.getElementById("name");
button.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * textArray.length);
  const randomText = textArray[randomIndex];
  inputBox.value = randomText;
});
searchBox.appendChild(button);

//Get Data from API
function getMovie(movieName) {
  for (i = 0; i < 1000; i++) {
    axios
      .get(`https://search.imdbot.workers.dev/?q=${movieName}`)
      .then((result) => {
        // console.log("it is looping");
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  axios
    .get(`https://search.imdbot.workers.dev/?q=${movieName}`)
    .then((result) => {
      moviePage.innerHTML = "";
      result.data.description.forEach((movieInfo) => {
        // console.log(movieInfo);

        const movieBlock = document.createElement("div");

        const posterElem = document.createElement("img");
        posterElem.classList.add("movies__poster");
        posterElem.src = `${movieInfo[`#IMG_POSTER`]}`;
        posterElem.onerror = () => {
          posterElem.src = "./defaultimg.png";
        };
        movieBlock.appendChild(posterElem);

        const titleElem = document.createElement("p");
        titleElem.classList.add("movies__title");
        titleElem.textContent = `Title: ${movieInfo[`#TITLE`]}`;
        movieBlock.appendChild(titleElem);

        const yearElem = document.createElement("p");
        yearElem.classList.add("movies__year");
        yearElem.textContent = `Year: ${movieInfo[`#YEAR`]}`;
        movieBlock.appendChild(yearElem);

        const actorsElem = document.createElement("p");
        actorsElem.classList.add("movies__actors");
        actorsElem.textContent = `Actors: ${movieInfo[`#ACTORS`]}`;
        movieBlock.appendChild(actorsElem);

        const imdbElem = document.createElement("p");
        imdbElem.classList.add("movies__imdb");
        imdbElem.textContent = `IMDB ID: ${movieInfo[`#IMDB_ID`]}`;
        movieBlock.appendChild(imdbElem);

        axios
          .get(`https://search.imdbot.workers.dev/?tt=${movieInfo[`#IMDB_ID`]}`)
          .then((secondResult) => {
            // console.log(secondResult.data.short);

            const desElem = document.createElement("p");
            desElem.classList.add("movies__des");
            desElem.textContent =
              "Description: " + secondResult.data.short.description;
            movieBlock.appendChild(desElem);

            const rateElem = document.createElement("p");
            rateElem.classList.add("movies__rate");
            // rateElem.textContent =
            //   "Rating: " + secondResult.data.short.aggregateRating.ratingValue;
            if (
              secondResult.data.short.aggregateRating &&
              secondResult.data.short.aggregateRating.ratingValue
            ) {
              rateElem.textContent =
                "Rating: " +
                secondResult.data.short.aggregateRating.ratingValue;
            } else {
              rateElem.textContent = "Rating: Not Available";
            }
            movieBlock.appendChild(rateElem);

            // console.log(secondResult.data.short.description);
            // console.log(secondResult.data.short.aggregateRating.ratingValue);
          })
          .catch((error) => {
            console.log(error);
          });

        moviePage.appendChild(movieBlock);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

let searchButton = document.getElementById("search");
let cardContainer = document.querySelector(".card-container");
var timer = 0;
var meals;

function populateData(meals) {
  meals.forEach((meal) => {
    let card = document.createElement("div");

    let isFavorite = meal.isFavorite;
    console.log("11", isFavorite);
    card.className = "card m-3";
    card.innerHTML = `<img src="${meal.strMealThumb}" class="card-img-top" alt="meal image">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <a href="recipe.html?id=${meal.idMeal}" target="_blank" class="btn btn-primary">Go to Recipe</a>
            <i class="fa-regular fa-heart heart"  data-is-favorite="${isFavorite}" data-meal-id="${meal.idMeal}"></i>
        </div>`;
    cardContainer.append(card);
  });
}

//update favorites(add or remove from the local storage)

function updateFavorites(mealId, isFavorite) {
  let favorites = localStorage.getItem("favorites");
  favorites = JSON.parse(favorites) || [];
  if (isFavorite) {
    let addMeal = meals
      .filter((meal) => meal.idMeal == mealId)
      .map((meal) => {
        meal.isFavorite = true;
        return meal;
      });
    favorites.push(...addMeal);
  } else {
    favorites = favorites.filter((meal) => meal.idMeal != mealId);
  }

  favorites = JSON.stringify(favorites);
  localStorage.setItem("favorites", favorites);
}

cardContainer.addEventListener("click", (event) => {
  if (event.target.className.includes("heart")) {
    if (event.target.dataset.isFavorite == "true") {
      updateFavorites(event.target.dataset.mealId, false);
      event.target.style.color = "black";
      event.target.dataset.isFavorite = "false";
    } else {
      updateFavorites(event.target.dataset.mealId, true);
      event.target.style.color = "red";
    }
  }
});

function getMeals(meal) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    .then((res) => res.json())
    .then((res) => {
      cardContainer.innerHTML = "";
      meals = res.meals;
      populateData(meals);
    })
    .catch((e) => console.log(e));
}

searchButton.addEventListener("keyup", (e) => {
  e.preventDefault();
  clearTimeout(timer);
  timer = setTimeout(() => {
    let meal = e.target.value;
    getMeals(meal);
  }, 500);
});

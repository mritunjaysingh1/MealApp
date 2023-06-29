let mealId = window.location.search.split("=")[1];
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  .then((res) => res.json())
  .then((res) => {
    meal = res.meals[0];
    showDetails(meal);
  })
  .catch((e) => console.log(e));

function showDetails(meal) {
  document.getElementById("title").textContent = meal.strMeal;
  document.getElementById("mealImage").src = meal.strMealThumb;
  document.getElementById("instruction").textContent = meal.strInstructions;

  let ingredients = document.querySelector(".ingredients-list");
  let ingredientKeys = Object.keys(meal).filter(
    (key) => key.includes("strIngredient") && meal[key]
  );
  ingredientKeys.forEach((ingredient) => {
    let li = document.createElement("li");
    li.textContent = meal[ingredient];
    li.className = "list-group-item";
    ingredients.appendChild(li);
  });
}

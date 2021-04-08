var resultContent = document.getElementById('food-root');
var searchForm = document.querySelector("#search-form");
var ingredientsTermInput = document.querySelector("#foodIngredient");
//$(".dropdown-trigger").dropdown({ hover: false });
var modalEl = document.querySelector("modal-container-2");

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var searchTerm = ingredientsTermInput.value;
    var urlToFetch = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchTerm}&number=8&apiKey=14d9da1ef7ea4d14af97948a6903f533`
    fetch(urlToFetch)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            resultContent.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                var foodOptionsTitle = data[i].title;
                var searchResultsTitle = document.createElement("p");
                searchResultsTitle.textContent = foodOptionsTitle;
                resultContent.append(searchResultsTitle);

                var searchResultsImg = data[i].image;
                var img = document.createElement("img");
                img.setAttribute("src", "https://spoonacular.com/recipeImages/" + data[i].id + "-312x231.jpg");
                resultContent.append(img);

                var title = data[i].title;
                var titleValue = title.value;

                var linkAnchor = document.createElement("a");
                var linkButton = document.createElement("button");
                linkButton.classList.add("food-recipe-button");
                linkButton.setAttribute("data", data[i].id);
                linkButton.textContent = "Get Recipe";
                linkAnchor.append(linkButton);
                resultContent.append(linkAnchor);
            };
        });
});

document.querySelector("#food-root").addEventListener("click", (event) => {
    if (event.target.className.indexOf("food-recipe-button") > -1) {
        createRecipe(event.target.getAttribute("data"));
        modalEl.classList.remove("hide");
    }
});

const createRecipe = (recipe) => {
    var urlToFetch2 = `https://api.spoonacular.com/recipes/${recipe}/information?&apiKey=14d9da1ef7ea4d14af97948a6903f533`;
    fetch(urlToFetch2)
        .then(function (response) {
            return response.json();
        })
        .then(function (res) {
            //console.log(res);

            const results = res
            var title = results.title;
            var extendedIngredients = results.extendedIngredients;
            //var instructions = results.analyzedInstructions[0].steps[0].ingredients;
            var url = results.sourceUrl;
            var steps = results.analyzedInstructions[0].steps;
            //console.log(title);
            var allExtendedIngredients = []
            var allSteps = []
            for (let i = 0; i < extendedIngredients.length; i++) {
                allExtendedIngredients.push(extendedIngredients[i].original);
                //console.log(allExtendedIngredients);
            }
            for (let i = 0; i < steps.length; i++) {
                allSteps.push(steps[i].step);
                //console.log(allSteps);
            }
            //console.log(url);
            const cardFoodTemplate = `
                  <div class="card">
                      <div class="card-content">
                      <span class="card-title">${title}</span>
                          <div class="ingredient-container">
                              <ul>${renderFoodRecipeData(allExtendedIngredients, "ingredientList")}</ul>
                          </div>
                          <div class="instruction-container">
                              <ul>${renderFoodRecipeData(allSteps, "instruction")}</ul>
                          </div>
                          <div class="card-action">
                            <a href=${url}>Recipe Link</a>
                            </div>
                          <button class="closes">close</button>
                      </div>
                  </div>
              `;

            document.querySelector(".modal-container-2").innerHTML = cardFoodTemplate;

            document.querySelector(".closes").addEventListener("click", function() {
                console.log("close btn clicked");
                modalEl.classList.add("hide");
            });
        });
};

const renderFoodRecipeData = (array, type) => {
    let result = "";

    array.forEach((item) => {
        result += `<li class="${type}">${item}<li>`;
    });

    return result;
};

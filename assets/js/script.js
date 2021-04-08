var resultContent = document.getElementById('food-root');
var searchForm = document.querySelector("#search-form");
var ingredientsTermInput = document.querySelector("#foodIngredient");
//$(".dropdown-trigger").dropdown({ hover: false });
var modalFoodEl = document.querySelector(".modal-container-2");

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var searchTerm = ingredientsTermInput.value;
    var urlToFetch = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchTerm}&number=12&apiKey=14d9da1ef7ea4d14af97948a6903f533`
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
        createFoodRecipe(event.target.getAttribute("data"));
        modalFoodEl.classList.remove("hide");
    }
});

const createFoodRecipe = (recipe) => {
    var urlToFetch2 = `https://api.spoonacular.com/recipes/${recipe}/information?&apiKey=14d9da1ef7ea4d14af97948a6903f533`;
    fetch(urlToFetch2)
        .then(function (response) {
            return response.json();
        })
        .then(function (res) {
            console.log(res);

            const results = res
            var title = results.title;
            var extendedIngredients = results.extendedIngredients;
            //var instructions = results.analyzedInstructions[0].steps[0].ingredients;
            var url = results.sourceUrl;   
            var steps = results.analyzedInstructions[0]?.steps||[];
            console.log(title);
            var allExtendedIngredients = []
            var allSteps = []
            for (let i = 0; i < extendedIngredients.length; i++) {
                allExtendedIngredients.push(extendedIngredients[i].original);
                //console.log(allExtendedIngredients[i]);
            }
            
            for (let i = 0; i < steps.length; i++) {
                allSteps.push(steps[i].step);
                console.log(allSteps);
            }
            console.log(url);
            const cardFoodTemplate = `
                  <div class="card">
                      <div class="card-content">
                      <button class="closes" style="position: absolute; top: 0; right: 0; border-radius: 20px;">close</button>
                      <span class="card-title">${title}</span>
                      <h6><strong>Ingredients</strong></h6>
                          <div class="ingredient-measure-container>
                            <div class="ingredient-container">
                              <ul>${renderFoodRecipeData(allExtendedIngredients, "ingredientList")}</ul>
                          </div>
                          <h6><strong>Instructions</strong></h6>
                          <div class="instruction-container">
                              <ul>${steps.length>0?renderFoodRecipeData(allSteps, "instruction"):""}</ul>
                          </div>
                          
                          <div class="card-action">
                            <a href=${url}>Full Recipe Link</a>
                            </div>
                         </div>
                      </div>
                  </div>
              `;

            document.querySelector(".modal-container-2").innerHTML = cardFoodTemplate;

            document.querySelector(".closes").addEventListener("click", function() {
                console.log("close btn clicked");
                modalFoodEl.classList.add("hide");
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

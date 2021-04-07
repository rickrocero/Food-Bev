var resultContent = document.getElementById('food-root');
var searchForm = document.querySelector("#search-form");
var ingredientsTermInput = document.querySelector("#foodIngredient");
//$(".dropdown-trigger").dropdown({ hover: false });
var modalEl = document.querySelector(".modal-container-2");

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var searchTerm = ingredientsTermInput.value;
    var urlToFetch = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchTerm}&number=5&apiKey=14d9da1ef7ea4d14af97948a6903f533`
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
                linkButton.setAttribute("data", titleValue);
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
    var urlToFetch2 =`https://api.spoonacular.com/recipes/complexSearch?query=titleMatch=${recipe}&apiKey=14d9da1ef7ea4d14af97948a6903f533`;
    fetch(urlToFetch2)
        .then(function (response) {
            return response.json();
        })
        .then(function (res) {
            console.log(res);

            const data = res

            // var summary = data.summary;
            // var ingredients = data.analyzedInstructions[0].steps[0].ingredients;
            // var moreIngredients = data.analyzedInstructions[0].steps[1].ingredients;
            // var instruction = data.instructions;
            // var url = data.sourceUrl;

            // for (let i = 0; i < ingredients.length; i++) {
            //     var allIngredients = ingredients[i].name;
                
            // }
            //     console.log(summary);
            //     console.log(allIngredients);
            //     console.log(instruction);
            //     console.log(allIngredients);
            //     console.log(allMoreIngredients);
            //     var newSearch = document.getElementById("new-search")
                // var newSummary = document.createElement("p")
                // newSummary.textContent = summary;
                // newSearch.append(newSummary);

            //         const ingredient = [];
            //         const instruction = [];
            //         const measure = [];

            //         for (const key in data) {
            //           if (key.indexOf("strIngredient") > -1 && data[key]) {
            //             ingredient.push(data[key]);
            //           }
            //           if (key === "strInstructions" && data[key]) {
            //             instruction.push(data[key]);
            //           }
            //           if (key.indexOf("strMeasure") > -1 && data[key]) {
            //             measure.push(data[key]);
            //           }
            //         }

            //         console.log("******ingredient", ingredient);
            //         console.log("******instruction", instruction);
            //         console.log("******measure", measure);

                    // const cardTemplate = `
                    //       <div class="card">
                    //           <div class="card-body">
                    //               <button class="close">close</button>
                    //               <div class="ingredient-container">
                    //                   <ul>${renderRecipeData(summary, "summary")}</ul>
                    //               </div>
                    //               <div class="instruction-container">
                    //                   <ul>${renderRecipeData(instruction, "instruction")}</ul>
                    //               </div>
                    //               <div class="measure-container">
                    //                   <ul>${renderRecipeData(allIngredients, "all ingredients")}</ul>
                    //               </div>
                    //           </div>
                    //       </div>
                    //   `;

                    // document.querySelector(".modal-container").innerHTML = cardTemplate;
        });
};

// const renderRecipeData = (array, type) => {
//     let result = "";
  
//     array.forEach((item) => {
//       result += `<li class="${type}">${item}<li>`;
//     });
  
//     return result;
//   };

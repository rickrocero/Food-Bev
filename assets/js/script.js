var searchForm = document.querySelector("#search-form");
var ingredientsTermInput = document.querySelector("#foodIngredient");
var resultContent = document.getElementById("food-root");
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
            resultContent.innerHTML = ""
            for (let i = 0; i < data.length; i++) {
                var foodOptionsTitle = data[i].title;
                var searchResultsTitle = document.createElement("p")
                searchResultsTitle.textContent = foodOptionsTitle
                resultContent.append(searchResultsTitle);

                var searchResultsImg = data[i].image;
                var img = document.createElement("img")
                img.setAttribute("src", "https://spoonacular.com/recipeImages/" + data[i].id + "-312x231.jpg")
                resultContent.append(img);
                
            }
            // resultContent.innerHTML = "";
            // var dataOptions = document.createElement("p");
            // dataOptions.textContent = data[0].title
            // resultContent.append(dataOptions);
            // var dataId = data[0].id
            // var urlToFetch2 = `https://api.spoonacular.com/recipes/${dataId}/information?includeNutrition=false&apiKey=14d9da1ef7ea4d14af97948a6903f533`
            // fetch(urlToFetch2)
            //     .then(function (response) {
            //         return response.json();
            //     })
            //     .then(function (data) {
            //         console.log(data);
            //         console.log(data.title);
            //         console.log(data.instructions)
            //         var resultsContent = document.getElementById
            //             ('food-root');
            //         resultsContent.innerHTML = ""
            //         var recipeTitlep = document.createElement("p");
            //         recipeTitlep.textContent = "Recipe: " + data.title;
            //         resultsContent.append(recipeTitlep)
            //     })
        })
})
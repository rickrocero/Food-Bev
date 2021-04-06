// home page
    // needs ingredient input for searching recipes containing ingredient
    // send query data to results page 

// recipe results page
    // extract data from query parameters
    // search api for: dish name, image, url of recipe 
    // append block to the page for each result

// cocktail results page 
    // capture user input to search cocktailDb
    // generate a fetch request off the user input and get a responsed
    // extract data from query parameters
    // search api for: cocktail name, image, url of recipe 
    // append block to the page for each result

    
    function getCocktailData() {
        // url to get cocktails by alcohol type to obtain drink ID
        var urlToFetch = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Tequila';
        // url to input drink ID to get full cocktail detail
        var urlToFetch2 = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007';
        // fetch(urlToFetch)
        //   .then(function (response) {
        //     return response.json();
        //   })
        //   .then(function (data) {
        //     console.log(data.drinks[0]);
        //     console.log(data.drinks[0].idDrink);
        //     for (var i = 0; i < data.drinks.length; i++) {
        //         var drinkId = data.drinks[i].idDrink;
        //     }
        //   })

        fetch(urlToFetch2)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            console.log(data.drinks[0].strDrink);
            console.log(data.drinks[0].strDrinkThumb);
            console.log(data.drinks[0].strIngredient1);
            console.log(data.drinks[0].strMeasure1);
            console.log(data.drinks[0].strInstructions);
        
            
            // data.drinks[0].forEach((ingred) => {

            // });
          })
          
          
    }

    getCocktailData();

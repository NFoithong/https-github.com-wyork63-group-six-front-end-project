function getRandomCocktail() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        console.log(data);
        displayRandomCocktail(data);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

getRandomCocktail();

function displayRandomCocktail(cocktail) {
  console.log(cocktail.drinks[0]);

  //Displays drink name
  let drinkSection = document.querySelector("#drink-section");
  let drinkName = document.createElement("h2");
  drinkName.innerHTML = cocktail.drinks[0].strDrink;

  drinkSection.appendChild(drinkName);

  //Displays drink image
  let img = document.createElement("img");
  img.src = cocktail.drinks[0].strDrinkThumb;
  drinkSection.appendChild(img);

  //Displays the ingredient and the instruction to make drink
  for (let i = 1; i < 16; i++) {
    console.log();
    if (cocktail.drinks[0][`strIngredient${i}`] == null) {
      break;
    }

    let ingredient = document.createElement("ol");
    ingredient.innerHTML =
      cocktail.drinks[0][`strMeasure${i}`] +
      ": " +
      cocktail.drinks[0][`strIngredient${i}`];
    drinkSection.appendChild(ingredient);
  }
  let instruction = document.createElement("ol");
  instruction.innerHTML = cocktail.drinks[0].strInstructions;
  drinkSection.appendChild(instruction);
}

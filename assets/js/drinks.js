function getDrinks() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(function(response) {
            if (response.status !== 200) {
                console.log(
                    "Looks like there was a problem. Status Code: " + response.status
                );
                return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
                console.log(data);
                displayDrink(data);
            });
        })
        .catch(function(err) {
            console.log("Fetch Error :-S", err);
        });
}

function displayDrink(cocktail) {
    console.log(cocktail.drinks[0]);

    //clears previous drink
    const resultsContainerEl = document.querySelector('#drink');

    resultsContainerEl.textContent = ''

    const drinkSection = document.querySelector("#drink");

    //Displays drink image
    const img = document.createElement("img");
    img.src = cocktail.drinks[0].strDrinkThumb;
    drinkSection.appendChild(img);


    //Displays drink name
    const drinkName = document.createElement("h3");
    drinkName.innerHTML = cocktail.drinks[0].strDrink;

    drinkSection.appendChild(drinkName);

    //Displays the ingredient and the instruction to make drink
    const instruction = document.createElement("ol");
    instruction.innerHTML = cocktail.drinks[0].strInstructions;
    drinkSection.appendChild(instruction);

    for (let i = 1; i < 16; i++) {
        console.log();
        if (cocktail.drinks[0][`strIngredient${i}`] == null) {
            break;
        }

        const ingredient = document.createElement("li");
        ingredient.innerHTML =
            cocktail.drinks[0][`strMeasure${i}`] +
            ": " +
            cocktail.drinks[0][`strIngredient${i}`];
        instruction.appendChild(ingredient);
    }
}


const button = document.getElementById("#submit");

searchFormEl.addEventListener("submit", getDrinks);
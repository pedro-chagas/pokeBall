const pokeName = document.getElementById("pokemonName");
const pokemonImage = document.getElementById("pokemonImage");
const errorBlock = document.getElementById("error");
const loading = document.getElementById("loading");
const pokemon = document.getElementById("pokemon");
const button = document.getElementById("button");

button.addEventListener("click", () => {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokeName.value.toLowerCase())
        .then((response) => {
            if (!response.ok) {
                throw new Error("Pokémon não encontrado");
            }
            return response.json();
        })
        .then((data) => {
            pokemonImage.src = "./giphy.gif";
            pokemonImage.style.width = "50px";
            const imageUrl = data.sprites.front_default;
            errorBlock.style.display = "none";
            let n = 50;
            let timeoutId;
            loading.textContent = "";

            timeoutId = setTimeout(function increaseWidth() {
                if (n < 200) {
                    n += 10;
                    pokemonImage.style.width = n + "px";
                    timeoutId = setTimeout(increaseWidth, 90);
                } else {
                    pokemonImage.src = imageUrl;
                    loading.textContent = data.name + " eu escolho você!";
                    clearTimeout(timeoutId);
                }
            }, 200);

            console.log(pokemonImage.style.backgroundImage);
        })
        .catch((error) => {
            errorBlock.style.display = "block";
        });
});

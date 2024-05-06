const pokeContent = document.getElementById("pokemonContent");
let pokeForm = document.getElementById("searchPokemon");
let generationshow = 1;
const modalSearch = document.getElementById("pokemonContent");
const divGeneration = document.getElementById("textGen");

function showPokemonGen(gen) {
  const pokemonGen = {
    1: [1, 386],
  };

  const pokemonGenDefault = [1, 386];
  const generacion = pokemonGen[gen] || pokemonGenDefault;
  return generacion;
}

let pokemonGeneration = showPokemonGen(generationshow);


function clearScreen() {
  pokeContent.innerHTML = "";
  modalSearch.innerHTML = "";
}
document.getElementById("clearScreenButton").addEventListener("click", clearScreen);


/*cambiar de generacion*/

let arrowRight = document
  .addEventListener("click", (e) => {
    if (generationshow < 4) {
      modalSearch.innerHTML = "";
      generationshow += 1;
      pokemonGeneration = showPokemonGen(generationshow);
      divGeneration.innerHTML = "Gen " + generationshow;
      drawPokemon();
    }
  });

const drawPokemon = async () => {
  for (let i = pokemonGeneration[0]; i <= pokemonGeneration[1]; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id, modal) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const rest = await fetch(url);
  const pokemon = await rest.json();
  createPokemon(pokemon, modal);
};

const colors = {
  fire: "#f08030",
  grass: "#8FD594",
  electric: "#f8d030",
  water: "#6890f0",
  ground: "#e0c068",
  rock: "#b8a038",
  poison: "#a040a0",
  bug: "#a8bb20",
  dragon: "#97b3e6",
  psychic: "#f85888",
  flying: "#a890f0",
  fighting: "#c03028",
  normal: "#a8a878",
  fairy: "#f0b6bc",
  ice: "#98d8d8",
  ghots: "#705898",
  dark: "#705848",
};

const main_types = Object.keys(colors);

function createPokemon(pokemon, modal) {
  const pokemonEl = document.createElement("div");

  pokemonEl.classList.add("pokemon");


  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  if (modal !== true) {
    const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              pokemon.id
            }.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
              .toString()
              .padStart(3, "0")}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
    `;
    pokemonEl.innerHTML = pokeInnerHTML;
    pokeContent.appendChild(pokemonEl);
  } else {
    const pokeInnerHTML = `
        <div class="modal" id="modalPokemon">
        <div class="pokemon">
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              pokemon.id
            }.png" 
                        alt="${name}" />
                        
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
    </div>
    </div>
    </div>`;
    modalSearch.innerHTML = pokeInnerHTML;
  }
}

drawPokemon();

/*Buscar pokemon*/

pokeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchPokemon = document.getElementById("pokemon").value;
  getPokemon(searchPokemon, true);
});

function exitModal() {
  let modalPokemon = document.getElementById("modalPokemon");
  modalPokemon.style.display = "none";
  drawPokemon();
}

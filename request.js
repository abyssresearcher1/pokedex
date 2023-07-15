const MAIN_URL = "http://localhost:8080/pokemons";
const pokemonsRoot = document.querySelector(".pokemon__info");

const getAllPokemons = async () => {
  let response = await fetch(MAIN_URL);
  let data = await response.json();
  let pokemonList = data;
  renderPokemons(pokemonList);
};

const showPokemonDetails = (pokemon) => {
  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("modal");

 modal.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.image}">
    <p>Height: ${pokemon.Height}</p>
    <p>Weight: ${pokemon.weight}</p>
    <p>Category: ${pokemon.category}</p>
    <p>${pokemon.info}</p>
`;


  const closeButton = document.createElement("button");
  closeButton.classList.add('closeBtn');
  closeButton.textContent = "Закрыть";
  closeButton.addEventListener("click", () => {
    modalOverlay.remove();
  });

  modal.appendChild(closeButton);
  modalOverlay.appendChild(modal);

  document.body.appendChild(modalOverlay);
};

let renderPokemons = (pokemonList) => {
  for (let pokemon of pokemonList) {
    let { id, name, image, Height, Weight, category, info } = pokemon;
    const pokemons = document.createElement("div");
    pokemons.classList.add("pokemonCard");

    pokemons.innerHTML = `
      <h4 class="name">
        <span>${name}</span>
      </h4>
      <img src="${image}" class="pokemon__img">
      <button class="more-btn">Узнать больше</button>
    `;

    pokemonsRoot.append(pokemons);
  }

  let moreBtns = document.querySelectorAll(".more-btn");
  moreBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const selectedPokemon = pokemonList[index];
      showPokemonDetails(selectedPokemon);
    });
  });
};

getAllPokemons();
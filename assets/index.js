// Variables para la pagina
const baseURL = "https://pokeapi.co/api/v2/pokemon/";
const form = document.getElementById('form-busca-pokemon');
const caja = document.querySelector("#caja-pokemon");
const inputPokemon = document.querySelector(".input-buscar");
let pokemonVisible = {};

// Función para renderizar los pokemones
const renderPokemon = (pokemon) => { 
  const { id, name, sprites, height, weight, types } = pokemon;

  if (!id) {
    return caja.innerHTML = ``;
  }
  pokemonVisible = pokemon;

  let imagen = sprites.other.home.front_default;
  if (!imagen) {
    imagen = sprites.other["official-artwork"].front_default;
  }
  
  //<img  src="${sprites.other.home.front_default}"/>
  return caja.innerHTML = `
     <div class="pokemon"> 
         <p class="id-pokemon">#${id}</p>
         <img  src="${imagen}"/>
         <h2>${name.toUpperCase()}</h2>
         <span class="exp">EXPERIENCE: ${pokemon.base_experience}</span>
         <div class="tipo-pokemon">
             ${types
               .map((tipo) => {
                 return `<span class="${tipo.type.name} pokemon_type">${tipo.type.name}</span>`;
               })
               .join("")}
         </div>
         
         <p class="altura">Altura: ${height / 10}m</p>
         <p class="peso">Peso: ${weight / 10}Kg</p>
     </div>
   `;
};

const hideCard = (pokemon) => {
  if(pokemon.id <= 0) {
    caja.classList.add("hidden");
    return;
  }
  caja.classList.remove("hidden");
}

/* Función para traernos la data del pokemon. */
const fetchPokemon = async (pokeNro) => { 
  const res = await fetch(`${baseURL}${pokeNro}`); // Llamo a la api con el nro del pokemon indicado
  // Testeo si el fetch tir[o algo valido.
  if (!res.ok) {
    return "";
  } 
    const data = await res.json(); // Obtengo la data

  return data; // Retorno la data
};

const buscarPokemon = async (e) => {
  e.preventDefault();
  const pokemonBuscado = +inputPokemon.value;
 
  if ((!pokemonBuscado) || (pokemonBuscado <= 0)) {
    return caja.innerHTML = `
    <div class="contenedor-mensaje">
      <img  src="./assets/img/pokemon-mensaje-2.png"/>
      <p>Debe ingresar un n° entero positivo</p>
    </div>`;
  }

  // Traigo el elemento de la api
  const fetchedPokemon = await fetchPokemon(pokemonBuscado);
  // console.log(fetchedPokemon)

  // valido que el elemento no sea undefined, ni este en la lista
  if(!fetchedPokemon.id) {
    form.reset();
    return caja.innerHTML = `
    <div class="contenedor-mensaje">
      <img  src="./assets/img/pokemon-mensaje.png"/>
      <p>No existe un POKEMON con ese ID</p>
    </div>`;
  }
  // Si paso la validacion, muestro la card del Pokemon en cuestion.
  renderPokemon(fetchedPokemon);
  hideCard(fetchedPokemon);
  form.reset()
}


// Función init.
const init = () => {
  renderPokemon(pokemonVisible);
  hideCard(pokemonVisible);
  form.addEventListener("submit", buscarPokemon);
  // cardContainer.addEventListener("click", removeCity);
}

init();
/*Llamamos la función init */
init();

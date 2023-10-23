const getUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const catchPokemons = () => {

    const pokebolas = [] 
    const maximoPokemons = 150


    for (let index = 1; index <= maximoPokemons; index++) {
        pokebolas.push(fetch(getUrl(index)).then(resposta => resposta.json()) )   
    }

    Promise.all(pokebolas).then(pokemons => {
        const listaPokemons = pokemons.reduce((acumulador, pokemon) => {
        const typesPokemons = pokemon.types.map(typeInfo => typeInfo.type.name);
        acumulador += `
        <div class="pokemons ${typesPokemons[0]}">
               <img class="img-pokemon" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                <h1 class="name"> ${pokemon.id}º  ${pokemon.name.replace("-", " ")} </h1>
                <p class="types"> ${pokemon.types.map(typeInfo => typeInfo.type.name).join(' | ') } <p>
        </div>
        `
        return acumulador;
        }, '')
        const containerPokemons = document.querySelector('.container-pokemons')
        containerPokemons.innerHTML = listaPokemons
    })
}
catchPokemons();


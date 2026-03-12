let pokemonsData = [];

const BASE_URL = "https://pokeapi.co/api/v2/"
const NUMBER_PER_LOAD = 30;
let currentRenderIndex = pokemonsData.length;

function init() {
    fetchData();
}

async function fetchData() {
    let currentRenderIndex = pokemonsData.length;
    for (let fetchIndex = currentRenderIndex; fetchIndex < NUMBER_PER_LOAD; fetchIndex++) {
        try {
            let POKENUMBER = pokemonsData.length + 1;
            let answer = await fetch(BASE_URL + "pokemon/" + POKENUMBER);
            let data = await answer.json();
            console.log(data);
            await getDataOfPokemon(data);
            await renderPokemonOverview();
        } catch (error) {
            console.error(error)
        }
    }

}

async function getDataOfPokemon(data) {
   const newPokemon = {
        'id': data.id,
        'name': data.name,
        'img': data.sprites.other.dream_world.front_default,
        'alt': data.name,
        'types': data.types.map(t => t.type.name),
        'height': data.height,
        'weight': data.weight,
        'abilities': data.abilities.map(a => a.ability.name),
        'base_stats': data.stats.reduce((acc, s) => {
            acc[s.stat.name] = s.base_stat;
            return acc;
        }, {})
    };
    await pokemonsData.push(newPokemon);
}


function renderPokemonOverview() {
    let overviewSection = document.getElementById('list_view');
    overviewSection.innerHTML = "";
    for (let pokemonIndex = 0; pokemonIndex < pokemonsData.length; pokemonIndex++) {
        overviewSection.innerHTML += pokemonListViewTemplate(pokemonIndex);
    }
}

function renderTypes(pokemonIndex) {
    let renderTypesHtml = "";
    for (let typesIndex = 0; typesIndex < pokemonsData[pokemonIndex].types.length; typesIndex++) {
        renderTypesHtml += pokemonTypesTemplate(pokemonIndex, typesIndex);
    }
    return renderTypesHtml;
}

function renderPokemonAbilities(pokemonIndex) {
    return pokemonsData[pokemonIndex].abilities.map(ability => {
        return `${ability.charAt(0).toUpperCase() + ability.slice(1)}`;
    }).join(', ');
}

function capitalLetters(name) {
    let capitalName = name.toUpperCase();
    return capitalName;
}


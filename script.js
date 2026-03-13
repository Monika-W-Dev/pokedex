let pokemonsData = [];
let foundPokemons = [];

const BASE_URL = "https://pokeapi.co/api/v2/"
const NUMBER_PER_LOAD = 30;
let currentRenderIndex = pokemonsData.length;

async function init() {
    await fetchData();
    document.getElementById('load_more_section').style = '';
}

async function fetchData() {
    document.getElementById('loading_spin').style = '';
    let currentRenderIndex = pokemonsData.length;
    let arrayLength = pokemonsData.length + NUMBER_PER_LOAD;
    for (let fetchIndex = currentRenderIndex; fetchIndex < arrayLength; fetchIndex++) {
        try {
            let POKENUMBER = pokemonsData.length + 1;
            let answer = await fetch(BASE_URL + "pokemon/" + POKENUMBER);
            let data = await answer.json();
            await getDataOfPokemon(data);
        } catch (error) {
            console.error(error)
        }
    } await renderPokemonOverview(pokemonsData);
    document.getElementById('loading_spin').style = 'display: none';
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

function showWaitingSpin() {
    while (fetchData()) {
        document.getElementById('loading_spin').style = '';
    } 
}

function renderPokemonOverview(array) {
    let overviewSection = document.getElementById('list_view');
    overviewSection.innerHTML = "";
    for (let pokemonIndex = 0; pokemonIndex < array.length; pokemonIndex++) {
        overviewSection.innerHTML += pokemonListViewTemplate(array, pokemonIndex);
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


let pokemonsData = [];
let evolutionData = [];
let currentRenderIndex = pokemonsData.length;
let currentPokeIndex;


const BASE_URL = "https://pokeapi.co/api/v2/"
const NUMBER_PER_LOAD = 30;


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
            let pokeNumber = pokemonsData.length + 1;
            let answer = await fetch(BASE_URL + "pokemon/" + pokeNumber);
            let data = await answer.json();
            await getDataOfPokemon(data);
        } catch (error) {
            console.error(error)
        }
    } await renderPokemonOverview(pokemonsData);
    document.getElementById('loading_spin').style = 'display: none';
    preloadEvolutions(currentRenderIndex, arrayLength);
}

async function getDataOfPokemon(data) {
    const NEW_POKEMON = {
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
        }, {}),
        'evolutionChain': [],
    };
    await pokemonsData.push(NEW_POKEMON);
}

async function openDetailCard(pokemonId) {
    let pokemon = pokemonsData.find(p => p.id === pokemonId);
    let pokemonIndex = pokemonsData.indexOf(pokemon);

    if (pokemon.evolutionChain.length === 0) {
        pokemon.evolutionChain = await fetchPokemonEvolution(pokemon.name);
    }
    openDialog(pokemonIndex);
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

//#region Evolution

async function fetchPokemonEvolution(pokemonName) {
    try {
        const EVOLUTION_URL = await getEvolutionChainUrl(pokemonName);
        let evolutionResult = await fetch(EVOLUTION_URL);
        let evolutionData = await evolutionResult.json();
        let names = [];
        getNamesofEvolution(evolutionData.chain, names);
        return await getEvolutionDetails(names);
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function getEvolutionChainUrl(pokemonName) {
    let pokemonEvolutionAnswer = await fetch(BASE_URL + "pokemon-species/" + pokemonName);
    let pokemonEvolutionData = await pokemonEvolutionAnswer.json();
    return pokemonEvolutionData.evolution_chain.url;
}

async function getEvolutionDetails(names) {
    return Promise.all(names.map(async (name) => {
        const RESULT = await fetch(`${BASE_URL}pokemon/${name}`);
        const DATA = await RESULT.json();
        return {
            'name': name,
            'img': DATA.sprites.other.dream_world.front_default ||
                DATA.sprites.other['official-artwork'].front_default ||
                DATA.sprites.front_default
        };
    }));
}

async function preloadEvolutions(startIndex, endIndex) {
    for (let index = startIndex; index < endIndex; index++) {
        let pokemon = pokemonsData[index];
        if (pokemon && pokemon.evolutionChain.length === 0) {
            pokemon.evolutionChain = await fetchPokemonEvolution(pokemon.name);
        }
    }
}

function getNamesofEvolution(chainStep, nameArray) {
    nameArray.push(chainStep.species.name);
    for (let nextStep of chainStep.evolves_to) {
        getNamesofEvolution(nextStep, nameArray);
    }
}

//#endregion
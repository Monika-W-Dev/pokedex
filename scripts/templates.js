
function pokemonListViewTemplate(array, pokemonIndex) {
    let pokemon = array[pokemonIndex];
    let mainType = pokemon.types[0];

    return `<div class="single_list_card ${mainType}" onclick="openDetailCard(${pokemonsData[pokemonIndex].id})">
                <span id="pokemon_id${pokemonIndex}" class="pokemon_id"># ${array[pokemonIndex].id}</span>
                <div class="img_container">
                    <img id="pokemon_image${pokemonIndex}" class="pokemon_image"
                        src="${array[pokemonIndex].img}"
                        alt="${array[pokemonIndex].name}">
                </div>        
                <span id="pokemon_name${pokemonIndex}" class="pokemon_name">
                ${capitalLetters(array[pokemonIndex].name)}
                </span>
                <div id="pokemon_types${pokemonIndex}" class="pokemon_types">
                    ${renderTypes(pokemonIndex)}
                </div>
            </div>
    `
}

function pokemonTypesTemplate(pokemonIndex, typesIndex) {
    let pokemonType = pokemonsData[pokemonIndex].types[typesIndex]
    return `<div class="pokemon_type ${pokemonType}">
                ${pokemonType}
            </div>  
    `
}

function singlePokemonTemplate(pokemonIndex) {
    return ` <button class="next_previous_button" id="previous" onclick="showPrevious()">&lt;</button>
            <button class="next_previous_button" id="next" onclick="showNext()">&gt;</button>
    <div id="single_pokemon_info_top">
            <img id="pokemon_image" class="pokemon_image"
            src="${pokemonsData[pokemonIndex].img}"
            alt="${pokemonsData[pokemonIndex].name}">
            <span id="pokemon_name" class="pokemon_name">
            ${capitalLetters(pokemonsData[pokemonIndex].name)}
            </span>
                 <div id="pokemon_types${pokemonIndex}" class="pokemon_types">
                    ${renderTypes(pokemonIndex)}
                </div>
        </div>

 <div id="single_pokemon_info_buttom">
                            <div id="card_taps">
                                <button id="about" class="card_tap open_card" onclick="changeDisplayInfoPokemon('about', ${pokemonIndex})">About</button>
                                <button id="baseStats" class="card_tap" onclick="changeDisplayInfoPokemon('baseStats', ${pokemonIndex})">Base Stats</button>
                                <button id="evolution" class="card_tap" onclick="changeDisplayInfoPokemon('evolution', ${pokemonIndex})">Evolution</button>
                            </div>

        <div class="info_section" id="info_section">
        ${aboutTemplate(pokemonIndex)}
        <div>  
`
}

function aboutTemplate(pokemonIndex) {
    return ` <table class="info_about">
                <tbody>
                    <tr>
                        <td>Height</td>
                        <td>${pokemonsData[pokemonIndex].height}</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>${pokemonsData[pokemonIndex].weight}</td>
                    </tr>
                    <tr>
                        <td>Abilities</td>
                        <td>${renderPokemonAbilities(pokemonIndex)}</td>
                    </tr>
                </tbody>
            </table>
`
}

function baseStatsTemplate(pokemonIndex) {
    let baseStats = pokemonsData[pokemonIndex].base_stats;
    let allStatsHtml = Object.entries(baseStats).map(([statsName, statsValue]) => {
        return `
            <tr>
                <td>${capitalLetters(statsName)}</td>
                <td>${statsValue}</td>
                <td>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" style="width: ${statsValue}%" >
                        </div>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    return `
        <table class="info_base_stats">
            <tbody>
                ${allStatsHtml}
            </tbody>
        </table>
`
}

function evolutionTemplate(pokemonIndex) {
    let pokemon = pokemonsData[pokemonIndex];
    let evolutionHtml = pokemon.evolutionChain.map(evolutionObject => {
        return ` <div class="evolution_item">
                    <img class="evolution_img" src="${evolutionObject.img}">
                    <span>${capitalLetters(evolutionObject.name)}</span>
                </div>`
        }).join('');
         return `<div class="evolution">
                    ${evolutionHtml}
                </div>
`
}



function pokemonListViewTemplate(pokemonIndex) {
    let pokemon = pokemonsData[pokemonIndex];
    let mainType = pokemon.types[0];
    
    return `<div class="single_list_card ${mainType}" onclick="openDialog(${pokemonIndex})">
                <span id="pokemon_id${pokemonIndex}" class="pokemon_id"># ${pokemonsData[pokemonIndex].id}</span>
                <img id="pokemon_image${pokemonIndex}" class="pokemon_image"
                    src="${pokemonsData[pokemonIndex].img}"
                    alt="${pokemonsData[pokemonIndex].name}" onclick="openDialog(${pokemonIndex})">
                <span id="pokemon_name${pokemonIndex}" class="pokemon_name">
                ${capitalLetters(pokemonsData[pokemonIndex].name)}
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
 return `<div id="single_pokemon_info_top">
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
                                <button id="about" class="card_tap open_card">About</button>
                                <button id="base_stats" class="card_tap">Base Stats</button>
                                <button id="evolution" class="card_tap">Evolution</button>
                            </div>

         <div class="info_section">
            <table class="info_about">
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
        <div>
`
}
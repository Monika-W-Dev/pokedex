
function pokemonListViewTemplate(pokemonsIndex) {
    return `<div class="single_list_card bug" onclick="openDialog(${pokemonsIndex})">
                <span id="pokemon_id${pokemonsIndex}" class="pokemon_id">${pokemonsData[pokemonsIndex].id}</span>
                <img id="pokemon_image${pokemonsIndex}" class="pokemon_image"
                    src="${pokemonsData[pokemonsIndex].img}"
                    alt="${pokemonsData[pokemonsIndex].name}">
                <span id="pokemon_name${pokemonsIndex}" class="pokemon_name">${capitalLetters(pokemonsData[pokemonsIndex].name)}</span>
                <div id="pokemon_types${pokemonsIndex}" class="pokemon_types">
                    ${renderTypes(pokemonsIndex)}
                </div>
            </div>
    `
}

function pokemonTypesTemplate(pokemonsIndex, typesIndex) {
    return ` <div id="pokemon_type${pokemonsIndex}" class="pokemon_type">
                        ${pokemonsData[pokemonsIndex].types[typesIndex]}
                    </div>  
    `
}
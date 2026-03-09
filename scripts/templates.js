
function pokemonListViewTemplate(pokemonsIndex) {
    return `<div id="single_list_card" class="single_list_card bug" onclick="openDialog(${pokemonsIndex})">
                <span id="pokemon_id">${pokemonsData[pokemonsIndex].id}</span>
                <img id="pokemon_image"
                    src="${pokemonsData[pokemonsIndex].img}"
                    alt="${pokemonsData[pokemonsIndex].name}">
                <span id="pokemon_name">${capitalLetters(pokemonsData[pokemonsIndex].name)}</span>
                <div id="pokemon_types">
                    ${renderTypes()}
                </div>
            </div>
    `
}

function pokemonTypesTemplate(pokemonsIndex, typesIndex) {
    return ` <div id="pokemon_type" class="grass">
                        ${pokemonsData[pokemonsIndex].types[typesIndex]}
                    </div>  
    
    `
}
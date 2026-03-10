let pokemonsData = [
    { 
        'id': 1,
        'name': 'bulbasaur',
        'img': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
        'alt': 'bulbasaur',
        'types': [
            'grass', 'poison'
        ],
        'height': 170,
        'weight': 70,
        'abilities': ['blaze', 'solar'],
        'base_stats': {
            'hp': 45,
            'attack': 65,
            'defense': 48,
            'special-attack': 22,
            'special-defense': 30,
            'speed': 45
        },
        'evolution': [ 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg', 
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg', 
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg' 
        ]
    }
];

function init() {
    renderPokemonOverview();
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

function openDialog(pokemonIndex) {
    const dialogRef = document.getElementById("dialog");
    dialogRef.showModal();
    let singlePokemonOverlay = document.getElementById('single_pokemon_overlay');
    singlePokemonOverlay.innerHTML = singlePokemonTemplate(pokemonIndex);
}

function closeDialog() {
    const dialogRef = document.getElementById("dialog");
    dialogRef.close();
}

function preventCloseDialogOnDialog(event) {
    event.stopPropagation();
}
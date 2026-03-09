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
        'abilities': ['blaze', ' solar'],
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
    for (let pokemonsIndex = 0; pokemonsIndex < pokemonsData.length; pokemonsIndex++) {
        overviewSection.innerHTML += pokemonListViewTemplate(pokemonsIndex);        
    }
}

function capitalLetters(name) {
    let capitalName = name.toUpperCase();
    return capitalName;
}

function renderTypes(pokemonsIndex) {
    let renderTypes = document.getElementById('pokemon_types');
    renderTypes.innerHTML = "";
    for (let typesIndex = 0; typesIndex < pokemonsData[pokemonsIndex].types.length; typesIndex++) {
       renderTypes.innerHTML += pokemonTypesTemplate(pokemonsIndex, typesIndex);
        
    }
}


function openDialog() {
    const dialogRef = document.getElementById("dialog");
    dialogRef.showModal();
}

function closeDialog() {
    const dialogRef = document.getElementById("dialog");
    dialogRef.close();
}

function preventCloseDialogOnDialog(event) {
    event.stopPropagation();
}
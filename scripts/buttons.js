function openDialog(pokemonIndex) {
    const dialogRef = document.getElementById("dialog");
    dialogRef.showModal();
    let singlePokemonOverlay = document.getElementById('single_pokemon_overlay');
    singlePokemonOverlay.innerHTML = singlePokemonTemplate(pokemonIndex);
    return currentPokeIndex = pokemonIndex;
}

function closeDialog() {
    const dialogRef = document.getElementById("dialog");
    dialogRef.close();
}

function preventCloseDialogOnDialog(event) {
    event.stopPropagation();
}

function changeDisplayInfoPokemon(destinationTab, pokemonIndex) {
    document.querySelectorAll('.card_tap').forEach(button => {
        button.classList.remove('open_card');
    })
    document.getElementById(destinationTab).classList.add("open_card");
    let infoSection = document.getElementById('info_section');
    let functionName = destinationTab + "Template";
    infoSection.innerHTML = window[functionName](pokemonIndex);
}

function showNext() {
    currentPokeIndex++;
    if (currentPokeIndex >= pokemonsData.length) {
        currentPokeIndex = 0;
    }
    openDialog(currentPokeIndex);
}

function showPrevious() {
    currentPokeIndex--;
    if (currentPokeIndex < 0) {
        currentPokeIndex = pokemonsData.length - 1;
    }
    openDialog(currentPokeIndex);
}
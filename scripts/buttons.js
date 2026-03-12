function openDialog(pokemonIndex) {
    document.getElementById("dialog").setAttribute("class", `${pokemonsData[pokemonIndex].types[0]}`);
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

function searchPokemon() {
    let searchInputRef = document.getElementById('input');
    let inputSearch = searchInputRef.value.toLowerCase();
    let listView = document.getElementById('list_view');
    listView.innerHTML = "";
    if (inputSearch.length >= 3) {
        let found = pokemonsData.filter((pokemon, index) => {
            return pokemon.name.toLowerCase().includes(inputSearch);
        });
        if (found.length > 0) {
            found.forEach((pokemon) => {
            listView.innerHTML += pokemonListViewTemplate(pokemonIndex);
            })
        }
        else {
            searchInputRef.focus();
            let faultyInputNotification = document.getElementById('faulty_input');
            faultyInputNotification.style = "display: block";
            faultyInputNotification.innerHTML = "ups...not found. Try again"
            setTimeout(() => {
                faultyInputNotification.style = "display: none";
            }, 4000)
        }
    }
    else {
        searchInputRef.focus();
        let faultyInputNotification = document.getElementById('faulty_input');
        faultyInputNotification.style = "display: block";
        faultyInputNotification.innerHTML = "Please enter at least three letters"
        setTimeout(() => {
            faultyInputNotification.style = "display: none";
        }, 4000)
    }
    searchInputRef.value = "";
}

function refresh() {
    let searchInput = document.getElementById('input');
    searchInput.value = "";
    searchInput.focus();
}
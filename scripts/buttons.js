function openDialog(array, pokemonIndex) {
    document.getElementById("dialog").setAttribute("class", `${array[pokemonIndex].types[0]}`);
    const DIALOG_REF = document.getElementById("dialog");
    DIALOG_REF.showModal();
    let singlePokemonOverlay = document.getElementById('single_pokemon_overlay');
    singlePokemonOverlay.innerHTML = singlePokemonTemplate(array, pokemonIndex);
    return currentPokeIndex = pokemonIndex;
}

function closeDialog() {
    const DIALOG_REF = document.getElementById("dialog");
    DIALOG_REF.close();
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
    infoSection.innerHTML = window[functionName](currentArray, pokemonIndex);
}

function showNext() {
    currentPokeIndex++;
    if (currentPokeIndex >= currentArray.length) {
        currentPokeIndex = 0;
    }
    openDialog(currentArray, currentPokeIndex);
}

function showPrevious() {
    currentPokeIndex--;
    if (currentPokeIndex < 0) {
        currentPokeIndex = currentArray.length - 1;
    }
    openDialog(currentArray, currentPokeIndex);
}

function searchPokemon() {
    let inputSearchRef = document.getElementById('input');
    let inputSearch = inputSearchRef.value.toLowerCase();
    if (inputSearch.length >= 3) {
        let listView = document.getElementById('list_view');
        listView.innerHTML = "";
        inputTruthy(inputSearch, inputSearchRef);
    }
    else {
        inputFalsy(inputSearchRef)
    }
    inputSearchRef.value = "";
}

function inputTruthy(inputSearch, inputSearchRef) {
    
    foundPokemons = POKEMONS_DATA.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(inputSearch.toLowerCase());
    });
    if (foundPokemons.length > 0) {
        currentArray = foundPokemons;
        renderPokemonOverview(currentArray);
        document.getElementById('load_more_section').style = "display: none"
    }
    else {
        inputSearchRef.focus();
        let faultyInputNotification = document.getElementById('list_view');
        faultyInputNotification.innerHTML = "ups...not found. Try again";
        document.getElementById('load_more_section').style = "display: none";
    }
}

function inputFalsy(inputSearchRef) {
    inputSearchRef.focus();
    let faultyInputNotification = document.getElementById('faulty_input');
    faultyInputNotification.style = "display: block";
    document.getElementById('load_more_section').style = "display: none";
    faultyInputNotification.innerHTML = "Please enter at least three letters"
    setTimeout(() => {
        faultyInputNotification.style = "display: none";
    }, 4000)
}

function refresh() {
    let searchInput = document.getElementById('input');
    currentArray = POKEMONS_DATA;12
    searchInput.value = "";
    searchInput.focus();
    FOUND = "";
    renderPokemonOverview(currentArray);
    document.getElementById('load_more_section').style = ""
}
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
    let inputSearchRef = document.getElementById('input');
    let inputSearch = inputSearchRef.value.toLowerCase();
    let listView = document.getElementById('list_view');
    listView.innerHTML = "";
    if (inputSearch.length >= 3) {
        const FOUND = pokemonsData.filter((pokemon) => {
            return pokemon.name.toLowerCase().includes(inputSearch.toLowerCase());
        });
        if (FOUND.length > 0) {
            renderPokemonOverview(FOUND);
            document.getElementById('load_more_section').style = "display: none"
        }
        else {
            inputSearchRef.focus();
            let faultyInputNotification = document.getElementById('faulty_input');
            faultyInputNotification.style = "display: block";
            faultyInputNotification.innerHTML = "ups...not found. Try again"
            setTimeout(() => {
                faultyInputNotification.style = "display: none";
            }, 4000)
        }
    }
    else {
        inputSearchRef.focus();
        let faultyInputNotification = document.getElementById('faulty_input');
        faultyInputNotification.style = "display: block";
        faultyInputNotification.innerHTML = "Please enter at least three letters"
        setTimeout(() => {
            faultyInputNotification.style = "display: none";
        }, 4000)
    }
    inputSearchRef.value = "";
}

function refresh() {
    let searchInput = document.getElementById('input');
    searchInput.value = "";
    searchInput.focus();
    FOUND = "";
    renderPokemonOverview(pokemonsData);
    document.getElementById('load_more_section').style = ""
}
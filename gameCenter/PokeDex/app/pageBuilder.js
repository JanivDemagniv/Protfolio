import { reset, searchPokemonName, searchPokemonNum, fullPokemonArr, searchPokemonType } from "./source.js";

//accesing the DOM
const screen = document.getElementById('screen');
const headLine = document.getElementById('headLine');
const sreachInputByName = document.getElementById('searchName');
const sreachInputByNum = document.getElementById('searchNum');
const loader = document.getElementById('loader');
const selectType = document.getElementById('searchType');

//restart the page
headLine.addEventListener('click', () => {
    window.location.reload()
})

//to make the first letter capital
function nameWithCapitalLetters(str) {
    return str.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('-')
};

//add 0's to numbers
function makeThreeDigitNumber(num) {
    return num.toString().padStart(3, '0');
};

//creating the page information for each subject
const infoBuilder = (pokemonName) => {
    fullPokemonArr.filter((pokemon) => {
        if (pokemon.name === pokemonName) {
            screen.innerHTML = "";
            const pokeName2 = document.createElement('div');
            pokeName2.className = "pokeName2";
            pokeName2.innerHTML = "<h4>Name:</h4>" + nameWithCapitalLetters(pokemon.name);
            const pokePic = document.createElement('div');
            pokePic.className = "pokePic";
            const pokePic2 = document.createElement('img');
            pokePic2.src = pokemon.sprites.other["official-artwork"].front_default;
            pokePic.appendChild(pokePic2);
            const pokeNum = document.createElement('div');
            pokeNum.className = "pokeNum";
            pokeNum.innerHTML = "<h4>Number:</h4>" + makeThreeDigitNumber(pokemon.id);
            const pokeType = document.createElement('div');
            pokeType.className = "pokeType";
            let dataArr = pokemon.types
            pokeType.innerHTML = `<h4>Type:</h4> ${checkType(dataArr)}`;
            const pokeWrapperInfo = document.createElement('div');
            const pokeStats = document.createElement('div');
            pokeStats.className = "pokeStats";
            pokeStats.innerHTML = `<h4>Basic Stats:</h4> ${pokemon.stats[0].stat.name}: <progress value="${pokemon.stats[0].base_stat}" max="255"></progress> ${pokemon.stats[1].stat.name}:<progress value="${pokemon.stats[1].base_stat}" max="255"></progress> ${pokemon.stats[2].stat.name}:<progress value="${pokemon.stats[2].base_stat}" max="255"></progress> ${pokemon.stats[3].stat.name}:<progress value="${pokemon.stats[3].base_stat}" max="255"></progress> ${pokemon.stats[4].stat.name}:<progress value="${pokemon.stats[4].base_stat}" max="255"></progress> ${pokemon.stats[5].stat.name}:<progress value="${pokemon.stats[5].base_stat}" max="255"></progress>`
            const pokeCries = document.createElement('div');
            pokeCries.className = "pokeCries";
            pokeCries.innerHTML = `<audio controls src=${pokemon.cries.latest}></audio>`
            const pokeSprits = document.createElement('div');
            pokeSprits.className = "pokeSprits";
            pokeSprits.innerHTML = `<h4>Sprites:</h4>
                    <div class="arrg"><span><h4>Front</h4><img src=${pokemon.sprites.front_default}></span>
                <span><h4>Back</h4><img src=${pokemon.sprites.back_default}></span></div>`

            const reset = document.createElement('div')
            reset.className = "reset";
            const resetLink = document.createElement('button');
            resetLink.innerText = "Return";
            resetLink.addEventListener('click', () => {
                listBuilder();
            })
            reset.appendChild(resetLink);


            pokeWrapperInfo.className = "pokeWrapperInfo";
            pokeWrapperInfo.appendChild(pokeName2);
            pokeWrapperInfo.appendChild(pokePic);
            pokeWrapperInfo.appendChild(pokeNum);
            pokeWrapperInfo.appendChild(pokeType);
            pokeWrapperInfo.appendChild(pokeStats);
            pokeWrapperInfo.appendChild(pokeCries);
            pokeWrapperInfo.appendChild(pokeSprits);
            pokeWrapperInfo.appendChild(reset)
            screen.appendChild(pokeWrapperInfo);
        }
    }
    )
}

//row builder - in the main page display
const rowBuilder = (pokemon) => {
    const pokeWrapper = document.createElement('div');
    pokeWrapper.className = "pokeWrapper";
    const pokePic = document.createElement('div');
    pokePic.className = "pokePic";
    const img = document.createElement('img');
    // img.src = data.sprites.versions["generation-viii"].icons.front_default;
    img.src = pokemon.sprites.other.home.front_default;
    // img.src = data.sprites.other["official-artwork"].front_default;
    const pokeName = document.createElement('div');
    pokeName.className = "pokeName";
    const pokeNameText = document.createElement('button');
    pokeNameText.className = "pokeClick";
    pokeNameText.innerText = nameWithCapitalLetters(pokemon.name);
    pokeNameText.addEventListener('click', (e) => { infoBuilder(e.target.innerText.toLowerCase()) });

    const pokeNum = document.createElement('div');
    pokeNum.className = "pokeNum";
    pokeNum.innerText = makeThreeDigitNumber(pokemon.id)
    const pokeType = document.createElement('div');
    pokeType.className = "pokeType";
    let dataArr = pokemon.types
    pokeType.innerHTML = checkType(dataArr);

    pokePic.appendChild(img);
    pokeWrapper.appendChild(pokePic);
    pokeName.appendChild(pokeNameText);
    pokeWrapper.appendChild(pokeName);
    pokeWrapper.appendChild(pokeNum);
    pokeWrapper.appendChild(pokeType);
    screen.appendChild(pokeWrapper)

}

//function to create the list
const listBuilder = () => {
    screen.innerHTML = "";
    const pokeWrapper = document.createElement('div');
    pokeWrapper.className = "pokeWrapper";
    const pokePic = document.createElement('div');
    pokePic.className = "pokePic";
    pokePic.innerHTML = "<h2>Picture</h2>";
    const pokeName = document.createElement('div');
    pokeName.className = "pokeName";
    pokeName.innerHTML = "<h2>Name</h2>";
    const pokeNum = document.createElement('div');
    pokeNum.className = "pokeNum";
    pokeNum.innerHTML = "<h2>Number</h2>";
    const pokeType = document.createElement('div');
    pokeType.className = "pokeType";
    pokeType.innerHTML = "<h2>Type</h2>";

    pokeWrapper.appendChild(pokePic);
    pokeWrapper.appendChild(pokeName);
    pokeWrapper.appendChild(pokeNum);
    pokeWrapper.appendChild(pokeType);
    screen.appendChild(pokeWrapper)
    for (const pokemon of fullPokemonArr) {
        rowBuilder(pokemon);
    }
}

//function to handle types, some have two types, some have one - the function handle both
function checkType(arr) {
    if (arr.length == 2) {
        return `<span class="${arr[0].type.name}">${arr[0].type.name}</span><span class="${arr[1].type.name}">${arr[1].type.name}</span>`
    } else {
        return `<span class="${arr[0].type.name}">${arr[0].type.name}</span>`
    }
}


//searching function
sreachInputByName.addEventListener('keyup', (event) => {
    screen.innerHTML = "";
    reset();
    searchPokemonName(event.target.value.trim());
    listBuilder();
});

sreachInputByNum.addEventListener('keyup', (event) => {
    screen.innerHTML = "";
    reset();
    searchPokemonNum(event.target.value);
    listBuilder();
});

selectType.addEventListener('change', () => {
    screen.innerHTML = "";
    reset();
    searchPokemonType(selectType.value);
    listBuilder();
})

const loaderPage = () => {
    loader.style.display = "none";
}

export { listBuilder, loaderPage }
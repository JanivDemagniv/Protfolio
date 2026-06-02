//general array to store the api information
const pokemonArry = [];

//becuase the api can only bring information about one subject at a time, the function create 1025 request to get the information
async function fillPokemonArray() {
    const totalPokemons = 1025;
    const chunkSize = 40;
    let allPokemons = [];

    async function fetchPokemon(id) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (!response.ok) throw new Error(`Status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Failed to fetch Pokémon ID ${id}:`, error);
            return null;
        }
    }

    for (let i = 1; i <= totalPokemons; i += chunkSize) {
        const chunkRequests = [];

        for (let j = i; j < i + chunkSize && j <= totalPokemons; j++) {
            chunkRequests.push(fetchPokemon(j));
        }

        const chunkResults = await Promise.all(chunkRequests);

        allPokemons.push(...chunkResults.filter(item => item !== null));
    }
    return allPokemons;
}



//copy of the array to manipulate 
let pokemonArr = [...await fillPokemonArray(pokemonArry)]
let fullPokemonArr = [...pokemonArr]

//searching functions
const searchPokemonName = (text) => {
    fullPokemonArr = fullPokemonArr.filter((pokemon) => {
        let name = pokemon.name.toLowerCase();
        return name.includes(text.toLowerCase())

    })
}

const searchPokemonNum = (num) => {
    fullPokemonArr = fullPokemonArr.filter((pokemon) => {
        let number = pokemon.id.toString();
        return number.includes(num.toString());

    })
}

const searchPokemonType = (type) => {
    fullPokemonArr = fullPokemonArr.filter((pokemon) => {
        if (pokemon.types.length == 2) {
            if (pokemon.types[0].type.name == type || pokemon.types[1].type.name == type) {
                return pokemon;
            }
        } else if (pokemon.types.length == 1) {
            if (pokemon.types[0].type.name == type) {
                return pokemon
            }
        }
    })
}

//reset the array
const reset = () => {
    fullPokemonArr = [...pokemonArr];
}

export { fullPokemonArr, reset, searchPokemonName, searchPokemonNum, searchPokemonType }


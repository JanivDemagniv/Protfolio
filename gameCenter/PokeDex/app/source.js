//general array to store the api information
const pokemonArry = [];

//becuase the api can only bring information about one subject at a time, the function create 1025 request to get the information
async function fillPokemonArray(arr) {
    let newArr = [];
    let requests = [];

    for (let i = 1; i <= 1025; i++) {
        requests.push(
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error(`Failed to fetch data for Pokémon ID ${i}:`, error);
                    return null;
                })
        );
    }

    try {
        newArr = await Promise.all(requests);
        newArr = newArr.filter(item => item !== null); // Filter out any failed requests
    } catch (error) {
        console.error('Error during Promise.all:', error);
    }

    return arr = JSON.parse(JSON.stringify(newArr));
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


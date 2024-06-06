import axios from 'axios'

export default {
    async getPokemonList(start, end){
        let gottenPokemons = []
        for(let i = start; i<= end; i++){
            const itemPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error)
            })

            const addedPokemon = {
                id: itemPokemon.id,
                name: itemPokemon.name,
                image: itemPokemon.sprites.other.dream_world.front_default
            }

            gottenPokemons.push(addedPokemon)
        }
        return gottenPokemons;
    },
    async getPokemonDetail(id) {
        return await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    async idsGamePokemon() {
        let list = [];
        for (let i = 0; i < 4; i++){
            const id = Math.floor(Math.random() * 649) + 1;
            list.push(id)
        }
        return list
    },
    async getPokemon(ids) {
        let pokemonDetails = []
        for(const id of ids) {
            const details = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error)
            })

            const addedPokemon = {
                id: details.id,
                name: details.name,
                image: details.sprites.other.dream_world.front_default
            }
            pokemonDetails.push(addedPokemon);
        }
        return pokemonDetails;
    },
}
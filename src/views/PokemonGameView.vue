<template>
    <div v-if="loading">
        <button class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
        </button>
    </div>    
    <div v-else class="game-container">
        <div v-if="!gameOver" class="game-view">
            <h3 class="text-center">¿Quién es este Pokémon?</h3>
            <div class="pokemon-image-container">
                <img :src="selectedPokemonImage" alt="Pokemon Image" class="pokemon-image silhouette">
            </div>
            <div class="options-container">
                <button
                    v-for="pokemon in pokemonOptions"
                    :key="index"
                    class="btn btn-primary option-button"
                    @click="checkAnswer(pokemon.id)"
                    >
                    {{ pokemon.name }}
                </button>
            </div>
        </div>
        <div v-else class="result-view">
            <h3 class="text-center">{{ resultMessage }}</h3>
            <div class="pokemon-image-container">
                <img :src="selectedPokemonImage" alt="Pokemon Image" class="pokemon-image">
            </div>
            <button @click="restartGame()" class="btn btn-primary mt-3">Reiniciar juego</button>
        </div>
    </div>
</template>

<script>
import PokemonServices from '@/services/PokemonServices';

export default {
    name: 'GameView',
    data() {
        return {
        pokemonOptions: [],
        selectedPokemon: {},
        selectedPokemonImage: '',
        correctPokemonId: null,
        gameOver: false,
        resultMessage: '',
        loading: true
        }
    },
    async created() {
        await this.startGame();
    },
    methods: {
        async startGame() {
            const pokemonIds = await PokemonServices.idsGamePokemon()
            this.pokemonOptions = await PokemonServices.getPokemon(pokemonIds)
            const pokemonIndex = Math.floor(Math.random() * this.pokemonOptions.length);
            this.correctPokemonId = this.pokemonOptions[pokemonIndex].id;
            this.selectedPokemon = this.pokemonOptions[pokemonIndex];
            this.selectedPokemonImage = this.pokemonOptions[pokemonIndex].image;
            this.loading = false
        },
        checkAnswer(selectedId) {
            this.gameOver = true;
            if (selectedId == this.correctPokemonId) {
                this.resultMessage = '¡Correcto! Es ' + this.selectedPokemon.name;
            } else {
                this.resultMessage = 'Incorrecto. Era ' + this.selectedPokemon.name;
            }
        },
        restartGame() {
            this.loading = true
            this.gameOver = false;
            this.resultMessage = '';
            this.startGame();
        }
    }
}
</script>

<style>
.game-container {
display: flex;
flex-direction: column;
align-items: center;
margin-top: 20px;
}

.pokemon-image-container {
margin: 20px 0;
}

.pokemon-image {
width: 200px;
height: 200px;
}

.silhouette {
filter: brightness(0%);
}

.options-container {
display: flex;
flex-direction: column;
}

.option-button {
margin: 10px;
}

.result-view {
display: flex;
flex-direction: column;
align-items: center;
}

.result-view h3 {
margin-bottom: 20px;
}
</style>

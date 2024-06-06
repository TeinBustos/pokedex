<template>
    <div v-if="loading">
        <button class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
        </button>
    </div >  
    <div v-else>
        <div class="row">
            <div class="col d-flex justify-content-center">
                <h3 class="text-primary">Listado de Pokemons</h3>
            </div>
        </div>
        <div class="row p-3 mt-3 mb-3 d-flex justify-content-center">
            <div v-for="pokemon in pokemons" :key="pokemon.name" class="col-sm-12 col-md-6 col-lg-6">
                <div class="card d-flex justify-content-center align-items-center mb-3">
                    <div class="card-title">
                        <h4 class="fw-bold text-uppercase">
                            {{ pokemon.name }}
                        </h4>
                    </div>
                    <img :src="pokemon.image" alt="imagePokemon" class="imagePokemon">
                </div>
            </div>
            <div class="row d-flex">
                <div class="col-6 justify-content-start">
                    <button @click="previousPokemons" class="btn btn-primary" :disabled="start <= 1">Anterior</button>
                </div>
                <div class="col-6 justify-content-start">
                    <button @click="nextPokemons" class="btn btn-primary" :disabled="end >= 649">Siguiente</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PokemonServices from '@/services/PokemonServices'
export default {
    name: 'PokemonsListView',
    components: {
    },
    data() {
        return {
        pokemons: null,
        selectedPokemon: {},
        start: 1,
        end: 10,
        loading: true
        }
    },
    async created() {
        this.chargePokemons();
    },
    methods: {
        async chargePokemons () {
            this.loading = true
            this.pokemons = await PokemonServices.getPokemonList(this.start, this.end)
            this.loading = false
        },
        previousPokemons(){
            if(this.start >= 1) {
                this.start -= 10;
                this.end -= 10;
                this.chargePokemons();
            }
        },
        nextPokemons() {
            if(this.end <= 649) {
                this.start += 10;
                this.end += 10;
                this.chargePokemons();
            }
        }
    }
}
</script>
<style>
.imagePokemon {
    width: 180px;
    height: 180px;
}
</style>
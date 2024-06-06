<template>
    <div class="row d-flex justify-content-center">
        <div class="col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center">
            <div class="card w-75">
                <div class="card-body">
                    <h2 class="card-title fw-bold text-uppercase">
                        {{ pokemon.name }}
                    </h2>
                    <img class="card-img imagePokemon" :src="pokemon.sprites?.other?.dream_world?.front_default" alt="imagenPokemon">
                    <h6 class="mt-2">INFORMATION</h6>
                    <div class="mt-2">
                        <div class="d-flex">
                            <span class="fw-bold me-2">Height:</span>
                            <span>{{ pokemon.height }}</span>
                        </div>
                        <div class="d-flex">
                            <span class="fw-bold me-2">Weight:</span>
                            <span>{{ pokemon.weight }}</span>
                        </div>
                        <div class="d-flex">
                            <span class="fw-bold me-2">Type:</span>
                            <span v-for="item in pokemon.types" :key="item.type.name" class="me-2">
                                {{ item.type.name }}
                            </span>
                        </div>
                        <div class="detail-item d-flex">
                            <span class="fw-bold me-2">Ability:</span>
                            <span v-for="item in pokemon.abilities" :key="item.ability.name" class="me-2">
                                {{ item.ability.name }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PokemonServices from '@/services/PokemonServices';
import { useRoute } from 'vue-router';

export default {
    name: 'PokemonDetailView',
    data() {
        return {
        pokemon: {}
        }
    },
    async created() {
        const route = useRoute()
        const id = route.params.id
        this.pokemon = await PokemonServices.getPokemonDetail(id)
    }
}
</script>

<style scoped>
.imagePokemon {
    width: 180px;
    height: 180px;
}
</style>

import { createRouter, createWebHistory } from 'vue-router'
import PokemonsListView from '@/views/PokemonsListView.vue'
import PokemonDetailView from '@/views/PokemonDetailView.vue'
import PokemonGameView from '@/views/PokemonGameView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: PokemonsListView
  },
  {
    path: '/pokemon/:id',
    name: 'pokemon',
    component: PokemonDetailView
  },
  {
    path: '/game',
    name: 'game',
    component: PokemonGameView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-5">
      <h4 class="m-0">Lista de carros</h4>
      <dashboard-cars-modal />
      <dashboard-cars-modal-edit v-if="selectedCar" @reset-selected-car="selectCar(null)" />
    </div>

    <div class="d-flex justify-content-center mb-4">
      <dashboard-cars-search-input :loading="loading" :filters="filters" @call-search="reloadCars" />
    </div>
    

    <div class="d-flex justify-content-center align-items-center flex-wrap">
      <div v-if='loading'>Carregando carros...</div>

      <div v-else-if='!cars.length'>Nenhum carro encontrado</div>

      <div v-else>
        <div class='container__cars__list'>
          <div
            class="container__cars__list__item"
            v-for="car in cars"
            :key="`car-${car.id}`"
          >
            <b-card
              :title="car.name"
              :img-src="`${baseImageUrl}${car.banner}`"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2 h-100 d-flex flex-column justify-content-end"
            >
              <b-card-text class="container__cars__list__item__informations">
                  <p class="container__cars__list__item__informations__item"><b>Modelo:</b> {{ car.model }}</p>
                  <p class="container__cars__list__item__informations__item"><b>Preço:</b> {{ car.price.replace('.', ',') }}</p>
                  <p class="container__cars__list__item__informations__item"><b>Combutível:</b> {{ car.fuel }}</p>
                  <p class="container__cars__list__item__informations__item"><b>Color:</b> {{ car.color.name }}</p>
              </b-card-text>

              <b-card-text class="d-flex justify-content-end mt-4">
                <a @click="callDestroyCar(car.id)" class="btn btn-sm btn-danger ml-2">remover</a>
                <a @click="callSelectCar(car)" class="btn btn-sm btn-warning text-white ml-2">editar</a>
              </b-card-text>
            </b-card>
          </div>
        </div>

        <dashboard-cars-pagination @search="reloadCars" :loading="loading"/> 
      </div> 

    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      filters: {
        search: null
      }
    }
  },

  methods: {
    ...mapActions('loader', ['setLoading']),
    ...mapActions('cars', ['loadCars', 'destroyCar', 'selectCar']),

    callDestroyCar(carId) {
      this.destroyCar(carId)
          .then((res) => {
            this.$toast.success('Carro deletado com sucesso.')

            this.reloadCars()
          })
          .catch((error) => {
            this.$toast.error(error.message)
          })
          .finally(() => this.setLoading(false))
    },

    callSelectCar(car) {
      this.selectCar(car)

      this.$bvModal.show('cars-modal-edit')
    },

    reloadCars() {
      this.setLoading(true)
      this.loadCars(this.filters).finally(() => this.setLoading(false))
    },
  },

  computed: {
    ...mapState('loader', ['loading']),
    ...mapState('cars', ['cars', 'selectedCar']),

    baseImageUrl() {
      return `${process.env.NUXT_ENV_URL_API.replace('/api', '')}/storage/`
    },
  },

  created () {
    this.setLoading(true)

    this.loadCars(this.filters).finally(() => this.setLoading(false))
  }
}
</script>

<style lang="scss" scoped>
  .container__cars__list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 32px;

    &__item {
      margin: 8px;

      &__informations {
        &__item {
          margin: 0;
          font-size: 14px;
          color: gray;
        }
      }
    }
  }
</style>
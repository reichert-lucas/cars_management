<template>
    <div>
        <b-button v-b-modal.cars-modal class="btn btn-sm btn-warning text-white">+ adicionar carro</b-button>

        <b-modal id="cars-modal" :title="modalTitle" hide-footer centered>
            <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
                <form @submit.prevent="handleSubmit(callSaveCar)" class="pb-3">
                    <div class="my-3">
                      <base-input-validate
                          :rules="{ required: true, min: 3 }"
                          type="text"
                          name="nome"
                          placeholder="nome da cor"
                          v-model="form.name"
                      />
                    </div>
    
                    <button
                    class="btn btn-warning btn-block text-white"
                    :disabled="loading"
                    type="submit"
                    >
                    {{ selectedCar ? "atualizar carro" : "adicionar carro" }}
                    </button>
                </form>
            </validation-observer>
        </b-modal>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {
        name: null,
        model: null,
        year: null,
        price: null,
        color_id: null,
        banner: null,
        fuel: null,
      },
    }
  },

  props: {
    selectedCar: {
      type: Object,
      required: false,
      default: null,
    },
  },

  computed: {
    ...mapState('loader', ['loading']),

    modalTitle() {
      return this.selectedCar ? `Editar - ${this.selectedCar.name }` : 'Adicionar carro'
    }
  },

  methods: {
    ...mapActions('loader', ['setLoading']),
    ...mapActions('cars', ['loadCars', 'storeCar', 'updateCar', 'destroyCar']),

    callSaveCar() {
      this.setLoading(true)

      alert("chegou")

      if (this.selectedCar) {
        this.updatecar({ ...this.form, carId: this.selectedCar.id })
          .then((res) => {
            this.$toast.success("Cor atualizada com sucesso.")

            this.resetForm()
            this.reloadCars()
          })
          .catch((error) => {
            this.$toast.error(error.message)
          })
          .finally(() => this.setLoading(false))
      }

      if (!this.selectedCar) {
        this.storeCar(this.form)
          .then((res) => {
            this.$toast.success("Cor cadastrada com sucesso.")

            this.resetForm()
            this.reloadCars()
          })
          .catch((error) => {
            this.$toast.error(error.message)
          })
          .finally(() => this.setLoading(false))
      }
    },

    callDestroycar(carId) {
      this.destroycar(carId)
        .then((res) => {
          this.$toast.success("Cor removida com sucesso.")

          this.resetForm()
          this.reloadCars()
        })
        .catch((error) => {
          this.$toast.error(error.message)
        })
        .finally(() => this.setLoading(false))
    },

    reloadCars() {
      this.setLoading(true)
      this.loadCars().finally(() => this.setLoading(false))
    },
  },
}
</script>
<style lang=""></style>

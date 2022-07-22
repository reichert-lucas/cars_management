<template>
  <b-modal id="cars-modal-edit" title="Editar carro" hide-footer centered :key="`model-${selectedCar.id}`">
      <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
          <form @submit.prevent="handleSubmit(callSaveCar)" class="pb-3">
              <div class="my-3">
                <base-input-validate
                    :rules="{ required: true, min: 3 }"
                    type="text"
                    name="nome"
                    placeholder="nome do carro"
                    v-model="form.name"
                />
              </div>

              <div class="my-3">
                <base-input-validate
                    :rules="{ required: true, min: 3 }"
                    type="text"
                    name="modelo"
                    placeholder="modelo do carro"
                    v-model="form.model"
                />
              </div>

              <div class="my-3">
                <base-input-currency-validation
                      rules="required|currencylMin:1"
                      name="preço"
                      placeholder="preço (R$)"
                      :initValue="form.price"
                      @changed-value="setPriceValue"
                  />
              </div>

              <div class="my-3">
                <base-input-validate
                    :rules="{ required: true, min: 4, max: 4 }"
                    type="number"
                    name="ano"
                    placeholder="ano"
                    v-model="form.year"
                />
              </div>

              <div class="my-3">
                <base-input-validate
                    :rules="{ required: true, min: 3 }"
                    type="text"
                    name="combustível"
                    placeholder="combustível"
                    v-model="form.fuel"
                />
              </div>

              <div class="my-3">
                <validation-provider rules="required" name="cor" v-slot="{ errors }">
                  <b-form-select 
                    v-model="form.color_id" 
                    :options="colorsOptions" 
                    :class="{'border border-danger': errors[0]}" 
                  />

                  <small v-if="errors[0]" class="error text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </div>

              <img v-if="selectedCar" :src="`${baseImageUrl}${selectedCar.bannerPreview}`" class="w-100 my-3">

              <div class="my-3">                      
                <validation-provider :rules="{ required: false }" name="banner" v-slot="{ errors }">
                    <b-form-file
                      v-model="form.banner"
                      :state="Boolean(form.banner)"
                      placeholder="selecione ou largue um banner aqui..."
                      drop-placeholder="largue um banner aqui..."
                    ></b-form-file>

                    <small v-if="errors[0]" class="error text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </div>


              <button
                class="btn btn-warning btn-block text-white"
                :disabled="loading"
                type="submit"
              >
                salvar
              </button>
          </form>
      </validation-observer>
  </b-modal>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      price: null
    }
  },

  computed: {
    ...mapState('loader', ['loading']),
    ...mapState('colors', ['colors']),
    ...mapState('cars', ['selectedCar']),

    baseImageUrl() {
      return `${process.env.NUXT_ENV_URL_API.replace('/api', '')}/storage/`
    },

    colorsOptions() {
      let options = []

      options.push({
        value: null,
        text: 'selecione uma cor',
        disabled: true,
      })

      this.colors.forEach(color => {
        options.push({
          value: color.id,
          text: color.name
        })
      })

      return options
    },

    form() {
      return JSON.parse(JSON.stringify(this.selectedCar))
    }
  },

  methods: {
    ...mapActions('loader', ['setLoading']),
    ...mapActions('cars', ['loadCars', 'updateCar']),
    ...mapActions('colors', ['loadColors']),

    setPriceValue(value) {
      this.price = value
    },

    callSaveCar() {
      this.setLoading(true)

      let payload = new FormData()
      payload.append('name', this.form.name)
      payload.append('model', this.form.model)
      payload.append('year', this.form.year)
      payload.append('price', this.price)
      payload.append('color_id', this.form.color_id)
      if (this.form.banner) {
        payload.append('banner', this.form.banner)
      }
      payload.append('fuel', this.form.fuel)
      payload.append('_method', 'PUT');

      this.updateCar(payload)
        .then((res) => {
          this.$toast.success("Carro atualizado com sucesso.")

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

    resetForm() {
      this.$emit('reset-selected-car')

      this.$refs.formValidator.reset()
    }
  },

  mounted() {
    this.loadColors()
  },
}
</script>
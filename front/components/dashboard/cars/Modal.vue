<template>
    <div>
        <b-button v-b-modal.cars-modal class="btn btn-sm btn-warning text-white">+ adicionar carro</b-button>

        <b-modal id="cars-modal" title="Cadastrar carro" hide-footer centered>
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

                    <div class="my-3 container__image">                      
                      <validation-provider :rules="{ required: true }" name="banner" v-slot="{ errors }">
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
                      criar
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
      }
    }
  },

  computed: {
    ...mapState('loader', ['loading']),
    ...mapState('colors', ['colors']),

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
    }
  },

  methods: {
    ...mapActions('loader', ['setLoading']),
    ...mapActions('cars', ['loadCars', 'storeCar', 'destroyCar']),
    ...mapActions('colors', ['loadColors']),

    setPriceValue(value) {
      this.form.price = value
    },

    callSaveCar() {
      this.setLoading(true)

      let payload = new FormData()
      payload.append('name', this.form.name)
      payload.append('model', this.form.model)
      payload.append('year', this.form.year)
      payload.append('price', this.form.price)
      payload.append('color_id', this.form.color_id)
      payload.append('banner', this.form.banner)
      payload.append('fuel', this.form.fuel)

      this.storeCar(payload)
        .then((res) => {
          this.$toast.success("Carro cadastrado com sucesso.")

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
      this.form = {
        name: null,
        model: null,
        year: null,
        price: null,
        color_id: null,
        banner: null,
        fuel: null,
      }

      this.$refs.formValidator.reset()
    }
  },

  created() {
    this.loadColors()
  },
}
</script>

<style lang="scss" scoped>
  .container__image {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    img {
      width: 80%;
      margin-bottom: 8px;
    }
  }
</style>
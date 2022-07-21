<template>
  <div>
    <h4>Lista de cores</h4>

    <div class="d-flex justify-content-center align-items-center flex-wrap">
      <div v-if='loading'>Carregando cores...</div>

      <div v-else-if='!colors.length'>Nenhuma cor encontrada</div>

      <div class='container__colors__list' v-else>
        <div
          class="container__colors__list__item"
          v-for="color in colors"
          :key="`color-${color.id}`"
        >
          {{ color.name }}
          <div class="container__colors__list__item__btns">
            <a class="container__colors__list__item__btns__btn text-dark" @click="selectedColor = color">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
            </a>
            <a class="container__colors__list__item__btns__btn text-danger" @click="callDestroyColor(color.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <validation-observer v-slot="{ handleSubmit }" ref="formValidator" class="container__form">
        <form
          @submit.prevent="handleSubmit(callStoreColor)"
        >
          <b class="text-center" v-if="selectedColor">Editar - {{ selectedColor.name }}</b>

          <div class="my-3">
            <base-input-validate
              :rules="{ required: true, min: 3}"
              type="text"
              name="nome"
              placeholder="nome da cor"
              v-model="form.name"
            />
          </div>

          <button class="btn btn-warning btn-block text-white" :disabled="loading" type="submit">
            {{ selectedColor ? 'atualizar cor' : '+ adicionar cor' }}
          </button>
        </form>
      </validation-observer>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        name: null
      },

      selectedColor: null
    }
  },

  methods: {
    ...mapActions('loader', ['setLoading']),
    ...mapActions('colors', ['loadColors', 'storeColor', 'updateColor', 'destroyColor']),

    callStoreColor () {
      this.setLoading(true)

      if (this.selectedColor) {
        this.updateColor({ ...this.form, colorId: this.selectedColor.id })  
            .then((res) => {
              this.$toast.success('Cor atualizada com sucesso.')
  
              this.resetForm()
              this.reloadColors()
            })
            .catch((error) => {
              this.$toast.error(error.message)
            })
            .finally(() => this.setLoading(false))
      }

      if (!this.selectedColor) {
        this.storeColor(this.form)  
            .then((res) => {
              this.$toast.success('Cor cadastrada com sucesso.')
  
              this.resetForm()
              this.reloadColors()
            })
            .catch((error) => {
              this.$toast.error(error.message)
            })
            .finally(() => this.setLoading(false))
      }
    },

    callDestroyColor(colorId) {
      this.destroyColor(colorId)  
          .then((res) => {
            this.$toast.success('Cor removida com sucesso.')

            this.resetForm()
            this.reloadColors()
          })
          .catch((error) => {
            this.$toast.error(error.message)
          })
          .finally(() => this.setLoading(false))
    },

    resetForm () {
      this.form.name = null
      this.$refs.formValidator.reset()
    },

    reloadColors() {
      this.setLoading(true)
      this.loadColors().finally(() => this.setLoading(false))
    }
  },

  computed: {
    ...mapState('loader', ['loading']),
    ...mapState('colors', ['colors'])
  },

  created () {
    this.setLoading(true)

    this.loadColors().finally(() => this.setLoading(false))
  }
}
</script>
<style lang='scss' scoped>
  .container__form {
    width: 100%;
    max-width: 360px;
    margin: 16px;
  }

  .container__colors__list {
    text-align: right;
    font-size: 18px;
    font-weight: 600;
    margin: 16px;
    max-height: 360px;
    overflow: auto;
    padding: 4px 16px;

    &::-webkit-scrollbar {
      display: none;
    }

    &__item {
      display: flex;
      justify-content: flex-end;

      &__btns {
        margin-left: 8px;

        &__btn {
          cursor: pointer;
          text-decoration: none;
        }
      }
    }
  }
</style>

<template>
  <b-card
    title="Registrar Usuário"
    class="p-5"
  >
    <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
      <form
        @submit.prevent="handleSubmit(callRegisterUser)"
        class="py-3"
      >
        <div class="my-3">
          <base-input-validate
            :rules="{ min: 3, required: true }"
            type="text"
            name="nome"
            placeholder="seu nome"
            v-model="form.name"
          />
        </div>

        <div class="my-3">
          <base-input-validate
            :rules="{ email: true, required: true }"
            type="text"
            name="email"
            placeholder="email de acesso"
            v-model="form.email"
          />
        </div>

        <div class="my-3">
          <base-input-validate
            rules="required|min:8"
            type="password"
            name="senha"
            placeholder="sua senha"
            v-model="form.password"
          />
        </div>

        <div class="d-flex justify-content-end mt-4">
          <nuxt-link class="btn btn-secondary mr-2" :to="{ name: 'index' }">
            Já tenho conta
          </nuxt-link>
          <button class="btn btn-warning ml-2 text-white" :disabled="loading" type="submit">
            Criar conta
          </button>
        </div>
      </form>
    </validation-observer>
  </b-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'auth',
  name: 'register',

  data () {
    return {
      form: {
        name: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    ...mapActions('login', ['registerUser']),
    ...mapActions('loader', ['setLoading']),

    callRegisterUser () {
      this.setLoading(true)

      this.registerUser(this.form)
        .then((res) => {
          this.$toast.success('Cadastro realizado com sucesso.')

          this.$router.push({ name: 'dashboard' })
        })
        .catch((error) => {
          this.$toast.error(error.message)
        })
        .finally(() => this.setLoading(false))
    }
  }
}
</script>

<template>
  <div class="w-100 d-flex flex-column justify-center align-center">
    <h1>Fazer login</h1>
    <p class="pb-4">Insira suas credenciais abaixo</p>

    <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
      <form
        class="form__validate__style w-100"
        @submit.prevent="handleSubmit(sendLogin)"
      >
        <base-input-validate
          :rules="{ email: true, required: true }"
          type="text"
          name="login"
          label="seu login"
          v-model="form.email"
        />

        <base-input-validate
          rules="required|min:8"
          type="password"
          name="senha"
          label="Sua senha"
          v-model="form.password"
        />

        <nuxt-link to="/auth/forgotPass">
          <p class="text-center primary--text pb-3">Esqueci minha senha</p>
        </nuxt-link>

        <button class="btn btn-primary" :disabled="loading" type="submit">
          Entrar
        </button>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'auth',

  data () {
    return {
      loading: false,
      form: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    ...mapActions('login', ['login', 'checktoken']),

    sendLogin () {
      this.loading = true
      this.login(this.form)
        .then((res) => {
          this.$toast.success('Login realizado com sucesso.')
          this.$router.push({ name: 'painel' })
        })
        .catch((error) => {
          this.$toast.error(error.message)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

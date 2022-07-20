<template>
  <b-card
    title="Login"
    class="p-5"
  >
    <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
      <form
        @submit.prevent="handleSubmit(sendLogin)"
      >
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

        <button class="btn btn-warning btn-block mt-3 text-white" :disabled="loading" type="submit">
          Entrar
        </button>
      </form>
    </validation-observer>
  </b-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'auth',
  name: 'LoginPage',

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

          this.$router.push({ name: 'dashboard' })
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

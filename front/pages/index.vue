<template>
  <b-card
    title="Login"
    class="p-5"
  >
    <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
      <form
        @submit.prevent="handleSubmit(sendLogin)"
        class="py-3"
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

        <div class="d-flex justify-content-end mt-4">
          <nuxt-link class="btn btn-secondary mr-2" :to="{ name: 'register' }">
            Não tenho conta
          </nuxt-link>
          <button class="btn btn-warning ml-2 text-white" :disabled="loading" type="submit">
            Entrar
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
  name: 'login',

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

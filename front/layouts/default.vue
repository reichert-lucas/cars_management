<template>
  <div>
    <full-page-loader v-if="loading" />

    <div class="d-flex justify-content-between flex-column">
      <nav class="nav__container">
        <nuxt-link :to="{ name: 'dashboard' }">
          Cars Management
        </nuxt-link>
        <div>
          <a @click="callLogout" class="btn">Sair</a>
        </div>
      </nav>

      <nuxt />

      <footer></footer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'DefaultLayout',
  middleware: 'auth',

  created () {
    this.checktoken()
  },

  methods: {
    ...mapActions('login', ['checktoken', 'logout']),

    callLogout () {
      this.logout()
        .then((res) => {
          this.$toast.success('Logout realizado com sucesso.')
          this.$router.push({ name: 'index' })
        })
        .catch((error) => {
          this.$toast.error(error.message)
        })
    }
  },

  computed: {
    ...mapState('loader', ['loading']),
    ...mapState('login', ['user'])
  }
}
</script>

<style scoped>
  nav {

  }
</style>

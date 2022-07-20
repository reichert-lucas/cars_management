<template>
  <div class="auth__layout">
    <full-page-loader v-if="loading" />

    <b-container style="max-width: 600px;">
      <nuxt />
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'auth-layout',

  created () {
    this.checktoken()
  },

  methods: {
    ...mapActions('login', ['checktoken'])
  },

  computed: {
    ...mapState('loader', ['loading'])
  }
}
</script>

<style lang="scss" scoped>
.auth__layout {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: whitesmoke;
}
</style>

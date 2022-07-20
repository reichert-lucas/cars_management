<template>
  <div>
    <full-page-loader v-if="loading" />

    <nuxt />
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

  .position_theme_icon {
    position: absolute;
    right: 10rem;
    top: 2rem;
  }

  .form__validate__style {
    max-width: 30rem;
    width: 25rem;
  }
}
</style>

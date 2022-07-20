<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'DefaultLayout',

  created () {
    this.checktoken()
  },

  data () {
    return {

    }
  },

  methods: {
    ...mapActions('login', ['checktoken', 'signOut']),

    sair(){
      this.signOut()
        .then((res) => {
            this.$toast.success('Logout realizado com sucesso.')
            this.$router.push({path: '/'})
          })
          .catch((error) => {
            this.$toast.error(error.message)
          })
    },

    closeMenu(){
      this.drawer = false
      this.miniVariant = false
    }
  },

  computed: {
    ...mapState('loader', ['loading']),
    ...mapState('login', ['user'])
  }
}
</script>

<style lang="scss">
</style>

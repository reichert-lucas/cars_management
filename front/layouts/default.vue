<template>
  <div>
    <full-page-loader v-if="loading" />

    <div class="d-flex justify-content-between flex-column">
      <nav class="nav__container">
        <nuxt-link :to="{ name: 'dashboard' }" class="nav__container__title">
          <b-icon icon="exclamation-circle-fill"></b-icon> Cars Management
        </nuxt-link>
        <div class="nav__container__btns">
          <a @click="callLogout" class="nav__container__btns__btn">Sair</a>
        </div>
      </nav>

      <b-container class="my-4">
        <b-card class="mb-4">
          <p class="text-warning">Seja bem-vindo, <strong>{{ user.name }}</strong> ;-)</p>

          <p>Deixamos alguns atalhos para facilitar o seu trabalho:</p>

          <div class="d-flex justify-content-center align-items-center">
            <nuxt-link to="" class="shortcuts__btn">
              carros
            </nuxt-link>

            <nuxt-link to="" class="shortcuts__btn">
              cores
            </nuxt-link>
          </div>
        </b-card>

        <nuxt />
      </b-container>

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

<style lang="scss" scoped>
  .nav__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 32px;
    background: var(--warning);

    &__title {
      color: white;
      font-size: 20px;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
    }

    &__btns {

      &__btn {
        color: white;
        font-size: 18px;
        font-weight: 500;
        text-decoration: none;
        cursor: pointer;
        padding: 8px 16px;
        border-radius: 8px;
        transition: all 0.3s;

        &:hover {
          background: white;
          color: var(--warning);
        }
      }
    }
  }

  .shortcuts__btn {
    height: 75px;
    width: 150px;
    border: 2px solid var(--warning);
    color: var(--warning);
    border-radius: 8px;
    cursor: pointer;
    margin: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
    transition: all 0.3s;

    &:hover {
      color: white;
      background: var(--warning);

    }
  }
</style>

<template>
    <div>
    <div class="d-flex justify-content-between align-items-center mb-5">
      <h4 class="m-0">Dashboard</h4>
    </div>

    <div class="d-flex justify-content-center align-items-center flex-wrap">
      <h5 class="mb-3 w-100 text-warning"><b>Logs</b></h5>

      <div v-if='loading'>Carregando logs...</div>

      <div v-else-if='!logs.length'>Nenhum log encontrado</div>

      <div v-else>
        <div class='container__logs__list'>
          <div
            class="container__logs__list__item"
            v-for="log in logs"
            :key="`log-${log.id}`"
          >
            <div class="d-flex justify-content-between">
                <p><strong>Id: </strong>{{ log.id }}</p>
                <span>{{ log.created_at }}</span>
            </div>
            <p><strong>Antes: </strong><br>{{ log.before_update }}</p>
            <p><strong>Depois: </strong><br>{{ log.after_update }}</p>
            <p><strong>Identificador do carro: </strong>{{ log.car_id }}</p>
            <p><strong>Responsável: </strong>{{ log.user.name }}</p>
          </div>
        </div>

        <dashboard-logs-pagination @search="reloadLogs" :loading="loading"/> 
      </div> 

    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('loader', ['setLoading']),
    ...mapActions('logs', ['loadLogs']),

    reloadLogs() {
      this.setLoading(true)
      this.loadLogs().finally(() => this.setLoading(false))
    },
  },

  computed: {
    ...mapState('loader', ['loading']),
    ...mapState('logs', ['logs']),
  },

  created () {
    this.setLoading(true)

    this.reloadLogs()
  }
}
</script>

<style lang="scss" scoped>
    .container__logs__list {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        &__item {
            background: whitesmoke;
            border-radius: 8px;
            padding: 24px;
            margin: 16px;
            width: 480px;

            @media (max-width: 600px) {
                width: 100%;
            }
        }
    }
</style>
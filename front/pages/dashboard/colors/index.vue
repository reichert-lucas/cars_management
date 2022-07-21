<template>
  <div>
    <h5>Lista de cores</h5>

    <div v-if='loading'>Carregando cores...</div>

    <div v-else-if='!colors.length'>Nenhuma cor encontrada</div>

    <div class='container__colors__list' v-else>
      <div
        class="container__colors__list__item"
        v-for="color in colors"
        :key="`color-${color.id}`"
      >
        <b>#{{ color.id }}</b> - {{ color.name }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('loader', ['setLoading']),
    ...mapActions('colors', ['loadColors'])
  },

  computed: {
    ...mapState('loader', ['loading']),
    ...mapState('colors', ['colors'])
  },

  created () {
    this.setLoading(true)

    this.loadColors().finally(() => this.setLoading(false))
  }
}
</script>
<style lang='scss' scoped></style>

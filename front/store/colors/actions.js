export default {
  async loadColors ({ commit }) {
    return await this.$axios
      .$get('colors')
      .then((res) => {
        commit('SET_COLORS', res)
      })
      .catch(() => {
        return Promise.reject(
          new Error(
            'Não foi possível carregar as cores'
          )
        )
      })
  }
}

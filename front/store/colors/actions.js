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
  },

  async storeColor ({ }, payload) {
    return await this.$axios
      .$post('colors', payload)
      .catch((error) => {
        return Promise.reject(
          new Error('Ocorreu um erro ao cadastrar a cor')
        )
      })
  },

  async updateColor ({ }, payload) {
    return await this.$axios
      .$put(`colors/${payload.colorId}`, payload)
      .catch((error) => {
        return Promise.reject(
          new Error('Ocorreu um erro ao cadastrar a cor')
        )
      })
  },

  async destroyColor ({ }, colorId) {
    return await this.$axios
      .$delete(`colors/${colorId}`)
      .catch((error) => {
        return Promise.reject(
          new Error('Ocorreu um erro ao deletar a cor, verifique se essa cor não está relacionada com nenhum carro')
        )
      })
  }
}

import { tools } from '@/directives/functions.js'

export default {
  async loadCars({ commit, state }, filters = {}) {
    var url = `cars`

    const payload = {
        search: filters.search ? filters.search : null,
        color_id: filters.color_id ? filters.color_id : null,
        page: state.pagination.current_page
    }

    return await this.$axios.$get(url, { params: payload })
        .then(response => {
            const pagination = {
                "current_page": response.pagination.current_page,
                "last_page": response.pagination.last_page,
                "total_records": response.pagination.total,
            }

            commit('SET_CARS', response.data)
            commit('UPDATE_PAGINATION', pagination)
        })
        .catch(error => {
          return tools.prepareErrorMessasge(error, 'Não foi possível carregar os carros')
        })
},

async setPage({ commit, state }, current_page) {
    const pagination = {
        "current_page": current_page,
        "last_page": state.pagination.last_page,
        "total_records": state.pagination.total_records,
    }

    commit('UPDATE_PAGINATION', pagination)
},


  async storeCar ({ }, payload) {
    return await this.$axios
      .$post('cars', payload)
      .catch((error) => {
        return tools.prepareErrorMessasge(error, 'Ocorreu um erro ao cadastrar o carro')
      })
  },

  async updateCar ({ }, data) {
    return await this.$axios
      .$put(`cars/${data.carId}`, data.payload)
      .catch((error) => {
        return tools.prepareErrorMessasge(error, 'Ocorreu um erro ao atualizar o carro')
      })
  },

  async destroyCar ({ }, carId) {
    return await this.$axios
      .$delete(`cars/${carId}`)
      .catch(error => {
        return tools.prepareErrorMessasge(error, 'Ocorreu um erro ao deletar a cor, verifique se essa cor não está relacionada com nenhum carro')
      })
  }
}

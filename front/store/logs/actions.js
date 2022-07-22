import { tools } from '@/directives/functions.js'

export default {
  async loadLogs({ commit, state }) {
    var url = `cars/logs`

    const payload = {
        page: state.pagination.current_page
    }

    return await this.$axios.$get(url, { params: payload })
        .then(response => {
            const pagination = {
                "current_page": response.pagination.current_page,
                "last_page": response.pagination.last_page,
                "total_records": response.pagination.total,
            }

            commit('SET_LOGS', response.data)
            commit('UPDATE_PAGINATION', pagination)
        })
        .catch(error => {
          return tools.prepareErrorMessasge(error, 'Não foi possível carregar os logs')
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
}

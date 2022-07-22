<template>
    <div class="d-flex justify-content-center align-items-center w-100">
        <button
        @click.prevent="previusPage"
        class="btn btn-dark btn-sm m-2"
        :disabled="page == 1"
        >
        Anterior
        </button>

        <span class="btn btn-warning btn-sm disabled"
        >{{
            Math.round(
            (pagination.total_records / pagination.last_page) *
                pagination.current_page
            )
        }}
        / {{ pagination.total_records }}</span
        >

        <button
        @click.prevent="nextPage"
        class="btn btn-dark btn-sm m-2"
        :disabled="page == pagination.last_page"
        >
        Próxima
        </button>
    </div>
</template>


<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('cars', ['pagination']),

    page() {
      return this.pagination.current_page
    },
  },

  methods: {
    ...mapActions('cars', ['setPage']),

    nextPage() {
      if (this.page < this.pagination.last_page) {
        this.setPage(this.page + 1)
        this.$emit('search', false)
      }
    },

    previusPage() {
      if (this.page > 1) {
        this.setPage(this.page - 1)
        this.$emit('search', false)
      }
    }
  }
}
</script>
<template>
  <div class="container__search">
    <input
        type="text"
        placeholder="Procure por um carro..."
        v-model="filters.search"
        @keyup.enter="$emit('call-search')" 
    />

    <a
      v-if="loading"
      :key="`loader_${loading}`"
      class="container__search__btn"
    >
      <i class="spinner-border spinner-border-sm text-light" />
    </a>

    <a
      v-if="!loading"
      class="container__search__btn"
      @click="$emit('call-search')" 
      :disabled="loading"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
    </a>
  </div>
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean,
            required: false,
            default: false
        },
        filters: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style lang="scss" scoped>
.container__search {
  width: 350px;
  position: relative;
  z-index: 20px;

  @media(max-width: 1000px) {
    width: 100%;
    margin: 8px 4px;
  }

  input {
    width: 100%;
    font-size: 16px;
    color: #878787;
    font-family: "Roboto";
    font-style: italic;
    background: white;
    height: 48px;
    padding: 16px 48px 16px 16px;
    border-radius: 50px;
    transition: 0.4s all;
    box-shadow: 2px 2px 8px 2px lightgray;
    outline: none !important;
    border: none !important; /* no border and override any inline styles*/

    @media (max-width: 500px) {
      font-size: 14px;
    }

    @media (max-width: 400px) {
      font-size: 12px;
    }

    @media (max-width: 360px) {
      font-size: 10px;
    }

    &:focus {
      border: solid 1px #ffd300;
    }
  }

  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 40px;
    height: 40px;
    background: #ffd300;
    color: white;
    border-radius: 50%;
    top: 4px;
    right: 4px;
    transition: 0.4 all;
    cursor: pointer;

    &:hover {
      background: #dab500;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .7s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
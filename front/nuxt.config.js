export default {
  head: {
    title: 'front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
  ],

  plugins: [
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module'
  ],

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: process.env.NUXT_ENV_URL_API,
    headers: {
      common: {
        'Accept': 'application/json, multipart/form-data'
      },
    },
  },

  build: {
  },

  server: {
    host: '0.0.0.0',
  }
}

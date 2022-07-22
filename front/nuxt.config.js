export default {
  ssr: false,

  head: {
    title: 'Cars Management',
    htmlAttrs: {
      lang: 'pt-br'
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
    '~/plugins/mask-directive.js',
    '~/plugins/toast-notificatios.js',
    { src: '~/plugins/vee-validate.js', mode: 'client' },
    { src: '~/plugins/v-money.js' }
  ],

  router: {
    middleware: 'auth'
  },

  components: true,

  buildModules: [
    //'@nuxtjs/eslint-module'
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
    transpile: [
      "vee-validate/dist/rules"
    ],
  },

  server: {
    host: '0.0.0.0',
  },

  options: {
    fix: true
  }
}

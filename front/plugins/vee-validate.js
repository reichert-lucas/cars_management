import Vue from 'vue'
import {
  extend,
  localize,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import pt from 'vee-validate/dist/locale/pt_BR.json'

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)

localize('pt_BR', pt)
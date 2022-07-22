import Vue from 'vue'
import {
  extend,
  localize,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/pt_BR.json'

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  })
})

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'A senha deve ser a mesma'
})


extend("decimal", {
  validate: (value, { decimals = '*', separator = '.' } = {}) => {
      if (value === null || value === undefined || value === '') {
          return {
              valid: false
          }
      }
      if (Number(decimals) === 0) {
          return {
              valid: /^-?\d*$/.test(value),
          }
      }
      const regexPart = decimals === '*' ? '+' : `{1,${decimals}}`
      const regex = new RegExp(`^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`)

      return {
          valid: regex.test(value),
      }
  },
  message: 'O campo {_field_} deve conter apenas valores decimais'
})

extend("customDecimalBetween", {
  params: ['min', 'max'],
  validate: (value, { min, max } ) => {
      if (value === null || value === undefined || value === '') {
          return false
      }
  
      const valueConverted = value.replace(',', '.')
      if (Number(valueConverted) >= Number(min) && Number(valueConverted) <= Number(max)) {
          return true
      }      
  },
  message: 'O campo {_field_} deve ser maior que {min} e menor que {max}',
})

extend("currencylMin", {
  params: ['min'],
  validate: (value, { min, max } ) => {
      if (value === null || value === undefined || value === '') {
          return false
      }
  
      const valueConverted = value.replace(',', '.')
      if (Number(valueConverted) >= Number(min)) {
          return true
      }      
  },
  message: 'O campo {_field_} deve ser maior que R${min}',
})

Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)
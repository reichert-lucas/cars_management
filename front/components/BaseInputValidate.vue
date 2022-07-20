<template>
  <validation-provider :rules="rules" :name="name" v-slot="{ errors }">
    <div>
      <label class="form-label" v-if="label">{{ label }}</label>
      <input :id="id"
        :type="type"
        :placeholder="placeholder"
        v-model="value"
        v-mask="mask"
        class="form-control"
        :class="{'border border-danger': errors[0]}"
      >

      <small v-if="errors[0]" class="error text-danger">{{ errors[0] }}</small>
    </div>
  </validation-provider>
</template>

<script>
export default {
  name: 'base-input-validate',

  data () {
    return {
      value: ''
    }
  },

  props: {
    id: {
      type: String
    },
    type: {
      type: String,
      description: 'Input type',
      default: 'text'
    },
    placeholder: {
      type: String,
      description: 'Input placeholder',
      default: null
    },
    mask: {
      type: [String, Function]
    },
    rules: {
      type: [String, Array, Object],
      description: 'Vee validate validation rules',
      default: null
    },
    name: {
      type: String,
      description: 'Input name (used for validation)',
      default: null
    },
    label: {
      type: String,
      description: 'Input label',
      default: null
    }
  }
}
</script>

<template>
  <div>
    <label class="form-label" v-if="label">{{label}}</label>
    <input type="text"
      v-money="money"
      class="form-control"
      :name="name" 
      v-model="value"
      :placeholder="placeholder"
      @keyup="changedValue"
      @click="changedValue"
      @change="changedValue"
    >

    <validation-provider :rules="rules" :name="name" v-slot="{ errors }">
      <input type="hidden" v-model="convertedValue">

      <small v-if="errors[0]" class="error text-danger">{{ errors[0] }}</small>
    </validation-provider>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        money: {
          decimal: ',',
          thousands: '',
          prefix: 'R$ ',
          suffix: '',
          precision: 2,
          masked: false
        },

        value: "",
      }
    },

    props: {
      label: {
        type: [String],
        description: "Input label"
      },
      placeholder: {
        type: [String],
        description: "Input placeholder value"
      },
      rules: {
        required: true,
        type: [String, Array, Object],
        description: 'Vee validate validation rules',
        default: ''
      },
      name: {
        type: String,
        description: 'Input name (used for validation)',
        default: ''
      },
      initValue: {
        description: 'Initial Value',
        default: 0
      }
    },
    computed: {
      convertedValue() {
        let value = this.value.replace('R$ ', '').replace('.', '')

        return value
      }
    },

    methods: {
      changedValue() {
        this.$emit('changed-value', parseFloat(this.convertedValue.replace(',', '.')))
      }
    },

    created() {
      if (this.initValue) {
        this.value = this.initValue.toString()
      }
    }
  };
</script>

<template>
  <div class="filters-item">
    <div class="filters-item_title form-text">
      <slot />
    </div>
    <div class="filters-item_fields">
      <input
        v-model="searchValue"
        class="filters-item_input w-100 form-control"
        @blur="handleValue"
        @keypress.enter="handleValue"
        type="text"
      >
    </div>
  </div>
</template>

<script>
import useEmitter from '@/plugins/useEmitter'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
  name: 'InputFilter',
  props: {
    filter: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const emitter = useEmitter()
    const searchValue = ref('')

    onMounted(() => emitter.on('clearFilters', () => clearValues()))

    const handleValue = () => {
      let query = ''
      if (searchValue.value) {
        switch (props.type) {
          case 'in':
            query = `${searchValue.value}${props.filter}`
            break
          case 'exactly':
            query = `${props.filter}${searchValue.value}`
            break
        }
      }
      emit('handleValue', query)
    }
    const clearValues = () => searchValue.value = ''

    return { searchValue, handleValue }
  }
}
</script>
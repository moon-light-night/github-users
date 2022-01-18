<template>
  <div class="filters-item">
    <div class="filters-item_title">
      <slot />
    </div>
    <div class="filters-item_fields">
      <div>
        <div id="emailHelp" class="filters-item_fields-label form-text">От</div>
        <input
          v-model="valueFrom"
          class="filters-item_input form-control"
          v-maska="'#######'"
          autocomplete="false"
          @blur="handleValue"
          @keypress.enter="handleValue"
        >
      </div>
      <div>
        <div id="emailHelp" class="filters-item_fields-label form-text">До</div>
        <input
          v-model="valueTo"
          class="filters-item_input form-control"
          v-maska="'#######'"
          autocomplete="false"
          @blur="handleValue"
          @keypress.enter="handleValue"
        >
      </div>
    </div>
  </div>
</template>

<script>
import useEmitter from '@/plugins/useEmitter'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
  props: {
    filter: {
      type: Object,
      required: true
    },
    filterName: {
      type: String,
      required: true
    }
  },
  name: 'CountFilter',
  setup(props, { emit }) {
    const emitter = useEmitter()
    const valueFrom = ref('')
    const valueTo = ref('')

    onMounted(() => emitter.on('clearFilters', () => clearValues()))

    const handleValue = () => {
      let query = ''
      if (valueFrom.value && !valueTo.value) {
        query = `${props.filterName}${props.filter.more}${valueFrom.value}`
      } else if (valueTo.value && !valueFrom.value) {
        query = `${props.filterName}${props.filter.less}${valueTo.value}`
      } else if (valueFrom.value && valueTo.value) {
        query = `${props.filterName}${valueFrom.value}${props.filter.between}${valueTo.value}`
      }
      emit('handleValue', query)
    }
    const clearValues = () => {
      valueFrom.value = ''
      valueTo.value = ''
    }

    return { valueFrom, valueTo, handleValue }
  }
}
</script>
<template>
  <div class="main">
    <div class="main-filters">
      <Filters />
    </div>
    <div class="main-content">
      <TableList v-if="contentView === 'table'" />
      <CardList v-if="contentView === 'card'" />
    </div>
  </div>
</template>

<script>
import TableList from '@/components/TableList.vue'
import CardList from '@/components/CardList.vue'
import Filters from '@/components/Filters.vue'
import useEmitter from '@/plugins/useEmitter'
import { useStore } from 'vuex'
import { onMounted, ref } from '@vue/runtime-core'

export default {
  name: 'Home',
  components: {
    TableList,
    Filters,
    CardList
  },
  setup() {
    const store = useStore()
    const emitter = useEmitter()
    const contentView = ref('table')

    store.dispatch('getFilteredUsers')

    onMounted(() => emitter.on('handleContentView', value => contentView.value = value))

    return { contentView }
  }
}
</script>

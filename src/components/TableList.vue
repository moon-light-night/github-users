<template>
  <div class="list">
    <div class="container">
      <div class="list-group-wrapper">
        <ul class="list-group" ref="infiniteListTable">
          <li class="list-group_item" v-for="user in users.items" :key="user.id" style="width:95%;">
            <a class="list-group_item-link" :href="user.html_url" target="_blank">
              <span class="list-group_item-name">
                {{ user.id }} - {{ user.login }}
              </span>
              <img :src="user.avatar_url" class="list-group_item-avatar" :alt="`${user.login}-img`">
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  name: 'TableList',
  setup() {
    const store = useStore()
    const infiniteListTable = ref()

    onMounted(() => {
      infiniteListTable.value.addEventListener('scroll', () => {
        if (infiniteListTable.value.scrollTop + infiniteListTable.value.clientHeight >= infiniteListTable.value.scrollHeight) {
          loadMore()
        }
      })
    })

    const users = computed(() => store.getters['USERS'])

    const loadMore = () => store.dispatch('getFilteredUsers')

    return { users, infiniteListTable, loadMore }
  }
}
</script>

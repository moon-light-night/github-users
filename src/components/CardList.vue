<template>
  <div class="list list-cards">
    <div class="container">
      <div class="list-group-wrapper">
        <div class="list-group" ref="infiniteListCard">
          <div class="list-group_item" v-for="user in users.items" :key="user.id">
            <div class="card">
              <div class="card-body d-flex justify-content-between align-items-center">
                <img :src="user.avatar_url" class="card-img-top" :alt="`${user.login}-img`">
                <h5 class="card-title">
                  {{ user.login }}
                </h5>
              </div>
              <div class="card-body">
                <p class="card-text">User id - {{ user.id }}</p>
                <a :href="user.html_url" target="_blank" class="btn btn-primary">
                  На страницу пользователя  
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  name: 'CardList',
  setup() {
    const store = useStore()
    const infiniteListCard = ref(null)

    onMounted(() => {
      infiniteListCard.value.addEventListener('scroll', () => {
        if (infiniteListCard.value.scrollTop + infiniteListCard.value.clientHeight >= infiniteListCard.value.scrollHeight) {
          loadMore()
        }
      })
    })

    const users = computed(() => store.getters['USERS'])

    const loadMore = () => store.dispatch('getFilteredUsers')

    return { users, infiniteListCard, loadMore }
  }
}
</script>

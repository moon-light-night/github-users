<template>
  <div class="filters">
      <div class="filters-fields_item">
        <div class="filters-title">
          Фильтровать
        </div>
        <div class="filters-fields_item-inputs-wrap">
          <CountFilter :filter="filtersData.ranges" :filterName="filtersData.repo" @handleValue="setFilterRepo">
            По количеству репозиториев
          </CountFilter>
          <CountFilter :filter="filtersData.ranges" :filterName="filtersData.followers" @handleValue="setFilterFollowers">
            По количеству подписчиков
          </CountFilter>
        </div>
      </div>

      <div class="filters-fields_item">
        <div class="filters-title">
          Поиск
        </div>
        <div class="filters-fields_item-inputs-wrap">
          <InputFilter :filter="filtersData.names.in" :type="'in'" @handleValue="setSearchUserName">
            По имени пользователя
          </InputFilter>
          <InputFilter :filter="filtersData.names.exactly" :type="'exactly'" @handleValue="setSearchUserProfileName">
            По названию профиля
          </InputFilter>
        </div>
      </div> 
    <button class="filters-fields_item-btn btn btn-secondary" @click="clearFilters">
      Очистить фильтры
    </button>
    <div class="filters-fields_item-switcher">
      <div class="filters-title">
        Переключить вид
      </div>
      <div class="filters-radio-btn">
        <input id="radio-1" type="radio" v-model="contentView" name="radio" value="table" checked>
        <label for="radio-1">Табличный</label>
      </div>
      <div class="filters-radio-btn">
        <input id="radio-2" type="radio" v-model="contentView" name="radio" value="card">
        <label for="radio-2">Карточный</label>
      </div>
    </div>
  </div>
</template>

<script>
import CountFilter from '@/components/CountFilter.vue'
import InputFilter from '@/components/InputFilter.vue'
import useEmitter from '@/plugins/useEmitter'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { watch } from '@vue/runtime-core'

export default {
  name: 'Filters',
  components: {
    CountFilter,
    InputFilter
  },
  setup() {
    const store = useStore()
    const emitter = useEmitter()
    const contentView = ref('table')
    const filtersData = {
      repo: 'repos:',
      followers: 'followers:',
      ranges: {
        more: '%3E',
        less: '%3C',
        between: '%2E%2E'
      },
      names: {
        in: ' in:name',
        exactly: 'user:'
      }
    }
    const filters = ref({
      repo: ''
    })
    const queryStr = ref('')
    const queryArr = ref([])

    watch(contentView, () => emitter.emit('handleContentView', contentView.value))

    const setFilterRepo = (queryStr) => {
      queryArr.value[0] = queryStr
      buildQueryStr()
    }
    const setFilterFollowers = (queryStr) => {
      queryArr.value[1] = queryStr
      buildQueryStr()
    }
    const setSearchUser = (queryStr) => {
      queryArr.value[2] = queryStr
      buildQueryStr()
    }
    const setSearchUserName = (queryStr) => {
      queryArr.value[3] = queryStr
      buildQueryStr()
    }
    const setSearchUserProfileName = (queryStr) => {
      queryArr.value[4] = queryStr
      buildQueryStr()
    }

    const buildQueryStr = async () => {
      await (queryStr.value = (queryArr.value.filter(el => el)).join('+'))
      await store.commit('resetQueryPage')
      await store.commit('buildStoreQueryStr', queryStr.value)
      store.dispatch('getFilteredUsers')
    }

    const clearFilters = () => {
      queryArr.value = []
      store.commit('resetQueryPage')
      store.commit('resetStoreQueryStr')
      store.dispatch('getFilteredUsers')
      emitter.emit('clearFilters')
    }

    return { 
      filtersData, 
      filters,
      contentView,
      setFilterRepo, 
      setFilterFollowers, 
      setSearchUser, 
      setSearchUserName, 
      setSearchUserProfileName,
      clearFilters
    }
  }
}
</script>

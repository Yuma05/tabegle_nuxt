<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    color="orange"
    hide-selected
    clearable
    hide-no-data
    item-text="searchTarget"
    placeholder="ジャンルで検索"
    prepend-icon="mdi-silverware "
    return-object
    outlined
    rounded
    dense
    @change="sendCategory"
  >
    <template v-slot:selection="{ attr, on, item }">
      <div class="v-select__selection v-select__selection--comma">
        {{ item.name }}
      </div>
    </template>
    <template v-slot:item="{ item }">
      <v-list-item-content>
        <v-list-item-title v-text="item.name"></v-list-item-title>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    entries: [],
    isLoading: false,
    model: null,
    search: null,
  }),

  computed: {
    items() {
      return this.entries.map((entry) => {
        const searchTarget = entry.name + entry.kana
        return Object.assign({}, entry, { searchTarget })
      })
    },
  },

  watch: {
    search(val) {
      if (val == null || val.length <= 1) return
      if (this.isLoading) return

      this.isLoading = true
      axios
        .get('/api/search/category?q=' + val)
        .then((res) => {
          console.log(res.data)
          this.entries = res.data
        })
        .catch((error) => console.log(error))
        .finally(() => (this.isLoading = false))
    },
  },

  methods: {
    sendCategory() {
      if (this.model == null) {
        this.$emit('changeCategory', '')
      } else {
        this.$emit('changeCategory', this.model.category_code)
      }
    },
  },
}
</script>

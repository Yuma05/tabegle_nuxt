<template>
  <v-container>
    <search-place @changePlace="setPlace"></search-place>
    <search-category @changeCategory="setCategory"></search-category>
    <v-btn icon color="orange" @click="searchShop">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-card>
      <v-card-text>{{ place }}</v-card-text>
      <v-card-text>{{ category }}</v-card-text>
      <v-card-text>{{ shops }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import SearchPlace from '@/components/SearchPlace'
import SearchCategory from '@/components/SearchCategory'
export default {
  components: { SearchCategory, SearchPlace },
  data() {
    return {
      test: 0,
      place: '',
      category: '',
      isLoading: false,
      shops: [],
    }
  },
  methods: {
    // async searchPlace() {
    //   this.places = await this.$searchPlace()
    //   return this.places
    // },
    setPlace(place) {
      this.place = place
    },
    setCategory(category) {
      this.category = category
    },
    async searchShop() {
      this.isLoading = true
      const searchQuery = new URLSearchParams()
      if (this.place) searchQuery.set('place', this.place)
      if (this.category) searchQuery.set('category', this.category)
      await axios
        .get('/api/search/shop?' + searchQuery.toString())
        .then((res) => (this.shops = res.data))
        .catch((error) => console.log(error))
        .finally(() => (this.isLoading = false))
    },
  },
}
</script>

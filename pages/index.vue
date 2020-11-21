<template>
  <v-container>
    <v-row justify="center" align-content="center">
      <v-col cols="11" md="5" class="pb-0">
        <search-place @changePlace="setPlace"></search-place
      ></v-col>
      <v-col cols="11" md="5" class="pb-0">
        <search-category @changeCategory="setCategory"></search-category
      ></v-col>
      <v-col cols="auto">
        <v-btn outlined rounded color="orange" @click="searchShop"
          ><v-icon>mdi-magnify</v-icon>検索</v-btn
        >
      </v-col>
    </v-row>
    <loading-box v-if="isLoading"></loading-box>
    <shop-card v-else-if="shops.length !== 0" :shops="shops"></shop-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import SearchPlace from '@/components/SearchPlace'
import SearchCategory from '@/components/SearchCategory'
import ShopCard from '@/components/ShopCard'
import LoadingBox from '@/components/LoadingBox'

export default {
  components: { LoadingBox, ShopCard, SearchCategory, SearchPlace },
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
        .then((res) => (this.shops = res.data.shops))
        .catch((error) => console.log(error))
        .finally(() => (this.isLoading = false))
    },
  },
}
</script>

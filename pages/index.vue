<template>
  <v-container>
    <v-row justify="center" align-content="center">
      <v-col cols="11" md="5" class="pb-0">
        <search-place @changePlace="setPlace"></search-place>
      </v-col>
      <v-col cols="11" md="5" class="pb-0">
        <search-category @changeCategory="setCategory"></search-category>
      </v-col>
      <v-col cols="auto">
        <v-btn dark color="orange" @click="searchShop">
          <v-icon>mdi-magnify</v-icon>
          検索
        </v-btn>
      </v-col>
    </v-row>

    <loading-box v-if="isLoading"></loading-box>
    <shop-card
      v-else-if="shops.length !== 0"
      :shops="shops"
      :user-shop-ids="userShopIds"
      @delete="deleteUserShop"
      @add="addUserShop"
    ></shop-card>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-text>
          <div class="grey--text text--darken-4 text-center pt-5">
            <div class="text-center mb-3">
              ログインするとお店をキープできます！
            </div>
            <v-btn color="orange" dark @click="$router.push('/login')">
              login
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      userShopIds: [],
      dialog: false,
    }
  },
  mounted() {
    this.getUserShops()
  },
  methods: {
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
    async getUserShops() {
      const key = this.$cookies.get('key')
      if (key == null) {
        return
      }

      const headers = {
        'X-CSRFToken': this.$cookies.get('csrftoken'),
        Authorization: key,
      }
      await axios
        .get('/api/user-shop/', { headers })
        .then((res) => {
          this.userShopIds = res.data.shops.map((item) => item.id)
        })
        .catch((e) => console.log(e))
    },
    deleteUserShop(id) {
      const key = this.$cookies.get('key')
      const headers = {
        'X-CSRFToken': this.$cookies.get('csrftoken'),
        Authorization: key,
      }
      axios
        .delete('/api/user-shop/' + id, { headers })
        .then((res) => {
          this.userShopIds = res.data.shops.map((item) => item.id)
        })
        .catch((e) => console.log(e))
    },
    addUserShop(id) {
      const key = this.$cookies.get('key')
      if (key == null) {
        this.dialog = true
        return
      }
      const headers = {
        'X-CSRFToken': this.$cookies.get('csrftoken'),
        Authorization: key,
      }
      axios
        .put('/api/user-shop/' + id, null, { headers })
        .then((res) => {
          this.userShopIds = res.data.shops.map((item) => item.id)
        })
        .catch((e) => console.log(e.response))
    },
  },
}
</script>

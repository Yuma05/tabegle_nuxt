<template>
  <v-container>
    <loading-box
      v-if="isLoading"
      :messages="['店舗情報を取得しています']"
    ></loading-box>
    <shop-card
      v-else-if="shops.length !== 0"
      :shops="shops"
      :user-shop-ids="userShopIds"
      @delete="deleteUserShop"
      @add="addUserShop"
    ></shop-card>
    <div v-else class="text-center grey--text text--darken-3">
      <div class="text-center mt-15 mb-5">気になるお店をキープできます！</div>
      <v-btn color="orange" dark @click="$router.push('/')">
        お店を探しに行く
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'
import LoadingBox from '@/components/LoadingBox'
import ShopCard from '@/components/ShopCard'
export default {
  name: 'index',
  data() {
    return {
      isLoading: true,
      shops: [],
      userShopIds: [],
    }
  },
  components: { ShopCard, LoadingBox },
  mounted() {
    this.getUserShops()
  },
  methods: {
    async getUserShops() {
      const key = this.$cookies.get('key')
      if (key == null) {
        this.$router.push('/login')
      }

      const headers = {
        'X-CSRFToken': this.$cookies.get('csrftoken'),
        Authorization: key,
      }
      await axios
        .get('/api/user-shop/', { headers })
        .then((res) => {
          this.shops = res.data.shops
          this.userShopIds = res.data.shops.map((item) => item.id)
        })
        .catch((e) => console.log(e.response))
        .finally((this.isLoading = false))
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

<style scoped></style>

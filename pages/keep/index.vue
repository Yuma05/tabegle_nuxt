<template>
  <v-container>
    <loading-box
      v-if="isLoading"
      :messages="['店舗情報を取得しています']"
    ></loading-box>
    <shop-card v-else-if="shops.length !== 0" :shops="shops"></shop-card>
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
      isLoading: false,
      shops: [],
    }
  },
  components: { ShopCard, LoadingBox },
  mounted() {
    // this.getUserShops()
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
        .then((res) => (this.shops = res.data.shops))
        .catch((e) => console.log(e))
        .finally((this.isLoading = false))
    },
  },
}
</script>

<style scoped></style>

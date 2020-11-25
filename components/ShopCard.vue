<template>
  <div>
    <v-tabs color="orange" centered class="mb-2">
      <v-tabs-slider color="orange"></v-tabs-slider>
      <v-tab @click="sortTabelog">食べログ</v-tab>
      <v-tab @click="sortGoogle">google</v-tab>
      <v-tab @click="sortTotal">おすすめ</v-tab>
    </v-tabs>
    <template v-if="$vuetify.breakpoint.xs">
      <v-card v-for="shop in shops" :key="shop.id" class="mb-5">
        <v-img height="200" :src="shop.img_src"></v-img>
        <v-card-title class="font-weight-bold pb-0">
          <a :href="shop.url" style="text-decoration: none; color: black">
            {{ shop.name }}
          </a>
          <v-btn
            v-if="userShopIds.includes(shop.id)"
            icon
            class="text-left"
            @click="$emit('delete', shop.id)"
          >
            <v-icon color="red">mdi-bookmark</v-icon>
          </v-btn>
          <v-btn v-else icon class="text-left" @click="$emit('add', shop.id)">
            <v-icon>mdi-bookmark-outline</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-icon color="red">mdi-map-marker</v-icon>
          <span class="grey--text text--darken-2 text-caption">
            <a
              :href="'https://www.google.com/search?q=' + shop.name"
              style="color: gray"
              >{{ shop.address.substr(13) }}</a
            >
          </span>
          <v-row no-gutters class="mt-2 mb-1">
            <v-col cols="auto">
              <div style="width: 40px">
                <v-img
                  src="/icon/tabelog.svg"
                  height="30"
                  width="30"
                  class="mr-2"
                  contain
                ></v-img>
              </div>
            </v-col>
            <v-col cols="auto" align-self="center">
              <stars-rating
                :rating="shop.tabelog_rating"
                :star-size="20"
              ></stars-rating>
            </v-col>
          </v-row>
          <v-row no-gutters class="mb-2">
            <v-col cols="auto" align-self="center">
              <div style="width: 35px; margin-left: 5px">
                <v-img
                  src="/icon/google.svg"
                  height="20"
                  width="20"
                  class="mr-2"
                  contain
                ></v-img>
              </div>
            </v-col>
            <v-col cols="auto">
              <stars-rating
                :rating="shop.google_rating"
                :star-size="20"
              ></stars-rating>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="auto" align-self="center" class="mr-2">
              <span class="font-weight-bold">おすすめ度</span>
            </v-col>
            <v-col cols="auto">
              <stars-rating
                :rating="shop.total_rating"
                :star-size="20"
              ></stars-rating>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </template>
    <template v-else>
      <v-row>
        <v-col v-for="shop in shops" :key="shop.id" cols="12" xl="6">
          <v-card class="mb-5">
            <div class="d-flex flex-row">
              <v-avatar size="200" tile>
                <v-img :src="shop.img_src"></v-img>
              </v-avatar>
              <div class="align-self-center mb-2">
                <v-card-title class="font-weight-bold pb-2 pt-0">
                  <a
                    :href="shop.url"
                    style="text-decoration: none; color: black"
                  >
                    {{ shop.name }}
                  </a>
                  <v-btn
                    v-if="userShopIds.includes(shop.id)"
                    icon
                    class="text-left"
                    @click="$emit('delete', shop.id)"
                  >
                    <v-icon color="red">mdi-bookmark</v-icon>
                  </v-btn>
                  <v-btn
                    v-else
                    icon
                    class="text-left"
                    @click="$emit('add', shop.id)"
                  >
                    <v-icon>mdi-bookmark-outline</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <v-icon color="red">mdi-map-marker</v-icon>
                  <span class="grey--text text--darken-2"
                    ><a
                      :href="'https://www.google.com/search?q=' + shop.name"
                      style="color: gray"
                      >{{ shop.address.substr(13) }}</a
                    ></span
                  >
                </v-card-text>
                <div class="d-flex flex-row">
                  <div class="d-flex flex-row ml-3">
                    <v-img
                      src="/icon/tabelog.svg"
                      height="30"
                      width="30"
                      class="mr-2"
                      contain
                    ></v-img>
                    <stars-rating
                      :rating="shop.tabelog_rating"
                      :star-size="25"
                    ></stars-rating>
                  </div>
                  <div class="d-flex flex-row ml-5">
                    <v-img
                      src="/icon/google.svg"
                      height="20"
                      width="20"
                      class="mr-2"
                      contain
                    ></v-img>
                    <stars-rating
                      :rating="shop.google_rating"
                      :star-size="25"
                    ></stars-rating>
                  </div>
                </div>
                <div class="d-flex flex-row mt-3 ml-3">
                  <span class="font-weight-bold mr-2">おすすめ度</span>
                  <stars-rating
                    :rating="shop.total_rating"
                    :star-size="25"
                  ></stars-rating>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import StarsRating from '@/components/StarRating'
export default {
  components: { StarsRating },
  props: {
    shops: {
      type: Array,
      required: true,
    },
    userShopIds: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.sortTabelog()
  },
  data() {
    return {}
  },
  methods: {
    sortTabelog() {
      this.shops.sort((a, b) => {
        if (a.tabelog_rating < b.tabelog_rating) {
          return 1
        } else {
          return -1
        }
      })
    },
    sortGoogle() {
      this.shops.sort((a, b) => {
        if (a.google_rating < b.google_rating) {
          return 1
        } else {
          return -1
        }
      })
    },
    sortTotal() {
      this.shops.sort((a, b) => {
        if (a.total_rating < b.total_rating) {
          return 1
        } else {
          return -1
        }
      })
    },
  },
}
</script>

<style scoped></style>

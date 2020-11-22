<template>
  <div>
    <template v-if="$vuetify.breakpoint.xs">
      <v-card v-for="shop in shops" :key="shop.id" class="mb-5">
        <v-img height="200" :src="shop.img_src"></v-img>
        <v-card-title class="font-weight-bold pb-0">
          {{ shop.name }}
          <v-btn icon class="text-left">
            <v-icon>mdi-bookmark-outline</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-icon color="red">mdi-map-marker</v-icon>
          <span class="grey--text text--darken-2 text-caption">
            {{ shop.address.substr(13) }}
          </span>
          <v-row no-gutters class="mt-2 mb-1">
            <v-col cols="auto">
              <div style="width: 40px">
                <v-img
                  src="/tabelog.svg"
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
                star-size="20"
              ></stars-rating>
            </v-col>
          </v-row>
          <v-row no-gutters class="mb-2">
            <v-col cols="auto" align-self="center">
              <div style="width: 35px; margin-left: 5px">
                <v-img
                  src="/google.svg"
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
                star-size="20"
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
                star-size="20"
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
                  {{ shop.name }}
                  <v-btn icon class="text-left">
                    <v-icon>mdi-bookmark-outline</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <v-icon color="red">mdi-map-marker</v-icon>
                  <span class="grey--text text--darken-2">{{
                    shop.address.substr(13)
                  }}</span>
                </v-card-text>
                <div class="d-flex flex-row">
                  <div class="d-flex flex-row ml-3">
                    <v-img
                      src="/tabelog.svg"
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
                      src="/google.svg"
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
      required: true,
    },
  },
  name: 'ShopCard',
  data() {
    return {}
  },
}
</script>

<style scoped></style>

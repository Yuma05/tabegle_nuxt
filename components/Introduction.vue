<template>
  <div class="text-center grey--text text--darken-3 mt-10">
    <v-card elevation="10" max-width="1300" class="mx-auto">
      <div
        class="text-center pt-5 mb-5 text-subtitle-1 text-sm-h6 grey--text text--darken-3"
      >
        😋 エリア・カテゴリからお店を検索して比較
      </div>
      <v-img
        max-width="1000"
        src="/introduction/screenshot01.jpg"
        class="mx-auto"
      ></v-img>
    </v-card>
    <v-card elevation="10" class="mt-10 mx-auto" max-width="1300">
      <div
        class="text-center pt-5 mb-5 text-subtitle-1 text-sm-h6 grey--text text--darken-3"
      >
        <v-icon color="red">mdi-bookmark</v-icon> 気になるお店はKeep
      </div>
      <v-img
        max-width="1000"
        src="/introduction/screenshot02.jpg"
        class="mx-auto"
      ></v-img>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Introduction',
}
</script>

<style scoped></style>

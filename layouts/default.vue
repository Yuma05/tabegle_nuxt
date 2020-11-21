<template>
  <v-app dark>
    <v-app-bar color="#F5A002" fixed app>
      <v-toolbar-title
        class="text-center white--text mx-auto font-weight-bold text-h4"
        >Tabegle</v-toolbar-title
      >
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>

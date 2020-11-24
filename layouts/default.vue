<template>
  <v-app dark>
    <v-app-bar color="#F5A002" fixed app>
      <v-toolbar-title
        class="white--text font-weight-bold text-h5 text-sm-h4 ml-5"
      >
        <nuxt-link to="/" style="text-decoration: none; color: white"
          >Tabegle</nuxt-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        :small="$vuetify.breakpoint.xs"
        color="white"
        outlined
        class="mr-2"
        @click="$router.push('/keep')"
      >
        <v-icon>mdi-bookmark</v-icon>keep</v-btn
      >
      <v-btn
        v-if="$store.getters.loggedin"
        :small="$vuetify.breakpoint.xs"
        color="white"
        outlined
        class="mr-2"
        @click="logout"
      >
        <v-icon>mdi-logout</v-icon>logout</v-btn
      >
      <v-btn
        v-else
        :small="$vuetify.breakpoint.xs"
        color="white"
        outlined
        class="mr-2"
        @click="$router.push('/login')"
      >
        <v-icon>mdi-login</v-icon>login</v-btn
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
import axios from 'axios'
export default {
  data() {
    return {
      isLogin: false,
    }
  },
  mounted() {
    if (this.$cookies.get('key') == null) {
      this.$store.commit('changeLoginStatus', false)
    } else {
      this.$store.commit('changeLoginStatus', true)
    }
    // axios.defaults.baseURL = 'http://127.0.0.1:8000'
  },
  methods: {
    logout() {
      const key = this.$cookies.get('key')
      const headers = {
        'X-CSRFToken': this.$cookies.get('csrftoken'),
        Authorization: key,
      }
      axios
        .post('/api/dj-rest-auth/logout/', null, { headers })
        .then((res) => {
          this.$cookies.remove('key')
          this.$store.commit('changeLoginStatus', false)
          this.$router.push('/')
        })
        .catch((e) => console.log(e.response))
    },
  },
}
</script>

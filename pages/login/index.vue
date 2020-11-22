<template>
  <v-card max-width="700px" class="mx-auto mt-7" elevation="5">
    <v-card-title
      ><span class="mx-auto text-h5 font-weight-bold">Login</span></v-card-title
    >
    <div
      v-if="isShowError"
      class="text-center text-body-2 red--text text--lighten-1"
    >
      {{ errorMessage }}
    </div>
    <v-card-text class="text-center">
      アカウントをお持ちでない方は
      <nuxt-link to="/registration">こちら</nuxt-link>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="ユーザーネーム"
          required
          color="orange"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="パスワード"
          required
          type="password"
          color="orange"
        ></v-text-field>
        <div style="width: 100%" class="text-center">
          <v-btn outlined color="orange" :disabled="!valid" @click="signIn()">
            sign in
          </v-btn>
        </div>
        {{ test }}
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    valid: false,
    name: '',
    nameRules: [(v) => !!v || 'ユーザーネームは必須です'],
    password: '',
    passwordRules: [(v) => !!v || 'パスワードは必須です'],
    test: '',
    isShowError: false,
    errorMessage: '',
  }),

  methods: {
    signIn() {
      const headers = { 'X-CSRFToken': this.$cookies.get('csrftoken') }
      const data = new FormData()
      data.append('username', this.name)
      data.append('password', this.password)
      axios
        .post('/api/dj-rest-auth/login/', data, { headers })
        .then((res) => {
          this.$cookies.set('key', res.data.key)
          this.$router.push('/keep')
        })
        .catch((e) => {
          if (e.response.status === 400) {
            this.errorMessage = 'ユーザーネームまたはパスワードが違います'
            this.isShowError = true
            this.password = ''
          } else {
            this.errorMessage =
              '申し訳ありません。時間をおいてから再度アクセスしてください。'
          }
        })
    },
  },
}
</script>

<style scoped></style>

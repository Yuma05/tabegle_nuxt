<template>
  <v-card max-width="700px" class="mx-auto mt-7" elevation="5">
    <v-card-title>
      <span class="mx-auto text-h5 font-weight-bold"> Registration </span>
    </v-card-title>
    <div
      v-if="isShowError"
      class="text-center text-body-2 red--text text--lighten-1"
    >
      {{ errorMessage }}
    </div>
    <v-card-text class="text-center">
      アカウントをお持ちの方は<nuxt-link to="/login">こちら</nuxt-link>
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
        <v-text-field
          v-model="confirmPassword"
          :rules="passwordConfirmRule"
          label="パスワードを再度入力してください"
          required
          type="password"
          color="orange"
        ></v-text-field>
        <div style="width: 100%" class="text-center">
          <v-btn outlined color="orange" :disabled="!valid" @click="signUp"
            >sign up</v-btn
          >
        </div>
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
    passwordRules: [
      (v) => !!v || 'パスワードは必須です',
      (v) => (v && v.length >= 8) || '8文字以上である必要があります',
      (v) => /[a-zA-Z]/.test(v) || 'アルファベットを含む必要があります',
      (v) => /[0-9]/.test(v) || '数字を含む必要があります',
    ],
    confirmPassword: '',
    isShowError: false,
    errorMessage: '',
  }),
  computed: {
    passwordConfirmRule() {
      return [
        () =>
          this.password === this.confirmPassword || 'パスワードが一致しません',
        (v) => !!v || 'パスワードの再入力は必須です',
      ]
    },
  },

  methods: {
    signUp() {
      const headers = { 'X-CSRFToken': this.$cookies.get('csrftoken') }
      const data = new FormData()
      data.append('username', this.name)
      data.append('password1', this.password)
      data.append('password2', this.confirmPassword)
      axios
        .post('/api/dj-rest-auth/registration/', data, { headers })
        .then((res) => {
          this.$cookies.set('key', res.data.key)
          this.$router.push('/keep')
          this.$store.commit('changeLoginStatus', true)
        })
        .catch((e) => {
          console.log(e.response)
          if (e.response.status === 400) {
            this.errorMessage = Object.values(e.response.data)[0][0]
            this.isShowError = true
            this.password = ''
            this.confirmPassword = ''
          } else {
            this.errorMessage =
              '申し訳ありません。時間をおいてから再度アクセスしてください。'
            console.log(e.response)
          }
        })
    },
  },
}
</script>

<style scoped></style>

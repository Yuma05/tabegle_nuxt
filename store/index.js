export const state = () => ({
  loggedIn: false,
})

export const getters = {
  loggedin(state) {
    return state.loggedIn
  },
}

export const mutations = {
  changeLoginStatus(state, loggedIn) {
    state.loggedIn = loggedIn
  },
}

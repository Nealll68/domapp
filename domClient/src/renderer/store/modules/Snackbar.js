const state = {
    snack: ''
}

const mutations = {
    show (state, snack) {
        state.snack = snack
    }
}

const actions = {
    showSnackbar ({ commit }, message) {
        commit('show', message)
    }
}

export default {
    state,
    mutations,
    actions
}
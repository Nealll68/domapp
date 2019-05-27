const state = {
    message: ''
}

const mutations = {
    show (state, message) {
        state.message = message
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
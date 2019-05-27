<template>
    <v-snackbar v-model="show" :timeout="5000">
        {{ message }}
        <v-btn flat color="accent" @click.native="show = false">Fermer</v-btn>
    </v-snackbar>
</template>

<script>
export default {
    data () {
        return {
            show: false,
            message: ''
        }
    },

    created () {
        this.$store.watch(state => state.Snackbar.message, (oldValue, newValue) => {
            const msg = newValue.message

            if (msg !== '') {
                this.show = true
                this.message = newValue.message
                this.$store.dispatch('showSnackbar', { message: '' })
            }
        })
    }
}
</script>

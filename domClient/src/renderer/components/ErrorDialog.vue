<template>
    <v-dialog v-model="showModal" scrollable max-width="500">
        <v-card>
            <v-card-title class="headline red darken-1 white--text" primary-title>
                Oops...
            </v-card-title>

        <v-card-text>
            Une erreur est survenue :<br/>
            {{ error }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
                <v-btn color="error" flat @click="closeModal = true">Fermer</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['show', 'error'],

    data () {
        return {
            closeModal: false
        }
    },

    computed: {
        showModal () {
            if (this.closeModal) {
                return false
            } else {
                return this.show
            }
        }
    }
}
</script>


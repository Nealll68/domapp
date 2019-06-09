<template>
    <div>
        <error-dialog :show="errorDialog" :error="errorMsg"></error-dialog>
        <v-card	class="ma-2">
            <v-sheet v-show="lumLoading" class="card-loading-overlay">
                <v-layout justify-center align-center>
                    <v-progress-linear indeterminate color="primary" class="ma-5"></v-progress-linear>
                </v-layout>
            </v-sheet>

            <v-card-title>
                <v-icon class="mr-3" size="54" color="amber darken-1">fas fa-sun</v-icon>
                <v-layout column align-start>
                    <div class="caption grey--text text-uppercase">Luminosité</div>
                    <div>
                        <span class="display-2 font-weight-black">{{ lum }}</span>
                        <strong>RLUM</strong>
                    </div>				
                </v-layout>
            </v-card-title>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'lum-block',

    data () {
        return {
            errorDialog: false,
			errorMsg: '',
            lumLoading: false,
            lum: 0
        }
    },
    
    async mounted () {
        this.lumLoading = true
        
        await this.getLastLum()

        this.lumLoading = false

        setInterval(async function () {
            this.getLastLum()
        }.bind(this), 60000)
    },

    methods: {
        async getLastLum () {
            try {
                const response = await this.$http.get('/api/luminosity/last')
                this.lum = response.data.luminosity
            } catch (ex) {
                this.errorDialog = true
                this.errorMsg = ex.response.data
            }
        }
    }
}
</script>


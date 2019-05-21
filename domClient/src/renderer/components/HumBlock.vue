<template>
    <div>
        <error-dialog :show="errorDialog" :error="errorMsg"></error-dialog>
        <v-card	class="ma-2">
            <v-sheet v-show="humLoading" class="card-loading-overlay">
                <v-layout justify-center align-center>
                    <v-progress-linear indeterminate color="primary" class="ma-5"></v-progress-linear>
                </v-layout>
            </v-sheet>

            <v-card-title>
                <v-icon class="mr-3" size="54" color="blue darken-4">fas fa-tint</v-icon>
                <v-layout column align-start>
                    <div class="caption grey--text text-uppercase">Humidité</div>
                    <div>
                        <span class="display-2 font-weight-black">{{ hum }}</span>
                        <strong>%</strong>
                    </div>				
                </v-layout>
            </v-card-title>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'hum-block',

    data () {
        return {
            errorDialog: false,
			errorMsg: '',
            humLoading: false,
            hum: 0
        }
    },
    
    async mounted () {
        this.humLoading = true

        try {
            const response = await this.$http.get('/api/humidity/last')
            this.hum = response.data.humidity
        } catch (ex) {
            this.errorDialog = true
			this.errorMsg = ex.response.data
        }

        this.humLoading = false
    }
}
</script>

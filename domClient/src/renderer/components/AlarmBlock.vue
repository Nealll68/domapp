<template>
    <div>
        <error-dialog :show="errorDialog" :error="errorMsg"></error-dialog>
        <v-card	class="ma-2" height="98">
            <v-sheet v-show="alarmLoading" class="card-loading-overlay">
                <v-layout justify-center align-center>
                    <v-progress-linear indeterminate color="primary" class="ma-5"></v-progress-linear>
                </v-layout>
            </v-sheet>

            <v-card-title>
                <v-icon class="mr-3" size="54" :color="alarmState ? 'success' : 'error'">fas fa-bell</v-icon>
                <v-layout column align-start>
                    <div class="caption grey--text text-uppercase">Alarme</div>
                    <div>
                        <span class="display-1 font-weight-black">{{ alarmState ? 'Active' : 'Inactive' }}</span>
                    </div>				
                </v-layout>
            </v-card-title>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'alarm-block',

    data () {
        return {
            errorDialog: false,
			errorMsg: '',
            alarmLoading: false,
            alarmState: 0
        }
    },
    
    async mounted () {
        this.alarmLoading = true

        try {
            const response = await this.$http.get('/api/setting')
            this.alarmState = response.data.alarmState
        } catch (ex) {
            this.errorDialog = true
			this.errorMsg = ex.response.data
        }

        this.alarmLoading = false
    }
}
</script>

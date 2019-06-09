<template>
<div>
    <error-dialog :show="errorDialog" :error="errorMsg"></error-dialog>	

    <v-layout align-center column fill-height>
        <v-flex>
            <v-card width="400">
                <v-card-title class="pb-2">
                    <h3 class="headline">Réglages</h3>
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text class="py-0">
                    <v-switch v-model="toggleAlarm" label="Alarme" color="success" :loading="switchLoading" :readonly="switchLoading"></v-switch>                    
                </v-card-text>
            </v-card>

            <v-card width="400" class="mt-3">
                 <v-sheet v-show="cardLoading" class="card-loading-overlay">
                    <v-layout justify-center align-center>
                        <v-progress-linear indeterminate color="primary" class="ma-5"></v-progress-linear>
                    </v-layout>
                </v-sheet>

                <v-card-title class="pb-2">
                    <h3 class="headline">Historique</h3>
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text class="alarms-historic">
                    <v-alert :value="true" v-for="alarm in alarms" :key="alarm.id" icon="fas fa-exclamation-triangle" outline>
                        {{ alarm.created_at | moment('DD/MM/YYYY HH:mm') }} :                        
                        Alarme déclenchée
                    </v-alert>

                </v-card-text>
            </v-card>
        </v-flex>        
    </v-layout>
</div>
</template>

<script>
export default {
    name: 'page-alarm',

    data () {
        return {
            errorDialog: false,
			errorMsg: '',
            switchLoading: false,
            cardLoading: false,
            alarms: null,
            toggleAlarm: false,
            alarmStateIsInit: false
        }
    },
    
    async mounted () {
        this.cardLoading = true
        this.switchLoading = true

        await this.getLastInfos()

        this.switchLoading = false
        this.cardLoading = false

        setInterval(async function () {
            await this.getLastInfos()
        }.bind(this), 1000)

        setTimeout(function () {
            this.alarmStateIsInit = true            
        }.bind(this), 500)
    },

    watch: {
        async toggleAlarm (value) {
            if (this.alarmStateIsInit) {
                this.switchLoading = true

                try {
                    await this.$http.post('/api/setting', {
                        field: 'alarmState',
                        value: this.toggleAlarm
                    })
                    this.$store.dispatch('showSnackbar', { message: `Alarme ${this.toggleAlarm ? 'activée' : 'désactivée'}` })
                } catch (ex) {
                    this.errorDialog = true
                    this.errorMsg = ex.response.data
                }

                this.switchLoading = false
				
            }
        }
    },

    methods: {
        async getLastInfos () {
            try {
                const response = await this.$http.get('/api/alarms')
                this.alarms = response.data.alarms

                const settings = await this.$http.get('/api/setting')
                this.toggleAlarm = settings.data.alarmState            
            } catch (ex) {
                this.errorDialog = true
                this.errorMsg = ex.response.data
            }
        }
    }
}
</script>

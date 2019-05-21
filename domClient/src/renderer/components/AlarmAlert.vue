<template>
    <v-dialog v-model="dialog" width="300">
        <v-card color="error" dark>
            <v-card-title class="headline" primary-title>                
                <v-icon>fas fa-exclamation-triangle</v-icon>
                <span class="ml-3">Alarme déclenchée !</span>
            </v-card-title>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat	@click="dialog = false">Fermer</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'alarm-alert',
    
    data () {
        return {
            dialog: false,
            lastAlert: Date.now(),            
        }
    },

    created () {
        setInterval(function () {
            this.checkAlarm()
        }.bind(this), 3000)
    },

    methods: {
        async checkAlarm () {            
            try {
                const response = await this.$http.get('/api/alarms/get-last')
                if (Date.parse(response.data.date) > this.lastAlert) {
                    this.dialog = response.data.alarm
                    this.lastAlert = Date.parse(response.data.date)
                }                
            } catch (ex) {
                console.log(ex)
            }            
        }
    }
}
</script>

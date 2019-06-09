<template>
    <div>
        <error-dialog :show="errorDialog" :error="errorMsg"></error-dialog>
        <v-card	class="ma-2">
            <v-sheet v-show="tempLoading" class="card-loading-overlay">
                <v-layout justify-center align-center>
                    <v-progress-linear indeterminate color="primary" class="ma-5"></v-progress-linear>
                </v-layout>
            </v-sheet>

            <v-card-title>
                <v-icon class="mr-3" size="54" :color="getTempColor()">fas fa-thermometer-full</v-icon>
                <v-layout column align-start>
                    <div class="caption grey--text text-uppercase">Temperature</div>
                    <div>
                        <span class="display-2 font-weight-black">{{ temp }}</span>
                        <strong>°C</strong>
                    </div>				
                </v-layout>
            </v-card-title>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'temp-block',

    data () {
        return {
            errorDialog: false,
			errorMsg: '',
            tempLoading: false,
            temp: 0,
            tempValue: [5, 10, 14, 20, 25, 30],
            tempColor: ['blue darken-4', 'blue darken-1', 'amber darken-2', 'orange darken-1', 'orange darken-4', 'red darken-1']
        }
    },
    
    async mounted () {
        this.tempLoading = true
        await this.getLastTemp()
        this.tempLoading = false

        setInterval(async function () {
            await this.getLastTemp()
        }.bind(this), 60000)
    },

    methods: {
        getTempColor () {
            let index
            let arrLength = this.tempValue.length
            for (let i = 0; i < arrLength; i++) {
                if (this.temp < this.tempValue[0]) {
                    index = 0
                    break
                } else if (this.temp > this.tempValue[arrLength]) {
                    index = arrLength
                    break
                } else if (this.temp >= this.tempValue[i] && this.temp <= this.tempValue[i + 1]) {
                    index = i
                    break
                }
            }

            return this.tempColor[index]
        },

        async getLastTemp () {
            try {
                const response = await this.$http.get('/api/temperature/last')
                this.temp = response.data.temperature
            } catch (ex) {
                this.errorDialog = true
                this.errorMsg = ex.response.data
            }
        }
    }
}
</script>

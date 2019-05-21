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
                    <v-switch v-model="toggleHeater" label="Chauffage" color="success" :loading="switchLoading" :readonly="switchLoading"></v-switch>

                    <v-divider></v-divider>

                    <v-subheader>Température à maintenir en °C</v-subheader>
                    <v-slider class="mt-4" v-model="heaterThreshold" min="10" max="30" thumb-label="always" :loading="sliderLoading" :disabled="sliderLoading"></v-slider>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</div>
</template>

<script>
import _ from 'lodash'

export default {
    name: 'page-heater',

    data () {
        return {
            errorDialog: false,
			errorMsg: '',
            switchLoading: false,
            sliderLoading: false,
            toggleHeater: false,
            heaterThreshold: 0
        }
    },
    
    async mounted () {
        this.switchLoading = true
        this.sliderLoading = true

        try {
            const response = await this.$http.get('/api/setting')

            this.toggleHeater = response.data.heaterState
            this.heaterThreshold = response.data.heaterThreshold
        } catch (ex) {
            this.errorDialog = true
            this.errorMsg = ex.response.data
        } 

        this.switchLoading = false
        this.sliderLoading = false
    },

    watch: {
        async toggleHeater (value) {
            this.switchLoading = true
			
			try {
				await this.$http.post('/api/setting', {
                    field: 'heaterState',
					value: this.toggleHeater
				})
			} catch (ex) {
				this.errorDialog = true
            	this.errorMsg = ex.response.data
			}

			this.switchLoading = false				
        },
        
        heaterThreshold (value) {
			this.debouncedHeaterThreshold()
		}
    },

    created () {
		this.debouncedHeaterThreshold = _.debounce(this.setHeaterThreshold, 500)
	},

    methods: {
        async setHeaterThreshold () {
            this.sliderLoading = true
			
			try {
				await this.$http.post('/api/setting', {
                    field: 'heaterThreshold',
					value: this.heaterThreshold
				})
			} catch (ex) {
				this.errorDialog = true
            	this.errorMsg = ex.response.data
			}

			this.sliderLoading = false
        }
    }
}
</script>

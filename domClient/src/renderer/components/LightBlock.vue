<template>
	<div>
		<error-dialog :show="errorDialog" :error="errorMsg"></error-dialog>		
		<v-card	class="ma-2" width="400">
			<v-sheet v-show="lightCardLoading" class="card-loading-overlay">
				<v-layout justify-center align-center>
					<v-progress-linear indeterminate color="primary" class="ma-5"></v-progress-linear>
				</v-layout>
			</v-sheet>

			<v-card-title>
				<v-layout row align-start justify-center :class="{ 'mb-2': !showButton }">
					<v-flex>
						<v-layout row align-start>
							<v-flex>
								<v-icon class="mr-3" size="54" :color="inLightState  ? 'green' : 'red'">fas fa-lightbulb</v-icon>
							</v-flex>
							<v-flex>
								<v-layout column class="mt-2">
									<div class="caption grey--text text-uppercase">éclairage int.</div>
									<div>
										<strong class="text-uppercase">{{ inLightState  ? "allumé" : "éteint"}}</strong>
									</div>						
								</v-layout>				
							</v-flex>
						</v-layout>
						<v-btn class="mb-0" v-show="showButton" small block :color="inLightState ? 'error' : 'success'" :loading="btnInLightLoading" flat @click="setInLightState()">{{ inLightState ? "éteindre" : "Allumé" }}</v-btn>					
					</v-flex>

					<v-divider vertical class="mx-3"></v-divider>

					<v-flex>
						<v-layout row align-start>
							<v-flex>
								<v-icon class="mr-3" size="54" :color="outLightState  ? 'green' : 'red'">fas fa-lightbulb</v-icon>
							</v-flex>
							<v-flex>
								<v-layout column class="mt-2">
									<div class="caption grey--text text-uppercase">éclairage ext.</div>
									<div>
										<strong class="text-uppercase">{{ outLightState  ? "allumé" : "éteint"}}</strong>
									</div>						
								</v-layout>				
							</v-flex>
						</v-layout>
						<v-btn class="mb-0" v-show="showButton" small block :color="outLightState ? 'error' : 'success'" :loading="btnOutLightLoading" flat @click="setOutLightState()">{{ outLightState ? "éteindre" : "Allumé" }}</v-btn>					
					</v-flex>
				</v-layout>
			</v-card-title>				
		</v-card>
	</div>
</template>

<script>
export default {
    name: 'light-block',
    
    props: [
        'showButton'
    ],

	data () {
		return {
			errorDialog: false,
			errorMsg: '',
			lightCardLoading: false,
			btnInLightLoading: false,
			btnOutLightLoading: false,
            inLightState: false,
            outLightState: false
		}
	},

	async mounted () {
        this.lightCardLoading = true
        
        try {
            const response = await this.$http.get('/api/light/get-all-light-state')
            this.inLightState = response.data.inLightState
			this.outLightState = response.data.outLightState
        } catch (ex) {
			this.errorDialog = true
			this.errorMsg = ex.response.data
        }

        this.lightCardLoading = false
	},

	methods: {
		async setInLightState () {
			this.btnInLightLoading = true

			try {
				await this.$http.post('/api/light/set', {
					position: 'inside',
					state: !this.inLightState
				})
				this.inLightState = !this.inLightState
			} catch (ex) {				
				this.errorDialog = true
				this.errorMsg = ex.response.data
			}
			
			this.btnInLightLoading = false
		},

		async setOutLightState () {
			this.btnOutLightLoading = true

			try {
				await this.$http.post('/api/light/set', {
					position: 'outside',
					state: !this.outLightState
				})
				this.outLightState = !this.outLightState
			} catch (ex) {				
				this.errorDialog = true
				this.errorMsg = ex.response.data
			}

			this.btnOutLightLoading = false
		}
	}
}
</script>

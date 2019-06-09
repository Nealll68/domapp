<template>
	<div>
		<error-dialog :show="errorDialog" :error="errorMsg"></error-dialog>	
		<v-layout align-center column fill-height>
			<v-flex>
				<light-block showButton="true"></light-block>	
			</v-flex>

			<v-flex>
				<v-card width="400" class="pb-2">
					<v-card-title class="pb-2">
						<h3 class="headline">Réglages</h3>
						
						<v-spacer></v-spacer>					

						<v-btn icon @click="dialog = true">
							<v-icon>fas fa-question</v-icon>
						</v-btn>
					</v-card-title>

					<v-divider></v-divider>

					<v-card-text class="py-0">
						<v-switch v-model="toggleLightMode"	label="Mode autonome" color="success" :loading="switchLoading" :readonly="switchLoading"></v-switch>
					</v-card-text>

					<v-divider></v-divider>
					<v-subheader>Seuil d'allumage de l'éclairage</v-subheader>

					<v-card-text class="py-0">						
						<v-slider
							v-model="lumThreshold"
							:tick-labels="lumThresholdLabels"
							:loading="sliderLoading"
							:disabled="sliderLoading"
							:max="3"
							step="1"
							ticks="always"
							tick-size="2"
						></v-slider>
					</v-card-text>					
				</v-card>
			</v-flex>
		</v-layout>


		<v-dialog v-model="dialog"	width="500">
			<v-card>
				<v-card-title class="headline grey lighten-2" primary-title>
					Informations
				</v-card-title>

				<v-card-text>
					<v-subheader>Mode autonome</v-subheader>
					Le mode autonome active la gestion automatique de l'éclairage, c'est à dire que l'éclairage va s'allumer et s'éteindre selon le seuil configuré.
					<p><strong class="red--text text--lighten-1">Si vous changez l'état d'un éclairage manuellement le mode autonome se désactivera automatiquement</strong></p>

					<v-subheader>Seuil d'allumage de l'éclairage</v-subheader>
					Le seuil d'allumage permet de régler à partir de quelle luminosité veut-on que l'éclairage s'allume (Le seuil est utilisé seulement si le mode autonome est activé)					
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" flat	@click="dialog = false">D'accord !</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
const LightBlock = () => import('@/components/LightBlock')
import _ from 'lodash'

export default {	
	name: 'page-light',
	components: {
		LightBlock
	},

	data () {
		return {
			errorDialog: false,
			errorMsg: '',
			switchLoading: false,
			sliderLoading: false,
			dialog: false,
			lumThresholdLabels: [
				'Très sombre',
				'Sombre',
				'Eclairé',
				'Lumineux'
			],
			toggleLightMode: false,
			lumThreshold: 0,
			initToggleLightMode: false,
			initLumThreshold: false	
		}
	},

	async mounted () {
		this.sliderLoading = true
		this.switchLoading = true

		await this.getLightAutoMode()
		await this.getLightTreshold() 

		this.sliderLoading = false
		this.switchLoading = false
		
		setInterval(async function () {
			await this.getLightAutoMode()
		}.bind(this), 1000)
	},

	watch: {
		async toggleLightMode (value) {

			if (this.initToggleLightMode) {
				this.switchLoading = true
				
				try {
					await this.$http.post('/api/setting', {
						field: 'lightAutoMode',
						value: this.toggleLightMode
					})
				} catch (ex) {
					this.errorDialog = true
					this.errorMsg = ex.response.data
				}

				this.switchLoading = false				
			}
		},

		lumThreshold (value) {
			this.debouncedLumThreshold()
		}
	},

	created () {
		this.debouncedLumThreshold = _.debounce(this.setLumThreshold, 500)
	},

	methods: {
		async setLumThreshold () {
			if (this.initLumThreshold) {
				this.sliderLoading = true
				
				try {
					await this.$http.post('/api/setting', {
						field: 'lightThreshold',
						value: this.lumThreshold
					})
				} catch (ex) {
					this.errorDialog = true
					this.errorMsg = ex.response.data
				}

				this.sliderLoading = false
			}
		},

		async getLightAutoMode () {
			try {
				const response = await this.$http.get('/api/setting')

				this.toggleLightMode = response.data.lightAutoMode

				setTimeout(function () {
					this.initToggleLightMode = true
				}.bind(this), 1000)
			} catch (ex) {
				this.errorDialog = true
				this.errorMsg = ex.response.data
			}
		},

		async getLightTreshold () {
			try {
				const response = await this.$http.get('/api/setting')

				this.lumThreshold = response.data.lightThreshold

				setTimeout(function () {
					this.initLumThreshold = true
				}.bind(this), 1000)
			} catch (ex) {
				this.errorDialog = true
				this.errorMsg = ex.response.data
			}
		}
	}
}
</script>

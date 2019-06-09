<template>
<div>
	<error-dialog :show="errorDialog" :error="errorMsg"></error-dialog>
	<v-card class="elevation-1">
		<v-toolbar flat color="white">
			<v-toolbar-title>Scénarios</v-toolbar-title>
			
			<v-spacer></v-spacer>
			<v-btn fab dark small color="primary" @click="dialog = true">
				<v-icon dark>fas fa-plus</v-icon>
			</v-btn>
		</v-toolbar>

		<v-data-table :headers="headers" :items="scenarios" hide-actions :loading="tableLoading">
			<template slot="items" slot-scope="props">
				<td>{{ props.item.name }}</td>
				<td>{{ getActionText(props.item.action) }}</td>
				<td>{{ props.item.execution_at ? getReadableDate(props.item.execution_at) : '/' }}</td>
				<td>{{ props.item.isRecurrent ? 'Oui' : 'Non' }}</td>
				<td>{{ props.item.day ? getDayText(props.item.day) : '/' }}</td>
				<td>{{ props.item.time ? props.item.time : '/' }}</td>
				<td>
					<v-icon small @click="deleteItem(props.item)">fas fa-trash-alt</v-icon>
				</td>
			</template>
			
			<template slot="no-data">
				<v-alert :value="true" color="info" icon="fas fa-info">
					Aucun scénario créé. Cliquez sur le "+" pour en créer un !
				</v-alert>
			</template>
		</v-data-table>
	</v-card>

	<v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="700px">
		<v-card>
			<v-card-title class="headline grey lighten-2">
				<v-btn icon @click="dialog = false">
					<v-icon>fas fa-times</v-icon>
				</v-btn>
				Création d'un scénario
			</v-card-title>

			<v-card-text>
				<v-form v-model="valid" lazy-validation ref="form">
					<v-layout>
						<v-flex xs12 md6 class="mr-2">
							<v-text-field v-model="name" label="Nom" :counter="255" :rules="formRules.nameRules" required></v-text-field>
						</v-flex>

						<v-flex xs12 md6>
							<v-select v-model="action" :items="actionItems" item-value="value" item-text="text" label="Action" solo :rules="formRules.actionRules" required></v-select>
						</v-flex>
					</v-layout>

					<v-layout>
						<v-flex xs12 md12>
							<v-checkbox v-model="isRecurrent" label="Action récurrente ?"></v-checkbox>
						</v-flex>
					</v-layout>

					<v-layout>
						<v-flex xs12 md6 class="mr-2" v-if="!isRecurrent">
							<v-menu v-model="datePickerMenu" :close-on-content-click="false" full-width max-width="290px">
								<template v-slot:activator="{ on }">
									<v-text-field :value="computedDateFormatted" clearable label="Choix de la date" readonly v-on="on"></v-text-field>									
								</template>
								<v-date-picker v-model="datePickerVal" @change="datePickerMenu = false" locale="fr-fr"></v-date-picker>
							</v-menu>
						</v-flex>

						<v-flex xs12 md6 class="mr-2" v-else>
							<v-select v-model="day" :items="dayItems" item-value="value" item-text="text" label="Jour" solo></v-select>
						</v-flex>

						<v-flex xs12 md6>
							<v-menu v-model="timePickerMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="timePickerVal" lazy full-width max-width="290px" ref="menu">
								<template v-slot:activator="{ on }">
									<v-text-field v-model="timePickerVal" label="Choix de l'heure" clearable readonly v-on="on"></v-text-field>
								</template>
								<v-time-picker v-if="timePickerMenu" v-model="timePickerVal" full-width @click:minute="$refs.menu.save(timePickerVal)" format="24hr"></v-time-picker>
							</v-menu>
						</v-flex>
					</v-layout>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn flat color="primary" :disabled="!valid" :loading="formLoading" @click="saveScenario">Valider</v-btn>		
					</v-card-actions>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</div>
</template>

<script>

export default {
	name: 'page-scenario',

	data () {
		return {
			errorDialog: false,
			errorMsg: '',
			formLoading: false,
			tableLoading: false,
			headers: [
				{ text: 'Nom', value: 'name' },
				{ text: 'Action', value: 'action' },
				{ text: 'Date d\'exécution', value: 'execution_at' },
				{ text: 'Récurrent', value: 'isRecurrent' },
				{ text: 'Jour', value: 'day' },
				{ text: 'Heure', value: 'time' }
			],
			scenarios: [],
			dialog: false,
			valid: false,
			datePickerMenu: false,
			timePickerMenu: false,
			actionItems: [
				{ text: 'Allumer l\'éclairage intérieur', value: 'lightInsideOn' },
				{ text: 'Eteindre l\'éclairage intérieur', value: 'lightInsideOff' },
				{ text: 'Allumer l\'éclairage extérieur', value: 'lightOutsideOn' },
				{ text: 'Eteindre l\'éclairage extérieur', value: 'lightOutsideOff' },
				{ text: 'Activer l\'alarme', value: 'alarmOn' },
				{ text: 'Désactiver l\'alarme', value: 'alarmOff' },
				{ text: 'Allumer le chauffage', value: 'heaterOn' },
				{ text: 'Eteindre le chauffage', value: 'heaterOff' }
			],
			dayItems: [
				{ text: 'Tous les jours', value: '-1' },
				{ text: 'Lundi', value: '1' },
				{ text: 'Mardi', value: '2' },
				{ text: 'Mercredi', value: '3' },
				{ text: 'Jeudi', value: '4' },
				{ text: 'Vendredi', value: '5' },
				{ text: 'Samedi', value: '6' },
				{ text: 'Dimanche', value: '0' }				
			],
			name: '',
			action: null,
			isRecurrent: false,
			day: '',
			datePickerVal: this.$moment().toISOString().substr(0, 10),
			timePickerVal: '',
			formRules: {
				nameRules: [
					v => !!v || 'Un nom est requis'/*,
					v => v.length <= 255 || 'Le taille du nom doit être inférieur à 255 caractères'*/
				],
				actionRules: [
					v => !!v || 'Une action est requise'
				]
			}
		}
	},

	async mounted () {
		await this.getScenario()
	},

	computed: {
		computedDateFormatted () {
			return this.datePickerVal ? this.$moment(this.datePickerVal).format('ddd Do MMMM YYYY') : ''
		}
	},

	methods: {
		async getScenario () {
			this.tableLoading = true
			try {
				const response = await this.$http.get('/api/scenario/all')
				this.scenarios = response.data
			} catch (ex) {
				this.errorDialog = true
				this.errorMsg = ex.response.data
			}
			this.tableLoading = false
		},

		async saveScenario () {
			this.formLoading = true
			try {				
				if (this.$refs.form.validate()) {					
					await this.$http.post('/api/scenario/create', {
						name: this.name,
						action: this.action,
						isRecurrent: this.isRecurrent,
						date: this.datePickerVal,
						time: this.timePickerVal,
						day: this.day
					})

					await this.getScenario()

					this.dialog = false
					this.$refs.form.reset()
					this.$store.dispatch('showSnackbar', { message: 'Le scénario a bien été créé' })
				}
			} catch (ex) {
				this.errorDialog = true
            	this.errorMsg = ex.response.data
			}
			this.formLoading = false
		},	

		async deleteItem (item) {
			this.tableLoading = true

			try {
				await this.$http.post('/api/scenario/delete', {
					id: item.id
				})
				let index = this.scenarios.findIndex(x => x.id === item.id)
				this.scenarios.splice(index, 1)
			} catch (ex) {
				this.errorDialog = true
            	this.errorMsg = ex.response.data
			}

			this.tableLoading = false
			this.$store.dispatch('showSnackbar', { message: 'Le scénario a bien été supprimé' })
		},

		getActionText (value) {
			let index = this.actionItems.findIndex(x => x.value === value)
			return this.actionItems[index].text
		},

		getDayText (value) {
			let index = this.dayItems.findIndex(x => x.value === value)
			return this.dayItems[index].text
		},

		getReadableDate (value) {
			return this.$moment(value).format('ddd Do MMMM YYYY HH:mm')
		}
	}
}
</script>
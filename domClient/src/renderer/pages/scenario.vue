<template>
<div>
	<v-card class="elevation-1">
		<v-toolbar flat color="white">
			<v-toolbar-title>Scénarios</v-toolbar-title>
			
			<v-spacer></v-spacer>
			<v-btn fab dark small color="primary" @click="dialog = true">
				<v-icon dark>fas fa-plus</v-icon>
			</v-btn>
		</v-toolbar>

		<v-data-table :headers="headers" :items="scenarios" hide-actions>
			<template slot="items" slot-scope="props">
				<td>{{ props.item.name }}</td>
				<td>{{ props.item.action }}</td>
				<td>{{ props.item.execution_at }}</td>
				<td>{{ props.item.isRecurrent }}</td>
				<td>{{ props.item.day }}</td>
				<td>{{ props.item.time }}</td>
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
			<v-toolbar dark color="primary" class="mb-3">
				<v-btn icon dark @click="dialog = false">
					<v-icon>fas fa-times</v-icon>
				</v-btn>

				<v-toolbar-title>Création d'un scénario</v-toolbar-title>

				<v-spacer></v-spacer>

				<v-toolbar-items>
					<v-btn dark flat @click="dialog = false">
						<v-icon>fas fa-save</v-icon>
						Sauvegarder
					</v-btn>
				</v-toolbar-items>
			</v-toolbar>

			<v-form v-model="valid" lazy-validation class="pa-2">
				<v-layout>
					<v-flex xs12 md6 class="mr-2">
						<v-text-field v-model="scenarioCreation.name" label="Nom"></v-text-field>
					</v-flex>

					<v-flex xs12 md6>
						<v-select :value="scenarioCreation.action" :items="actionItems" label="Action" solo></v-select>
					</v-flex>
				</v-layout>

				<v-layout>
					<v-flex xs12 md12>
						<v-radio-group v-model="scenarioCreation.isRecurrent" row>
							<v-radio value="0" label="Action récurrente"></v-radio>
							<v-radio value="1" label="Action non récurrente"></v-radio>
						</v-radio-group>
					</v-flex>
				</v-layout>

				<v-layout>
					<v-flex xs12 md6 class="mr-2">
						
					</v-flex>

					<v-flex xs12 md6>
						<v-select :value="scenarioCreation.action" :items="actionItems" label="Action" solo></v-select>
					</v-flex>
				</v-layout>
			</v-form>
		</v-card>
	</v-dialog>
</div>
</template>

<script>
export default {
	name: 'page-scenario',

	data () {
		return {
			headers: [
				{ text: 'Nom', value: 'name' },
				{ text: 'Action', value: 'action' },
				{ text: 'Date d\'exécution', value: 'execution_at' },
				{ text: 'Récurrent', value: 'isRecurrent' },
				{ text: 'Jour', value: 'day' },
				{ text: 'Heure', value: 'time' },
			],
			scenarios: [],
			dialog: false,
			valid: false,
			actionItems: [
				'Allumer l\'éclairage intérieur',
				'Eteindre l\'éclairage intérieur',
				'Allumer l\'éclairage extérieur',
				'Eteindre l\'éclairage extérieur',
				'Activer l\'alarme',
				'Désactiver l\'alarme',
				'Allumer le chauffage',
				'Eteindre le chauffage'
			],
			scenarioCreation: {
				name: '',
				action: '',
				isRecurent: '',
				execution_at: '',
				day: '',
				time: ''
			}
		}
	}
}
</script>
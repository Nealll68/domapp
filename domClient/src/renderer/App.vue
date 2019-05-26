<template>
<div>
	<v-app>
		<alarm-alert />
		<system-bar />
		<snackbar />
		
		<v-content>			
			<v-container fluid>
				<router-view></router-view>
			</v-container>
		</v-content>	

	</v-app>
</div>
</template>

<script>
const SystemBar = () => import('@/components/SystemBar')
const AlarmAlert = () => import('@/components/AlarmAlert')
const Snackbar = () => import('@/components/Snackbar')

export default {
	name: 'dom_client',

	components: {
		SystemBar,
		AlarmAlert,
		Snackbar
	}
}
</script>

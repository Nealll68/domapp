<template>
	<div>
		<v-layout align-start justify-center row wrap fill-height>
			<temp-block></temp-block>

			<hum-block></hum-block>
			
			<lum-block></lum-block>

			<alarm-block></alarm-block>

			<light-block></light-block>
		</v-layout>

		<v-btn @click="testSnack()">Test snackbar</v-btn>
	</div>
</template>

<script>
const TempBlock = () => import('@/components/TempBlock')
const HumBlock = () => import('@/components/HumBlock')
const LumBlock = () => import('@/components/LumBlock')
const AlarmBlock = () => import('@/components/AlarmBlock')
const LightBlock = () => import('@/components/LightBlock')

export default {
	name: 'page-index',
	components: {
		TempBlock,
		HumBlock,
		LumBlock,
		AlarmBlock,
		LightBlock
	},

	methods: {
		testSnack () {
			this.$store.dispatch('showSnackbar', { message: 'my snackbar test' })
		}
	}
}
</script>

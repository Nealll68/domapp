'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.group(() => {
	Route.get('/', 'AlarmController.get')
	Route.get('/get-last', 'AlarmController.getLastAlert')
}).prefix('/api/alarms')

Route.group(() => {
	Route.get('/last', 'TempController.getLast')	
}).prefix('api/temperature')

Route.group(() => {
	Route.get('/last', 'HumController.getLast')
}).prefix('api/humidity')

Route.group(() => {
	Route.get('/last', 'LumController.getLast')
}).prefix('api/luminosity')

Route.group(() => {
	Route.get('/get-all-light-state', 'LightController.getLastAllLightState')
	Route.post('/set', 'LightController.setLightState')
}).prefix('api/light')

Route.group(() => {
	Route.get('/', 'SettingController.get')
	Route.post('/', 'SettingController.set')
}).prefix('api/setting')

Route.group(() => {
	Route.get('/all', 'ScenarioController.getAll')
	Route.post('/create', 'ScenarioController.create')
	Route.post('/delete', 'ScenarioController.delete')
}).prefix('/api/scenario')

Route.get('/video', async ({ request, response }) => {
	console.log('xxx')

	const fs = require('fs')
	const Helpers = use('Helpers')

	const path = Helpers.publicPath('sample.mp4')
	const stat = fs.statSync(path)
	const fileSize = stat.size
	const range = request.header('range')

	try {
	if (range) {
		const parts = range.replace(/bytes=/, "").split("-")
		const start = parseInt(parts[0], 10)
		const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
		const chunksize = (end - start) + 1
		const file = fs.createReadStream(path, { start, end })

		response.header('Content-Range', `bytes ${start}-${end}/${fileSize}`)
		response.header('Accept-Ranges', 'bytes')
		response.header('Content-Length', chunksize)
		response.header('Content-Type', 'video/mp4')
		response.partialContent()

		file.pipe(fs.createWriteStream(response.toString()))
	} else {
		response.header('Content-Length', fileSize)
		response.header('Content-Type', 'video/mp4')
		response.ok()

		fs.createReadStream(path).pipe(fs.createWriteStream(response.toString()))
	}
} catch (ex) {
	console.log(ex)
}
})
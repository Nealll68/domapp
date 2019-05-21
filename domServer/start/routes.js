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
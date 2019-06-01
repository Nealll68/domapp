<template>
<div>
    <v-navigation-drawer dark app fixed floating v-model="drawer" width="260" id="navbar">
        <v-toolbar flat>
            <v-toolbar-title>Domapp</v-toolbar-title>
        </v-toolbar>

        <v-divider dark></v-divider>

        <v-list>

            <v-list-tile to="/" ripple class="success ma-3">
                <v-list-tile-action>
                    <v-icon>fas fa-home</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>Accueil</v-list-tile-title>
            </v-list-tile>

            <v-list-tile v-for="link in links" :key="link.name" :to="link.url" ripple class="ma-3">
                <v-list-tile-action>
                    <v-icon>{{ link.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>{{ link.name }}</v-list-tile-title>
            </v-list-tile>

        </v-list>            
    </v-navigation-drawer>

    <v-toolbar app light fixed flat height="40" class="system-bar-drag">
            <v-toolbar-side-icon @click="drawer = !drawer" class="nodrag"></v-toolbar-side-icon>
            <v-toolbar-title class="nodrag">{{ this.$route.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn icon @click="minimizeApp" class="nodrag ma-0">
                    <v-icon class="system-bar-icon">fas fa-window-minimize</v-icon>
                </v-btn>
                <v-btn icon @click="sizeApp" class="nodrag ma-0">
                    <v-icon class="system-bar-icon">{{ sizeAppIcon }}</v-icon>
                </v-btn>
                <v-btn icon @click="closeApp" class="nodrag ma-0">
                    <v-icon class="system-bar-icon">fas fa-times</v-icon>
                </v-btn>
            </v-toolbar-items>
    </v-toolbar>
</div>
</template>

<script>
//const { remote } = require('electron')

export default {
    name: 'system-bar',

    data () {
        return {
            sizeAppIcon: '',
            drawer: true,
            links: [
                { url: '/alarm', name: 'Alarme', icon: 'fas fa-bell' },
                { url: '/light', name: 'Eclairage', icon: 'fas fa-lightbulb' },
                { url: '/heater', name: 'Chauffage', icon: 'fas fa-thermometer-full' },
                { url: '/statistics', name: 'Statistiques', icon: 'fas fa-chart-pie' },
                { url: '/scenario', name: 'Scénario', icon: 'fas fa-calendar' },
                { url: '/video', name: 'Vidéo', icon:'fas fa-video' }
            ]
        }
    },

    mounted () {
        this.sizeAppIcon = this.$electron.remote.getCurrentWindow().isMaximized() ? 'fas fa-window-restore' : 'fas fa-window-maximize'
    },

    methods: {
        closeApp () {
            this.$electron.remote.getCurrentWindow().close()
        },

        sizeApp () {
            if (this.$electron.remote.getCurrentWindow().isMaximized()) {                
                this.$electron.remote.getCurrentWindow().restore()
                this.sizeAppIcon = 'fas fa-window-maximize'
            } else {
                this.$electron.remote.getCurrentWindow().maximize()
                this.sizeAppIcon = 'fas fa-window-restore'
            }            
        },

        minimizeApp () {
            this.$electron.remote.getCurrentWindow().minimize()
        }
    }
}
</script>
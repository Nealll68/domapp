<template>
    <div>
        <error-dialog :show="errorDialog" :error="errorMsg"></error-dialog>	

        <v-layout align-center column fill-height>
            <v-flex>                
                <v-card width="700" class="mt-3">
                    <v-card-title class="pb-2">
                        <h3 class="headline">Vidéos enregistrées</h3>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-card-text class="py-0">
                        <v-container fluid grid-list-md>
                            <v-layout row wrap>
                                <v-flex v-for="video in videos" :key="video.id">
                                    <h1 class="subheading mb-0">
                                        {{ video.name }} - 
                                        <i class="grey--text text--darken-1">{{ video.created_at | moment('DD/MM/YYYY HH:mm') }}</i>
                                    </h1>
                                    <video width="320" height="240" controls class="mb-2">
                                        <source :src="video.path" type="video/mp4">
                                    </video>
                                    <v-divider></v-divider>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
const util = require('util')
const fs = require('fs')

const readdir = util.promisify(fs.readdir)
const stat = util.promisify(fs.stat)

export default {
    name: 'page-video',

    data () {
        return {
            errorDialog: false,
            errorMsg: '',
            videos: []
        }
    },

    async mounted () {
        try {
            const path = 'C:\\raspi'//`${this.$electron.remote.app.getPath('documents')}\\Pi` 
            const files = await readdir(path)
            for (let i = 0; i < files.length; i++) {
                let fileStat = await stat(`${path}\\${files[i]}`)
                this.videos.push({
                    id: i,
                    name: files[i],
                    path: `${path}\\${files[i]}`,
                    created_at: fileStat.birthtime
                })
            }
            this.videos.reverse()
        } catch (ex) {
            this.errorDialog = true
            this.errorMsg = ex
        }
    }
}
</script>

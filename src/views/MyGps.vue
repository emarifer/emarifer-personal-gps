<template>
    <div>

        <!-- Modals -->
        <transition name="fade">
            <div class="modal-overlay" v-if="showInfo || showRemoveCache"></div>
        </transition>

        <transition name="fade">
            <info-modal
                v-if="showInfo"
                v-on:close_info="onCloseInfo"
                :gpxLoaded="gpxLoaded" :name="name"
                :distance="distance"
                :maxElevation="maxElevation"
                :time="time" />            
        </transition>

        <transition name="fade">
            <remove-cache-modal
                v-if="showRemoveCache"
                v-on:close_remove_cache="onCloseRemoveCache"
                v-on:remove_cache="removeCache" />            
        </transition>

        <!-- Snackbar: Update Notice -->
        <transition name="fade">
            <snackbar v-on:close_snackbar="onCloseSnackbar" v-if="updateExists" />           
        </transition>

        <!-- Title -->
        <section class="title">
            <h1>Mi GPS Personal</h1>
        </section>

        <!-- Map -->
        <section id="map"></section>

        <!-- Input Trak -->
        <section class="card">
            <label class="custom-label" for="input-track">
                <paperclip-icon :size="30" fillColor="#fff" />
                Seleccionar Track…
            </label>
            <input ref="fileuploader" type="file" accept="application/gpx+xml" @click="resetFileUploader"
                @change="openFile" id="input-track">
            <delete-icon class="btn" @click="removeTrack" :size="30" fillColor="#fff" title="Eliminar Track" />
        </section>

        <!-- Buttons -->
        <section class="card">
            <button class="btn-info" @click="showInfo = true">
                <information-icon :size="30" fillColor="#fff" title="Información del Track" />
            </button>
            <button :class="btnNavigation" @click="checkLocation">
                <map-marker-radius-icon :size="30" fillColor="#fff" title="Iniciar GPS" />
            </button>
            <button class="btn-remove" @click="showRemoveCache = true">
                <map-icon :size="30" fillColor="#fff" title="Eliminar Caché de Mapas" />
            </button>
        </section>
    </div>
</template>

<script>
    import update from '@/mixins/update';
    import handlers from '@/mixins/handlers';
    import PaperclipIcon from 'vue-material-design-icons/Paperclip.vue';
    import DeleteIcon from 'vue-material-design-icons/Delete.vue';
    import InformationIcon from 'vue-material-design-icons/Information.vue';
    import MapMarkerRadiusIcon from 'vue-material-design-icons/MapMarkerRadius.vue';
    import MapIcon from 'vue-material-design-icons/Map.vue';
    import InfoModal from '@/components/modals/InfoModal';
    import RemoveCacheModal from '@/components/modals/RemoveCacheModal';
    import Snackbar from '@/components/snackbar/Snackbar';

    export default {
        name: 'MyGps',
        components: {
            PaperclipIcon,
            DeleteIcon,
            InformationIcon,
            MapMarkerRadiusIcon,
            MapIcon,
            InfoModal,
            RemoveCacheModal,
            Snackbar,
        },
        data() {
            return {
                map: null,
                gpxLoaded: null,
                name: '',
                distance: '',
                maxElevation: '',
                time: '',
                btnNavigation: 'btn-navigation',
                locationActive: false,
                marker: null,
                circles: null,
                showInfo: false,
                showRemoveCache: false,
            }
        },
        mixins: [update, handlers],
        mounted() {
            this.resetMarkerIcon();

            this.initMap();

            // Redraw the track if it exists in LocalStorage when starting the app
            const data = window.localStorage.getItem('gpx');
            if (data && data.length !== 0) {
                this.displayTrack(data);
            }
        },
        methods: {
            onCloseInfo() {
                this.showInfo = false;
            },
            onCloseRemoveCache() {
                this.showRemoveCache = false;
            },
            removeCache() {
                this.removeCacheMap();
            },
            onCloseSnackbar() {
                this.refreshApp();
            },
        },
    }
</script>

<style src="./styles.scss" scoped lang="scss" />

/** 
    ORGANIZACION DE CSS/SCSS CON SASS EN PARCIALES EN VUEJS. VER:
    https://youtu.be/rOIyMW-bsxE
*/
<template>
  <div id="app">

    <!-- Modals -->
    <transition name="fade">
      <div class="modal-overlay" v-if="showInfo || showRemoveCache"></div>
    </transition>

    <transition name="fade">
      <info-modal
        v-if="showInfo"
        v-on:close_info="onCloseInfo"
        :gpxLoaded="gpxLoaded"
        :name="name"
        :distance="distance"
        :maxElevation="maxElevation"
        :time="time" />
      <!-- <div class="modal" v-if="showInfo">
        <div class="modal-title">
          <information-icon :size="24" fillColor="#fff" />
          <h4>Track Info</h4>
        </div>
        <div class="modal-content">
          <ul v-if="gpxLoaded">
            <li><strong>Nombre: </strong>{{ name }}</li>
            <li><strong>Distancia: </strong>{{ distance }}</li>
            <li><strong>Máxima elevación: </strong>{{ maxElevation }}</li>
            <li><strong>Duración: </strong>{{ time }}</li>
          </ul>
          <p v-else><strong>No hay Track cargado!! 🙁</strong></p>
        </div>
        <hr>
        <div class="modal-action">
          <close-box-icon class="btn" :size="30" @click="showInfo = false" fillColor="#6E6E6E" />
        </div>
      </div> -->
    </transition>

    <transition name="fade">
      <remove-cache-modal
        v-if="showRemoveCache"
        v-on:close_remove_cache="onCloseRemoveCache"
        v-on:remove_cache="removeCache" />
      <!-- <div class="modal" v-if="showRemoveCache">
        <div class="modal-title">
          <map-icon :size="24" fillColor="#fff" />
          <h4>Borrar Caché de Mapas?</h4>
        </div>
        <div class="modal-content">
          <p><strong>Sin Internet no podrás ver mapas!! 🙁</strong></p>
        </div>
        <hr>
        <div class="modal-actions">
          <delete-circle-icon class="btn" :size="30" @click="removeCacheMap" fillColor="#E91E63" />
          <close-box-icon class="btn" :size="30" @click="showRemoveCache = false" fillColor="#6E6E6E" />
        </div>
      </div> -->
    </transition>

    <!-- Snackbar: Update Notice -->
    <transition name="fade">
      <snackbar v-on:close_snackbar="onCloseSnackbar" v-if="updateExists" />
      <!-- <div class="snackbar" v-if="updateExists">
        <p><strong>Actualización disponible!!</strong> 😀</p>
        <button class="btn" @click="refreshApp">
          <img src="gif/icons8-refresh.gif" width="22" height="22" alt="Refresh">
        </button>
      </div> -->
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
      <input ref="fileuploader" type="file" accept="application/gpx+xml" @click="resetFileUploader" @change="openFile" id="input-track">
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
  import DeleteCircleIcon from 'vue-material-design-icons/DeleteCircle.vue';
  import InfoModal from '@/components/InfoModal';
  import RemoveCacheModal from '@/components/RemoveCacheModal';
  import Snackbar from '@/components/Snackbar';
  // import CloseBoxIcon from 'vue-material-design-icons/CloseBox.vue';

  export default {
    name: 'App',
    components: {
      PaperclipIcon,
      DeleteIcon,
      InformationIcon,
      MapMarkerRadiusIcon,
      MapIcon,
      DeleteCircleIcon,
      InfoModal,
      RemoveCacheModal,
      Snackbar,
      // CloseBoxIcon,
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

<style lang="scss">       

  @media screen and (min-height: 700px) {
    #map {
        height: 70vh; 
    }
  }

  @media screen and (min-width: 450px) {
    .snackbar {
      width: 375px;
      transform: translate(0%);
      left: calc(100vw - 375px - .5rem);
    }
  }

  @media screen and (min-width: 700px) {
    #map, .card {
      width: calc(100% - (2 * (0.1 * 100%)));
      margin-left: calc(0.1 * 100%);
      margin-right: calc(0.1 * 100%);
    }     
  }
  /* SOBRE EL USO DE CALC: https://stackoverflow.com/questions/27597034/calc-function-inside-another-calc-in-css */
</style>

<!-- 
  THE FLEXBOX GUIDE. VER:
  https://mayusculasminusculas.com/

  VUE MATERIAL DESIGN ICON COMPONENTS. VER:
  https://www.npmjs.com/package/vue-material-design-icons
  https://stackoverflow.com/questions/51792391/vue-cli-3-material-design-icons-installation#51794206

  BOX-SIZING: BORDER-BOX. VER:
  https://midu.dev/que-es-y-para-que-sirve-box-sizing-border-box/
 -->

<!-- 
  LEER FICHERO DESDE EL INPUT EN VUEJS. VER:
  https://stackoverflow.com/questions/54124977/vuejs-input-file-selection-event-not-firing-upon-selecting-the-same-file#54125788
 -->

<!-- 
  CARGAR FICHERO SIN SUBIR AL SEVIDOR. VER:
  https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file#29176118
  INTRODUCTION TO THE CACHE STORAGE (A NEW BROWSER CACHE) PWA API. VER:
  https://blog.bitsrc.io/introduction-to-the-cache-storage-a-new-browser-cache-pwa-api-a5d7426a2456
 -->

<!-- 
  DAR ESTILO A IN INPUT TYPE=FILE. VER:
  https://stackoverflow.com/questions/5813344/how-to-customize-input-type-file#5813384
 -->
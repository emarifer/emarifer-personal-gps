<template>
  <div id="app">
    <my-gps />
  </div>
</template>

<script>
  import MyGps from '@/views/MyGps';

  export default {
    name: 'App',
    components: {
      MyGps,
    }
  }
</script>

<style>
  /* Resets & Settings */

  @font-face {
    font-family: 'Jojoba';
    src: url(./assets/fonts/jojoba.woff);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    font-family: sans-serif;
  }

  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #1D2125;
  }

  h1 {
    display: inline;
    padding: 0 1rem;
    padding-top: .6rem;
    padding-bottom: .3rem;
    border: 1px solid goldenrod;
    border-radius: 5px;
  }

  section {
    margin: .75rem 0;
  }
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
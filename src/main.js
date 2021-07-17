import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import 'leaflet/dist/leaflet.css';
// import 'vue-material-design-icons/styles.css'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');


import L from 'leaflet';
import { Icon } from 'leaflet';
import '../../node_modules/leaflet-gpx/gpx.js';
import mapLayers from './mapLayers.js';

export default {
    mixins: [mapLayers],
    methods: {
        resetMarkerIcon() {
            delete Icon.Default.prototype._getIconUrl;
            Icon.Default.mergeOptions({
                iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
                iconUrl: require('leaflet/dist/images/marker-icon.png'),
                shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
            });
        },
        initMap() {

            const baseMaps = {
                "Spain Mapa Raster IGN": this.Spain_MapasrasterIGN,
                "Spain PNOA Ortoimagen": this.Spain_PNOA_Ortoimagen,
                "Open Street Map": this.OpenStreetMap,
                "Open Topo Map": this.OpenTopoMap,
            };

            this.map = L.map('map', {
                layers: [
                    this.Spain_MapasrasterIGN,
                ]
            }).fitBounds([[24.9300000311, -19.6], [46.0700000311, 5.6]]);
            L.control.layers(baseMaps).addTo(this.map);
            L.control.scale({ options: { position: 'bottomleft', metric: true } }).addTo(this.map);
        },
        resetFileUploader() {
            this.$refs.fileuploader.value = '';
        },
        openFile(e) {

            this.removeTrack();
            const input = e.target;
            const reader = new FileReader();
            reader.onload = () => {
                const data = reader.result;
                this.displayTrack(data);
            };
            reader.readAsText(input.files[0]);
        },
        displayTrack(data) {
            this.gpxLoaded = new L.GPX(data, {
                async: true,
                marker_options: {
                    wptIconUrls: {
                        '': 'markers/pin-icon-wpt.png',
                    },
                    startIconUrl: 'markers/pin-icon-start.png',
                    endIconUrl: 'markers/pin-icon-end.png',
                    shadowUrl: 'markers/pin-shadow.png'
                }
            }).on('loaded', (e) => {
                const gpx = e.target;
                this.name = `${gpx.get_name()}`;
                this.distance = `${Math.round((gpx.get_distance() / 1000) * 100) / 100} km`;
                this.maxElevation = `${Math.round(gpx.get_elevation_max() * 100) / 100} m`;
                const hours = Math.round((gpx.get_total_time() / 3600000) * 100) / 100;
                const minutes = Math.ceil((hours - Math.floor(hours)) * 60);
                this.time = `${Math.floor(hours)} horas y ${minutes} minutos`;

                this.map.fitBounds(gpx.getBounds());
            }).addTo(this.map);

            window.localStorage.setItem('gpx', data);
        },
        removeTrack() {
            if (this.gpxLoaded && this.map.hasLayer(this.gpxLoaded)) {
                this.map.removeLayer(this.gpxLoaded);
                this.gpxLoaded = null;
            }

            this.name = '';
            this.distance = '';
            this.maxElevation = '';
            this.time = '';
            window.localStorage.removeItem('gpx');
        },
        checkLocation() {
            if (!this.locationActive) {
                this.locationActive = true;
                this.btnNavigation = 'btn--nonavigation';
                this.initializeLocator();
            } else {
                this.locationActive = false;
                this.btnNavigation = 'btn--navigation';
                this.map.stopLocate();
                if (this.map.hasLayer(this.circles) && this.map.hasLayer(this.marker)) {
                    this.map.removeLayer(this.circles);
                    this.map.removeLayer(this.marker);
                }
            }
        },
        onLocationFound(e) {

            let radius = e.accuracy / 2;
            if (this.map.hasLayer(this.circles) && this.map.hasLayer(this.marker)) {
                this.map.removeLayer(this.circles);
                this.map.removeLayer(this.marker);
            }

            this.marker = new L.Marker(e.latlng, { draggable: true });
            this.circles = new L.circle(e.latlng, radius);
            this.circles
                .bindPopup(`Estás a menos de ${radius} metros de este punto`)
                .openPopup();

            this.map.addLayer(this.marker);
            this.map.addLayer(this.circles);
        },
        initializeLocator() {
            this.map.locate({
                // setView: true,
                // maxZoom: 16,
                watch: true,
                timeout: 5000
            });

            this.map.on('locationfound', this.onLocationFound);
        },
        removeCacheMap() {

            this.showRemoveCache = false;
            
            if ('caches' in window) {
                caches.delete('cache-map')
                    .then((bool) => {
                        console.log(bool, 'clear cache-map operation') // true
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
    },
}
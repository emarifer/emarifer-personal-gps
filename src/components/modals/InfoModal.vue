<template>
    <div class="modal">
        <div class="modal__title">
          <information-icon :size="24" fillColor="#fff" />
          <h4>Track Info</h4>
        </div>
        <div class="modal__content">
          <ul v-if="gpxLoaded">
            <li><strong>Nombre: </strong>{{ name }}</li>
            <li><strong>Distancia: </strong>{{ distance }}</li>
            <li><strong>Máxima elevación: </strong>{{ maxElevation }}</li>
            <li><strong>Duración: </strong>{{ time }}</li>
          </ul>
          <p v-else><strong>No hay Track cargado!! 🙁</strong></p>
        </div>
        <hr>
        <div class="modal__actions">
          <close-box-icon class="btn" :size="30" @click="closeInfo" fillColor="#6E6E6E" />
        </div>
    </div>
</template>

<script>
    import InformationIcon from 'vue-material-design-icons/Information.vue';
    import CloseBoxIcon from 'vue-material-design-icons/CloseBox.vue';

    export default {
        name: 'InfoModal',
        components: {
            InformationIcon,
            CloseBoxIcon,
        },
        props: {
            gpxLoaded: {},
            name: {
                type: String,
            },
            distance: {
                type: String,
            },
            maxElevation: {
                type: String,
            },
            time: {
                type: String,
            }
        },
        methods: {
            closeInfo() {
                this.$emit('close_info');
            },
        },
    }
</script>

<style src="./styles.scss" scoped lang="scss" />
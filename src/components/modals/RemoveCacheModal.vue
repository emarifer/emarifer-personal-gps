<template>
    <div class="modal">
        <div class="modal-title">
          <map-icon :size="24" fillColor="#fff" />
          <h4>Borrar Caché de Mapas?</h4>
        </div>
        <div class="modal-content">
          <p><strong>Sin Internet no podrás ver mapas!! 🙁</strong></p>
        </div>
        <hr>
        <div class="modal-actions">
          <delete-circle-icon class="btn" :size="30" @click="removeCache" fillColor="#E91E63" />
          <close-box-icon class="btn" :size="30" @click="closeRemoveCache" fillColor="#6E6E6E" />
        </div>
    </div>
</template>

<script>
    import MapIcon from 'vue-material-design-icons/Map.vue';
    import DeleteCircleIcon from 'vue-material-design-icons/DeleteCircle.vue';
    import CloseBoxIcon from 'vue-material-design-icons/CloseBox.vue';

    export default {
        name: 'RemoveCacheModal',
        components: {
            MapIcon,
            DeleteCircleIcon,
            CloseBoxIcon
        },
        methods: {
            removeCache() {
                this.$emit('remove_cache');
            },
            closeRemoveCache() {
                this.$emit('close_remove_cache');
            },
        },
    }

</script>

<style src="./styles.scss" scoped lang="scss" />
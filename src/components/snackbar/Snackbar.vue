<template>
    <div class="snackbar">
        <p><strong>Actualización disponible!!</strong> 😀</p>
        <button class="btn" @click="closeSnackbar">
          <img src="../../assets/gif/icons8-refresh.gif" width="22" height="22" alt="Refresh">
        </button>
    </div>
</template>

<script>
    export default {
        name: 'Snackbar',
        methods: {
            closeSnackbar() {
                this.$emit('close_snackbar');
            },
        },
    }
</script>

<style src="./styles.scss" scoped lang="scss" />
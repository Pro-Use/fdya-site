<template>
    <canvas ref="canvas"> </canvas>
</template>

<style>

    canvas{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000000;
    }

</style>

<script>
export default {
  name: 'MyCanvas',
  mounted() {
    const canvas = this.$refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let x = (canvas.width) / 2;
    let y = (canvas.height) / 2;

    ctx.fillStyle = 'rgba(0, 250, 0)';
    ctx.fillRect(x, y, x, y);

  }
}
</script>

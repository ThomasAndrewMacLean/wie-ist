<template>
  <div class="home">
    <h1>Create a new game</h1>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style scoped>
.home {
  background: -webkit-image-set(
    url("../assets/camera-small.jpg") 1x,
    url("../assets/camera-medium.jpg") 2x
  );
  height: calc(100vh - 116px);
  display: flex;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
  text-shadow: 0px 3px 7px #000000aa;
}
</style>

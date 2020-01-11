<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style scoped>
.about {
  background: -webkit-image-set(
    url("../assets/polaroids-small.jpg") 1x,
    url("../assets/polaroids-medium.jpg") 2x
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

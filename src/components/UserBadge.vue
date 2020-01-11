<template>
  <div v-if="userName" class="userBadge">
    <span>
      {{ userName }}
    </span>
    <img :src="userPicture" />
  </div>
</template>

<script>
export default {
  props: ["userName", "userPicture"]
};
</script>

<style scoped>
span {
  padding: 0px 10px 0 20px;
}
img {
  height: 40px;
}
.userBadge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: gainsboro;
  border-radius: 50px;
  overflow: hidden;
}
@media only screen and (max-width: 600px) {
  span {
    font-size: 12px;
  }
}
</style>

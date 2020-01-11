<template>
  <div class="play">
    <h2>Play {{ $route.params.roomid }}</h2>
    <img v-if="uploadedPic" :src="uploadedPic" alt="" />

    <form action="" @submit.prevent="uploadPic">
      <label v-if="!uploadedPic" for="uploadPic">Take Picture</label>
      <input
        @change="previewFiles"
        ref="myFiles"
        type="file"
        name="uploadPic"
        id="uploadPic"
      />
      <input
        id="submit-btn"
        v-if="uploadedPic"
        type="submit"
        value="Save Picture"
      />
    </form>
    <br />
  </div>
</template>

<script>
const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export default {
  data() {
    return {
      files: [],
      uploadedPic: ""
    };
  },
  methods: {
    async uploadPic() {
      if (this.uploadedPic) {
        const rawResponse = await fetch(
          "https://us-central1-wie-is-het-264722.cloudfunctions.net/savePicToBucket",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ pic: this.uploadedPic })
          }
        );
        const content = await rawResponse.json();

        console.log(content);
      }
    },
    async previewFiles() {
      this.files = this.$refs.myFiles.files;
      this.uploadedPic = await toBase64(this.files[0]);
    }
  }
};
</script>

<style scoped>
h2 {
  text-shadow: 0px 3px 7px #000000aa;
}
#uploadPic {
  display: none;
}
.play {
  background: -webkit-image-set(
    url("../assets/kodak-small.jpg") 1x,
    url("../assets/kodak-medium.jpg") 2x
  );
  height: calc(100vh - 116px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
}

label {
  background: #d47b22;
  padding: 1rem;
  border-radius: 2rem;
  cursor: pointer;
}
#submit-btn {
  background: #d47b22;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  padding: 1rem;
  border-radius: 2rem;
  cursor: pointer;
}
img {
  padding: 1rem;
  border-bottom: 4rem solid ghostwhite;
  background: whitesmoke;
  box-shadow: 0px 0px 6px 0px #00000045;
}
</style>

<template>
  <div class="border">
    <canvas width="250" height="250" ref="canvas"></canvas>

    <div ref="black" class="black"></div>
    <p class="marker">{{ userName }}</p>
  </div>
</template>

<script>
import { getOrientation } from "../utils/getOrientation";

export default {
  props: ["picFile", "userName", "uploadedPic", "roomId"],
  data: function() {
    return {
      saving: false,
      saved: false
    };
  },
  mounted() {
    if (this.uploadedPic) {
      var canvas = this.$refs.canvas;

      canvas.style.filter = "grayscale(0)";
      this.$refs.black.style.opacity = 0;
      var ctx = canvas.getContext("2d");

      var image = new Image();
      image.onload = function() {
        ctx.drawImage(image, 0, 0);
      };
      image.src = this.uploadedPic;
    }
  },
  watch: {
    picFile: function(file) {
      if (!file) return;
      var canvas = this.$refs.canvas;
      canvas.style.filter = "grayscale(0)";
      this.$refs.black.style.opacity = 0;

      canvas.height = 250;
      canvas.width = 250;

      getOrientation(file, orientation => {
        var ctx = canvas.getContext("2d");

        var img = new Image();
        if (file.type.match("image.*")) {
          img.onload = function() {
            var hRatio = canvas.width / img.width;
            var vRatio = canvas.height / img.height;
            // set to max so we can have a square pic
            var ratio = Math.max(hRatio, vRatio);
            canvas.height = img.height * ratio;
            canvas.width = img.width * ratio;

            var width = canvas.width;
            var styleWidth = canvas.style.width;
            var height = canvas.height;
            var styleHeight = canvas.style.height;

            if (orientation > 4) {
              canvas.width = height;
              canvas.style.width = styleHeight;
              canvas.height = width;
              canvas.style.height = styleWidth;
            }

            // set canvas to be square
            var smallest = Math.min(canvas.width, canvas.height);
            width = smallest;
            height = smallest;
            canvas.width = smallest;
            canvas.style.width = smallest;
            canvas.height = smallest;
            canvas.style.height = smallest;

            switch (orientation) {
              case 2:
                ctx.translate(width, 0);
                ctx.scale(-1, 1);
                break;
              case 3:
                ctx.translate(width, height);
                ctx.rotate(Math.PI);
                break;
              case 4:
                ctx.translate(0, height);
                ctx.scale(1, -1);
                break;
              case 5:
                ctx.rotate(0.5 * Math.PI);
                ctx.scale(1, -1);
                break;
              case 6:
                ctx.rotate(0.5 * Math.PI);
                ctx.translate(0, -height);
                break;
              case 7:
                ctx.rotate(0.5 * Math.PI);
                ctx.translate(width, -height);
                ctx.scale(-1, 1);
                break;
              case 8:
                ctx.rotate(-0.5 * Math.PI);
                ctx.translate(-width, 0);
                break;
              default:
                break;
            }

            ctx.drawImage(
              img,
              0,
              0,
              img.width,
              img.height,
              0,
              0,
              img.width * ratio,
              img.height * ratio
            );
          };

          img.src = URL.createObjectURL(file);
        }
      });
    }
  },
  methods: {
    reset() {
      this.$refs.black.style.opacity = 1;
    },
    async savePolaroid() {
      if (this.saving) return;
      this.saving = true;
      let pic = this.$refs.canvas.toDataURL();
      this.$store.dispatch("setUploadPic", {
        uploadPic: pic
      });
      const rawResponse = await fetch(
        "https://us-central1-wie-is-het-264722.cloudfunctions.net/savePicToBucket",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            roomId: this.roomId,
            token: sessionStorage.getItem("token"),
            pic
          })
        }
      );
      const content = await rawResponse.json();
      this.saved = true;
      this.$store.dispatch("pictureSaved", true);
      console.log(content);
    }
  }
};
</script>

<style scoped>
.border {
  padding: 1rem;
  border-bottom: 4rem solid #eff0ef;
  background: whitesmoke;
  box-shadow: 0px 0px 6px 0px #00000045;
  position: relative;
}

.black {
  background: black;
  position: absolute;
  height: calc(100% - 2rem);
  width: calc(100% - 2rem);
  opacity: 1;
  transform: translateY(-100%);
  transition: opacity 1s ease-in;
}

canvas {
  display: block;
  filter: grayscale(1);
  transition: filter 1.7s ease-in;
}

.marker {
  position: absolute;
  color: #312f2f;
  font-size: 20px;
  line-height: 4rem;
  margin: 1rem auto;
  width: 250px;
}
</style>

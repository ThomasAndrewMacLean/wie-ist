<template>
  <div class="border">
    <canvas width="300" height="300" ref="canvas"></canvas>
    <div ref="black" class="black"></div>
  </div>
</template>

<script>
import { getOrientation } from "../utils/getOrientation";

export default {
  props: ["picFile"],
  watch: {
    picFile: function(file) {
      var canvas = this.$refs.canvas;
      this.$refs.black.style.opacity = 0;

      canvas.height = 300;
      canvas.width = 300;

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
  filter: grayscale(1);
}
</style>

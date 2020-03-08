<template>
  <div class="play">
    <h2>Guess {{ $route.params.roomid }}</h2>
    <ul>
      <li v-for="photo in photos" :key="photo">
        <Polaroid
          ref="polaroid"
          :uploadedPic="photo"
          :userName="userName"
          :roomId="$route.params.roomid"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Polaroid from "../components/Polaroid";

// const toBase64 = file =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });

export default {
  data() {
    return {
      photos: [
        "https://res.cloudinary.com/dve97xbxj/image/upload/v1582992135/uyp8wodfkncardomvv3h.png",
        "https://res.cloudinary.com/dve97xbxj/image/upload/v1582992181/daopftbxufq1ssaf8yyl.png",
        "https://res.cloudinary.com/dve97xbxj/image/upload/v1582993149/rb20e32eniwxcnc7ewmy.png",
        "https://res.cloudinary.com/dve97xbxj/image/upload/v1582991726/jfxcfouzscj7yoqh5gza.png",
        "https://res.cloudinary.com/dve97xbxj/image/upload/v1582990952/izeeivgfoqjpm5owbcd1.png",
        "https://res.cloudinary.com/dve97xbxj/image/upload/v1579288029/xbgzpcpekgced8vjqueh.png"
      ],
      players: ["thomas", "ann", "jeff", "felix", "otto", "jan"]
    };
  },
  computed: {},
  components: {
    Polaroid
  },
  methods: {}
};
</script>

<style scoped>
h2 {
  text-shadow: 0px 3px 7px #000000aa;
}
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  padding-bottom: 30px;
}

.play {
  overflow: scroll;
  background: -webkit-image-set(
    url("../assets/kodak-small.jpg") 1x,
    url("../assets/kodak-medium.jpg") 2x
  );
  height: calc(100vh - 116px);
  display: flex;
  background-color: #dbdbd8;
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
  border: 3px solid white;
}

#submit-btn {
  background: #d47b22;
  font-size: inherit;
  font-family: inherit;
  border: 3px solid white;

  color: inherit;
  padding: 1rem;
  border-radius: 2rem;
  cursor: pointer;
}

.reset {
  margin-right: 20px;
  border: none;
  background: none;
  text-decoration: underline;
  font-size: 1rem;
  cursor: pointer;
}

img {
  padding: 1rem;
  border-bottom: 4rem solid ghostwhite;
  background: whitesmoke;
  box-shadow: 0px 0px 6px 0px #00000045;
}

form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.thanks {
  background: #2c3e50;
  padding: 1rem;
  border-radius: 70px;
  border: 2px solid;
}
</style>

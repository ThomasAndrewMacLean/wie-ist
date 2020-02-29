<template>
    <div class="play">
        <h2>Play {{ $route.params.roomid }}</h2>
        <Polaroid ref="polaroid" :uploadedPic="uploadedPic" :userName="userName" :picFile="this.files[0]" />

        <form v-if="!pictureSaved" action @submit.prevent="uploadPic">
            <label v-if="!showReset" @click="reset" for="uploadPic">Take Picture</label>
            <input @change="previewFiles" accept="image/*" ref="myFiles" type="file" name="uploadPic" id="uploadPic" />
            <input class="buttons reset" @click="reset" id="reset-btn" v-if="showReset" type="button" value="Hmmm, ... no" />

            <input class="buttons" id="submit-btn" v-if="showReset" type="submit" value="Save Picture" />
        </form>
        <div class="thanks" v-if="pictureSaved">
            Thanks, pictures is saved! 📸
        </div>
        <br />
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
                files: [],
                showReset: false
            };
        },
        computed: {
            uploadedPic() {
                return this.$store.getters.uploadPic;
            },
            userName() {
                return this.$store.getters.userName;
            },
            pictureSaved() {
                return this.$store.getters.pictureSaved;
            }
        },
        components: {
            Polaroid
        },
        methods: {
            reset() {
                // set black background on polaroid and empty input file
                this.$refs.polaroid.reset();
                this.$refs.myFiles.value = "";
                this.showReset = false;
            },

            async uploadPic() {
                this.$refs.polaroid.savePolaroid();

                // if (this.uploadedPic) {
                //   const rawResponse = await fetch(
                //     "https://us-central1-wie-is-het-264722.cloudfunctions.net/savePicToBucket",
                //     {
                //       method: "POST",
                //       headers: {
                //         Accept: "application/json",
                //         "Content-Type": "application/json"
                //       },
                //       body: JSON.stringify({ pic: this.uploadedPic })
                //     }
                //   );
                //   const content = await rawResponse.json();

                //   console.log(content);
                // }
            },
            async previewFiles() {
                this.files = this.$refs.myFiles.files;
                this.showReset = true;
                //   let base64UploadedPic = await toBase64(this.files[0]);
                //   this.$store.dispatch("setUploadPic", {
                //     uploadPic: base64UploadedPic
                //   });
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
        background: -webkit-image-set(url("../assets/kodak-small.jpg") 1x,
                url("../assets/kodak-medium.jpg") 2x);
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
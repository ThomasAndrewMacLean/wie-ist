<template>
  <div class="login">
    <h2>Login {{ name }}</h2>
    <GoogleLogin
      class="google-login"
      :params="params"
      :renderParams="renderParams"
      :onSuccess="onSuccess"
      :onFailure="onFailure"
      >Login</GoogleLogin
    >
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";

export default {
  name: "Login",
  data() {
    return {
      params: {
        client_id:
          "994356706051-p3iqsjg4p12001c50cdecp335ccs82dn.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    };
  },
  computed: {
    name() {
      return this.$store.getters.userName;
    }
  },
  methods: {
    onSuccess(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;

      fetch(
        "https://europe-west1-wie-is-het-264722.cloudfunctions.net/getPayloadFromJWT",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({ token: id_token })
        }
      )
        .then(x => x.json())
        .then(y => console.log(y));

      sessionStorage.setItem("token", id_token);

      const profile = googleUser.getBasicProfile();

      this.$store.dispatch("setUser", {
        userName: profile.getName(),
        userPicture: profile.getImageUrl()
      });

      this.$router.push(
        sessionStorage.getItem("setNavigateToAfterSignin") || "/"
      );
    },
    onFailure(err) {
      console.log(err);
    }
  },
  components: {
    GoogleLogin
  }
};
</script>

<style scoped>
h2 {
  text-shadow: 0px 3px 7px #000000aa;
}
.login {
  background: -webkit-image-set(
    url("../assets/polaroids2-small.jpg") 1x,
    url("../assets/polaroids2-medium.jpg") 2x
  );
  background-color: #cfad93;
  height: calc(100vh - 116px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
}
</style>

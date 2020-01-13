<template>
  <div class="home">
    <h1>Create a new game</h1>
    <form @submit.prevent="createGame" action>
      <label for="assignment">Assignment</label>
      <input v-model="assignment" type="text" name="assignment" id="assignment" required />
      <label for="emails">Emails</label>
      <textarea v-model="emails" name="emails" id="emails" cols="30" rows="5" required></textarea>
      <input type="submit" value="ok" />
    </form>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      assignment: "",
      emails: ""
    };
  },
  methods: {
    async createGame() {
      const rawResponse = await fetch(
        "https://us-central1-wie-is-het-264722.cloudfunctions.net/database",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            assignment: this.assignment,
            emails: this.emails
          })
        }
      );
      const content = await rawResponse.json();

      console.log(content);
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 400px;
  margin: 0 auto;
}
.home {
  background: -webkit-image-set(
    url("../assets/camera-small.jpg") 1x,
    url("../assets/camera-medium.jpg") 2x
  );
  background-color: #de832abf;

  height: calc(100vh - 116px);
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
  text-shadow: 0px 3px 7px #000000aa;
}

input[type="text"] {
  background: #d47b22;
  font-size: inherit;
  font-family: inherit;
  color: #666;
  border: none;
  padding: 1rem;
  border-radius: 2rem;
  cursor: pointer;
}

input[type="submit"] {
  background: #d47b22;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  /* border: none; */
  border: 3px solid white;
  padding: 1rem;
  border-radius: 2rem;
  cursor: pointer;
}
textarea,
input[type="text"] {
  background: rgba(256, 256, 256, 0.9);
  border: none;
  line-height: 20px;
  font-size: inherit;
  font-family: inherit;
  margin-bottom: 2rem;
}

textarea {
  border-radius: 2rem;
  padding: 1rem;
}
</style>

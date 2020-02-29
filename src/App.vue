<template>
    <div id="app">
        <div id="nav">
            <div>
                <router-link to="/">Home</router-link>|
                <router-link to="/about">About</router-link>|
                <router-link to="/play/101">Play</router-link>
            </div>
            <UserBadge :userName="userName" :userPicture="userPicture" />
        </div>

        <router-view />
    </div>
</template>

<script>
    import UserBadge from "./components/UserBadge";

    export default {
        name: "App",
        computed: {
            userName() {
                return this.$store.getters.userName;
            },
            userPicture() {
                return this.$store.getters.userPicture;
            }
        },
        components: {
            UserBadge
        }
    };
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        box-shadow: 0px 0px 6px 0px #00000045;
        max-width: 650px;
        margin: 0 auto;
    }

    #nav {
        padding: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 40px;
    }

    .marker {
        font-family: "Permanent Marker", cursive;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #d47b22;
    }
</style>
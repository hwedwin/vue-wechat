<template>
    <div id="app">
        <router-view/>
        </div>
    </template>

<script>


import { mapGetters } from 'vuex'

export default {
    name: 'App',
    computed: {
        ...mapGetters(["isOtherUserPage", 'getOtherUserInfo'])
    },
    created: function () {
        let user = this.$lockr.get("user")
        if(user) {
          this.$store.commit("initUser", { user })
          this.$socket.emit("login", { uid : user.uid })
        }
    },
    methods: {
      goback() {
        this.$router.go(-1)
      }
    }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>

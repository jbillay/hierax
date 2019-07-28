<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('user/logout')
        }
        throw err
      })
    })
    // TODO: call a store user getter to exact user info from token
    this.$store.dispatch('user/getUserInfo')
  }
}
</script>

<style>
</style>

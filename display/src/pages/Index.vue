<template>
  <q-page class="flex flex-center">
    <hierax-welcome />
  </q-page>
</template>

<style>
</style>

<script>

import welcome from '../components/welcome'

export default {
  name: 'IndexPage',
  components: {
    'hierax-welcome': welcome
  },
  computed: {
    isLoggedIn: function () { return this.$store.getters['user/isLoggedIn'] },
    userInfo: function () { return this.$store.getters['user/userInfo'] }
  },
  methods: {
  }
}
</script>

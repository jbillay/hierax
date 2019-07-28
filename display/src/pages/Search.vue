<template>
  <q-page class="flex">
    <hierax-companySearch />
    <hierax-companyDisplay />
  </q-page>
</template>

<script>

import companySearch from '../components/companySearch'
import companyDisplay from '../components/companyDisplay'

export default {
  name: 'SearchPage',
  components: {
    'hierax-companySearch': companySearch,
    'hierax-companyDisplay': companyDisplay
  },
  computed: {
    isLoggedIn: function () { return this.$store.getters['user/isLoggedIn'] },
    userInfo: function () { return this.$store.getters['user/userInfo'] }
  },
  methods: {
  }
}
</script>

<style>

div.fullPage {
  width: 100%
}

</style>

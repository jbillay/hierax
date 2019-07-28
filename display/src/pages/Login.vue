<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <img
          :src="logoSrc"
          class="loginLogo"
        >
        <app-login />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import login from '../components/login.vue'

export default {
  components: {
    'app-login': login
  },
  data () {
    return {
      logoSrc: 'statics/app-logo-128x128.png'
    }
  }
}
</script>

<style scoped>
.q-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
img.loginLogo {
  height: 128px;
  width: 128px;
}
</style>

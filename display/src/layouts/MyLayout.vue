<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Hierax App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar
              color="primary"
              text-color="white"
            >
              {{ userInfo.firstName.substr(0, 1) }}
            </q-avatar>
          </q-item-section>
          <q-item-section>{{ userInfo.firstName }} {{ userInfo.lastName }}</q-item-section>
        </q-item>
        <q-separator spaced />
        <q-item
          clickable
          v-ripple
          @click="goToSearch"
        >
          <q-item-section avatar>
            <q-avatar
              color="primary"
              text-color="white"
            >
              S
            </q-avatar>
          </q-item-section>
          <q-item-section>Search Company</q-item-section>
        </q-item>

        <q-separator spaced />
        <q-item
          clickable
          v-ripple
          @click="logout"
        >
          <q-item-section avatar>
            <q-icon name="fas fa-sign-out-alt" />
          </q-item-section>

          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false // this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    logout: function () {
      this.$store.dispatch('user/logout')
        .then(() => {
          this.$router.push('/login')
        })
    },
    goToSearch: function () {
      this.$router.push('/search')
    }
  },
  computed: {
    userInfo: function () { return this.$store.getters['user/userInfo'] }
  }
}
</script>

<style>
</style>

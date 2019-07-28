<template>
  <div
    class="loginWindow"
  >
    <q-form
      @submit.prevent="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="username"
        label="Your username"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        type="password"
        v-model="password"
        label="Your password"
        lazy-rules
      />
      <div>
        <q-btn
          class="float-right"
          label="Login"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit: function () {
      const username = this.username
      const password = this.password
      this.$store.dispatch('user/login', { username, password })
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
div.loginWindow {
  width: 100%;
  max-width: 400px;
  padding: 16px 16px;
}
</style>

<template>
  <div
    class="q-pa-md fullPage"
  >
    <div
      class="q-gutter-y-md column"
      style="max-width: 300px"
    >
      <q-input
        bottom-slots
        v-model="companyName"
        label="Company Name"
      >
        <template v-slot:append>
          <q-icon
            v-if="companyName !== ''"
            name="close"
            @click="companyName = ''"
            class="cursor-pointer"
          />
          <q-icon
            name="search"
            @click="search"
          />
        </template>
      </q-input>
      <q-btn
        @click="reset"
        color="primary"
        label="Reset"
        icon-right="restore_page"
      />
      <q-btn
        color="primary"
        label="Import"
        :disabled="!importAvailable"
        icon-right="save_alt"
        @click="importCompanyInfo"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanySearch',
  data () {
    return {
      companyName: ''
    }
  },
  computed: {
    importAvailable: function () { return this.$store.getters['search/searchImportAvailable'] },
    importData: function () { return this.$store.getters['search/getImportData'] }
  },
  methods: {
    search: function () {
      const companyName = this.companyName
      const itemPerPage = 20
      const startIndex = 0
      this.$store.dispatch('search/search', { companyName, itemPerPage, startIndex })
        .then(() => {
          this.companyName = ''
          return null
        })
        .catch(err => console.log(err))
    },
    reset: function () {
      this.$store.dispatch('search/clean')
      this.companyName = ''
    },
    importCompanyInfo: function () {
      const companyInfo = this.importData
      alert(companyInfo.title)
    }
  }
}
</script>

<style scoped>

</style>

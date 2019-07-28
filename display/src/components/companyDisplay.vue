<template>
  <div class="q-pa-md fullPage">
    <div class="q-gutter-md row">
      <q-spinner
        color="primary"
        size="4em"
        v-if="status === 'loading'"
      />
      <q-table
        v-if="companies.items"
        :data="companies.items"
        :columns="columns"
        row-key="__index"
        :pagination.sync="pagination"
        :loading="loading"
        :filter="filter"
        @request="onRequest"
        @selection="selection"
        binary-state-sort
        selection="single"
        :selected.sync="selected"
        class="fullPage"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyDisplay',
  data () {
    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      columns: [
        { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.title, format: val => `${val}`, sortable: true },
        { name: 'number', required: true, label: 'Number', align: 'left', field: row => row.company_number, format: val => `${val}`, sortable: false },
        { name: 'type', required: true, label: 'Type', align: 'left', field: row => row.company_type, format: val => `${val}`, sortable: false },
        { name: 'creation', required: true, label: 'Creation', align: 'left', field: row => row.date_of_creation, format: val => `${val}`, sortable: false },
        { name: 'country', required: true, label: 'Country', align: 'left', field: row => row.address.country, format: val => `${val}`, sortable: false },
        { name: 'desc', required: true, label: 'Description', align: 'left', field: row => row.description, format: val => `${val}`, sortable: false }
      ],
      selected: []
    }
  },
  methods: {
    onRequest: function (props) {
      // let { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
      const { page, rowsPerPage } = props.pagination
      const itemPerPage = rowsPerPage
      const startIndex = ((page - 1) * rowsPerPage) + 1
      const companyName = this.companyName
      this.loading = true
      this.$store.dispatch('search/search', { companyName, itemPerPage, startIndex })
        .then(() => {
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    selection: function (props) {
      const selected = props.added
      const companyInfo = props.rows[0]
      this.$store.dispatch('search/toggleImport', { selected, companyInfo })
    }
  },
  computed: {
    status: function () { return this.$store.getters['search/searchStatus'] },
    companies: function () { return this.$store.getters['search/searchResult'] },
    companyName: function () { return this.$store.getters['search/searchName'] }
  },
  watch: {
    companies: function (companyList) {
      this.pagination.page = companyList.page_number
      this.pagination.rowsPerPage = companyList.items_per_page
      this.pagination.rowsNumber = companyList.total_results
    }
  }
}
</script>

<style>

</style>

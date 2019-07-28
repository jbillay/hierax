import axios from 'axios'

export function search ({ state, commit, rootState }, { companyName, itemPerPage, startIndex }) {
  return new Promise((resolve, reject) => {
    commit('searchTriggered', companyName)
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    axios.post('https://localhost:4242/v1/companyHouse', { name: companyName, itemPerPage, startIndex })
      .then(resp => {
        const companies = resp.data.companiesInfo
        if (resp.data.status === 'success') {
          commit('searchCompleted', { companies })
        } else {
          commit('searchError')
        }
        resolve(resp)
      })
      .catch(err => {
        commit('searchError')
        reject(err)
      })
  })
}

export function toggleImport ({ state, commit, rootState }, { selected, companyInfo }) {
  commit('toggleImport', { selected, companyInfo })
}
export function clean ({ state, commit, rootState }) {
  commit('searchClean')
}

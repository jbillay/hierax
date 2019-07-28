export function searchTriggered (state, companyName) {
  state.status = 'loading'
  state.companyName = companyName
}

export function searchCompleted (state, { companies }) {
  state.status = 'completed'
  state.companies = companies
}

export function searchError (state) {
  state.status = 'error'
}

export function searchClean (state) {
  state.companies = []
  state.companyName = ''
}

export function toggleImport (state, { selected, companyInfo }) {
  state.importAvailable = selected
  state.importData = companyInfo
}

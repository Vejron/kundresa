export const state = () => ({
  deals: [],
  selected: undefined,
  loaded: '0',
})

export const mutations = {
  setDeals (state, entries) {
    state.deals = entries
  },
  setSelected (state, deal) {
    state.selected = deal
  },
  setLoaded (state, loaded) {
    state.loaded = loaded
  }
}
export const state = () => ({
  testamonials: [],
  loaded: '0',
})

export const mutations = {
  setTestamonials (state, entries) {
    state.testamonials = entries
  },
  setLoaded (state, loaded) {
    state.loaded = loaded
  }
}
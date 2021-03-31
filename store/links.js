export const state = () => ({
  links: [],
  loaded: '0',
})

export const mutations = {
  setLinks (state, links) {
    state.links = links
  },
  setLoaded (state, loaded) {
    state.loaded = loaded
  }
}
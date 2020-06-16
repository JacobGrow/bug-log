import api from "./AxiosService"
import router from '../router/index'

export const BugsStore = {

    actions: {

   async getBugs({ commit, dispatch }) {
        api.get('bugs')
         try {
           let res = await api.get("bugs");
           commit("setBugs", res.data)
         } catch (error){
           console.error(error)
      }
      },

      addBug({ commit, dispatch }, bugData) {
        api.post('bugs', bugData)
        .then(serverBug => {
          dispatch('getBugs')
        })
      },

      async getBugDetails({ commit, dispatch}, bugId) {
        try {
          let res = await api.get("bugs/" + bugId);
          commit("setActiveBug", res.data)
        } catch (error) {
          console.error(error)
        }
      },

      async removeBug({ commit, dispatch}, id) {
        try {
          let res = await api.delete("bugs/" + id);
          dispatch("getAllBugs")
        } catch (error) {
          console.error(error) 
        }
      }
    }
}
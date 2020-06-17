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

      async closeBug({ commit, dispatch}, bug) {
        try {
          let res = await api.delete("bugs/" + bug);
          dispatch("getBugDetails", bug)
        } catch (error) {
          console.error(error) 
        }
      },

      async editBug({ commit, dispatch }, bug) {
        try {
          let res= await api.put('bugs/' + bug._id, bug)
        } catch (error) {
          console.error(error)
        }
      }
    }
}
import api from "./AxiosService"
import router from '../router/index'
import Bug from "../../../server/models/Bug";

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

   async  addBug({ commit, dispatch }, bugData) {
        try {
          let res = await api.post("bugs", bugData)
          dispatch('getBugs')
          // router.push({name: "bug", params: {bugId: res.data._id}})
        } catch (error) {
          console.error(error)
        }
      
        
      },

      async getBugDetails({ commit, dispatch}, bugId) {
        try {
          let res = await api.get("bugs/" + bugId);
          commit("setActiveBug", res.data)
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
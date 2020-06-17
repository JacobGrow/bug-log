import api from "./AxiosService"
import router from '../router/index'
import { BugsStore } from './BugsStore'


export const NotesStore = {

    actions: {

      async getNotes({ commit, dispatch }, bugId) {
         try {
           let res = await api.get('bugs/' + bugId + '/notes');
           commit("setNotes", res.data)
         } catch (error) {
           console.error(error)
         }
        },

        async addNote({ commit, dispatch }, newNote) {
            try {
                let res = await api.post('notes/' + newNote.bug, newNote)
                dispatch("getNotes", newNote.bugId)
            } catch (error) {
                console.error(error)
            }
        },
        async removeNote({ commit, dispatch }, note) {
            try {
                let res = await api.delete('notes/' + note._id)
                dispatch("getNotes", note.bugId)
            } catch (error) {
                console.error(error)
            }
        },

    }
}
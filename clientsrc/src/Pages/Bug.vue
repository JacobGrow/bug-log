<template>
<div class="bug container-fluid">

  <div class="row">
    <div class="col mx-5">
      <div class="row mt-5">
        <div class="col-6">
        <h1>{{ bug.title }} </h1>
        <h5>Reported By : {{bug.creatorEmail}}</h5>
        </div>
        <div class="col-4 d-flex align-items-end">
          <h5>
            Last Modified:
             {{
              new Date(bug.updatedAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </h5>
        </div>
        <div class="col-2 d-flex align-items-end">
        <h5 class="text-right">Closed:  {{ bug.closed }}</h5>
        </div>
      </div>
      <div class="row mt-2 border border-light pt-1">
        <div class="col-11">
        <p>{{ bug.description }}</p>
        </div>
        <div class="col-1 text-right">
          <i class="fa fa-pencil pointer" data-toggle="modal" data-target="#bugEditModal"></i>
        </div>
      </div>
      <div class="row justify-content-center">
      <div class="col-10">

      <div class="row mt-5">
        <div class="col">
       <h3> NOTES </h3>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col mx-3 px-0">
      <div class="card p-2">
        <div class="row mx-2">
          <div class="col-5 px-0">
            <h5>User:</h5>
          </div>
          <div class="col-7 px-0">
            <h5>Note:</h5>
          </div>
        </div>
        <note v-for="note in notes" :key="note.id" :note="note"/> 

      </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col text-right">
        <button data-toggle="modal" data-target="#exampleModal" class="btn btn-primary">
        Add Note
        </button>
        </div>
      </div>
        </div>
        </div>

  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Make A Note</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <form @submit.prevent="addNote">
      <div class="modal-body">
          <div class="row justify-content-center">
          <textarea v-model="newNote.content"  class="ml-2" placeholder="Your notes here.." name="" id="" cols="50" rows="7" required></textarea>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" >Submit Note</button>
      </div>
        </form>
    </div>
  </div>
</div>


<div class="modal fade" id="bugEditModal" tabindex="-1" role="dialog" aria-labelledby="bugEditModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Your Bug Report</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <form @submit.prevent="editBug" id="bugEditForm">
      <div class="modal-body">
        <input type="text" v-model="bug.title">
          <div class="row justify-content-center">
          <textarea v-model="bug.description"  class="ml-2" placeholder="Your notes here.." name="" id="" cols="50" rows="7" required></textarea>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" >Submit Edit</button>
      </div>
        </form>
    </div>
  </div>
</div>




        </div>
      </div>
    </div>

  

</template>

<script>
import Note from "@/components/NoteComponent.vue"
export default {
  name: "bug",
  mounted() {
    this.$store.dispatch("getBugDetails", this.$route.params.bugId);
    this.$store.dispatch("getNotes", this.$route.params.bugId)
  },
  data(){
    return {
      newNote: {
        bugId: this.$route.params.bugId
      },
    }
  },

  computed: {
    notes() {
      return this.$store.state.notes
    },

    bug() {
      return this.$store.state.activeBug;
    }
  },

  methods: {
    addNote() {
      this.$store.dispatch(
        "addNote", this.newNote)
        this.newNote = {
          bugId: this.$route.params.bugId
        }
        $("#exampleModal").modal("hide");
    },
    editBug(){
     this.$store.dispatch("editBug", this.bug)
      $("#bugEditModal").modal("hide");
    },
    },

  components: {
    Note
  }
}
</script>

<style scoped>
.pointer{
  cursor: pointer;
}
</style>
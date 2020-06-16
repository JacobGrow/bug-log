<template>
  <div class="home">
<div class="container-fluid">
<div class="row">
<div class="col">
    <div class="row">
      <div class="col text-center">
    <h1>Lets Log Some Bugs</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-8">

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New Report</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <form @submit.prevent="addBug">
      <div class="modal-body">
          <div class="row">
          <input v-model="newBug.title" class="ml-2 mb-1" type="text" placeholder="Title..." required>
          </div>
          <div class="row">
          <textarea v-model="newBug.description"  class="ml-2" placeholder="Your comments here.." name="" id="" cols="50" rows="10" required></textarea>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Submit Report</button>
      </div>
        </form>
    </div>
  </div>
</div>




        <div class="card kard text-center">
THE BUGS WILL GO HERE
<div class="row mb-0 pb-0 px-0">
  <div class="col mb-0 pb-0">
    <p class="pb-0 mb-0">Title</p>
  </div>
  <div class="col mb-0 pb-0">
    <p class="pb-0 mb-0">Reported By</p>
  </div>
  <div class="col mb-0 pb-0">
    <p class="pb-0 mb-0">Closed Status</p>
  </div>
</div>
<div v-for="bug in bugs" :key="bug.id" :bug="bug">
  <router-link :to="{name: 'bug', params: {bugId: bug._id}}">
  <div class="row mt-0 pt-0 border border-dark px-0 mx-0">
    <div class="col p-0">
  {{ bug.title }}
  </div>
  <div class="col p-0">
    {{ bug.creatorEmail }}
  </div>
  <div class="col p-0">
    {{ bug.closed }}
  </div>
  </div>
  </router-link>
</div>
        </div>
</div>
      </div>
      <div class="row justify-content-center">
        <div class="col-8">
          <button data-toggle="modal" data-target="#exampleModal" class="btn btn-primary mt-4">Make A Report</button>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import bug from "@/Pages/Bug.vue"
export default {
  name: "home",
  
  mounted() {
    this.$store.dispatch("getBugs");
  },
  data(){
    return {
      newBug: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
    bugId() {
      return this.$store.state.bug.id
    }
  },

  methods: {
    addBug() {
      this.$store.dispatch("addBug", this.newBug);
      this.newBug = { title: "", description: ""}
    }
  },
  components: {
    bug,
  }
};
</script>

<style scoped>
.kard{
  margin-top: 50px;
  height: 300px;
}
</style>

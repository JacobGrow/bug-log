<template>
  <div class="home">
    <body class="bg">
      
<div class="container-fluid">
<div class="row">
<div class="col">
    <div class="row justify-content-center mt-5">
      <div class="col-4 text-center">
    <h1 class="text-light">Bugs</h1>
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
          <textarea v-model="newBug.description"  class="ml-2" placeholder="Your comments here.." name="" id="" cols="72" rows="10" required></textarea>
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

<div class="row card bg1 px-4 mt-1">
  <div class="col">



<div class="card kard text-center my-4 pt-0">
<div class="row mb-0 pb-0 px-0">
  <div class="col-3 mb-0 pb-0 p-0">
    <p class="pb-0 mb-0 text-dark font"><b>Title</b></p>
  </div>
  <div class="col-3 mb-0 pb-0 p-0">
    <p class="pb-0 mb-0 text-dark font"><b>Reported By</b></p>
  </div>
  <div class="col-3 mb-0 pb-0 p-0">
    <p class="pb-0 mb-0 text-dark font"><b>Closed Status</b></p>
  </div>
  <div class="col-3 mb-0 pb-0 p-0">
    <p class="pb-0 mb-0 pr-3 text-dark font"><b>Last Modified</b></p>
  </div>
</div>
<div v-for="bug in bugs" :key="bug.id" :bug="bug">
  <router-link :to="{name: 'bug', params: {bugId: bug._id}}">
  <div class="row mt-0 pt-0 px-0 mx-0 border-bottom border-dark" v-bind:class='{"closed": bug.closed == true, "open": bug.closed == false}'>
    <div class="col-3 p-0 text-left border-right border-top border-dark">
  <p class="m-0 pl-2 text">{{ bug.title }}</p>
  </div>
  <div class="col-3 p-0 text-center border-right border-top border-dark">
    <p class="m-0">{{ bug.creatorEmail }}</p>
  </div>
  <div class="col-3 p-0 text-center border-right border-top border-dark">
    <p class="m-0" v-if="bug.closed">Closed</p>
    <p class="m-0" v-if="!bug.closed">Open</p>
  </div>
  <div class="col-3 p-0 text-center border-top border-dark">
           <p class="m-0"> {{
              new Date(bug.updatedAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            }} </p>
  </div>
  </div>
  </router-link>
  </div>
</div>
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
  </body>
 
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
      // this.$router.push('bug')
    }
  },
  components: {
    bug,
  }
};
</script>

<style scoped>
.text {
  
  width: 16em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.font{
  font-size: medium;
}
.kard{
  margin-top: 15px;
  min-height: 300px;
  background-color: rgb(236, 236, 236);
}

.bg{
  background-color: #323232;
  min-height: 100%
}

.bg1{
  background-color: #1a1a1a;
}
.mt{
  margin-top: 15px;
}

/* .open{
  background-color: #389981;
  color: white;
} */

.closed{
  color: gray; 
}
</style>

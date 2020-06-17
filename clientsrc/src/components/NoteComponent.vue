<template>
 <div class="Note">
<div class="row mx-2 py-0 mb-0 border border-light">

   <div class="col-5 px-0">
     <p class="m-1"> {{ note.creatorEmail }}</p>
   </div>
   <div class="col-6 px-0">
  <p class="m-1">{{ note.content }}</p>
   </div>
   <div class="col-1">
  <i v-if="IsCreator" class="fa fa-trash text-danger pointer" @click="removeAlert"></i>
  
   </div>
   </div>

</div>
    



</template>



<script>
export default {
  name: "Note",
  props: ["note"],
  data(){
    return {
    }
  },
  methods: {
    removeNote(){
      this.$store.dispatch("removeNote", this.note)
    },
    removeAlert(){
    swal({
  title: "Are you sure?",
  text: "Once deleted, you will not be able to recover this note!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Poof! Your note has been deleted!", {
      icon: "success",
    });
    this.removeNote()
  } else {
    swal("Your note is safe!");
  }
});
  },
},
    computed: {
      IsCreator(){
        return this.$store.state.profile.email == this.note.creatorEmail
      },
    }
}

</script>

<style scoped>

.pointer{
  cursor: pointer;
}
</style>
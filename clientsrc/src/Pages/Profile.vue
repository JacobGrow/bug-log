<template>
  <div class="about text-center text-white">
    <h1 class="text-light">Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt="" />
    <p>{{ profile.email }}</p>
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>

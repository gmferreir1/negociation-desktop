<template>
  <div>
    <transition mode="out-in" name="router-anim">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  mounted() {
    localStorage.removeItem("configData");
    localStorage.removeItem("sort");
    localStorage.removeItem("filter");
    localStorage.removeItem("paginate");
  }
};
</script>
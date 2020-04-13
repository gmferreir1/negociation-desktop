<template>
  <div>
    <transition mode="out-in" name="router-anim">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "Attendance"
};
</script>
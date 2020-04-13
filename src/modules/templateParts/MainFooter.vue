<template>
  <div>
    <footer class="main-footer">
      <!-- To the right -->
      <div class="pull-right hidden-xs">system version: {{ $systemVersion }}</div>
      <!-- Default to the left -->
      <strong>Created By Guilherme Ferreira</strong>
    </footer>
  </div>
</template>

<script>
export default {
  name: "MainFooter",
  props: ["checkUpdate"],
  watch: {
    checkUpdate() {
      /*

      if (window.ipcRenderer) {
      window.ipcRenderer.send("checkUpdate");
    }
    */
    }
  }
};
</script>

<style scoped>
.main-footer {
  background: #fff;

  color: #444;
  border-top: 1px solid #d2d6de;

  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
</style>
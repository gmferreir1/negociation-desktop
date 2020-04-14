<template>
  <div>
    <footer class="main-footer">
      <!-- To the right -->
      <span class="pull-right">system version: {{ $systemVersion }}</span>
      <!-- Default to the left -->
      <strong>Created By Guilherme Ferreira</strong>
    </footer>
  </div>
</template>

<script>
export default {
  name: "MainFooter"
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

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-left: 0px;
}
</style>
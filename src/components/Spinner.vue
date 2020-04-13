<template>
  <div style="z-index: 9999">
    <div class="spinner" style="float: left"></div>
    <span style="margin-left: 5px;">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "Spinner",
  props: {
    text: {
      required: false,
      default: "carregando ...",
      type: String
    }
  }
};
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.spinner {
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-left-color: #605cA8;
  border-top-color: #605cA8;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1.2s linear infinite;
}
</style>
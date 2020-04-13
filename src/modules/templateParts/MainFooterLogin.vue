<template>
  <div>
    <footer class="main-footer" style="margin-left: 0px !important">
      <!-- To the right -->
      <div class="pull-right hidden-xs">system version: {{ $systemVersion }}</div>
      <!-- Default to the left -->
      <strong>
        <span v-if="check_update">
          <i class="fa fa-spinner fa-spin"></i>
          {{ message }}
        </span>
        <span v-if="!check_update">SIGEM - Desktop</span>
      </strong>
    </footer>
  </div>
</template>

<script>
export default {
  name: "MainFooterLogin",
  props: ["checkUpdate"],
  data() {
    return {
      check_update: false,
      message: "Verificando atualização ..."
    };
  },
  mounted() {
    if (window.ipcRenderer) {
      this.message = "Verificando atualização ...";
      this.check_update = true;
      window.ipcRenderer.send("checkUpdate");

      window.ipcRenderer.on("updateChecked", () => {
        this.check_update = false;
      });

      window.ipcRenderer.on("downloadProgress", () => {
        this.check_update = true;
        this.message = "Fazendo download ...";
      });

      window.ipcRenderer.on("quitAndInstall", () => {
        this.check_update = true;
        this.message = "Reiniciando a aplicação ...";
      });
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
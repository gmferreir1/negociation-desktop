<template>
  <div>
    <header class="main-header">
      <!-- Logo -->
      <a href="#" @click.prevent class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini">
          <!--
          <b>S</b>GM
          -->
          <img :src="images.logo" width="45" height="45" title="Master netimoveis" />
        </span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg">
          <b>SI</b>GEM
          <small>negociação</small>
        </span>
      </a>

      <!-- header navbar -->
      <header-navbar @checkClass="$emit('checkClass')" />
      <!-- / header navbar -->
    </header>
  </div>
</template>

<script>
import HeaderNavbar from "@/modules/templateParts/HeaderNavbar";
export default {
  name: "MainHeader",
  components: { HeaderNavbar },
  data() {
    return {
      images: {
        logo: require("@/assets/img/m_master.png")
      }
    };
  }
};
</script>

<style scoped>
.skin-purple .main-header .logo {
  background-color: inherit !important;
}

.logo-lg small {
  font-size: 15px;
}

.main-header {
  position: relative;
  max-height: 35px !important;
  z-index: 1030;
}
</style>
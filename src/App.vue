<template>
  <div id="app">
    <div class="wrapper">
      <!-- main Header -->
      <main-header v-if="!hide_components" @checkClass="checkClass" />
      <!-- / main header -->

      <!-- left side -->
      <left-side-menu v-show="!hide_components" />
      <!-- / left side -->

      <!-- Content Wrapper. Contains page content -->

      <div
        class="content-wrapper"
        :class="{grad: $route.name === 'auth'}"
        :style="styleObject, styleContainer"
      >
        <!-- Main content -->
        <section class="content container-fluid">
          <!--------------------------
        | Your Page Content Here |
          -------------------------->
          <transition mode="out-in" name="router-anim">
            <router-view />
          </transition>
        </section>
        <!-- /.content -->
      </div>
      <!-- /.content-wrapper -->

      <!-- main footer -->
      <main-footer-login v-if="hide_components" />
      <main-footer v-show="!hide_components" />
      <!-- / main footer -->
    </div>
  </div>
</template>

<script>
import MainHeader from "@/modules/templateParts/MainHeader";
import LeftSideMenu from "@/modules/templateParts/LeftSideMenu";
import MainFooter from "@/modules/templateParts/MainFooter";
import MainFooterLogin from "@/modules/templateParts/MainFooterLogin";

export default {
  components: { MainHeader, LeftSideMenu, MainFooter, MainFooterLogin },
  data() {
    return {
      hide_components: true,
      styleObject: {
        "margin-left": "0px !important"
      },
      styleContainer: {
        "margin-left": "50px !important"
      }
    };
  },
  methods: {
    checkClass() {
      setTimeout(() => {
        if (!$("body").hasClass("sidebar-collapse")) {
          this.styleContainer = {
            "padding-left": "1px !important"
          };
        }
      }, 100);
    },
    checkRoute() {
      const path = this.$route.path.split("/");
      if (
        this.$route.name !== "auth" &&
        path[1] !== "external" &&
        path[1] !== "password-recovery"
      ) {
        this.checkClass();
        this.styleObject = {
          "margin-left": "50px !important"
        };

        this.hide_components = false;
      } else {
        this.styleContainer = {
          "margin-left": "0px !important",
          "padding-top": "0px !important"
        };
        this.hide_components = true;
      }
    }
  },
  watch: {
    "$route.name"() {
      this.checkRoute();
    }
  },
  mounted() {
    this.checkRoute();
  }
};
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.css";
@import "../node_modules/font-awesome/css/font-awesome.css";
@import "../node_modules/ionicons/dist/css/ionicons.css";
@import "./assets/css/AdminLTE.min.css";
@import "./assets/css/skins/_all-skins.css";
@import "./assets/css/style.css";
@import "../node_modules/bootstrap-select/dist/css/bootstrap-select.css";

.fixed .content-wrapper,
.fixed .right-side {
  padding-top: 35px !important;
}

.grad {
  background: linear-gradient(to right, #263238, #302b63, #263238);
}
</style>

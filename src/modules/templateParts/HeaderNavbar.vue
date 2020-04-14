<template>
  <div>
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <a
        href="#"
        class="sidebar-toggle"
        data-toggle="push-menu"
        role="button"
        @click.prevent="$emit('checkClass')"
        style="padding-bottom: 5px;"
      >
        <span class="sr-only">Toggle navigation</span>
      </a>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- User Account Menu -->
          <li class="dropdown user user-menu">
            <!-- Menu Toggle Button -->
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              style="padding-top: 7px !important"
            >
              <!-- The user image in the navbar-->
              <img src="../../assets/img/avatar_default.png" class="user-image" alt="User Image" />
              <!-- hidden-xs hides the username on small devices so only the image appears. -->
              <span class="hidden-xs to-capitalize">{{ data_user_logged.name }}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- The user image in the menu -->
              <li class="user-header">
                <img src="../../assets/img/avatar_default.png" class="img-circle" alt="User Image" />

                <p class="to-capitalize">
                  {{ `${data_user_logged.name} ${data_user_logged.last_name}` }}
                  <small>Registrado desde {{ data_user_logged.created_at }}</small>
                </p>
              </li>
              <!-- Menu Body 
              <li class="user-body">
                <div class="row">
                  <div class="col-xs-12 text-center">
                    <router-link :to="{ name: '' }">
                      <i class="fa fa-gear fa-2x"></i>
                      <span style="margin-left: 5px">Administração do Sistema</span>
                    </router-link>
                  </div>
                </div>
              </li>
              -->
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <!--
                  <a href="#" class="btn btn-default btn-flat">Profile</a>
                  -->
                </div>
                <div class="pull-right">
                  <a href="#" class="btn btn-default btn-flat" @click.prevent="logout">Logout</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "HeaderNavbar",
  data() {
    return {
      data_user_logged: {}
    };
  },
  methods: {
    cleanForm() {
      this.data_user_logged = {
        name: "",
        lat_name: "",
        created_at: ""
      };
    },
    getDataUserLogged() {
      let localStorage = window.localStorage.getItem("dataLogin");
      if (localStorage) {
        localStorage = JSON.parse(localStorage);
        this.data_user_logged.name = localStorage.name;
        this.data_user_logged.last_name = localStorage.last_name;
        this.data_user_logged.created_at = moment(localStorage.created_at)
          .locale("pt-BR")
          .format("MMMM YYYY");
      }
    },
    logout() {
      localStorage.clear();
      setTimeout(() => {
        this.$router.push({
          name: "auth"
        });
        //window.location.href = "/";
      }, 300);
    }
  },
  mounted() {
    this.cleanForm();
    this.getDataUserLogged();

    if (window.ipcRenderer) {
      window.ipcRenderer.on("aplicationClosed", () => {
        window.localStorage.clear();
      });
    }
  }
};
</script>

<style scoped>
.skin-purple .main-header .navbar {
  /*background-color: #e98531 !important; */
  /* background: linear-gradient(to right, #583c25, #918072) !important; */
  background: linear-gradient(to right, #cccccc, #263238, #263238);
}

.main-header .navbar {
  -webkit-transition: margin-left 0.3s ease-in-out;
  transition: margin-left 0.3s ease-in-out;
  margin-bottom: 0;
  margin-left: 230px;
  border-bottom: 1px solid #cccccc;
  min-height: 35px !important;
  border-radius: 0;
  height: 35px !important;
}

.skin-purple .main-header .navbar a:hover {
  background: inherit !important;
}

.skin-purple .main-header li.user-header {
  background-color: #263238 !important;
}

.main-header .sidebar-toggle {
  float: left;
  background-color: transparent;
  background-image: none;
  padding: 8px 8px;
  font-family: fontAwesome;
}

.skin-purple .main-header .navbar .sidebar-toggle:hover {
  background-color: transparent;
}

.skin-purple .main-header .navbar .nav > li > a {
  background-color: transparent !important;
  height: 35px !important;
}
.skin-purple .main-header .navbar .nav > li > a:hover {
  background-color: transparent !important;
  height: 35px !important;
}
</style>
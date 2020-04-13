<template>
  <div>
    <aside class="main-sidebar mw-left-menu-color">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">
        <!-- Sidebar Menu -->
        <ul class="sidebar-menu" data-widget="tree">
          <li class="header">MENUS</li>
          <!-- Optionally, you can add icons to the links -->
          <li class="treeview">
            <a href="#" class="adj-icons-menu">
              <i class="fa fa-calendar" style="font-size: 20px;"></i>
              <span style="padding-left: 5px;">Atendimentos</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link :to="{ name: 'attendance_list' }">
                  <i class="fa fa-check-circle-o"></i>
                  Lista
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'update_db' }">
                  <i class="fa fa-check-circle-o"></i>
                  Atualização Base Contratos
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
        <!-- /.sidebar-menu -->
      </section>
      <!-- /.sidebar -->
    </aside>
  </div>
</template>

<script>
export default {
  name: "LeftSideMenu"
};
</script>


<style scoped>
.mw-left-menu-color {
  /*
  background-color: #41586e !important;
  */
  background-color: #263238 !important;
}

.skin-purple .sidebar-menu > li:hover > a,
.skin-purple .sidebar-menu > li.active {
  color: #ffffff;
  background: #2e3e4e !important;
}

.skin-purple .sidebar-menu > li:hover > a,
.skin-purple .sidebar-menu > li.active > a,
.skin-purple .sidebar-menu > li.menu-open > a {
  color: #ffffff;
  background: #2e3e4e;
}

.skin-purple .sidebar-menu > li.header {
  color: #4b646f;
  background: #374b5e;
}

.adj-icons-menu {
  padding-left: 15px;
}

ul .header {
  color: #ffffff !important;
  font-weight: 400;
}
</style>
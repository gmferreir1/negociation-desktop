import Vue from "vue";
import Router from "vue-router";
const checkIsLogged = require("./util/checkIsLogged");

/** Auth */
import Auth from "@/modules/auth/routes";
/** Dashboard */
import Dashboard from "@/modules/dashboard/routes";
/** Attendances */
import Attendance from "@/modules/attendance/routes";

Vue.use(Router);

const baseRoutes = [];
const routes = baseRoutes.concat(Auth, Dashboard, Attendance);

const router = new Router({
  routes
});

/** Proteção de Rotas */
router.beforeEach((to, from, next) => {

  const path = to.path.split("/");

  if (
    path[1] === "external" || path[1] === "password-recovery"
  ) {
    next();
    return;
  }

  if (to.name != "auth" && checkIsLogged.isLogged()) {
    next();
  } else if (to.name === "auth") {
    next();
  } else {
    next({ path: "/auth" });
  }
});

export default router;

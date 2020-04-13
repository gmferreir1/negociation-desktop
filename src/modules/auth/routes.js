/** Auth */
import Auth from "./pages/Auth";

/** PassworRecovery */
import PasswordRecovery from "./pages/PasswordRecovery";

export default [
  {
    path: "/auth",
    name: "auth",
    component: Auth
  },
  {
    path: "/password-recovery",
    name: "password_recovery",
    component: PasswordRecovery
  }
];

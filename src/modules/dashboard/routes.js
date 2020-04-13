/** Dashboard */
import Dashboard from "./Dashboard";
import Main from "./pages/Main";

export default [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
    children: [
      {
        path: "main",
        name: "dashboard_main",
        component: Main
      }
    ]
  }
];

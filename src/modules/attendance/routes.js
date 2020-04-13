/** Attendance */
import Attendance from "./Attendance";
import ListAttendance from "./pages/ListAttendance";
import CreateOrEdit from "./pages/CreateOrEdit";

/** Update Database */
import UpdateDB from "./pages/UpdateDb";

export default [
    {
        path: "/attendance",
        name: "attendance",
        component: Attendance,
        children: [
            {
                path: "list",
                name: "attendance_list",
                component: ListAttendance
            },
            {
                path: "create",
                name: "attendance_create",
                component: CreateOrEdit
            },
            {
                path: "update-database",
                name: "update_db",
                component: UpdateDB
            }
        ]
    }
];

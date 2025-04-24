import{
    LuLayoutDashboard,
    LuClipboardCheck,
    LuSquarePlus,
    LuLogOut,
    LuUsers,
} from "react-icons/lu";

// Change to default export
const SIDE_MENU_DATA = [
    {
        id: "01",
        title: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/admin/dashboard",
    }, 
    {
        id: "02",
        title: "Manage Tasks",
        icon: LuClipboardCheck,
        path: "/admin/tasks",
    }, 
    {
        id: "03",
        title: "Create Task",
        icon: LuSquarePlus,
        path: "/admin/create-task",
    }, 
    {
        id: "04",
        title: "Team Memebers",
        icon: LuUsers,
        path: "/admin/users",
    }, 
    {
        id: "05",
        title: "Logout",
        icon: LuLogOut,
        path: "logout",
    }, 
]

 const SIDE_MENU_USER_DATA = [
    {
        id: "01",
        title: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/user/dashboard",
    }, 
    {
        id: "02",
        title: "My Tasks",
        icon: LuClipboardCheck,
        path: "/user/tasks",
    }, 
    {
        id: "05",
        title: "Logout",
        icon: LuLogOut,
        path: "logout",
    }, 
]

 const PRIORITY_DATA = [
    {label: "Low", value: "Low"},
    {label: "Medium", value: "Medium"},
    {label: "High", value: "High"},
]

 const STATUS_DATA = [
    {label: "Pending", value: "Pending"},
    {label: "In Progress", value: "In-Progress"},
    {label: "Completed", value: "Completed"}, 
]

// Export all constants
export {
    SIDE_MENU_DATA,
    SIDE_MENU_USER_DATA,
    PRIORITY_DATA,
    STATUS_DATA
};
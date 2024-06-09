import { createBrowserRouter } from "react-router-dom";
import Tasks from "../Components/tasks/Tasks";
import NotFound from "../Components/pages/NotFound";
import Services from "../Components/Service/Services";
import AddTask from "../Components/tasks/AddTask";

const router = createBrowserRouter([
     { path: '/', element: <Tasks /> },
     { path: '/services', element: <Services /> },
     { path: '/addTask', element: <AddTask /> },
     { path: '*', element: <NotFound /> },
]);

export default router;
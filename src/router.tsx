import { createBrowserRouter } from "react-router-dom";
import FirstTask from "./components/FirstTask";
import SecondTask from "./components/AccountArea";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FirstTask />,
  },
  {
    path: "/first-task",
    element: <FirstTask />,
  },
  {
    path: "/second-task",
    element: <SecondTask />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;

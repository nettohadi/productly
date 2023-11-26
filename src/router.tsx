import { createBrowserRouter } from "react-router-dom";
import FirstTest from "./components/FirstTask";
import SecondTest from "./components/SecondTask/SecondTest";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FirstTest />,
  },
  {
    path: "/first-test",
    element: <FirstTest />,
  },
  {
    path: "/second-test",
    element: <SecondTest />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;

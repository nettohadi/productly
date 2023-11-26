import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import FirstTest from "./components/FirstTest";
import SecondTest from "./components/SecondTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/first-test",
    element: <FirstTest />,
  },
  {
    path: "/second-test",
    element: <SecondTest />,
  },
]);

export default router;

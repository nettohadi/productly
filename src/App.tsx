import "./App.css";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./router";
const queryClient = new QueryClient();
import ProductlyLogo from "./assets/productly-logo.png";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-[100px] w-full flex justify-center items-start py-7">
        <img
          id="header-logo"
          alt="Productly"
          src={ProductlyLogo}
          className="w-auto h-[30px]"
        />
      </div>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

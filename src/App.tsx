import "./App.css";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./router";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-[100px] w-full flex justify-center items-start py-7">
        <img
          id="header-logo"
          alt="Productly"
          src="https://productly.app/static/media/productly.b3b488b2643e4d02175e.png"
          className="w-auto h-[30px]"
        />
      </div>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

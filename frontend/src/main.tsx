import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./sass/detail.scss";
import "./sass/Trangchu.scss";
import "./sass/cart.scss";
import "./sass/checkout.scss";
import "@/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);

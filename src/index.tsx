import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <div className="master">
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        {App()}
      </BrowserRouter>
    </QueryClientProvider>
  </div>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

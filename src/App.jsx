import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Login from "./components/Login";
import LoginSuccess from "./components/LoginSuccess";
import Register from "./components/Register";

const createQueryClient = () => {
  const queryCache = new QueryCache();
  return new QueryClient({
    queryCache,
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        notifyOnChangeProps: "tracked",
      },
    },
  });
};

function App() {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<LoginSuccess />} />
            <Route path="register" element={<Register />} />
            <Route path="" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

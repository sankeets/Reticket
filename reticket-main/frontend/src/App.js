import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApplicationPage from "./containers/ApplicationPage";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import UserInfoContextProvider from "./contexts/UserInfoContext";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

function App() {
  return (
    <ChakraProvider>
      <UserInfoContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<ApplicationPage />} />
          </Routes>
        </BrowserRouter>
      </UserInfoContextProvider>
    </ChakraProvider>
  );
}

export default App;

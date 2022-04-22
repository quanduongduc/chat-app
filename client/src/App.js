import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MessagePage from "./pages/MessagePage";
import UserProfile from "./conponents/user/UserProfile";
import NotFoundPage from "./pages/NotFoundPage";
import AuthProvider from "./context/AuthContext";
import ProtectedRouter from "./conponents/routing/ProtectedRoute";

function App() {
  console.log("app rerender");
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRouter to="/messenger" Component={Navigate} />}
          ></Route>
          <Route path="login" element={<AuthPage route="login" />} />
          <Route path="register" element={<AuthPage route="register" />} />
          <Route
            path="messenger"
            element={<ProtectedRouter Component={MessagePage} />}
          >
            <Route path="u/:userId" element={<UserProfile />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MessagePage from "./pages/MessagePage";
import UserProfile from "./conponents/User/UserProfile";
import NotFoundPage from "./pages/NotFoundPage";
import AuthProvider from "./context/AuthContext";
import ProtectedRouter from "./conponents/routing/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRouter to="/messenger" Component={Navigate} />}
          >
            <Route path="register" element={<AuthPage route="register" />} />
            <Route path="login" element={<AuthPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="messenger" element={<MessagePage />}>
            <Route path="u/:userId" element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

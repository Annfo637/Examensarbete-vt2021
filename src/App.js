import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import UserContextProvider from "./contexts/UserContextProvider";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import GlobalStyle from "./styles/globalStyles";

function App() {
  return (
    <UserContextProvider>
      <GlobalStyle />
      <Switch>
        <PrivateRoute path="/user/:id" component={UserPage} />
        <PrivateRoute path="/admin" component={AdminPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/update-profile" component={UpdateProfilePage} />
        <PrivateRoute exact path="/" component={HomePage} />
      </Switch>
    </UserContextProvider>
  );
}

export default App;

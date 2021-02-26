import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AuthContextProvider from "./contexts/AuthContextProvider";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import GlobalStyle from "./styles/globalStyles";

function App() {
  return (
    <AuthContextProvider>
      <GlobalStyle />
      <Switch>
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/update-profile" component={UpdateProfilePage} />
        <PrivateRoute exact path="/" component={HomePage} />
      </Switch>
    </AuthContextProvider>
  );
}

export default App;

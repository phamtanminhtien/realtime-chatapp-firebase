import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";
import AddMember from "./components/Modal/AddMember";
import AddRoom from "./components/Modal/AddRoom";
import AppControlProvider from "./contexts/AppControlProvider";
import AuthProvider from "./contexts/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route component={Login} path="/login" />

          <AppControlProvider>
            <Route component={Chat} path="/" />
            <AddRoom />
            <AddMember />
          </AppControlProvider>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

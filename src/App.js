import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";
import AuthProvider from "./contexts/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route component={Login} path="/login" />
          <Route component={Chat} path="/" />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

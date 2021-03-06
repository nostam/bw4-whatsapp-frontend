import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import "./App.scss";
import "react-chat-elements/dist/main.css";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Logout from "./pages/logout";
import Protected from "./layouts/Protected";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/logout" exact component={Logout} />

          <Route
            path="/"
            exact
            render={(props) => (
              <Protected>
                <Home {...props} />
              </Protected>
            )}
          />

          {/* Default PATH */}
          <Redirect to="/" />
        </Switch>
      </div>{" "}
    </ThemeProvider>
  );
}

export default App;

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ITheme, ThemeProvider } from "styled-components";
import { store } from "./store/store";
import { Home } from "./views/Home/Home";
import { House } from "./views/House/House";
import { Layout } from "./views/Layout/Layout";
import { Login } from "./views/Login/Login";

export const theme: ITheme = {
  primary: "#3075d7",
  secondary: "#00909a",
  warning: "#bd5b00",
  shadow: "0 0 10px 4px rgba(0, 0, 0, 0.2);",
};

export const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Layout>
            <Switch>
              <Route path="/house/:id" component={House} />

              <Route path="/overview" />

              <Route path="/shopping" />

              <Route exact path="/" component={Home} />
            </Switch>
          </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;

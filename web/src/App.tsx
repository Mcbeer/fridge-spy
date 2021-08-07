import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "./views/Layout/Layout";
import { Home } from "./views/Home/Home";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import { House } from "./views/House/House";
import { Provider } from "react-redux";
import { store } from "./store/store";

export const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <Route exact path="/login" />
        <Layout>
          <Switch>
            <Route path="/house/:id" component={House} />

            <Route path="/overview" />

            <Route path="/shopping" />

            <Route exact path="/" component={Home} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;

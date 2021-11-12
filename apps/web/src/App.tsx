import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ITheme, ThemeProvider } from "styled-components";
import { store } from "./store/store";
import { appTheme } from "./theme/theme";
import { Home } from "./views/Home/Home";
import { House, HouseEntry } from "./views/House/House";
import { Layout } from "./views/Layout/Layout";
import { Login } from "./views/Login/Login";

export const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={appTheme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="house" element={<House />}>
              <Route path=":id" element={<HouseEntry />} />
            </Route>
            <Route path="overview" />
            <Route path="shopping" />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;

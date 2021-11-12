import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";
import { ITheme, ThemeProvider } from "styled-components";
import { store } from "./store/store";
import { appTheme } from "./theme/theme";
import { Home } from "./views/Home/Home";
import { House } from "./views/House/House";
import { Layout } from "./views/Layout/Layout";
import { Location } from "./views/Location/Location";
import { Login } from "./views/Login/Login";
import { Overview } from "./views/Overview/Overview";
import { ShoppingList } from "./views/ShoppingList/ShoppingList";

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="house/:id" element={<House />} />
              <Route path="location/:id" element={<Location />} />
              <Route path="overview" element={<Overview />} />
              <Route path="shopping" element={<ShoppingList />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

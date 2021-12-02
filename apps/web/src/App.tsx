import { AnimatePresence } from "framer-motion";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { ThemeProvider } from "styled-components";
import { EditLocationItem } from "./components/EditLocationItem/EditLocationItem";
import { HouseProvider } from "./context/HouseContext";
import { LocationProvider } from "./context/LocationContext";
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
    <HouseProvider>
      <LocationProvider>
        <ThemeProvider theme={appTheme}>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="house/:id" element={<House />} />
                <Route path="location/:id" element={<Location />}>
                  <Route path="edit/:productId" element={<Location />} />
                </Route>
                <Route path="overview" element={<Overview />} />
                <Route path="shopping" element={<ShoppingList />} />
              </Routes>
              <AnimatePresence>
                <Routes>
                  <Route
                    path="location/:id/edit/:productId"
                    element={<EditLocationItem />}
                  />
                </Routes>
              </AnimatePresence>
            </Layout>
            <ReactTooltip html={true} />
          </Router>
        </ThemeProvider>
      </LocationProvider>
    </HouseProvider>
  );
};

export default App;

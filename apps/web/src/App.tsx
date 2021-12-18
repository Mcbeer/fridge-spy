import { IUser } from "@fridgespy/types";
import { AnimatePresence } from "framer-motion";
import { useObservableGetState, useObservableState } from "observable-hooks";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  BrowserRouter as Router,
  IndexRouteProps,
  LayoutRouteProps,
  Navigate,
  PathRouteProps,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { EditLocationItem } from "./components/EditLocationItem/EditLocationItem";
import { HouseProvider } from "./context/HouseContext";
import { LocationProvider } from "./context/LocationContext";
import { UserContext, UserProvider } from "./context/UserContext";
import { getUserSelf } from "./services/user/getUserSelf";
import { Home } from "./views/Home/Home";
import { House } from "./views/House/House";
import { Layout } from "./views/Layout/Layout";
import { Location } from "./views/Location/Location";
import { Login } from "./views/Login/Login";
import { Overview } from "./views/Overview/Overview";
import { ShoppingList } from "./views/ShoppingList/ShoppingList";

export const App = () => {
  return (
    <UserProvider>
      <HouseProvider>
        <LocationProvider>
          <Router>
            <Layout>
              <Routes>
                <Route
                  path="/"
                  element={
                    <AuthorizedRoute>
                      <Home />
                    </AuthorizedRoute>
                  }
                />
                <Route path="login" element={<Login />} />
                <Route
                  path="house/:id"
                  element={
                    <AuthorizedRoute>
                      <House />
                    </AuthorizedRoute>
                  }
                />
                <Route
                  path="location/:id"
                  element={
                    <AuthorizedRoute>
                      <Location />
                    </AuthorizedRoute>
                  }
                >
                  <Route
                    path="edit/:productId"
                    element={
                      <AuthorizedRoute>
                        <Location />
                      </AuthorizedRoute>
                    }
                  />
                </Route>
                <Route
                  path="overview"
                  element={
                    <AuthorizedRoute>
                      <Overview />
                    </AuthorizedRoute>
                  }
                />
                <Route
                  path="shopping"
                  element={
                    <AuthorizedRoute>
                      <ShoppingList />
                    </AuthorizedRoute>
                  }
                />
              </Routes>
              <AnimatePresence>
                <Routes>
                  <Route
                    path="location/:id/edit/:productId"
                    element={
                      <AuthorizedRoute>
                        <EditLocationItem />
                      </AuthorizedRoute>
                    }
                  />
                </Routes>
              </AnimatePresence>
            </Layout>
            <ReactTooltip html={true} />
          </Router>
        </LocationProvider>
      </HouseProvider>
    </UserProvider>
  );
};

const AuthorizedRoute: FunctionComponent = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { authorized$, user$ } = useContext(UserContext);

  useEffect(() => {
    getUserSelf()
      .then((user) => {
        user$.next(user);
        authorized$.next(true);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (!authorized$.value && !loading) {
    return <Navigate to="/login" />;
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    return <>{children}</>;
  }
};

export default App;

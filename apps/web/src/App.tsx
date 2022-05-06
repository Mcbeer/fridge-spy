import { AnimatePresence } from "framer-motion";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { map } from "rxjs";
import { EditLocationItem } from "./components/EditLocationItem/EditLocationItem";
import { LocationEdit } from "./components/LocationEdit/LocationEdit";
import { SlideIn } from "./components/SlideIn/SlideIn";
import { LocationContext, LocationProvider } from "./context/LocationContext";
import { ProductProvider } from "./context/ProductContext";
import { UserContext, UserProvider } from "./context/UserContext";
import { getUserSelf } from "./services/user/getUserSelf";
import { Home } from "./views/Home/Home";
import { Layout } from "./views/Layout/Layout";
import { Location } from "./views/Location/Location";
import { Login } from "./views/Login/Login";
import { Overview } from "./views/Overview/Overview";
import { ShoppingList } from "./views/ShoppingList/ShoppingList";

export const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="login" element={<Login />} />
        </Routes>
        <UserProvider>
          <ProductProvider>
            <LocationProvider>
              <Routes>
                <Route
                  path="/"
                  element={
                    <AuthorizedRoute>
                      <Home />
                    </AuthorizedRoute>
                  }
                />
                <Route
                  path="/location/new"
                  element={
                    <AuthorizedRoute>
                      <Home />
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
                  <Route
                    path="new"
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
                <Route path="*" element={null} />
              </Routes>
              <AnimatePresence>
                <Routes>
                  <Route
                    path="location/:id/edit/:productId"
                    element={
                      <SlideIn>
                        <AuthorizedRoute>
                          <EditLocationItem />
                        </AuthorizedRoute>
                      </SlideIn>
                    }
                  />
                  <Route
                    path="location/:id/edit/new"
                    element={
                      <SlideIn>
                        <AuthorizedRoute>
                          <EditLocationItem />
                        </AuthorizedRoute>
                      </SlideIn>
                    }
                  />
                  <Route
                    path="/location/new"
                    element={
                      <SlideIn>
                        <AuthorizedRoute>
                          <LocationEdit />
                        </AuthorizedRoute>
                      </SlideIn>
                    }
                  />
                  <Route path="*" element={null} />
                </Routes>
              </AnimatePresence>
            </LocationProvider>
          </ProductProvider>
        </UserProvider>
      </Layout>
      <ReactTooltip html={true} />
    </Router>
  );
};

const AuthorizedRoute: FunctionComponent = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { authorized$, user$ } = useContext(UserContext);

  useEffect(() => {
    if (!authorized$.value) {
      getUserSelf()
        .then((user) => {
          user$.next(user);
          authorized$.next(true);
          setLoading(false);
        })
        .then(() => {
          // TODO: implement SSE
          // setupSSE();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
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

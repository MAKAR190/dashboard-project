import { useEffect } from "react";
import { Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../components/routing/PrivateRoute";
import PublicRoute from "../components/routing/PublicRoute";
import { routes, urls } from "../routes";
import Layout from "./Layout/Layout";
import { connect } from "react-redux";
import * as operations from "../redux/auth/authOperations";
import MobileMenu from "../components/MobileMenu/MobileMenu";
function App({ fetchUserData }) {
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);
  useEffect(() => {
    if (localStorage.getItem("activeTheme")) {
      document.querySelector("html").className = JSON.parse(
        localStorage.getItem("activeTheme")
      );
    }
    if (localStorage.getItem("activeFont")) {
      document.querySelector("html").style.fontFamily = JSON.parse(
        localStorage.getItem("activeFont")
      );
    }
    if (localStorage.getItem("activeFontSize")) {
      document.querySelector("html").style.fontSize = JSON.parse(
        localStorage.getItem("activeFontSize")
      );
    }
  }, []);
  return (
    <Layout>
      <MobileMenu />
      <Switch>
        {routes.map((route) =>
          route.private ? (
            <PrivateRoute {...route} key={route.path} />
          ) : (
            <PublicRoute {...route} key={route.path} />
          )
        )}
        <Redirect to={urls.notFound} />
      </Switch>
    </Layout>
  );
}

export default connect(null, {
  fetchUserData: operations.fetchUserData,
})(App);

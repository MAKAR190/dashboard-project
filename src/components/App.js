import { useEffect } from "react";
import { Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../components/routing/PrivateRoute";
import PublicRoute from "../components/routing/PublicRoute";
import { routes, urls } from "../routes";
import Layout from "./Layout/Layout";
import { connect } from "react-redux";
import * as operations from "../redux/auth/authOperations";
function App({ fetchUserData }) {
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <Layout>
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

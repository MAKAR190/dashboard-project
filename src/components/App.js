import { Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../components/routing/PrivateRoute";
import PublicRoute from "../components/routing/PublicRoute";
import { routes, urls } from "../routes";
import Layout from "./Layout/Layout";

function App() {
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

export default App;

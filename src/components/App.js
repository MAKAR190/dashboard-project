import { Switch, Route, Redirect } from 'react-router-dom';

import { routes, urls } from '../routes';

import Layout from './Layout/Layout';

function App() {
  return (
    <Layout>
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}

        <Redirect to={urls.notFound} />
      </Switch>
    </Layout>
  );
}

export default App;

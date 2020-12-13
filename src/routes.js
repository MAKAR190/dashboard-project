import Dashboard from './views/Dashboard/Dashboard';
import NotFound from './views/NotFound/NotFound';

export const urls = {
  dashboard: '/',
  profile: '/profile',
  settings: '/settings',
  aboutUs: '/about-us',
  logout: '/logout',
  notFound: '/404',
};

export const routes = [
  {
    path: urls.dashboard,
    exact: true,
    component: Dashboard,
  },
  {
    path: urls.notFound,
    exact: true,
    component: NotFound,
  },
];

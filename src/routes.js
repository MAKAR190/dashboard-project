import Dashboard from "./views/Dashboard/Dashboard";
import Profile from "./views/Profile";
import Settings from "./views/Settings";
import AboutUs from "./views/AboutUs";
import NotFound from "./views/NotFound/NotFound";

export const urls = {
  dashboard: "/",
  profile: "/profile",
  settings: "/settings",
  aboutUs: "/about-us",
  logout: "/logout",
  notFound: "/404",
};

export const routes = [
  {
    path: urls.dashboard,
    exact: true,
    component: Dashboard,
  },
  {
    path: urls.profile,
    exact: true,
    component: Profile,
  },
  {
    path: urls.settings,
    exact: true,
    component: Settings,
  },
  {
    path: urls.aboutUs,
    exact: true,
    component: AboutUs,
  },
  {
    path: urls.notFound,
    exact: true,
    component: NotFound,
  },
];

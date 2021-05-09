import Dashboard from "./views/Dashboard/Dashboard";
import Settings from "./views/Settings/Settings";
import Profile from "./views/Profile/Profile";
import AboutUs from "./views/AboutUs/AboutUs";
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
    path: urls.profile,
    exact: true,
    component: Profile,
  },
  {
    path: urls.aboutUs,
    exact: true,
    component: AboutUs,
  },
  {
    path: urls.notFound,
    exact: false,
    component: NotFound,
  },
];

import Dashboard from "./views/Dashboard/Dashboard";
import Settings from "./views/Settings/Settings";
import Profile from "./views/Profile/Profile";
import AboutUs from "./views/AboutUs/AboutUs";
import NotFound from "./views/NotFound/NotFound";
import Login from "./views/Login/Login";
import Register from "./views/Register/Reg";

export const urls = {
  dashboard: "/",
  profile: "/profile",
  settings: "/settings",
  aboutUs: "/about-us",
  logout: "/logout",
  notFound: "/404",
  login: "/login",
  register: "/register",
};

export const routes = [
  {
    path: urls.dashboard,
    exact: true,
    component: Dashboard,
    private: false,
    restricted: false,
  },
  {
    path: urls.profile,
    exact: true,
    component: Profile,
    private: true,
    restricted: false,
  },
  {
    path: urls.settings,
    exact: true,
    component: Settings,
    private: true,
    restricted: false,
  },
  {
    path: urls.aboutUs,
    exact: true,
    component: AboutUs,
    private: false,
    restricted: false,
  },
  {
    path: urls.login,
    exact: true,
    component: Login,
    private: false,
    restricted: true,
  },
  {
    path: urls.register,
    exact: true,
    component: Register,
    private: false,
    restricted: true,
  },
  {
    path: urls.notFound,
    exact: false,
    component: NotFound,
    private: false,
    restricted: false,
  },
];

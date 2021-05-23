import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./components/App";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
axios.defaults.baseURL = "https://goiteens-dashboard.herokuapp.com/api";
document.querySelector("html").style.fontSize = "16px";
document.querySelector("html").style.fontFamily = "Lato";
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

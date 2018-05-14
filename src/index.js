import React from "react";
import { render } from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import store from "./store";
import AppProvider from "./AppProvider";
import AppContainer from "./containers/app";

const $renderEntryPoint = document.getElementById("root");

render(
  <AppProvider store={store}>
    <AppContainer />
  </AppProvider>,
  $renderEntryPoint
);

registerServiceWorker();

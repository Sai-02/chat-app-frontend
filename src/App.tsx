import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./shared/redux/store";
import RoutesContainer from "./RoutesContainer";

function App() {
  return (
    <Provider store={store}>
      <div className="text-center">
        <Toaster />
        <RoutesContainer />
      </div>
    </Provider>
  );
}

export default App;

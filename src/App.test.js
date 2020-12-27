import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import App from "./App";
import Axios from "axios";

jest.mock("axios");

it("renders without crashing", () => {
  const div = document.createElement("div");
  Axios.get.mockResolvedValue(Promise.resolve({ data: null }));
  act(() => {
    ReactDOM.render(<App />, div);
  });
  ReactDOM.unmountComponentAtNode(div);
});

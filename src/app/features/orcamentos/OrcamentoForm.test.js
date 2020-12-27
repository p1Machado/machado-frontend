import React from "react";
import { render } from "@testing-library/react";

import store from "app/store";
import { Provider } from "react-redux";
import { AppLayoutProvider } from "app/layouts";

import { OrcamentoForm } from "./OrcamentoForm";

test("Deve renderizar os itens selecionados", () => {
  render(
    <AppLayoutProvider>
      <Provider store={store}>
        <OrcamentoForm onSubmit={() => {}}>
          <button type="submit" />
        </OrcamentoForm>
      </Provider>
    </AppLayoutProvider>,
  );
});

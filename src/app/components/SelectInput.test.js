import React from "react";
import { render } from "@testing-library/react";
import { SelectInput } from "./SelectInput";

test("Deve apresentar o valor selecionado", async () => {
  const { getByRole } = render(
    <SelectInput
      name="teste"
      value={{ value: 2, label: "Second" }}
      options={[
        { value: 1, label: "First" },
        { value: 2, label: "Second" },
        { value: 3, label: "Third" },
      ]}
    />,
  );

  expect(getByRole("textbox", { selector: '[name]="teste"' }).value).toBe("Second");
});

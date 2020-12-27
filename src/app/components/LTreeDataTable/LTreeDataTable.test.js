import React from "react";
import { render, within } from "@testing-library/react";
import LTreeDataTable from "./LTreeDataTable";
import Column from "../DataTable/Column";

test("Precisa manter em ordem de ltree", () => {
  const { getAllByText } = render(
    <LTreeDataTable
      data={[
        { id: 1, ltree: "1" },
        { id: 2, ltree: "2" },
        { id: 3, ltree: "1.1" },
        { id: 4, ltree: "1.2" },
        { id: 5, ltree: "1.2.1" },
      ]}
    >
      <Column field="ltree" />
    </LTreeDataTable>,
  );

  const elements = getAllByText(/1|1.1|1.2|1.2.1|2/);
  expect(elements[0].innerHTML).toBe("1");
  expect(elements[1].innerHTML).toBe("1.1");
  expect(elements[2].innerHTML).toBe("1.2");
  expect(elements[3].innerHTML).toBe("1.2.1");
  expect(elements[4].innerHTML).toBe("2");
});

test("Precisa filtrar os nodes collapsed", async () => {
  const { getByText, queryByText } = render(
    <LTreeDataTable
      data={[
        { id: 1, ltree: "1" },
        { id: 2, ltree: "1.1" },
        { id: 3, ltree: "2" },
      ]}
    >
      <Column field="ltree" />
    </LTreeDataTable>,
  );

  const row = getByText("1").closest("tr");

  const collapseButton = within(row).getByRole("button");

  collapseButton.click();

  expect(queryByText("1.1")).not.toBeInTheDocument();
});

test("Precisa marcar um node por vez", () => {
  const handleSelection = jest.fn();

  const { getByText } = render(
    <LTreeDataTable
      data={[
        { id: 1, ltree: "1" },
        { id: 2, ltree: "2" },
      ]}
      selection={[]}
      onSelectionChange={handleSelection}
    >
      <Column field="ltree" />
    </LTreeDataTable>,
  );

  within(getByText("1").closest("tr"))
    .getByRole("checkbox")
    .click();

  expect(handleSelection).toHaveBeenCalledTimes(1);
  expect(handleSelection).toHaveBeenLastCalledWith([{ id: 1, ltree: "1" }]);
});

test("Precisa marcar mais de um node por vez", () => {
  const handleSelection = jest.fn();

  const { getByText } = render(
    <LTreeDataTable
      data={[
        { id: 1, ltree: "1" },
        { id: 2, ltree: "2" },
      ]}
      selection={[{ id: 1, ltree: "1" }]}
      onSelectionChange={handleSelection}
    >
      <Column field="ltree" />
    </LTreeDataTable>,
  );

  within(getByText("2").closest("tr"))
    .getByRole("checkbox")
    .click();

  expect(handleSelection).toHaveBeenCalledTimes(1);
  expect(handleSelection).toHaveBeenLastCalledWith([
    { id: 1, ltree: "1" },
    { id: 2, ltree: "2" },
  ]);
});

test("Precisa desmarcar um node por vez", () => {
  const handleSelection = jest.fn();

  const { getByText } = render(
    <LTreeDataTable
      data={[
        { id: 1, ltree: "1" },
        { id: 2, ltree: "2" },
      ]}
      selection={[{ id: 1, ltree: "1" }]}
      onSelectionChange={handleSelection}
    >
      <Column field="ltree" />
    </LTreeDataTable>,
  );

  within(getByText("1").closest("tr"))
    .getByRole("checkbox")
    .click();

  expect(handleSelection).toHaveBeenCalledTimes(1);
  expect(handleSelection).toHaveBeenLastCalledWith([]);
});

test("Precisa marcar os nodes dependentes junto", () => {
  const handleSelection = jest.fn();

  const { getByText } = render(
    <LTreeDataTable
      data={[
        { id: 1, ltree: "1" },
        { id: 2, ltree: "2" },
        { id: 3, ltree: "2.1" },
        { id: 4, ltree: "2.2" },
      ]}
      selection={[]}
      onSelectionChange={handleSelection}
    >
      <Column field="ltree" />
    </LTreeDataTable>,
  );

  within(getByText("2").closest("tr"))
    .getByRole("checkbox")
    .click();

  expect(handleSelection).toHaveBeenCalledTimes(1);
  expect(handleSelection).toHaveBeenLastCalledWith([
    { id: 2, ltree: "2" },
    { id: 3, ltree: "2.1" },
    { id: 4, ltree: "2.2" },
  ]);
});

test("Precisa desmarcar os nodes dependentes junto", () => {
  const handleSelection = jest.fn();

  const { getByText } = render(
    <LTreeDataTable
      data={[
        { id: 1, ltree: "1" },
        { id: 2, ltree: "2" },
        { id: 3, ltree: "2.1" },
        { id: 4, ltree: "2.2" },
      ]}
      selection={[
        { id: 2, ltree: "2" },
        { id: 3, ltree: "2.1" },
        { id: 4, ltree: "2.2" },
      ]}
      onSelectionChange={handleSelection}
    >
      <Column field="ltree" />
    </LTreeDataTable>,
  );

  within(getByText("2").closest("tr"))
    .getByRole("checkbox")
    .click();

  expect(handleSelection).toHaveBeenCalledTimes(1);
  expect(handleSelection).toHaveBeenLastCalledWith([]);
});

test("Dado que nós filhos já estão marcados, ao marcar o nó pai, deve marcar todos os nós filhos substituindo os existentes", () => {
  const handleSelection = jest.fn();

  const { getByText } = render(
    <LTreeDataTable
      data={[
        { id: 1, ltree: "1" },
        { id: 2, ltree: "2" },
        { id: 3, ltree: "2.1" },
        { id: 4, ltree: "2.2" },
      ]}
      selection={[{ id: 3, ltree: "2.1" }]}
      onSelectionChange={handleSelection}
    >
      <Column field="ltree" />
    </LTreeDataTable>,
  );

  within(getByText("2").closest("tr"))
    .getByRole("checkbox")
    .click();

  expect(handleSelection).toHaveBeenCalledTimes(1);
  expect(handleSelection).toHaveBeenLastCalledWith([
    { id: 2, ltree: "2" },
    { id: 3, ltree: "2.1" },
    { id: 4, ltree: "2.2" },
  ]);
});

test("Com um nó pai e seus dependentes marcados, ao recolher o nó pai, os nós recolhidos se mantém selecionados", async () => {
  const handleSelection = jest.fn();

  const { getByText, queryByText } = render(
    <LTreeDataTable
      data={[
        { id: 1, ltree: "1" },
        { id: 2, ltree: "1.1" },
        { id: 3, ltree: "2" },
      ]}
      selection={[
        { id: 1, ltree: "1" },
        { id: 2, ltree: "1.1" },
      ]}
      onSelectionChange={handleSelection}
    >
      <Column field="ltree" />
    </LTreeDataTable>,
  );

  const firstRow = within(getByText("1").closest("tr"));

  firstRow.getByRole("checkbox").click();
  firstRow.getByRole("button").click();

  expect(firstRow.getByRole("checkbox").checked).toBe(true);
  expect(queryByText("1.1")).not.toBeInTheDocument();
  expect(within(getByText("2").closest("tr")).getByRole("checkbox").checked).toBe(false);
});

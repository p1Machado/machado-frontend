import { fireEvent, render } from "@testing-library/react";
import { Form } from "./Form";
import { SelectField } from "./SelectField";

test("Deve renderizar a opção selecionada", () => {
  const { getByRole } = render(
    <Form onSubmit={() => {}} initialValues={{ teste: 2 }}>
      <SelectField
        name="teste"
        label="Teste"
        options={[
          { value: 1, label: "First" },
          { value: 2, label: "Second" },
          { value: 3, label: "Third" },
        ]}
      />
    </Form>,
  );

  expect(getByRole("textbox", { selector: '[name]="teste"' }).value).toBe("Second");
});

test("Deve renderizar a opção padrão", () => {
  const onSubmit = jest.fn();

  const { container, getByRole } = render(
    <Form onSubmit={onSubmit}>
      <SelectField
        name="teste"
        label="Teste"
        defaultValue={3}
        options={[
          { value: 1, label: "First" },
          { value: 2, label: "Second" },
          { value: 3, label: "Third" },
        ]}
      />
      <button type="submit" />
    </Form>,
  );

  expect(getByRole("textbox").value).toBe("Third");

  fireEvent.click(container.querySelector('[type="submit"]'));

  expect(onSubmit.mock.calls.length).toBe(1);
  expect(onSubmit.mock.calls[0][0]).toEqual({ teste: 3 });
});

test("Deve marcar o foco no campo quando submeter o campo com erro", () => {
  const onSubmit = jest.fn();

  render(
    <Form onSubmit={onSubmit}>
      <SelectField
        name="teste"
        label="Teste"
        defaultValue={3}
        options={[
          { value: 1, label: "First" },
          { value: 2, label: "Second" },
          { value: 3, label: "Third" },
        ]}
      />
      <button type="submit" />
    </Form>,
  );
});

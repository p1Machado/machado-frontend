Exemplo com opção selecionada

```js
import { Form } from "./Form";
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
</Form>;
```

Exemplo com opção padrão:

```js
import { Form } from "./Form";
<Form onSubmit={() => {}}>
  <SelectField
    name="teste"
    label="Teste"
    defaultValue={2}
    options={[
      { value: 1, label: "First" },
      { value: 2, label: "Second" },
      { value: 3, label: "Third" },
    ]}
  />
</Form>;
```

Exemplo com foco no campo com erro:

```js
import { Form } from "./Form";
<Form
  onSubmit={() => {}}
  validate={(values) => {
    return { teste: "Campo obrigatório" };
  }}
>
  <SelectField
    name="teste"
    label="Teste"
    options={[
      { value: 1, label: "First" },
      { value: 2, label: "Second" },
      { value: 3, label: "Third" },
    ]}
  />
  <button type="submit">submit</button>
</Form>;
```

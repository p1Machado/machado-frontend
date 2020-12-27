Exemplo com `value` tipo objeto:

```js
import { useState } from "react";
const [value, setValue] = useState({ value: 2, label: "Second" });
<SelectInput
  label="Teste"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  options={[
    { value: 1, label: "First" },
    { value: 2, label: "Second" },
    { value: 3, label: "Third" },
  ]}
/>;
```

Exemplo com `value` tipo int:

```js
import { useState } from "react";
const [value, setValue] = useState(3);
<SelectInput
  label="Teste"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  options={[
    { value: 1, label: "First" },
    { value: 2, label: "Second" },
    { value: 3, label: "Third" },
  ]}
/>;
```

import {
  ltreeCompare,
  ltreeIsAncestor,
  ltreeIsDescendent,
  ltreeIsParent,
  ltreeGetAncestors,
  ltreeGetParent,
  ltreeUpdateChecked,
} from "app/utils/ltreeUtils";

describe("ltreeCompare", () => {
  it("deve comparar ltree adequadamente", () => {
    expect(ltreeCompare("1.11", "1.1")).toBe(1);
    expect(ltreeCompare("1.1", "1.1")).toBe(0);
    expect(ltreeCompare("1.1", "1.11")).toBe(-1);
    expect(ltreeCompare("2.1", "1.11")).toBe(1);
    expect(ltreeCompare("2.1", "3.11")).toBe(-1);
    expect(ltreeCompare("2.1.0", "3.11")).toBe(-1);
    expect(ltreeCompare("2.1.0", "3.11.1.1")).toBe(-1);
    expect(ltreeCompare("2.1.1.1", "2.1")).toBe(1);
    expect(ltreeCompare("1.3", "1.3.1")).toBe(-1);
    expect(ltreeCompare("0", "0")).toBe(0);
    expect(ltreeCompare("Teste", "1")).toBe(1);
    expect(ltreeCompare("Teste", "1.1")).toBe(1);
    expect(ltreeCompare("Teste", "2")).toBe(1);
    expect(ltreeCompare("2", "Teste")).toBe(-1);
    expect(ltreeCompare("", "")).toBe(0);
    expect(ltreeCompare(null, null)).toBe(0);
    expect(ltreeCompare("1", null)).toBe(1);
    expect(ltreeCompare(null, "1")).toBe(-1);
    expect(ltreeCompare(undefined, undefined)).toBe(0);
  });
});

describe("ltreeIsAncestor", () => {
  it("deve verificar se a é ancestral de b", () => {
    expect(ltreeIsAncestor("1", "1.1")).toBe(true);
    expect(ltreeIsAncestor("1.1", "1")).toBe(false);
    expect(ltreeIsAncestor("1", "11.1")).toBe(false);
    expect(ltreeIsAncestor("1", "2")).toBe(false);
    expect(ltreeIsAncestor("", "1")).toBe(true);
  });
});

describe("ltreeIsDescendent", () => {
  it("deve verificar se a é descendente de b", () => {
    expect(ltreeIsDescendent("1", "1.1")).toBe(false);
    expect(ltreeIsDescendent("1.1", "1")).toBe(true);
    expect(ltreeIsDescendent("11.1", "1")).toBe(false);
    expect(ltreeIsDescendent("1", null)).toBe(false);
    expect(ltreeIsDescendent("1", "")).toBe(true);
    expect(ltreeIsDescendent("2", "1")).toBe(false);
  });
});

describe("ltreeIsParent", () => {
  it("deve verificar se a é pai de b", () => {
    expect(ltreeIsParent("1", "1.1")).toBe(true);
    expect(ltreeIsParent("11.1", "11.1.56")).toBe(true);
    expect(ltreeIsParent("1", "1.1.1")).toBe(false);
    expect(ltreeIsParent("1.1", "1")).toBe(false);
    expect(ltreeIsParent("1", "11.1")).toBe(false);
    expect(ltreeIsParent("1", "2")).toBe(false);
  });
});

describe("ltreeGetAncestors", () => {
  it("deve retornar todos os ancestrais de um nó", () => {
    expect(ltreeGetAncestors("1.1.1")).toEqual(expect.arrayContaining(["1", "1.1"]));
    expect(ltreeGetAncestors("1.2.11.1.1")).toEqual(expect.arrayContaining(["1", "1.2", "1.2.11", "1.2.11.1"]));
  });
});

describe("ltreeGetParent", () => {
  it("deve retornar todos os pais de um nó", () => {
    expect(ltreeGetParent("1.1.1")).toEqual("1.1");
    expect(ltreeGetParent("1.2.11.1.1")).toEqual("1.2.11.1");
  });
});

describe("ltreeUpdateChecked", () => {
  it("com os nós desmarcados, quando marcar o pai, deve marcar todos os filhos", () => {
    expect(
      ltreeUpdateChecked(
        //
        [{ ltree: "1" }, { ltree: "1.1" }, { ltree: "1.2" }],
        { ltree: "1" },
      ),
    ).toEqual(
      expect.arrayContaining([
        { ltree: "1", checked: true, indeterminate: false },
        { ltree: "1.1", checked: true, indeterminate: false },
        { ltree: "1.2", checked: true, indeterminate: false },
      ]),
    );
  });

  it("com os nós marcados, quando marcar o pai, deve desmarcar todos os filhos", () => {
    expect(
      ltreeUpdateChecked(
        [
          { ltree: "1", checked: true },
          { ltree: "1.1", checked: true },
          { ltree: "1.2", checked: true },
        ],
        { ltree: "1", checked: true },
      ),
    ).toEqual(
      expect.arrayContaining([
        { ltree: "1", checked: false, indeterminate: false },
        { ltree: "1.1", checked: false, indeterminate: false },
        { ltree: "1.2", checked: false, indeterminate: false },
      ]),
    );
  });

  it("com um dos nós filhos indeterminados, deve marcar os nós ancestrais como indeterminado corretamente", () => {
    let state = [
      //
      { ltree: "1", checked: false, indeterminate: true },
      { ltree: "1.1", checked: true, indeterminate: false },
      { ltree: "1.2", checked: true, indeterminate: false },
      { ltree: "1.3" },
      { ltree: "1.3.1" },
      { ltree: "1.3.2" },
      { ltree: "2" },
    ];
    state = ltreeUpdateChecked(state, { ltree: "1.3.1" });
    expect(state).toEqual(
      expect.arrayContaining([
        { ltree: "1", checked: false, indeterminate: true },
        { ltree: "1.1", checked: true, indeterminate: false },
        { ltree: "1.2", checked: true, indeterminate: false },
        { ltree: "1.3", checked: false, indeterminate: true },
        { ltree: "1.3.1", checked: true, indeterminate: false },
        { ltree: "1.3.2" },
        { ltree: "2" },
      ]),
    );
  });

  it("deve marcar os nós ancestrais como indeterminado corretamente", () => {
    let state = [
      //
      { ltree: "1" },
      { ltree: "1.1" },
      { ltree: "1.2" },
      { ltree: "1.3" },
      { ltree: "1.3.1" },
      { ltree: "1.3.2" },
      { ltree: "2" },
    ];
    state = ltreeUpdateChecked(state, { ltree: "1.3.1" });
    expect(state).toEqual(
      expect.arrayContaining([
        { ltree: "1", checked: false, indeterminate: true },
        { ltree: "1.1" },
        { ltree: "1.2" },
        { ltree: "1.3", checked: false, indeterminate: true },
        { ltree: "1.3.1", checked: true, indeterminate: false },
        { ltree: "1.3.2" },
        { ltree: "2" },
      ]),
    );
  });

  it("com os nós ancestrais indeterminados, ao desmarcar todos os nós filho, deve demarcar os nós ancestrais", () => {
    let state = [
      //
      { ltree: "1", checked: false, indeterminate: true },
      { ltree: "1.1" },
      { ltree: "1.2" },
      { ltree: "1.3", checked: false, indeterminate: true },
      { ltree: "1.3.1", checked: true },
      { ltree: "1.3.2" },
      { ltree: "2" },
    ];
    state = ltreeUpdateChecked(state, { ltree: "1.3.1", checked: true });
    expect(state).toEqual(
      expect.arrayContaining([
        { ltree: "1", checked: false, indeterminate: false },
        { ltree: "1.1" },
        { ltree: "1.2" },
        { ltree: "1.3", checked: false, indeterminate: false },
        { ltree: "1.3.1", checked: false, indeterminate: false },
        { ltree: "1.3.2" },
        { ltree: "2" },
      ]),
    );
  });

  it("com 3 nós filhos, dado que apenas 1 está marcado, quando marcar outro nó, o pai deve ficar indeterminado", () => {
    expect(
      ltreeUpdateChecked(
        [
          //
          { ltree: "1" },
          { ltree: "2", checked: false, indeterminate: true },
          { ltree: "2.1", checked: true },
          { ltree: "2.2" },
          { ltree: "2.3" },
        ],
        { ltree: "2.2" },
      ),
    ).toEqual(
      expect.arrayContaining([
        { ltree: "1" },
        { ltree: "2", checked: false, indeterminate: true },
        { ltree: "2.1", checked: true },
        { ltree: "2.2", checked: true, indeterminate: false },
        { ltree: "2.3" },
      ]),
    );
  });
});

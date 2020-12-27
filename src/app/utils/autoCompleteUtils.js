import deburr from "lodash/deburr";
import sortBy from "lodash/sortBy";

export function prepareOptions(options = []) {
  return sortBy(options, "label");
}

export function filterOptions(options = [], value) {
  const results = [];
  options.some((option) => {
    if (
      deburr(option.label)
        .toUpperCase()
        .includes(deburr(value).toUpperCase())
    ) {
      results.push(option);
    }
    return results.length > 5;
  });
  return results;
}

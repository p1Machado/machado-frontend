export function formatCurrency(number) {
  if (number === null || number === undefined) {
    return number;
  }
  return (number * 1).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

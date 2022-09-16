export function adjustCurrency(price: string) {
  const amount = price.toString().replace('.', '').replace(',', '').replace('$', '').replace('R', '');
  const amountFormatted = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(amount))
  return amountFormatted;
}

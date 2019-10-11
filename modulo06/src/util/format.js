export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

/* Poderia fazer nesse formato, retornando o método, porém utilizando
   desestruturação usei modelo acima.

export const format = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format();
*/

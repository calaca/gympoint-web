export const removeMask = maskedValue => maskedValue.replace(/\D+/g, '');

export const formatPrice = intValue =>
  (intValue / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

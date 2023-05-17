import numbro from 'numbro';

export const formatPrice = (x: number) => {
  return "$" + (x >= 10 ? x.toLocaleString("en-US", { 
    maximumFractionDigits: 2, 
    minimumFractionDigits: 2, 
  }) : x.toLocaleString("en-US", { 
    maximumSignificantDigits: 3,
    minimumSignificantDigits: 3,
  }));
}

export const isNegative = (x: number) => {
  const y = Math.round(x * 100) / 100;
  return y < 0;
}

export const formatPriceChange = (x: number) => {
  const y = Math.round(x * 100) / 100;
  const arrow = y > 0 ? '▲ ' : (y < 0 ? '▼ ': '');
  return arrow + Math.abs(y).toFixed(2) + "%"
}

export const formatDollarAmount = (num: number | undefined, digits = 2, round = true) => {
  if (num === 0) return '$0.00'
  if (!num) return '-'
  if (num < 0.001 && digits <= 3) {
    return '<$0.001'
  }

  return numbro(num).formatCurrency({
    average: round,
    mantissa: num > 1000 ? 2 : digits,
    abbreviations: {
      million: 'M',
      billion: 'B',
    },
  })
}
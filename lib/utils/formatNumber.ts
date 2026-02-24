/**
 * Format a number using Intl.NumberFormat for proper internationalization
 * @param value - The number to format
 * @param locale - The locale to use (default: 'fr-FR')
 * @returns Formatted number string
 */
export function formatNumber(value: number | string, locale: string = 'fr-FR'): string {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(numericValue)) {
    return String(value)
  }

  return new Intl.NumberFormat(locale).format(numericValue)
}

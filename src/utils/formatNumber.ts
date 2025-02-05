export function formatNumber(value?: number): string {
  // Return '0' if value is undefined, null, or exactly 0
  if (!value) return "0";

  // Define suffixes for large numbers
  const suffixes = ["", "K", "M", "B", "T", "P", "E"];

  // Determine the tier (thousands, millions, etc.)
  const tier = Math.floor(Math.log10(Math.abs(value)) / 3);

  // If the number is less than 1000, return the original number as a string
  if (tier === 0) return value.toString();

  // Get the appropriate suffix
  const suffix = suffixes[tier] || "";

  // Scale the number
  const scaled = value / Math.pow(10, tier * 3);

  // If the scaled number is a whole number, return without decimal places
  return scaled % 1 === 0
    ? `${scaled}${suffix}`
    : `${scaled.toFixed(2)}${suffix}`;
}

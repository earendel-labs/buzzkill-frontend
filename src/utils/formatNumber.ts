export function formatNumber(value?: number): string {
  if (value === undefined || value === null) return "0";

  // Define suffixes for large numbers
  const suffixes = ["", "K", "M", "B", "T", "P", "E"];

  // Determine the tier (thousands, millions, etc.)
  const tier = Math.floor(Math.log10(Math.abs(value)) / 3);

  // If the number is less than 1,000, return it as a string
  if (tier === 0) return value.toString();

  // Get the appropriate suffix
  const suffix = suffixes[tier] || "";

  // Scale the number
  const scaled = value / Math.pow(10, tier * 3);

  // Formatting based on value range
  if (value < 10_000) {
    return value.toLocaleString(); // Show full number with commas (e.g., "4,000")
  } else if (value < 1_000_000) {
    return scaled % 1 === 0 ? `${scaled.toFixed(0)}K` : `${scaled.toFixed(2)}K`; // Show whole if no decimals
  } else {
    return scaled % 1 === 0
      ? `${scaled.toFixed(0)}${suffix}`
      : `${scaled.toFixed(2)}${suffix}`;
  }
}

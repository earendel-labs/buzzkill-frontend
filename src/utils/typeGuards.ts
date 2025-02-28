import { HiveHatchling, Resource } from "@/types/Environment";

export function isHive(
  resource: HiveHatchling | Resource
): resource is HiveHatchling {
  return (resource as HiveHatchling).productivityValue !== undefined;
}

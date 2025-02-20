// app/Play/WorldMap/Location/[environment]/[hive]/page.tsx

import Link from "next/link";
import { Environment, HiveHatchling, Resource } from "@/types/Environment";
import { isHive } from "@/utils/typeGuards";

interface Params {
  environment: string;
  hive: string;
}
const baseUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// Pre-render hive pages for a given environment
export async function generateStaticParams({
  params,
}: {
  params: { environment: string };
}) {
  const environmentSlug = params.environment;

  const metaRes = await fetch(`${baseUrl}/Data/environment.json`);
  const metaJson = await metaRes.json();
  const environments: Environment[] = metaJson.environments;
  const environmentMeta = environments.find(
    (env) => env.name.replace(/\s/g, "") === environmentSlug
  );
  if (!environmentMeta) return [];

  const detailRes = await fetch(environmentMeta.jsonUrl);
  const detailJson = await detailRes.json();
  const environmentDetail: Environment = detailJson.environment;

  // Filter to only HiveHatchling objects before mapping static params
  return environmentDetail.resources.filter(isHive).map((resource) => ({
    environment: environmentSlug,
    hive: resource.name.replace(/\s/g, ""),
  }));
}

export default async function HivePage({ params }: { params: Params }) {
  const { environment: environmentSlug, hive: hiveSlug } = params;

  const metaRes = await fetch(`${baseUrl}/Data/environment.json`);
  const metaJson = await metaRes.json();
  const environments: Environment[] = metaJson.environments;
  const environmentMeta = environments.find(
    (env) => env.name.replace(/\s/g, "") === environmentSlug
  );
  if (!environmentMeta) return <div>Environment not found</div>;

  const detailRes = await fetch(environmentMeta.jsonUrl);
  const detailJson = await detailRes.json();
  const environmentDetail: Environment = detailJson.environment;

  // Narrow down to only HiveHatchling objects using the type guard
  const hatchlings = environmentDetail.resources.filter(isHive);
  const hiveData = hatchlings.find(
    (resource) => resource.name.replace(/\s/g, "") === hiveSlug
  );
  if (!hiveData) return <div>Hive not found</div>;

  return (
    <div>
      <h1>{hiveData.name}</h1>
      <p>Productivity Value: {hiveData.productivityValue}</p>
      <p>Rare Bees: {hiveData.rareBees}</p>
      <p>Total Bees: {hiveData.totalBees}</p>
      <p>
        Position: {hiveData.position.left}, {hiveData.position.top}
      </p>
      <Link href={environmentMeta.environmentURL || "#"}>
        Back to Environment
      </Link>
    </div>
  );
}

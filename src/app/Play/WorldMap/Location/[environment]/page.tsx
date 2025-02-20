// app/Play/WorldMap/Location/[environment]/page.tsx

import Link from "next/link";
import { Environment } from "@/types/Environment";
import GameLayout from "@/components/Layouts/GameLayout/GameLayout";
import BottomBar from "@/components/Layouts/GameLayout/BottomBar/BottomBar";
import { isHive } from "@/utils/typeGuards";

const baseUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

interface Params {
  environment: string;
}

export async function generateStaticParams() {
  const res = await fetch(`${baseUrl}/Data/environment.json`);

  const json = await res.json();
  const environments: Environment[] = json.environments;
  return environments.map((env) => ({
    environment: env.name.replace(/\s/g, ""),
  }));
}

export default async function EnvironmentPage({ params }: { params: Params }) {
  const environmentSlug = params.environment;

  // Fetch environment metadata
  const metaRes = await fetch(`${baseUrl}/Data/environment.json`);
  const metaJson = await metaRes.json();
  const environments: Environment[] = metaJson.environments;
  const environmentMeta = environments.find(
    (env) => env.name.replace(/\s/g, "") === environmentSlug
  );
  if (!environmentMeta) return <div>Environment not found</div>;

  // Fetch detailed environment JSON (e.g. /Data/Maps/Volcanic.json)
  const jsonUrl = environmentMeta.jsonUrl.startsWith("http")
    ? environmentMeta.jsonUrl
    : `${baseUrl}${environmentMeta.jsonUrl}`;

  const detailRes = await fetch(jsonUrl);
  const detailJson = await detailRes.json();
  const environmentDetail: Environment = detailJson.environment;

  return (
    <div>
      <h1>{environmentDetail.name}</h1>
      {environmentDetail.backgroundImage && (
        <img
          src={environmentDetail.backgroundImage}
          alt={environmentDetail.name}
          width="600"
        />
      )}
      <h2>Hives</h2>
      <ul>
        {environmentDetail.resources
          .filter(isHive) // Narrow the union to only Hive objects
          .map((resource) => (
            <li key={resource.id}>
              <Link href={resource.resourceLink}>{resource.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

// app/Play/WorldMap/page.tsx

import Link from "next/link";
import { Environment } from "@/types/Environment";

const baseUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function WorldMap() {
  // Fetch the list of environments from public/Data/environment.json
  const res = await fetch(`${baseUrl}/Data/environment.json`);
  const json = await res.json();
  const environments: Environment[] = json.environments;

  return (
    <div>
      <h1>World Map</h1>
      <ul>
        {environments.map((env) => (
          <li key={env.id}>
            {/* Create a slug by removing spaces from the environment name */}
            <Link
              href={`/Play/WorldMap/Location/${env.name.replace(/\s/g, "")}`}
            >
              {env.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

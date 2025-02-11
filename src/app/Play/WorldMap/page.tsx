"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const WorldMap = () => {
  const [environments, setEnvironments] = useState<{
    environments: any[];
  } | null>(null);

  useEffect(() => {
    fetch("/Data/environment.json")
      .then((res) => res.json())
      .then((data) => setEnvironments(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  if (!environments) return <div>Loading...</div>;

  return (
    <div>
      <h1>World Map</h1>
      <ul>
        {environments.environments.map((env) => (
          <li key={env.id}>
            <Link href={`WorldMap/Location/${env.name.replace(/\s+/g, "")}`}>
              {env.name} - {env.environmentType}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorldMap;

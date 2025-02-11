import Link from "next/link";
import { notFound } from "next/navigation";

const Environment = async ({ params }: { params: { environment: string } }) => {
  const environments = await fetch("/Data/environment.json").then((res) =>
    res.json()
  );
  const environment = environments.environments.find(
    (env: any) =>
      env.name.replace(/\s+/g, "").toLowerCase() === params.environment
  );

  if (!environment) {
    return notFound(); // Return a 404 if the environment isn't found
  }

  const environmentDetails = await fetch(environment.jsonUrl).then((res) =>
    res.json()
  );

  return (
    <div>
      <h1>{environmentDetails.environment.name}</h1>
      <img
        src={environmentDetails.environment.backgroundImage}
        alt={environmentDetails.environment.name}
      />
      <div>
        <h2>Hives in {environmentDetails.environment.name}:</h2>
        <ul>
          {environmentDetails.environment.resources.map((resource: any) => (
            <li key={resource.id}>
              <Link
                href={`/WorldMap/Location/${environmentDetails.environment.name
                  .replace(/\s+/g, "")
                  .toLowerCase()}/${resource.name.replace(/\s+/g, "")}`}
              >
                {resource.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Environment;

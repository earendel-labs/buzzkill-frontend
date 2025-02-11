

import { notFound } from "next/navigation";

const Hive = async ({
  params,
}: {
  params: { environment: string; hive: string };
}) => {
  const environments = await fetch("public/Data/environment.json").then((res) =>
    res.json()
  );
  const environment = environments.environments.find(
    (env: any) =>
      env.name.replace(/\s+/g, "").toLowerCase() === params.environment
  );

  if (!environment) {
    return notFound();
  }

  const environmentDetails = await fetch(environment.jsonUrl).then((res) =>
    res.json()
  );
  const hive = environmentDetails.environment.resources.find(
    (resource: any) =>
      resource.name.replace(/\s+/g, "").toLowerCase() === params.hive
  );

  if (!hive) {
    return notFound();
  }

  return (
    <div>
      <h1>{hive.name}</h1>
      <p>Productivity: {hive.productivityValue}</p>
      <p>Queen Bees: {hive.queenBees}</p>
      <p>Worker Bees: {hive.workerBees}</p>
      <p>
        Position: {hive.position.left}, {hive.position.top}
      </p>
      <audio controls>
        <source
          src={environmentDetails.environment.audioFile}
          type="audio/wav"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Hive;

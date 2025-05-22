import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import type { Address } from "abitype";
import { useAccount } from "wagmi";
import {
  useOwnedOriginsTokens,
  useOriginsTokenURIsBatch,
} from "@/hooks/BuzzkillOriginsNFT";
import { logger } from "@/utils/logger";
import type { BeeStats } from "@/types/OriginsStats";

/* ---------- helpers ---------- */
interface RawMeta {
  token_id: number;
  name: string;
  image: string;
  attributes: { trait_type: string; value: string }[];
}

type OnChainBee = Pick<BeeStats, "id" | "name" | "imageAddress"> & {
  traits: BeeStats["traits"];
};

export async function fetchBeeStats(ids: number[]): Promise<BeeStats[]> {
  if (!ids.length) return [];
  try {
    const res = await fetch(`/api/beeStats?ids=${ids.join(",")}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as BeeStats[];
  } catch (err) {
    logger.error("[fetchBeeStats]", err);
    return [];
  }
}

export function normalizeTraits(meta: RawMeta): OnChainBee {
  const traits: BeeStats["traits"] = {
    environment: "",
    wings: "",
    base: "",
    armor: "",
    leftHand: "",
    rightHand: "",
    hair: "",
    eyes: "",
    headpiece: "",
    character: "Worker Bee",
  };

  for (const { trait_type, value } of meta.attributes) {
    switch (trait_type) {
      case "Background":
        traits.environment = value;
        break;
      case "Wings":
        traits.wings = value;
        break;
      case "Base":
        traits.base = value;
        break;
      case "Armor":
        traits.armor = value;
        break;
      case "Right Hand":
        traits.rightHand = value;
        break;
      case "Left Hand":
        traits.leftHand = value;
        break;
      case "Eyes":
        traits.eyes = value;
        break;
      case "Hair":
        traits.hair = value;
        break;
      case "Headpiece":
        traits.headpiece = value;
        break;
      case "Character":
        traits.character = value === "Queen Bee" ? "Queen Bee" : "Worker Bee";
        break;
      default:
        break;
    }
  }

  return {
    id: String(meta.token_id),
    name: meta.name,
    imageAddress: meta.image,
    traits,
  };
}

/* ---------- context ---------- */
export interface BuzzkillOriginsContextType {
  bees: BeeStats[];
  totalOwned: number;
  loading: boolean;
  error: boolean;
  activeBee: number | null;
  setActiveBee: (id: number | null) => void;
}

const BuzzkillOriginsContext = createContext<
  BuzzkillOriginsContextType | undefined
>(undefined);

export const BuzzkillOriginsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { address } = useAccount();
  const owner = (address ?? "") as Address;

  /* Wagmi hooks — now with polling disabled in dev */
  const { balanceQuery, ownersQuery, owned } = useOwnedOriginsTokens(
    owner,
    4444,
    {
      watch: false,
    }
  );
  const uriQuery = useOriginsTokenURIsBatch(owned, { watch: false });

  const [bees, setBees] = useState<BeeStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeBee, setActiveBee] = useState<number | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  /* Main effect — runs once when ownership + URIs are ready */
  useEffect(() => {
    if (
      !owned.length ||
      !uriQuery.data ||
      balanceQuery.isLoading ||
      ownersQuery.isLoading ||
      uriQuery.isLoading ||
      hasLoaded
    )
      return;

    setLoading(true);
    setError(false);

    const run = async () => {
      try {
        setHasLoaded(true);

        const uris = uriQuery.data.map((r) => r.result as string);
        const rawMetas: RawMeta[] = await Promise.all(
          uris.map((u) => fetch(u).then((r) => r.json()))
        );

        const onChain = rawMetas.map(normalizeTraits);
        const offChain = await fetchBeeStats(owned);

        const merged: BeeStats[] = onChain.map((oc) => {
          const db = offChain.find((b) => b.id === oc.id);
          return db
            ? { ...db, ...oc, traits: oc.traits }
            : {
                ...oc,
                initialized: false,
                level: 0,
                xp: 0,
                maxXp: 0,
                attack: 0,
                defence: 0,
                foraging: 0,
                energy: 0,
                maxEnergy: 0,
                health: 0,
                maxHealth: 0,
                productivity: 0,
                currentProductivity: 0,
                maxProductivity: 0,
                raidsCompleted: 0,
                raidsSuccessful: 0,
                foragesCompleted: 0,
              };
        });
        logger.log("[BuzzkillOrigins] merged bee data:", merged);
        setBees(merged);
      } catch (err) {
        logger.error("[BuzzkillOrigins] merge error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const t = setTimeout(run, 300); // debounce hot-reload bursts
    return () => clearTimeout(t);
  }, [owned, uriQuery.data]);

  /* memoised context value */
  const value = useMemo(
    () => ({
      bees,
      totalOwned: owned.length,
      loading,
      error,
      activeBee,
      setActiveBee,
    }),
    [bees, owned.length, loading, error, activeBee]
  );

  return (
    <BuzzkillOriginsContext.Provider value={value}>
      {children}
    </BuzzkillOriginsContext.Provider>
  );
};

export function useBuzzkillOriginsContext() {
  const ctx = useContext(BuzzkillOriginsContext);
  if (!ctx)
    throw new Error("useBuzzkillOriginsContext must be inside provider");
  return ctx;
}
